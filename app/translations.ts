export type Locale = 'en' | 'vi' | 'ko' | 'zh';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'vi', 'ko', 'zh'];

export const translations: Record<string, Record<Locale, string>> = {
  // Navigation
  brandName: {
    en: 'My Stay & Apartment',
    vi: 'My Stay & Apartment',
    ko: 'My Stay & Apartment',
    zh: 'My Stay & Apartment'
  },
  navAbout: {
    en: 'About',
    vi: 'Giới thiệu',
    ko: '소개',
    zh: '关于'
  },
  navRooms: {
    en: 'Rooms',
    vi: 'Phòng nghỉ',
    ko: '객실',
    zh: '客房'
  },
  navReviews: {
    en: 'Reviews',
    vi: 'Đánh giá',
    ko: '이용 후기',
    zh: '客户评价'
  },
  navContact: {
    en: 'Contact',
    vi: 'Liên hệ',
    ko: '연락처',
    zh: '联系我们'
  },

  // Hero Section
  heroSubtitle: {
    en: 'Boutique Luxury',
    vi: 'Khách Sạn & Căn Hộ Sang Trọng',
    ko: '부티크 럭셔리',
    zh: '精品奢华'
  },
  heroTitle: {
    en: 'Experience Unparalleled Comfort',
    vi: 'Trải Nghiệm Sự Tiện Nghi Đẳng Cấp',
    ko: '비교할 수 없는 편안함을 경험하세요',
    zh: '体验无与伦比的舒适空间'
  },
  heroText: {
    en: 'An exclusive collection of 10 meticulously designed rooms and apartments tailored for the modern traveler.',
    vi: 'Bộ sưu tập độc quyền gồm 10 phòng và căn hộ được thiết kế tỉ mỉ, phù hợp cho du khách hiện đại.',
    ko: '현대적인 여행객을 위해 세심하게 설계된 10개의 프리미엄 객실 및 아파트 컬렉션입니다.',
    zh: '专为现代旅行者打造的 10 间精心设计的精品客房与公寓系列。'
  },
  heroPromo: {
    en: 'Book directly with us to unlock an exclusive 10% discount on your stay!',
    vi: 'Đặt phòng trực tiếp với chúng tôi để nhận ngay ưu đãi giảm giá 10%!',
    ko: '직접 예약하고 숙박 10% 단독 할인 혜택을 누리세요!',
    zh: '直接向我们预订，即可享受 9 折专属优惠！'
  },
  heroButton: {
    en: 'Discover Our Rooms',
    vi: 'Khám Phá Các Phòng',
    ko: '객실 보기',
    zh: '探索我们的客房'
  },

  // Accommodations Section
  sectionAccommodationsSubtitle: {
    en: 'Our Accommodations',
    vi: 'Không Gian Lưu Trú',
    ko: '엄선된 객실',
    zh: '我们的客房'
  },
  sectionAccommodationsTitle: {
    en: 'Stay With Us',
    vi: 'Chọn Phòng Nghỉ',
    ko: '우리와 함께 머물러보세요',
    zh: '尽享惬意时光'
  },

  // Room Meta
  from: {
    en: 'From',
    vi: 'Từ',
    ko: '요금:',
    zh: '起'
  },
  approx: {
    en: 'approx.',
    vi: 'khoảng',
    ko: '약',
    zh: '约'
  },
  bookNow: {
    en: 'Book Now',
    vi: 'Đặt ngay',
    ko: '지금 예약',
    zh: '立即预订'
  },
  popular: {
    en: 'Popular',
    vi: 'Phổ biến',
    ko: '인기 객실',
    zh: '热门推荐'
  },
  premium: {
    en: 'Premium',
    vi: 'Cao cấp',
    ko: '프리미엄',
    zh: '尊贵首选'
  },
  more: {
    en: 'more',
    vi: 'tiện ích khác',
    ko: '개 더보기',
    zh: '更多'
  },
  viewPhotos: {
    en: 'View Photos',
    vi: 'Xem ảnh',
    ko: '사진 보기',
    zh: '查看照片'
  },

  // Guest Experiences
  guestExperiencesSubtitle: {
    en: 'Guest Experiences',
    vi: 'Cảm Nhận Từ Khách Hàng',
    ko: '고객 이용 경험',
    zh: '住客真实体验'
  },
  guestExperiencesTitle: {
    en: 'What They Say',
    vi: 'Đánh Giá Thực Tế',
    ko: '고객들의 생생한 후기',
    zh: '听听他们怎么说'
  },
  viewAllReviews: {
    en: 'View All Reviews on Booking.com',
    vi: 'Xem tất cả đánh giá trên Booking.com',
    ko: 'Booking.com에서 모든 후기 보기',
    zh: '在 Booking.com 上查看所有评价'
  },

  // Secure Booking Section
  secureApartmentSubtitle: {
    en: 'Secure Your Apartment',
    vi: 'Giữ Chỗ Căn Hộ Của Bạn',
    ko: '객실 예약하기',
    zh: '预订您的公寓'
  },
  secureApartmentTitle: {
    en: 'Book Direct & Save 10%',
    vi: 'Đặt Trực Tiếp & Giảm 10%',
    ko: '직접 예약하고 10% 할인받기',
    zh: '直客预订尊享 9 折'
  },
  secureApartmentDesc: {
    en: 'Enjoy our guaranteed best rates and an exclusive direct booking discount. Fill out this quick reservation inquiry and our reservation team will contact you within 3 hours.',
    vi: 'Tận hưởng mức giá tốt nhất được đảm bảo và ưu đãi đặt phòng trực tiếp. Hãy điền vào biểu mẫu đăng ký nhanh này và đội ngũ của chúng tôi sẽ liên hệ lại trong vòng 3 giờ.',
    ko: '최저가 보장 및 단독 직접 예약 할인을 누려보세요. 간단한 문의 양식을 작성해 주시면 예약 팀에서 3시간 이내에 연락드리겠습니다.',
    zh: '享受我们保证的最佳房价和独家直接预订折扣。填写此快速预订咨询表，我们的预订团队将在 3 小时内与您联系。'
  },

  // Booking Form Fields
  fullName: {
    en: 'Full Name',
    vi: 'Họ và Tên',
    ko: '성함',
    zh: '姓名'
  },
  emailAddress: {
    en: 'Email Address',
    vi: 'Địa chỉ Email',
    ko: '이메일 주소',
    zh: '电子邮箱'
  },
  phoneNumber: {
    en: 'Phone Number',
    vi: 'Số điện thoại',
    ko: '전화번호',
    zh: '电话号码'
  },
  selectApartment: {
    en: 'Select Apartment',
    vi: 'Chọn loại phòng/căn hộ',
    ko: '객실 선택',
    zh: '选择公寓'
  },
  checkInDate: {
    en: 'Check-in Date',
    vi: 'Ngày nhận phòng (Check-in)',
    ko: '체크인 날짜',
    zh: '入住日期'
  },
  checkOutDate: {
    en: 'Check-out Date',
    vi: 'Ngày trả phòng (Check-out)',
    ko: '체크아웃 날짜',
    zh: '退房日期'
  },
  specialRequests: {
    en: 'Special Requests (Optional)',
    vi: 'Yêu cầu đặc biệt (Không bắt buộc)',
    ko: '특별 요청 사항 (선택 사항)',
    zh: '特殊要求（选填）'
  },
  requestsPlaceholder: {
    en: 'e.g., Airport pick-up, preferred check-in time, twin beds setup...',
    vi: 'Ví dụ: Đưa đón sân bay, giờ nhận phòng dự kiến, thiết lập giường đôi...',
    ko: '예: 공항 픽업, 선호하는 체크인 시간, 트윈 베드 설정...',
    zh: '例如：接机服务、预计入住时间、双床房设置...'
  },
  submitBooking: {
    en: 'Reserve Direct & Save 10%',
    vi: 'Đặt Trực Tiếp & Giảm 10%',
    ko: '직접 예약하고 10% 할인받기',
    zh: '直接预订并节省 10%'
  },
  processingBooking: {
    en: 'Processing Booking...',
    vi: 'Đang xử lý yêu cầu...',
    ko: '예약 처리 중...',
    zh: '正在处理预订...'
  },
  successAlert: {
    en: "Request sent successfully! We've locked in your 10% direct discount. Our reservations desk will email you to finalize check-in times and payment details within the next 3 hours.",
    vi: "Yêu cầu đặt phòng đã được gửi thành công! Chúng tôi đã kích hoạt ưu đãi giảm giá 10% đặt trực tiếp cho bạn. Bộ phận đặt phòng của chúng tôi sẽ gửi email cho bạn để xác nhận thời gian nhận phòng và chi tiết thanh toán trong vòng 3 giờ tới.",
    ko: "예약 문의가 성공적으로 전송되었습니다! 직접 예약 10% 할인이 적용되었습니다. 예약 담당 부서에서 3시간 이내에 이메일로 체크인 시간 및 결제 상세 정보를 안내해 드리겠습니다.",
    zh: "预订申请已成功发送！我们已为您锁定了 9 折直订优惠。我们的预订处将在接下来的 3 小时内给您发送电子邮件，以最终确认入住时间和付款详情。"
  },
  dateError: {
    en: 'Check-out date must be later than check-in date.',
    vi: 'Ngày trả phòng phải sau ngày nhận phòng.',
    ko: '체크아웃 날짜는 체크인 날짜보다 늦어야 합니다.',
    zh: '退房日期必须晚于入住日期。'
  },

  // Float & Footer
  whatsappFloat: {
    en: 'Text us to get 10% off!',
    vi: 'Nhắn tin nhận ngay ưu đãi 10%!',
    ko: '10% 할인을 위해 메시지를 보내주세요!',
    zh: '联系我们，即可享 9 折优惠！'
  },
  footerDesc: {
    en: 'A luxury boutique hotel experience offering 10 premium rooms and apartments for international guests.',
    vi: 'Trải nghiệm căn hộ dịch vụ boutique sang trọng với 10 phòng ngủ và căn hộ cao cấp dành cho du khách quốc tế.',
    ko: '글로벌 여행객을 위한 10개의 프리미엄 객실과 아파트를 제공하는 럭셔리 부티크 호텔 경험입니다.',
    zh: '为国际宾客提供 10 间精品奢华客房与公寓的尊贵住宿体验。'
  },
  footerExplore: {
    en: 'Explore',
    vi: 'Khám Phá',
    ko: '둘러보기',
    zh: '探索'
  },
  footerContact: {
    en: 'Contact',
    vi: 'Liên hệ',
    ko: '연락처',
    zh: '联系我们'
  },
  footerAboutUs: {
    en: 'About Us',
    vi: 'Về chúng tôi',
    ko: '회사 소개',
    zh: '关于我们'
  },
  footerRoomsSuites: {
    en: 'Rooms & Suites',
    vi: 'Danh sách phòng',
    ko: '객실 및 스위트룸',
    zh: '客房与套房'
  },
  footerGuestReviews: {
    en: 'Guest Reviews',
    vi: 'Đánh giá của khách',
    ko: '고객 이용 후기',
    zh: '住客评价'
  },
  footerAddress: {
    en: '139/5 Nguyen Cu Trinh Street, Cau Ong Lanh, Ho Chi Minh 70000',
    vi: '139/5 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh 70000',
    ko: '139/5 Nguyen Cu Trinh Street, Cau Ong Lanh, Ho Chi Minh 70000',
    zh: '139/5 Nguyen Cu Trinh Street, Cau Ong Lanh, Ho Chi Minh 70000'
  },
  footerAllRights: {
    en: 'All rights reserved.',
    vi: 'Bản quyền đã được bảo hộ.',
    ko: '모든 권리 보유.',
    zh: '保留所有权利。'
  },

  // RoomModal texts
  excellentReviews: {
    en: 'Excellent 8.9 – Based on 49 reviews.',
    vi: 'Tuyệt hảo 8.9 – Dựa trên 49 lượt đánh giá.',
    ko: '훌륭함 8.9 – 49개 이용 후기 기준.',
    zh: '卓越 8.9 – 基于 49 条住客评价。'
  },
  roomModalDesc: {
    en: 'This spacious room provides air conditioning, a private entrance, as well as a private bathroom featuring a bath and a shower. In the kitchen, guests will find a refrigerator, kitchenware, an oven and a microwave.',
    vi: 'Căn hộ rộng rãi này được trang bị máy lạnh, lối đi riêng, cũng như phòng tắm riêng có bồn tắm và vòi hoa sen. Trong khu vực bếp, khách sẽ tìm thấy tủ lạnh, dụng cụ nấu ăn, lò nướng và lò vi sóng.',
    ko: '이 넓은 객실은 에어컨, 전용 출입구, 욕조와 샤워 시설이 구비된 전용 욕실을 제공합니다. 주방에는 냉장고, 주방 식기, 오븐 및 전자레인지가 마련되어 있습니다.',
    zh: '这间宽敞的客房设有空调、独立入口以及带浴缸和淋浴的私人浴室。厨房内配 blow 冰箱、厨具、烤箱和微波炉。'
  },
  privateKitchen: {
    en: 'In your private kitchen:',
    vi: 'Trong bếp riêng của bạn:',
    ko: '전용 주방 시설:',
    zh: '您的专属 kitchen 设施：'
  },
  privateBathroom: {
    en: 'In your private bathroom:',
    vi: 'Trong phòng tắm riêng của bạn:',
    ko: '전용 욕실 시설:',
    zh: '您的专属浴室设施：'
  },
  facilities: {
    en: 'Facilities:',
    vi: 'Tiện ích phòng:',
    ko: '기타 편의 시설:',
    zh: '房间设施：'
  },
  pricePerNight: {
    en: 'Price per night',
    vi: 'Giá mỗi đêm',
    ko: '1박 요금',
    zh: '每晚价格'
  }
};

// Vocabulary dictionary mapping exact keywords in page.tsx static lists
const keyMap: Record<string, Record<Locale, string>> = {
  // Room titles
  'Deluxe Double Room': {
    en: 'Deluxe Double Room',
    vi: 'Phòng Deluxe Giường Đôi',
    ko: '디럭스 더블룸',
    zh: '豪华双人间'
  },
  'Apartment with Balcony': {
    en: 'Apartment with Balcony',
    vi: 'Căn Hộ Có Ban Công',
    ko: '발코니 아파트',
    zh: '带阳台的公寓'
  },
  'Studio with Balcony': {
    en: 'Studio with Balcony',
    vi: 'Căn Hộ Studio Có Ban Công',
    ko: '발코니 스튜디오',
    zh: '带阳台的单身公寓'
  },

  // Room subtitles / beds text
  '1 adult + 1 child': {
    en: '1 adult + 1 child',
    vi: '1 người lớn + 1 trẻ em',
    ko: '성인 1명 + 아동 1명',
    zh: '1 名成人 + 1 名儿童'
  },
  '1 extra-large double bed and 1 sofa bed': {
    en: '1 extra-large double bed and 1 sofa bed',
    vi: '1 giường đôi lớn và 1 giường sofa',
    ko: '킹사이즈 더블 침대 1개 및 소파 베드 1개',
    zh: '1 张特大号双人床和 1 张沙发床'
  },
  'Entire apartment': {
    en: 'Entire apartment',
    vi: 'Nguyên căn hộ',
    ko: '아파트 전체',
    zh: '整套公寓'
  },
  'Entire studio': {
    en: 'Entire studio',
    vi: 'Nguyên căn studio',
    ko: '스튜디오 전체',
    zh: '整套单身公寓'
  },
  'Bedroom 1: 1 extra-large double bed | Living room: 1 sofa bed': {
    en: 'Bedroom 1: 1 extra-large double bed | Living room: 1 sofa bed',
    vi: 'Phòng ngủ 1: 1 giường đôi lớn | Phòng khách: 1 giường sofa',
    ko: '침실 1: 킹사이즈 더블 침대 1개 | 거실: 소파 베드 1개',
    zh: '卧室 1：1 张特大号双人床 | 客厅：1 张沙发床'
  },
  '1 extra-large double bed': {
    en: '1 extra-large double bed',
    vi: '1 giường đôi lớn',
    ko: '킹사이즈 더블 침대 1개',
    zh: '1 张特大号双人床'
  },

  // Features & Amenities list
  'Private kitchen': { en: 'Private kitchen', vi: 'Bếp riêng', ko: '전용 주방', zh: '独立厨房' },
  'Private bathroom': { en: 'Private bathroom', vi: 'Phòng tắm riêng', ko: '전용 욕실', zh: '独立卫浴' },
  'Ensuite bathroom': { en: 'Ensuite bathroom', vi: 'Phòng tắm trong phòng', ko: '객실 내 욕실', zh: '套房浴室' },
  'View': { en: 'View', vi: 'Tầm nhìn', ko: '전망', zh: '景观' },
  'Air conditioning': { en: 'Air conditioning', vi: 'Điều hòa', ko: '에어컨', zh: '空调' },
  'Flat-screen TV': { en: 'Flat-screen TV', vi: 'TV màn hình phẳng', ko: '평면 TV', zh: '平板电视' },
  'Free WiFi': { en: 'Free WiFi', vi: 'WiFi miễn phí', ko: '무료 와이파이', zh: '免费 WiFi' },
  'Balcony': { en: 'Balcony', vi: 'Ban công', ko: '발코니', zh: '阳台' },
  'Terrace': { en: 'Terrace', vi: 'Sân hiên', ko: '테라스', zh: '露台' },

  // Kitchen elements
  'Refrigerator': { en: 'Refrigerator', vi: 'Tủ lạnh', ko: '냉장고', zh: '冰箱' },
  'Kitchenware': { en: 'Kitchenware', vi: 'Dụng cụ bếp', ko: '주방 기구', zh: '厨具' },
  'Outdoor furniture': { en: 'Outdoor furniture', vi: 'Bàn ghế ngoài trời', ko: '야외 가구', zh: '户外家具' },
  'Toaster': { en: 'Toaster', vi: 'Lò nướng bánh mì', ko: '토스터', zh: '烤面包机' },
  'Microwave': { en: 'Microwave', vi: 'Lò vi sóng', ko: '전자레인지', zh: '微波炉' },
  'Minibar': { en: 'Minibar', vi: 'Quầy bar mini', ko: '미니바', zh: '迷你吧' },
  'Oven': { en: 'Oven', vi: 'Lò nướng', ko: '오븐', zh: '烤箱' },
  'Dining table': { en: 'Dining table', vi: 'Bàn ăn', ko: '식탁', zh: '餐桌' },
  'Stovetop': { en: 'Stovetop', vi: 'Bếp nấu', ko: '스토브톱', zh: '炉灶' },

  // Bathroom elements
  'Bath': { en: 'Bath', vi: 'Bồn tắm', ko: '욕조', zh: '浴缸' },
  'Free toiletries': { en: 'Free toiletries', vi: 'Đồ vệ sinh cá nhân miễn phí', ko: '무료 세면도구', zh: '免费洗漱用品' },
  'Shower': { en: 'Shower', vi: 'Vòi hoa sen', ko: '샤워기', zh: '淋浴' },
  'Sauna': { en: 'Sauna', vi: 'Phòng xông hơi', ko: '사우나', zh: '桑拿' },
  'Toilet': { en: 'Toilet', vi: 'Bồn cầu', ko: '변기', zh: '马桶' },
  'Slippers': { en: 'Slippers', vi: 'Dép đi trong phòng', ko: '슬리퍼', zh: '拖鞋' },
  'Hairdryer': { en: 'Hairdryer', vi: 'Máy sấy tóc', ko: '헤어드라이어', zh: '吹风机' },
  'Additional toilet': { en: 'Additional toilet', vi: 'Nhà vệ sinh phụ', ko: '추가 화장실', zh: '附加卫生间' },
  'Toilet paper': { en: 'Toilet paper', vi: 'Giấy vệ sinh', ko: '화장지', zh: '卫生纸' },

  // Views & Facilities
  'City view': { en: 'City view', vi: 'Tầm nhìn thành phố', ko: '도시 전망', zh: '市景' },
  'Desk': { en: 'Desk', vi: 'Bàn làm việc', ko: '책상', zh: '书桌' },
  'Hardwood floors': { en: 'Hardwood floors', vi: 'Sàn gỗ cứng', ko: '원목 바닥', zh: '木地板' },
  'Seating area': { en: 'Seating area', vi: 'Khu vực ghế ngồi', ko: '휴식 공간', zh: '休息区' }
};

export function getTranslation(key: string, locale: Locale): string {
  // 1. Check in core translations first
  if (translations[key] && translations[key][locale] !== undefined) {
    return translations[key][locale];
  }
  // 2. Check in key vocabulary map (for dynamic elements like features and amenities)
  if (keyMap[key] && keyMap[key][locale] !== undefined) {
    return keyMap[key][locale];
  }
  // 3. Fallback to key itself (acts as English default)
  return key;
}

export interface FormattedPrice {
  primary: string;
  secondary: string;
}

export function getFormattedPrice(usdPriceStr: string, vndPriceStr: string, locale: Locale): FormattedPrice {
  const usdPrice = Number(usdPriceStr);
  
  switch (locale) {
    case 'vi':
      return {
        primary: `VND ${vndPriceStr}`,
        secondary: `khoảng $${usdPriceStr}`
      };
      
    case 'en':
      return {
        primary: `$${usdPriceStr}`,
        secondary: `approx. ${vndPriceStr} VND`
      };
      
    case 'ko': {
      // 1 USD = 1,380 KRW, round to nearest 1,000 Won for clean display
      const krwPrice = Math.round((usdPrice * 1380) / 1000) * 1000;
      return {
        primary: `₩ ${krwPrice.toLocaleString('en-US')}`,
        secondary: `약 $${usdPriceStr} (approx. ${vndPriceStr} VND)`
      };
    }
      
    case 'zh': {
      // 1 USD = 7.25 CNY, round to integer
      const cnyPrice = Math.round(usdPrice * 7.25);
      return {
        primary: `¥ ${cnyPrice.toLocaleString('en-US')}`,
        secondary: `约 $${usdPriceStr} (approx. ${vndPriceStr} VND)`
      };
    }
      
    default:
      return {
        primary: `$${usdPriceStr}`,
        secondary: `approx. ${vndPriceStr} VND`
      };
  }
}

