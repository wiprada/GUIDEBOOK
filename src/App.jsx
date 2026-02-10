import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Info, Phone, Home, User, ExternalLink, ChevronRight, Award, Flower2, Utensils, Coffee, Palmtree, BarChart3, FileText, LayoutGrid, Car, MonitorPlay, Hotel, Cross, Loader2, ArrowLeft, Youtube, Star, Filter, Video } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [exploreFilter, setExploreFilter] = useState(null);
  const [subpageData, setSubpageData] = useState([]);
  const [subpageLoading, setSubpageLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [openAgendaIndices, setOpenAgendaIndices] = useState([]); // Changed to array
  const [isRundownOpen, setIsRundownOpen] = useState(false);
  const [isParkingOpen, setIsParkingOpen] = useState(false);
  const [isPresensiOpen, setIsPresensiOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false);
  const [isKontakOpen, setIsKontakOpen] = useState(false);
  const [isInfoUmumOpen, setIsInfoUmumOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Quick navigation helper
  const navigateTo = (tab, openFn, sectionId) => {
    setActiveTab(tab);
    setTimeout(() => {
      if (openFn) openFn(true);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 70;
          const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }, 100);
  };

  const toggleAgenda = (index) => {
    setOpenAgendaIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const SPREADSHEET_ID = '2PACX-1vTWG133GYpDvdJOH_j4qM8HnhKQOdwzNivd1q-QrUzLfaxlG07JPKa1_YapTpqd_E26A9TMK4hRbYD9';
  const BPK_COORDS = { lat: -8.6725, lng: 115.2323 };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Removed distance calculation feature by request
    return null; 
  };

  const categories = [
    { id: 'hotel', label: 'Hotel', icon: Hotel, gid: '330243896', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'kuliner', label: 'Kuliner', icon: Utensils, gid: '1093702390', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'wisata', label: 'Wisata', icon: Palmtree, gid: '1544863673', color: 'bg-green-50 text-green-700 border-green-200' },
    { id: 'transportasi', label: 'Transportasi', icon: Car, gid: '5347229', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'faskes', label: 'Faskes', icon: Cross, gid: '254214115', color: 'bg-red-50 text-red-700 border-red-200' },
  ].filter(cat => cat.gid !== '0');

  const parseCSV = (csv) => {
    const lines = csv.split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') { inQuotes = !inQuotes; }
        else if (line[i] === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
        else { current += line[i]; }
      }
      values.push(current.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowSplash(false), 500); 
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const openSubpage = async (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return;
    setExploreFilter(categoryId);
    setSubpageLoading(true);
    setSubpageData([]);
    setFilters({}); // Reset filters
    try {
      const url = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub?gid=${cat.gid}&single=true&output=csv`;
      const res = await fetch(url);
      const csv = await res.text();
      setSubpageData(parseCSV(csv));
    } catch (e) {
      console.error(`Error fetching ${categoryId}:`, e);
      setSubpageData([]);
    }
    setSubpageLoading(false);
  };

  const InstagramIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );

  const FooterSection = () => (
    <div className="mt-8 mb-2 space-y-2">
      <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-gray-500">
        {/* BPK RI */}
        <div className="flex items-center gap-2">
          <a href="https://www.bpk.go.id" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline font-medium">bpk.go.id</a>
          <div className="flex items-center gap-1">
            <a href="https://www.instagram.com/bpkriofficial" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@BPKRIOfficial" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <span className="text-gray-300">|</span>

        {/* BPK Bali */}
        <div className="flex items-center gap-2">
          <a href="https://www.bali.bpk.go.id" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline font-medium">bali.bpk.go.id</a>
          <div className="flex items-center gap-1">
            <a href="https://www.instagram.com/bpkribali" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@bpkperwakilanprovinsibali" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">&copy; 2026 - Data Analytics Center BPK BALI</p>
    </div>
  );

  // --- DATA SECTIONS ---

  const agenda = [
    { 
      time: '11.00 - 12.30 WITA', 
      title: 'Penyambutan Tamu dan Makan Siang',
      location: 'Lobby',
      description: 'a. Pengalungan bunga untuk Anggota VI BPK, Dirjen PKN VI BPK, Wamendagri, dan Gubernur (diwakili oleh Gubernur Bali dan Gubernur Kalimantan Timur)\nb. Makan siang dan ramah tamah Anggota VI BPK, Dirjen PKN VI BPK, Wamendagri, Gubernur, Tenaga Ahli BPK, Direktur di lingkungan DJPKN VI, Kalan Bali, Kalan Kaltim, Kalan Papua, dan Kalan Sulawesi....\nc. Makan siang dan ramah tamah seluruh Kalan, Sekda, dan Inspektur\nd. Makan siang dan ramah tamah para peserta'
    },
    { 
      time: '12.30 - 13.00 WITA', 
      title: 'Shalat',
      location: 'Masjid Baitul Hasib BPK Perwakilan Bali',
      description: ''
    },
    { 
      time: '13.00 - 13.30 WITA', 
      title: 'Foto Bersama',
      location: 'Lapangan Depan Kantor BPK Perwakilan Bali',
      description: 'a. Dipandu MC pembagian udeng atau selendang untuk para peserta\nb. Sesi foto Anggota VI BPK, Dirjen PKN VI BPK, Wamendagri, Gubernur Bali, Gubernur Kalimantan Timur, Tenaga Ahli BPK, para Sekda dan para Inspektur\nc. Para Sekda dan Inspektur masuk ke ruangan Auditorium Bima\nd. Sesi foto Anggota BPK, Dirjen PKN VI, Wamendagri, para Gubernur, dan para Kalan\ne. Peserta lainnya menuju Auditorium Bima'
    },
    { 
      time: '13.45 - 13.55 WITA', 
      title: 'Tarian Pembukaan',
      location: 'Auditorium Bima',
      description: 'Suguhan Tari Selat Segara persembahan dari Institut Seni Indonesia Bali'
    },
    { 
      time: '13.55 - 14.05 WITA', 
      title: 'Pembukaan oleh MC',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '14.05 - 14.10 WITA', 
      title: 'Lagu Kebangsaan Indonesia Raya',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '14.10 - 14.15 WITA', 
      title: 'Pembacaan Doa',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '14.15 - 14.25 WITA', 
      title: 'Penayangan Video Kaleidoskop Kegiatan BPK dengan Pemerintah',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '14.25 - 14.55 WITA', 
      title: 'Sambutan Anggota VI BPK',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '14.55 - 15.10 WITA', 
      title: 'Sambutan Gubernur Kalimantan Timur sebagai Ketua APPSI mewakili para Kepala Daerah di lingkungan DJPKN VI',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '15.10 - 15.30 WITA', 
      title: 'Sambutan Wakil Menteri Dalam Negeri, Ibu Ribka Haluk',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '15.30 - 16.00 WITA', 
      title: 'Dialog Anggota VI BPK dan Wamendagri dengan para Gubernur',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '16.00 - 16.30 WITA', 
      title: 'Penyerahan Surat Tugas Pemeriksaan secara simbolis',
      location: 'Auditorium Bima',
      description: 'a. Secara simbolis Kalimantan Timur mewakili seluruh provinsi\nb. Secara simbolis Bali sebagai tuan rumah'
    },
    { 
      time: '16.15 - 16.20 WITA', 
      title: 'Penutup',
      location: 'Auditorium Bima',
      description: ''
    },
    { 
      time: '16.20 - 17.20 WITA', 
      title: 'Pembubaran Acara',
      location: 'Lobby',
      description: 'Dengan pengaturan urutan sebagai berikut:\na. Gubernur Bali\nb. Anggota VI BPK dan Dirjen PKN VI BPK didampingi Direktur di Lingkungan DJPKN VI\nc. Para Gubernur Wilayah Kalimantan\nd. Para Gubernur Wilayah Maluku\ne. Para Gubernur Wilayah Nusa Tenggara\nf. Para Gubernur Wilayah Sulawesi\ng. Para Gubernur Wilayah Papua'
    }
  ];

  const exploreData = [];

  const openMap = (query) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');

  function FileTextIcon({size, className}) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    )
  }

  const BungaJepunCorner = ({ className, rotate = 0 }) => (
    <div className={`absolute w-32 h-32 pointer-events-none z-0 opacity-20 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 100 100" fill="none" className="text-yellow-700">
        <g fill="currentColor" opacity="0.8">
           {/* Bunga Jepun (Frangipani) / Kamboja - 5 Petals */}
           {[0, 72, 144, 216, 288].map((angle, i) => (
             <path key={i} transform={`rotate(${angle} 50 50)`} 
               d="M50,50 C55,40 70,25 70,10 C70,0 55,-5 45,5 C40,15 45,40 50,50" 
             />
           ))}
           <circle cx="50" cy="50" r="4" fill="#FEF08A" opacity="0.8"/>
        </g>
      </svg>
    </div>
  );

  const PatraPunggel = ({ className }) => (
    <div className={`absolute w-32 h-32 pointer-events-none z-0 opacity-10 ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" className="text-yellow-700">
        <g fill="currentColor">
          <path d="M180,20 C180,60 160,90 130,110 C150,95 158,72 155,48 C148,72 135,92 115,105 C132,88 142,68 138,45 C130,68 118,85 100,98 C115,82 122,62 118,42 C112,62 100,78 85,88 C98,75 105,58 100,40" />
          <path d="M85,88 C75,96 62,100 48,98 C58,92 65,84 68,74 C58,82 50,86 40,86 C50,80 55,72 56,62 C52,70 46,76 38,78 C44,72 48,64 49,54 C46,60 42,66 36,68 C40,62 43,54 44,45" />
          <path d="M155,48 C158,35 155,22 148,14 C152,25 150,36 144,44 C146,32 143,22 136,16 C140,25 138,36 132,42" />
          <ellipse cx="175" cy="25" rx="8" ry="12" transform="rotate(20 175 25)" />
          <ellipse cx="45" cy="95" rx="5" ry="8" transform="rotate(-30 45 95)" />
          <circle cx="34" cy="72" r="4" />
          <circle cx="150" cy="12" r="3" />
        </g>
        <g stroke="currentColor" strokeWidth="1" opacity="0.5">
          <path d="M175,25 Q145,80 90,100" fill="none" />
          <path d="M170,30 Q140,85 85,95" fill="none" />
        </g>
      </svg>
    </div>
  );

  const EndekPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none z-0" 
         style={{
           backgroundImage: `radial-gradient(#ca8a04 1px, transparent 1px)`,
           backgroundSize: '16px 16px'
         }}>
    </div>
  );

  const filterTypes = categories;

  const activeCat = categories.find(c => c.id === exploreFilter);

  // Helper to extract unique values for filters
  const getUniqueValues = (keyVariants) => {
    const values = new Set();
    subpageData.forEach(item => {
      for (const key of keyVariants) {
        if (item[key]) {
          values.add(item[key]);
          break; // Found the key for this item
        }
      }
    });
    return Array.from(values).sort();
  };

  const filteredData = subpageData.filter(item => {
    // Hotel Filters
    if (exploreFilter === 'hotel') {
      // Area Filter
      if (filters.area) {
        const itemArea = item['Area'] || item['Wilayah'];
        if (itemArea !== filters.area) return false;
      }
      // Star Filter
      if (filters.star) {
        const itemStar = item['Star'] || item['Bintang'];
        if (String(itemStar) !== filters.star) return false;
      }
    }
    // Wisata Filters
    if (exploreFilter === 'wisata') {
      // Category Filter
      if (filters.category) {
        const itemCat = item['Category'] || item['Jenis Wisata'] || item['Kategori'];
        if (itemCat !== filters.category) return false;
      }
    }
    // Kuliner Filters
    if (exploreFilter === 'kuliner') {
      // Category Filter
      if (filters.category) {
        const itemCat = item['Category'] || item['Jenis Makanan'] || item['Kategori'];
        if (itemCat !== filters.category) return false;
      }
      // NonHalal Filter
      if (filters.nonHalal && filters.nonHalal !== 'all') {
        const isNonHalal = (item['Contain NonHalal Food'] || '').toLowerCase() === 'true';
        if (filters.nonHalal === 'halal' && isNonHalal) return false;
        if (filters.nonHalal === 'nonhalal' && !isNonHalal) return false;
      }
    }
    return true;
  });

  const getValue = (obj, possibleKeys) => {
    const objKeys = Object.keys(obj);
    for (const key of possibleKeys) {
        if (obj[key] !== undefined && obj[key] !== '') return obj[key];
        const found = objKeys.find(k => k.toLowerCase() === key.toLowerCase());
        if (found && obj[found] !== undefined && obj[found] !== '') return obj[found];
    }
    return '';
  };

  const processedData = filteredData.map(item => {
    // Distance logic removed
    let distanceVal = null;
    let distanceLabel = null;
    return { ...item, _dist: null, _distLabel: null };
  });

  const sortedData = [...processedData]; // Removed sorting by distance

  // Splash Screen
  if (loading || showSplash) {
    return (
      <div className={`fixed inset-0 z-[60] bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Couple Bali.jpeg" 
            alt="Couple BPK Bali" 
            className="w-full h-full object-cover object-bottom"
          />
          {/* Subtle gradient overlay top/bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
        </div>

        <div className="text-center relative z-10 w-full px-6 flex flex-col items-center h-full py-8 justify-between">
           {/* Logo & Agency Name Section - Top Center */}
           <div className="flex flex-col items-center mt-1 animate-slide-down">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img src="/BPK.png" alt="Logo BPK" className="relative w-24 h-24 rounded-full object-contain shadow-2xl border-2 border-yellow-500/80 bg-white/95 p-1" />
              </div>
              <p className="text-yellow-50 text-[10px] tracking-[0.2em] uppercase font-bold drop-shadow-xl bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                Badan Pemeriksa Keuangan
              </p>
           </div>

           {/* Greetings Section - Floating Middle */}
           <div className="mb-20 w-full animate-slide-up">
             <div className="p-6 border-t border-b border-white/10 shadow-2xl bg-black/50 flex flex-col items-center">
                <h1 className="text-xl font-serif text-white tracking-widest mb-2 drop-shadow-lg font-medium text-center">Om Swastiastu</h1>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-3"></div>
                
                <p className="text-xl font-serif text-white tracking-wide mb-2 drop-shadow-md opacity-95 text-center leading-relaxed">Assalamualaikum Warahmatullahi Wabarakatuh</p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-3"></div>
                
                <p className="text-xl font-serif text-white tracking-wide drop-shadow-md opacity-95 text-center">Shalom</p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-3"></div>
                
                <p className="text-xl font-serif text-white tracking-wide drop-shadow-md opacity-95 text-center">Namo Buddhaya</p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-3"></div>
                
                <p className="text-xl font-serif text-white tracking-wide drop-shadow-md opacity-95 text-center">Rahayu</p>
             </div>
           </div>
        </div>
      </div>
    );
  }

  // Main App Content
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-20">
      {/* Header */}
      <header className="bg-gray-700 p-4 sticky top-0 z-50 border-b border-yellow-600/30 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
             <img src="/BPK.png" alt="Logo BPK" className="w-16 h-16 rounded-full object-contain flex-shrink-0" />
             <div className="min-w-0">
               <h1 className="font-semibold text-sm text-yellow-400">Event Guidebook</h1>
               <p className="text-xs leading-tight text-gray-300 mt-0.5">
                 Entry Meeting Pemeriksaan LKPD Tahun 2025<br />
                 di Lingkungan DJPKN VI BPK
               </p>
             </div>
          </div>
          <img src="/SINER6I.png" alt="Logo Sinergi" className="h-14 object-contain flex-shrink-0 ml-1" />
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="relative bg-white rounded-2xl p-6 overflow-hidden border border-yellow-600/20 shadow-md">
              <EndekPattern />
              <BungaJepunCorner className="top-0 right-0" rotate={90} /> 
              <div className="relative z-10">
                <h2 className="text-yellow-700 font-serif font-bold text-lg mb-2">Om Swastiastu</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Selamat datang di Entry Meeting Pemeriksaan LKPD Tahun 2025 di lingkungan Direktorat Jenderal Pemeriksaan Keuangan Negara VI.<br />Astungkara pertemuan ini berjalan lancar dan memberikan hasil yang bermartabat dan bermanfaat.
                </p>
                <p className="text-gray-600 text-sm font-medium">Rahayu</p>
              </div>
            </div>

            {/* Aesthetic Image Section Removed */}

            {/* Tautan Cepat */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Tautan Cepat</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => navigateTo('acara', setIsPresensiOpen, 'section-presensi')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Presensi</span>
                </button>
                <button
                  onClick={() => navigateTo('acara', setIsVenueOpen, 'section-venue')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-yellow-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Denah Lokasi Acara</span>
                </button>
                <button
                  onClick={() => navigateTo('acara', setIsRundownOpen, 'section-rundown')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4.5 h-4.5 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Rundown Acara</span>
                </button>
                <button
                  onClick={() => navigateTo('acara', setIsParkingOpen, 'section-parking')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="w-4.5 h-4.5 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Denah Parkir</span>
                </button>
                <button
                  onClick={() => navigateTo('acara', setIsZoomOpen, 'section-zoom')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-4.5 h-4.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Link Zoom</span>
                </button>
                <button
                  onClick={() => navigateTo('info', setIsKontakOpen, 'section-kontak')}
                  className="flex items-center gap-2.5 bg-white rounded-xl p-3.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Narahubung</span>
                </button>
              </div>
            </div>

            {/* Lokasi Removed from Home */}
            
            <FooterSection />
          </div>
        )}

        {activeTab === 'acara' && (
          <div className="space-y-6">
             {/* Collapsible Venue Section */}
            <div id="section-venue" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsVenueOpen(!isVenueOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <MapPin className="w-5 h-5 text-yellow-700" />
                        Venue & Denah Lokasi Acara
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isVenueOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isVenueOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <img src="/Gedung%20BPK%20Bali.png" alt="Gedung BPK Perwakilan Provinsi Bali" className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-yellow-700" />
                          BPK Perwakilan Provinsi Bali
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-yellow-700" />
                          12 Februari 2026
                        </p>
                      </div>
                      <button
                        onClick={() => openMap('BPK Perwakilan Provinsi Bali')}
                        className="w-9 h-9 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                        title="Buka di Google Maps"
                      >
                        <ExternalLink className="w-4 h-4 text-yellow-700" />
                      </button>
                    </div>

                    {/* Denah Situasi PDF */}
                    <a 
                      href="/Denah%20Situasi%20Gedung%20BPK%20Bali.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Lihat/Unduh Denah Lokasi Acara (.pdf)
                    </a>
                  </div>
                </div>
            </div>

            {/* Informasi Umum Kegiatan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsInfoUmumOpen(!isInfoUmumOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <Info className="w-5 h-5 text-yellow-700" />
                        Informasi Umum Kegiatan Entry Meeting
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isInfoUmumOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isInfoUmumOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="p-4 pt-0">
                        <a 
                            href="/Informasi%20Umum%20Entry%20Meeting%20LKPD%202025%20DJPKN%20VI%20per%2010%20Feb%20pk%2020.20.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-gray-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Lihat/Unduh Informasi Umum (PDF)
                        </a>
                    </div>
                </div>
            </div>

            {/* Link Presensi */}
            <div id="section-presensi" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsPresensiOpen(!isPresensiOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <FileText className="w-5 h-5 text-green-600" />
                        Link Presensi
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isPresensiOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isPresensiOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                        Silakan isi daftar hadir berikut untuk kehadiran Anda.
                    </p>
                    <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-200">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://forms.office.com/r/Zy6Q0JZyeH?embed=true" 
                            frameBorder="0" 
                            marginWidth="0" 
                            marginHeight="0" 
                            style={{ border: 'none', maxWidth: '100%', maxHeight: '100vh' }} 
                            allowFullScreen 
                            webkitallowfullscreen 
                            mozallowfullscreen 
                            msallowfullscreen
                            title="Form Presensi"
                        />
                    </div>
                    <a
                      href="https://forms.office.com/r/Zy6Q0JZyeH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-green-200 hover:bg-green-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka Form di Browser
                    </a>
                  </div>
                </div>
            </div>

            {/* Link Zoom Meeting */}
            <div id="section-zoom" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsZoomOpen(!isZoomOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <Video className="w-5 h-5 text-blue-600" />
                        Link Zoom Meeting
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isZoomOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isZoomOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="p-4 pt-0">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 space-y-2 mb-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Meeting ID:</span>
                                <span className="font-mono font-medium text-gray-800">948 3645 2132</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Passcode:</span>
                                <span className="font-mono font-medium text-gray-800">164904</span>
                            </div>
                        </div>
                        <a 
                            href="https://zoom.us/j/94836452132?pwd=164904" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                            <Video className="w-4 h-4" />
                            Join Zoom Meeting
                        </a>
                    </div>
                </div>
            </div>

            {/* Collapsible Rundown Section */}
            <div id="section-rundown" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <button 
                onClick={() => setIsRundownOpen(!isRundownOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                 <div className="flex flex-col items-start">
                    <span className="flex items-center gap-2 font-semibold text-lg">
                      <Calendar className="w-5 h-5 text-yellow-700" />
                      Rundown dan Materi Kegiatan
                    </span>
                    <span className="text-xs text-gray-400 ml-7">Klik untuk melihat detil acara dan lokasi.</span>
                 </div>
                 <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isRundownOpen ? 'rotate-90' : ''}`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${isRundownOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-4 pt-0 space-y-2">
                  {agenda.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleAgenda(index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col gap-1 items-start">
                          <span className="text-yellow-700 text-xs font-mono font-bold">{item.time}</span>
                          <span className="font-medium text-sm text-gray-800 text-left">{item.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openAgendaIndices.includes(index) ? 'rotate-90' : ''}`} />
                      </button>
                      <div className={`transition-all duration-300 ease-in-out ${openAgendaIndices.includes(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 pt-0 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
                          {/* Title Removed */}
                          <div className="space-y-3 text-xs">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-yellow-700 flex-shrink-0" />
                              {item.location}
                            </p>
                            {item.description && (
                              <div className="flex items-start gap-2">
                                <Info className="w-3 h-3 text-yellow-700 mt-0.5 flex-shrink-0" />
                                <div className="whitespace-pre-line leading-relaxed">{item.description}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collapsible Parking Plan Section */}
            <div id="section-parking" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsParkingOpen(!isParkingOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <Car className="w-5 h-5 text-gray-700" />
                        Denah Parkir
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isParkingOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isParkingOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="p-4 pt-0">
                        {/* Area Parkir Legend */}
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Area Parkir</p>
                          <div className="space-y-1.5">
                            {[
                              { area: 'BPK Perwakilan Provinsi Bali', color: '#000000', link: 'https://maps.app.goo.gl/iy5ye8hZBGtW58w49' },
                              { area: 'Inspektorat Provinsi Bali', color: '#b4b6cd', link: 'https://maps.app.goo.gl/qAXBtsYeMgnnH4ZPA' },
                              { area: 'Satpol PP Provinsi Bali', color: '#d23035', link: 'https://maps.app.goo.gl/D6JaWffBYuYnXWJZ8' },
                              { area: 'Diskominfos Provinsi Bali', color: '#d0b300', link: 'https://maps.app.goo.gl/zfsYJWpDJMPZ8jzp8' },
                              { area: 'DPMD Dukcapil Provinsi Bali', color: '#f27ac4', link: 'https://maps.app.goo.gl/epqNbqYs4xGWyMuU9' },
                              { area: 'DPRD Provinsi Bali', color: '#02a2de', link: 'https://maps.app.goo.gl/wtvEFhjaoHvzu17x5' },
                              { area: 'Gedung Wanita Nari Graha', color: '#52a412', link: 'https://maps.app.goo.gl/vTq2RHMJ9TBhiDDG6' },
                              { area: 'Area Parkir Timur Lapangan Renon', color: null, link: 'https://maps.app.goo.gl/5UEUnzT7v84w7dEz6' },
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2.5">
                                  {item.color ? (
                                    <span className="w-4 h-4 rounded-sm border border-gray-300 flex-shrink-0" style={{ backgroundColor: item.color }} />
                                  ) : (
                                    <span className="w-4 h-4 rounded-sm border border-dashed border-gray-400 flex-shrink-0 bg-white" />
                                  )}
                                  <span className="text-sm text-gray-800">{item.area}</span>
                                </div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-full flex items-center justify-center transition-colors">
                                  <MapPin className="w-3.5 h-3.5 text-yellow-700" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        <a 
                            href="/Denah Parkir.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-gray-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Lihat/Unduh Denah Parkir (.pdf)
                        </a>
                    </div>
                </div>
            </div>

            <FooterSection />
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-4">
            {!exploreFilter ? (
              /* Category Grid */
              <>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-700" />
                  Jelajah Sekitar
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => openSubpage(cat.id)}
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border shadow-sm transition-all active:scale-95 ${cat.color}`}
                    >
                      <cat.icon className="w-8 h-8" />
                      <span className="font-medium text-sm">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Subpage */
              <>
                <button
                  onClick={() => { setExploreFilter(null); setSubpageData([]); }}
                  className="flex items-center gap-2 text-yellow-700 font-medium text-sm mb-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {activeCat && <activeCat.icon className="w-5 h-5 text-yellow-700" />}
                  {activeCat?.label}
                </h3>

                {/* Filter Section */}
                {!subpageLoading && subpageData.length > 0 && (
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-4">
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                         <Filter className="w-4 h-4" />
                         Filter
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {exploreFilter === 'hotel' && (
                        <>
                          <select 
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                            value={filters.area || ''}
                            onChange={(e) => setFilters({...filters, area: e.target.value})}
                          >
                            <option value="">Semua Area</option>
                            {getUniqueValues(['Area', 'Wilayah']).map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                          <select 
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                            value={filters.star || ''}
                            onChange={(e) => setFilters({...filters, star: e.target.value})}
                          >
                            <option value="">Semua Bintang</option>
                            {getUniqueValues(['Star', 'Bintang']).map(val => (
                              <option key={val} value={val}>{val} Bintang</option>
                            ))}
                          </select>
                        </>
                      )}

                      {exploreFilter === 'wisata' && (
                         <select 
                            className="col-span-2 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                            value={filters.category || ''}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                          >
                            <option value="">Semua Kategori</option>
                            {getUniqueValues(['Category', 'Jenis Wisata', 'Kategori']).map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                      )}

                      {exploreFilter === 'kuliner' && (
                        <>
                         <select 
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                            value={filters.category || ''}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                          >
                            <option value="">Semua Kategori</option>
                            {getUniqueValues(['Category', 'Jenis Makanan', 'Kategori']).map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                          <select 
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                            value={filters.nonHalal || 'all'}
                            onChange={(e) => setFilters({...filters, nonHalal: e.target.value})}
                          >
                            <option value="all">Semua Tipe</option>
                            <option value="halal">Halal</option>
                            <option value="nonhalal">Non-Halal</option>
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {subpageLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <p className="text-sm">Memuat data...</p>
                    </div>
                  ) : sortedData.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-sm">Belum ada data.</p>
                    </div>
                  ) : (
                    sortedData.map((item, index) => {
                      const name = item['Name'] || item['Nama'] || '';
                      const location = item['Location'] || item['Lokasi'] || '';
                      const area = item['Area'] || item['Wilayah'] || '';
                      const category = item['Category'] || item['Jenis Makanan'] || item['Jenis Hiburan'] || item['Kelas'] || '';
                      const contact = item['Contact Person'] || item['Kontak Person'] || '';
                      const phone = item['Phone'] || item['No HP'] || item['Nomor HP'] || '';
                      const imageLink = item['Image Link'] || item['Image'] || item['Gambar'] || item['Foto'] || '';
                      
                      // Specific Attributes
                      const starRating = parseInt(item['Star'] || item['Bintang'] || '0');
                      const isNonHalal = (item['Contain NonHalal Food'] || '').toLowerCase() === 'true';

                      // Distance pre-calculated
                      const distance = item._distLabel;

                      return (
                        <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col relative">
                          {isNonHalal && (
                            <div className="absolute top-0 right-0 z-20">
                              <div className="bg-pink-600 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold shadow-sm flex items-center gap-1">
                                <Utensils className="w-3 h-3 fill-white" />
                                NON HALAL
                              </div>
                            </div>
                          )}
                          {imageLink && (
                            <div className="w-full h-32 overflow-hidden bg-gray-100">
                               <img 
                                src={imageLink} 
                                alt={name} 
                                className="w-full h-full object-cover transition-transform hover:scale-105" 
                                onError={(e) => {
                                  e.target.style.display = 'none'; // Hide if broken
                                  e.target.parentElement.style.display = 'none';
                                }}
                               />
                            </div>
                          )}
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-800">{name}</p>
                                {exploreFilter === 'hotel' && starRating > 0 && (
                                  <div className="flex items-center gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-3 h-3 ${i < starRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                )}
                                {(category || area) && (
                                  <div className="flex flex-wrap gap-1 mt-1.5">
                                    {category && (
                                      <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">{category}</span>
                                    )}
                                    {area && (
                                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{area}</span>
                                    )}
                                  </div>
                                )}
                                {contact && (
                                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {contact}{phone ? ` · ${phone}` : ''}
                                    {phone && (
                                      <a href={`https://wa.me/62${phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="ml-1 w-5 h-5 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                      </a>
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-4 pt-0 mt-auto">
                            <button
                              onClick={() => openMap(location || name)}
                              className="flex-1 bg-yellow-50 text-yellow-700 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border border-yellow-200"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              Maps
                            </button>
                            {phone && (
                              <a
                                href={`tel:${phone}`}
                                className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border border-gray-200"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                Hubungi
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
            <FooterSection />
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-yellow-700" />
              Informasi
            </h3>
            <div id="section-kontak" className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <button
                onClick={() => setIsKontakOpen(!isKontakOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold text-lg">
                  <Phone className="w-5 h-5 text-yellow-700" />
                  Kontak
                </span>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isKontakOpen ? 'rotate-90' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${isKontakOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-4 pt-0 space-y-3">
                {/* Administrasi Perjalanan Dinas */}
                <div>
                  <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide mb-1.5">Administrasi Perjalanan Dinas</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Tri Setyaningsih</p>
                        <p className="text-xs text-gray-500">081380754887</p>
                      </div>
                      <a href="https://wa.me/6281380754887" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </a>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Ni Made Wartini</p>
                        <p className="text-xs text-gray-500">082196940696</p>
                      </div>
                      <a href="https://wa.me/6282196940696" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Informasi Parkir */}
                <div>
                  <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide mb-1.5">Informasi Parkir</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Ida Bagus Ketut Wisnu</p>
                        <p className="text-xs text-gray-500">08123807445</p>
                      </div>
                      <a href="https://wa.me/628123807445" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </a>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Andika Putra Sembiring</p>
                        <p className="text-xs text-gray-500">085273572167</p>
                      </div>
                      <a href="https://wa.me/6285273572167" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <FooterSection />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600 px-4 py-2 z-50 shadow-lg">
        <div className="flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Beranda' },
            { id: 'acara', icon: Calendar, label: 'Acara' },
            { id: 'info', icon: Info, label: 'Info' },
            { id: 'explore', icon: MapPin, label: 'Jelajah' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
