"use client";
import React, { useState, useEffect } from 'react';
import { defaultRoomsData, Room, SeasonalBannerConfig, AppData } from '../../data/roomsData';
import { 
  Plus, Edit, Trash2, Save, RotateCcw, Download, Upload, Eye, 
  ArrowUp, ArrowDown, Copy, Check, AlertCircle, Lock, LogOut, 
  Home, DollarSign, Calendar, Video, Image as ImageIcon, Sparkles, X, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const ADMIN_PASSWORD_1 = 'mystay2026';
const ADMIN_PASSWORD_2 = 'admin123';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'rooms' | 'rates' | 'banner' | 'backup'>('rooms');
  
  // App data state
  const [data, setData] = useState<AppData>(defaultRoomsData);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isNewRoom, setIsNewRoom] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Check auth session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('mystay_admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    // Load local storage custom data if present, or fetch from api
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 1. Try local storage first
      const local = localStorage.getItem('mystay_custom_rooms');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.rooms && parsed.rooms.length > 0) {
          setData(parsed);
          return;
        }
      }

      // 2. Fetch from backend API
      const res = await fetch('/api/rooms');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.warn('Using default rooms data:', e);
      setData(defaultRoomsData);
    }
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD_1 || passwordInput === ADMIN_PASSWORD_2) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mystay_admin_authenticated', 'true');
      setLoginError('');
      showToast('success', 'Logged in successfully!');
    } else {
      setLoginError('Incorrect password. Try "mystay2026" or "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mystay_admin_authenticated');
    setPasswordInput('');
  };

  // Save changes to both API & LocalStorage
  const saveData = async (updatedData: AppData) => {
    setIsSaving(true);
    setData(updatedData);

    // Sync to local storage for instant browser updates
    try {
      localStorage.setItem('mystay_custom_rooms', JSON.stringify(updatedData));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }

    // Sync to API
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': ADMIN_PASSWORD_1
        },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        throw new Error('API save responded with status ' + res.status);
      }
      showToast('success', 'All changes saved and published successfully!');
    } catch (e) {
      showToast('success', 'Saved to browser cache successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  // Quick rate change in matrix
  const handleRateChange = (roomId: number, field: string, val: any) => {
    const updatedRooms = data.rooms.map((r) => {
      if (r.id === roomId) {
        return { ...r, [field]: val };
      }
      return r;
    });
    setData({ ...data, rooms: updatedRooms });
  };

  // Room CRUD
  const handleOpenAddRoom = () => {
    const newId = Math.max(...data.rooms.map((r) => r.id), 0) + 1;
    const blankRoom: Room = {
      id: newId,
      title: 'New Luxury Room',
      subtitle: 'Modern boutique accommodation',
      beds: '1 King Bed',
      size: '35 m²',
      price: '1,500,000',
      originalPrice: '1,500,000',
      usdPrice: '59',
      isContactPrice: false,
      seasonPeriod: '1 October – 20 December',
      peakPeriod: '21 December – 3 January: Contact us for our best rate',
      image: '/images/apartment_balcony/img_1183.jpg',
      images: ['/images/apartment_balcony/img_1183.jpg'],
      features: ['Air conditioning', 'Private bathroom', 'Free WiFi', 'Flat-screen TV'],
      amenities: {
        kitchen: ['Refrigerator', 'Electric kettle'],
        bathroom: ['Shower', 'Hairdryer', 'Free toiletries'],
        view: ['City view'],
        facilities: ['Air conditioning', 'Free WiFi', 'Desk']
      },
      maxPersons: 2,
      badge: 'New'
    };
    setEditingRoom(blankRoom);
    setIsNewRoom(true);
  };

  const handleOpenEditRoom = (room: Room) => {
    setEditingRoom(JSON.parse(JSON.stringify(room)));
    setIsNewRoom(false);
  };

  const handleSaveRoomModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    let updatedRooms: Room[];
    if (isNewRoom) {
      updatedRooms = [...data.rooms, editingRoom];
    } else {
      updatedRooms = data.rooms.map((r) => (r.id === editingRoom.id ? editingRoom : r));
    }

    saveData({ ...data, rooms: updatedRooms });
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId: number) => {
    if (confirm('Are you sure you want to delete this room?')) {
      const updatedRooms = data.rooms.filter((r) => r.id !== roomId);
      saveData({ ...data, rooms: updatedRooms });
    }
  };

  const handleDuplicateRoom = (room: Room) => {
    const newId = Math.max(...data.rooms.map((r) => r.id), 0) + 1;
    const dup: Room = {
      ...JSON.parse(JSON.stringify(room)),
      id: newId,
      title: `${room.title} (Copy)`,
      badge: 'New'
    };
    saveData({ ...data, rooms: [...data.rooms, dup] });
  };

  const handleMoveRoom = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.rooms.length) return;
    const newRooms = [...data.rooms];
    const temp = newRooms[index];
    newRooms[index] = newRooms[newIndex];
    newRooms[newIndex] = temp;
    saveData({ ...data, rooms: newRooms });
  };

  // Backup & Restore
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mystay-rooms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Backup downloaded successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.rooms && Array.isArray(json.rooms)) {
          saveData(json);
          showToast('success', 'Data imported successfully!');
        } else {
          alert('Invalid backup format: missing rooms array.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all rooms & banner settings back to factory defaults? Any custom modifications will be replaced.')) {
      saveData(defaultRoomsData);
      showToast('success', 'Reset back to factory defaults!');
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-logo-mark">
            <Lock size={26} color="#d4af37" />
          </div>
          <h2>My Stay CMS Portal</h2>
          <p className="subtitle">Sign in to manage rooms, seasonal rates, pricing & media</p>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Enter Admin Password</label>
              <input
                type="password"
                placeholder="Enter password (default: mystay2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />
            </div>
            {loginError && <div className="admin-login-err">{loginError}</div>}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Access Admin Dashboard
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'underline' }}>
              ← Return to live website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`admin-toast ${toastMsg.type}`}>
          {toastMsg.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-brand">
          <Sparkles size={20} color="#d4af37" />
          <span className="brand-title">My Stay CMS</span>
          <span className="brand-badge">Admin Manager</span>
        </div>

        <div className="admin-nav-actions">
          <Link href="/" target="_blank" className="btn btn-outline admin-nav-btn">
            <Eye size={15} style={{ marginRight: 6 }} /> Live Website
          </Link>
          <button 
            type="button" 
            onClick={() => saveData(data)} 
            disabled={isSaving} 
            className="btn btn-primary admin-nav-btn"
            style={{ background: '#d4af37', borderColor: '#d4af37', color: '#1a1a1a' }}
          >
            <Save size={15} style={{ marginRight: 6 }} /> {isSaving ? 'Saving...' : 'Save & Publish'}
          </button>
          <button type="button" onClick={handleLogout} className="btn btn-outline admin-logout-btn" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="admin-content-grid">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <Home size={18} />
            <span>Rooms Management</span>
            <span className="count-chip">{data.rooms.length}</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'rates' ? 'active' : ''}`}
            onClick={() => setActiveTab('rates')}
          >
            <DollarSign size={18} />
            <span>Quick Rates & Pricing</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveTab('banner')}
          >
            <Calendar size={18} />
            <span>Seasonal Banner</span>
          </button>

          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <Download size={18} />
            <span>Backup & Reset</span>
          </button>
        </aside>

        {/* Content Body */}
        <main className="admin-main-body">
          {/* TAB 1: ROOMS MANAGEMENT */}
          {activeTab === 'rooms' && (
            <div className="admin-panel">
              <div className="panel-header">
                <div>
                  <h1 className="panel-title">Rooms & Accommodations</h1>
                  <p className="panel-desc">Manage all rooms, add new units, configure images, video tours, amenities and features.</p>
                </div>
                <button type="button" onClick={handleOpenAddRoom} className="btn btn-primary" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <Plus size={16} /> Add New Room
                </button>
              </div>

              <div className="admin-rooms-list">
                {data.rooms.map((room, idx) => (
                  <div key={room.id} className="admin-room-row">
                    <div className="room-order-controls">
                      <button 
                        type="button" 
                        disabled={idx === 0} 
                        onClick={() => handleMoveRoom(idx, 'up')}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        type="button" 
                        disabled={idx === data.rooms.length - 1} 
                        onClick={() => handleMoveRoom(idx, 'down')}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>

                    <img src={room.image} alt={room.title} className="admin-room-thumb" />

                    <div className="admin-room-info">
                      <div className="title-row">
                        <h3>{room.title}</h3>
                        {room.badge && <span className="room-badge" style={{ position: 'static' }}>{room.badge}</span>}
                        {room.videoUrl && (
                          <span className="video-indicator" title="Has video tour">
                            <Video size={13} style={{ marginRight: 3 }} /> Video
                          </span>
                        )}
                      </div>
                      <p className="room-sub">{room.subtitle} • {room.size} • Max {room.maxPersons} guests</p>
                      <div className="room-pricing-pills">
                        <span className="pill">
                          <strong>1 Oct – 20 Dec:</strong> {room.isContactPrice ? 'Contact us' : `VND ${room.price} (~$${room.usdPrice})`}
                        </span>
                        <span className="pill peak">
                          <strong>21 Dec – 3 Jan:</strong> Contact us for best rate
                        </span>
                      </div>
                    </div>

                    <div className="admin-row-actions">
                      <button 
                        type="button" 
                        onClick={() => handleOpenEditRoom(room)} 
                        className="action-btn edit" 
                        title="Edit Room"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleDuplicateRoom(room)} 
                        className="action-btn duplicate" 
                        title="Duplicate Room"
                      >
                        <Copy size={16} /> Copy
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteRoom(room.id)} 
                        className="action-btn delete" 
                        title="Delete Room"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: QUICK RATES MATRIX */}
          {activeTab === 'rates' && (
            <div className="admin-panel">
              <div className="panel-header">
                <div>
                  <h1 className="panel-title">Quick Rates & Seasonal Pricing Matrix</h1>
                  <p className="panel-desc">Quickly adjust rates for 1 Oct – 20 Dec and Festive Season (21 Dec – 3 Jan) across all rooms in one place.</p>
                </div>
                <button type="button" onClick={() => saveData(data)} className="btn btn-primary">
                  <Save size={16} style={{ marginRight: 6 }} /> Save Rates
                </button>
              </div>

              <div className="rates-table-wrap">
                <table className="rates-table">
                  <thead>
                    <tr>
                      <th>Room Title</th>
                      <th>Pricing Mode</th>
                      <th>1 Oct – 20 Dec (VND)</th>
                      <th>USD (approx.)</th>
                      <th>21 Dec – 3 Jan (Peak Holiday)</th>
                      <th>Badge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rooms.map((room) => (
                      <tr key={room.id}>
                        <td style={{ fontWeight: 600 }}>{room.title}</td>
                        <td>
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={!!room.isContactPrice}
                              onChange={(e) => handleRateChange(room.id, 'isContactPrice', e.target.checked)}
                            />
                            <span>Contact Us</span>
                          </label>
                        </td>
                        <td>
                          {room.isContactPrice ? (
                            <span style={{ color: '#888', fontStyle: 'italic' }}>Contact us</span>
                          ) : (
                            <input
                              type="text"
                              className="table-input"
                              value={room.price}
                              onChange={(e) => handleRateChange(room.id, 'price', e.target.value)}
                              placeholder="e.g. 1,500,000"
                            />
                          )}
                        </td>
                        <td>
                          {room.isContactPrice ? (
                            <span style={{ color: '#888' }}>-</span>
                          ) : (
                            <input
                              type="text"
                              className="table-input small"
                              value={room.usdPrice || ''}
                              onChange={(e) => handleRateChange(room.id, 'usdPrice', e.target.value)}
                              placeholder="e.g. 59"
                            />
                          )}
                        </td>
                        <td>
                          <input
                            type="text"
                            className="table-input wide"
                            value={room.peakPeriod || '21 December – 3 January: Contact us for our best rate'}
                            onChange={(e) => handleRateChange(room.id, 'peakPeriod', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="table-input small"
                            value={room.badge || ''}
                            onChange={(e) => handleRateChange(room.id, 'badge', e.target.value)}
                            placeholder="Badge"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SEASONAL BANNER SETTINGS */}
          {activeTab === 'banner' && (
            <div className="admin-panel">
              <div className="panel-header">
                <div>
                  <h1 className="panel-title">Seasonal Notice Banner</h1>
                  <p className="panel-desc">Customize the top notice banner displayed above the accommodations list.</p>
                </div>
                <button type="button" onClick={() => saveData(data)} className="btn btn-primary">
                  <Save size={16} style={{ marginRight: 6 }} /> Save Banner
                </button>
              </div>

              <div className="admin-form-box">
                <div className="form-group checkbox-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={data.seasonalBanner?.enabled}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, enabled: e.target.checked }
                      })}
                    />
                    <strong>Show Seasonal Rates Notice Banner on Website</strong>
                  </label>
                </div>

                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Banner Title</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.title || ''}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, title: e.target.value }
                      })}
                      placeholder="e.g. Seasonal Pricing & Rates Notice"
                    />
                  </div>

                  <div className="form-group">
                    <label>Season Period Dates</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.seasonPeriod || ''}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, seasonPeriod: e.target.value }
                      })}
                      placeholder="e.g. 1 October – 20 December"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Season Notice Message</label>
                  <textarea
                    rows={2}
                    value={data.seasonalBanner?.seasonRatesNote || ''}
                    onChange={(e) => setData({
                      ...data,
                      seasonalBanner: { ...data.seasonalBanner, seasonRatesNote: e.target.value }
                    })}
                    placeholder="e.g. Seasonal rates now in effect. Book direct to lock in today's best price!"
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Peak / Festive Season Dates</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.peakPeriod || ''}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, peakPeriod: e.target.value }
                      })}
                      placeholder="e.g. 21 December – 3 January"
                    />
                  </div>

                  <div className="form-group">
                    <label>Peak Notice Callout</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.peakNotice || ''}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, peakNotice: e.target.value }
                      })}
                      placeholder="e.g. Contact us for our best rate"
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="form-group">
                    <label>Button Text</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.buttonText || ''}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, buttonText: e.target.value }
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Button Target Anchor / Link</label>
                    <input
                      type="text"
                      value={data.seasonalBanner?.buttonLink || '#book-direct'}
                      onChange={(e) => setData({
                        ...data,
                        seasonalBanner: { ...data.seasonalBanner, buttonLink: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="admin-panel">
              <div className="panel-header">
                <div>
                  <h1 className="panel-title">Data Backup, Export & Restore</h1>
                  <p className="panel-desc">Download a complete JSON snapshot of your rooms, or import an existing configuration.</p>
                </div>
              </div>

              <div className="backup-cards-grid">
                <div className="backup-card">
                  <Download size={28} color="#d4af37" />
                  <h3>Export Rooms Data</h3>
                  <p>Download your current room list, prices, photos, and video links to a JSON file on your computer.</p>
                  <button type="button" onClick={handleExportJSON} className="btn btn-outline">
                    Download Backup JSON
                  </button>
                </div>

                <div className="backup-card">
                  <Upload size={28} color="#003580" />
                  <h3>Import Backup</h3>
                  <p>Upload a previously exported JSON backup file to instantly restore room settings.</p>
                  <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'inline-block' }}>
                    Select JSON File
                    <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
                  </label>
                </div>

                <div className="backup-card danger">
                  <RotateCcw size={28} color="#b3261e" />
                  <h3>Reset to Default</h3>
                  <p>Reset all rooms back to standard default pricing (1.5M, 1.7M, 2.0M, 2.2M, 2.8M, Private House).</p>
                  <button type="button" onClick={handleResetDefaults} className="btn btn-outline" style={{ borderColor: '#b3261e', color: '#b3261e' }}>
                    Reset Factory Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* EDIT / ADD ROOM MODAL */}
      {editingRoom && (
        <div className="admin-modal-overlay" onClick={() => setEditingRoom(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{isNewRoom ? 'Add New Room' : `Edit: ${editingRoom.title}`}</h2>
              <button type="button" className="close-btn" onClick={() => setEditingRoom(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveRoomModal} className="admin-modal-form">
              <div className="admin-grid-2">
                <div className="form-group">
                  <label>Room Title *</label>
                  <input
                    type="text"
                    required
                    value={editingRoom.title}
                    onChange={(e) => setEditingRoom({ ...editingRoom, title: e.target.value })}
                    placeholder="e.g. Deluxe Double Room"
                  />
                </div>

                <div className="form-group">
                  <label>Badge / Highlight Tag</label>
                  <input
                    type="text"
                    value={editingRoom.badge || ''}
                    onChange={(e) => setEditingRoom({ ...editingRoom, badge: e.target.value })}
                    placeholder="e.g. Popular, 12m² Balcony, 2 Bed Rooms"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subtitle / Bed Summary</label>
                <input
                  type="text"
                  value={editingRoom.subtitle}
                  onChange={(e) => setEditingRoom({ ...editingRoom, subtitle: e.target.value })}
                  placeholder="e.g. Spacious 12 m² private balcony"
                />
              </div>

              <div className="admin-grid-3">
                <div className="form-group">
                  <label>Room Size</label>
                  <input
                    type="text"
                    value={editingRoom.size}
                    onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                    placeholder="e.g. 45 m²"
                  />
                </div>

                <div className="form-group">
                  <label>Max Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={editingRoom.maxPersons}
                    onChange={(e) => setEditingRoom({ ...editingRoom, maxPersons: parseInt(e.target.value) || 2 })}
                  />
                </div>

                <div className="form-group">
                  <label>Bed Configuration</label>
                  <input
                    type="text"
                    value={editingRoom.beds}
                    onChange={(e) => setEditingRoom({ ...editingRoom, beds: e.target.value })}
                    placeholder="e.g. 1 extra-large double bed"
                  />
                </div>
              </div>

              {/* Pricing section */}
              <div className="form-section-box">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.75rem' }}>
                  <DollarSign size={16} color="#d4af37" /> Pricing & Seasons
                </h4>
                
                <div className="form-group checkbox-row" style={{ marginBottom: '1rem' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!editingRoom.isContactPrice}
                      onChange={(e) => setEditingRoom({ ...editingRoom, isContactPrice: e.target.checked })}
                    />
                    <strong>Custom / "Contact Us" Rate (e.g. For Private House or Special Event)</strong>
                  </label>
                </div>

                {!editingRoom.isContactPrice && (
                  <div className="admin-grid-2">
                    <div className="form-group">
                      <label>Regular / 1 Oct – 20 Dec Price (VND)</label>
                      <input
                        type="text"
                        value={editingRoom.price}
                        onChange={(e) => setEditingRoom({ ...editingRoom, price: e.target.value })}
                        placeholder="e.g. 1,500,000"
                      />
                    </div>
                    <div className="form-group">
                      <label>Approx. USD Price ($)</label>
                      <input
                        type="text"
                        value={editingRoom.usdPrice || ''}
                        onChange={(e) => setEditingRoom({ ...editingRoom, usdPrice: e.target.value })}
                        placeholder="e.g. 59"
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Peak Holiday Period (21 Dec – 3 Jan Notice)</label>
                  <input
                    type="text"
                    value={editingRoom.peakPeriod || '21 December – 3 January: Contact us for our best rate'}
                    onChange={(e) => setEditingRoom({ ...editingRoom, peakPeriod: e.target.value })}
                  />
                </div>
              </div>

              {/* Video Tour URL */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Video size={16} color="#003580" /> Balcony / Room Video Tour URL
                </label>
                <input
                  type="text"
                  value={editingRoom.videoUrl || ''}
                  onChange={(e) => setEditingRoom({ ...editingRoom, videoUrl: e.target.value })}
                  placeholder="https://lh3.googleusercontent.com/... or mp4 link"
                />
                <small style={{ color: '#777', display: 'block', marginTop: 4 }}>
                  Link video will display a "🎥 Watch Video" badge on the room card and inside the Room Modal.
                </small>
              </div>

              {/* Main Image URL */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ImageIcon size={16} color="#d4af37" /> Main Cover Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingRoom.image}
                  onChange={(e) => setEditingRoom({ ...editingRoom, image: e.target.value })}
                  placeholder="/images/... or https://..."
                />
              </div>

              {/* Gallery Images */}
              <div className="form-group">
                <label>Gallery Images (one URL per line)</label>
                <textarea
                  rows={4}
                  value={editingRoom.images.join('\n')}
                  onChange={(e) => setEditingRoom({
                    ...editingRoom,
                    images: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="/images/apartment_balcony/img_1183.jpg"
                />
              </div>

              {/* Key Features */}
              <div className="form-group">
                <label>Key Features (comma-separated)</label>
                <input
                  type="text"
                  value={editingRoom.features.join(', ')}
                  onChange={(e) => setEditingRoom({
                    ...editingRoom,
                    features: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Private kitchen, Ensuite bathroom, City view, Air conditioning"
                />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingRoom(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} style={{ marginRight: 6 }} /> {isNewRoom ? 'Create Room' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
