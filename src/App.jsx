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
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const toggleAgenda = (index) => {
    setOpenAgendaIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const SPREADSHEET_ID = '2PACX-1vTWG133GYpDvdJOH_j4qM8HnhKQOdwzNivd1q-QrUzLfaxlG07JPKa1_YapTpqd_E26A9TMK4hRbYD9';
  const BPK_COORDS = { lat: -8.6725, lng: 115.2323 };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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
    setSortBy('default'); // Reset sort
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
      description: 'a. Pengalungan bunga untuk Anggota VI BPK, Dirjen PKN VI BPK, Wamendagri, dan Gubernur (diwakili oleh Gubernur Bali dan Gubernur Kalimantan Timur)\nb. Makan siang dan ramah tamah Anggota VI BPK, Dirjen PKN VI BPK, Wamendagri, Gubernur, Tenaga Ahli BPK, Direktur di Wilayah DJPKN VI, Kalan Bali, Kalan Kaltim, Kalan Papua, dan Kalan Sulawesi....\nc. Makan siang dan ramah tamah seluruh Kalan, Sekda, dan Inspektur\nd. Makan siang dan ramah tamah para peserta'
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

  const processedData = filteredData.map(item => {
    let distanceVal = null;
    let distanceLabel = null;
    
    // Try calculate distance
    const lat = parseFloat((item['Latitude'] || item['Lat'] || '').replace(',', '.'));
    const lng = parseFloat((item['Longitude'] || item['Long'] || item['Lng'] || '').replace(',', '.'));
    const location = item['Location'] || item['Lokasi'] || '';

    if (!isNaN(lat) && !isNaN(lng)) {
      distanceVal = calculateDistance(BPK_COORDS.lat, BPK_COORDS.lng, lat, lng);
      distanceLabel = distanceVal.toFixed(2).replace('.', ',');
    } else if (location && location.includes('google.com/maps')) {
        const match = location.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || location.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          const urlLat = parseFloat(match[1]);
          const urlLng = parseFloat(match[2]);
          distanceVal = calculateDistance(BPK_COORDS.lat, BPK_COORDS.lng, urlLat, urlLng);
          distanceLabel = distanceVal.toFixed(2).replace('.', ',');
        }
    }
    return { ...item, _dist: distanceVal, _distLabel: distanceLabel };
  });

  const sortedData = [...processedData].sort((a, b) => {
    if (sortBy === 'distance') {
      if (a._dist === null && b._dist === null) return 0;
      if (a._dist === null) return 1;
      if (b._dist === null) return -1;
      return a._dist - b._dist;
    }
    return 0;
  });

  // Splash Screen
  if (loading || showSplash) {
    return (
      <div className={`fixed inset-0 z-[60] bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <BungaJepunCorner className="top-0 left-0" rotate={0} />
          <BungaJepunCorner className="top-0 right-0" rotate={90} />
          <BungaJepunCorner className="bottom-0 right-0" rotate={180} />
          <BungaJepunCorner className="bottom-0 left-0" rotate={270} />
        </div>
        <div className="text-center space-y-6 animate-pulse-slow relative z-10">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-yellow-600 rounded-full blur-xl opacity-20 animate-spin-slow"></div>
            <img src="/BPK.png" alt="Logo BPK" className="relative w-24 h-24 rounded-full object-contain shadow-2xl border-2 border-yellow-600/30 bg-white" />
          </div>
          <div>
            <p className="text-yellow-700 text-sm tracking-widest uppercase font-semibold mb-4">Badan Pemeriksa Keuangan</p>
            <h1 className="text-xl font-serif text-gray-800 tracking-widest mb-2">Om Swastiastu</h1>
            <p className="text-gray-800 text-lg font-serif tracking-wide mb-2">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-gray-800 text-xl font-serif tracking-wide mb-3">Shalom</p>
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
                <p className="text-gray-600 text-sm leading-relaxed">
                  Selamat datang di Entry Meeting Pemeriksaan LKPD Tahun 2025. 
                  Semoga pertemuan ini berjalan lancar dan membawa hasil yang bermanfaat.
                </p>
              </div>
            </div>

            {/* Lokasi Removed from Home */}
            
            <FooterSection />
          </div>
        )}

        {activeTab === 'acara' && (
          <div className="space-y-6">
             {/* Collapsible Venue Section */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setIsVenueOpen(!isVenueOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center gap-2 font-semibold text-lg">
                        <MapPin className="w-5 h-5 text-yellow-700" />
                        Venue
                    </span>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isVenueOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isVenueOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <img src="/Gedung%20BPK%20Bali.png" alt="Gedung BPK Perwakilan Provinsi Bali" className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-700" />
                      BPK Perwakilan Provinsi Bali
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-yellow-700" />
                      12 Februari 2026
                    </p>
                    <button
                      onClick={() => openMap('BPK Perwakilan Provinsi Bali')}
                      className="mt-3 w-full bg-yellow-50 text-yellow-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-yellow-200 hover:bg-yellow-100 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di Google Maps
                    </button>
                  </div>
                </div>
            </div>

            {/* Link Zoom Meeting */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <button 
                onClick={() => setIsRundownOpen(!isRundownOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                 <span className="flex items-center gap-2 font-semibold text-lg">
                    <Calendar className="w-5 h-5 text-yellow-700" />
                    Rundown dan Materi Kegiatan
                 </span>
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
                         Filter & Urutkan
                       </div>
                       <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-2 py-1 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                        >
                           <option value="default">Default</option>
                           <option value="distance">Terdekat (Jarak)</option>
                        </select>
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
                            {distance && (
                              <span className="text-xs font-mono text-yellow-700 bg-yellow-50 px-2 py-1.5 rounded-lg border border-yellow-200 whitespace-nowrap">
                                ±{distance} km
                              </span>
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
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h4 className="font-medium mb-2">Kontak Panitia</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-700" />
                  +62 812-3456-7890
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-700" />
                  Sekretariat BPK Bali
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h4 className="font-medium mb-2">Tentang Acara</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Entry Meeting Pemeriksaan LKPD Tahun Anggaran 2025 adalah pertemuan awal 
                antara tim pemeriksa BPK dengan entitas yang diperiksa untuk menyamakan 
                persepsi dan menyepakati jadwal pemeriksaan.
              </p>
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
            { id: 'explore', icon: MapPin, label: 'Jelajah' },
            { id: 'info', icon: Info, label: 'Info' },
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
