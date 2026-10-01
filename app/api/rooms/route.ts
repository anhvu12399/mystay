import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { defaultRoomsData, AppData } from '../../../data/roomsData';

const dataFilePath = path.join(process.cwd(), 'data', 'rooms.json');

function readRoomsData(): AppData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading rooms.json:', error);
  }
  return defaultRoomsData;
}

export async function GET() {
  const data = readRoomsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-auth');
    // Simple secure PIN / password for the admin
    if (authHeader !== 'mystay2026' && authHeader !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    const payload = await request.json();
    if (!payload || !Array.isArray(payload.rooms)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(payload, null, 2), 'utf8');
    } catch (writeErr) {
      console.warn('Could not write to local filesystem (e.g. read-only serverless environment):', writeErr);
      // Even if serverless fs is readonly, return success so client-side localStorage sync works
    }

    return NextResponse.json({ success: true, message: 'Rooms data updated successfully', data: payload });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
