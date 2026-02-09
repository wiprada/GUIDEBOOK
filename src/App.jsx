import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Info, Phone, Home, User, ExternalLink, ChevronRight, Award, Flower2, Utensils, Coffee, Palmtree, BarChart3, FileText, LayoutGrid, Car, MonitorPlay } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [exploreFilter, setExploreFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowSplash(false), 500); 
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // --- DATA SECTIONS ---

  const agenda = [
    { time: '13.30 – 13.45', title: 'Penyambutan Tamu (Luring)' },
    { time: '13.45 – 13.55', title: 'Tarian Pembukaan' },
    { time: '13.55 – 14.05', title: 'Pembukaan oleh MC' },
    { time: '14.05 – 14.10', title: 'Lagu Kebangsaan Indonesia Raya' },
    { time: '14.10 – 14.15', title: 'Pembacaan Doa' },
    { time: '14.15 – 14.25', title: 'Penayangan Video Kaleidoskop Kegiatan BPK dengan Pemerintah Provinsi Tahun 2025-2026' },
    { time: '14.25 – 14.55', title: 'Sambutan Anggota VI BPK' },
    { time: '14.55 – 15.10', title: 'Sambutan Gubernur Kalimantan Timur sebagai Ketua APPSI mewakili para Kepala Daerah di lingkungan Ditjen PKN VI' },
    { time: '15.10 – 15.30', title: 'Sambutan Wakil Menteri Dalam Negeri, Ibu Ribka Haluk' },
    { time: '15.30 – 16.00', title: 'Dialog Anggota VI dan Wamendagri dengan Para Gubernur' },
    { time: '16.00 – 16.15', title: 'Penyerahan Surat Tugas secara Simbolis dan Foto Bersama' },
    { time: '16.15 – 16.20', title: 'Penutup' },
  ];

  const exploreData = [
    { id: 1, type: 'venue', name: 'The Meru Sanur', desc: 'Lokasi Utama Acara. Hotel bintang 5 di jantung Sanur.', address: 'Jl. Hang Tuah, Sanur Kaja', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop', mapQuery: 'The Meru Sanur' },
    { id: 2, type: 'wisata', name: 'Pantai Sanur', desc: 'Pantai matahari terbit yang tenang, cocok untuk jalan pagi sebelum acara.', address: '5 min dari lokasi', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop', mapQuery: 'Pantai Sanur' },
    { id: 3, type: 'wisata', name: 'Monumen Bajra Sandhi', desc: 'Monumen perjuangan rakyat Bali dengan arsitektur memukau.', address: 'Renon, Denpasar', image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800&auto=format&fit=crop', mapQuery: 'Bajra Sandhi Monument' },
    { id: 4, type: 'kuliner', name: 'Warung Mak Beng', desc: 'Legenda sup kepala ikan dan ikan goreng sejak 1941.', address: 'Jl. Hang Tuah No.45', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', mapQuery: 'Warung Mak Beng' },
    { id: 5, type: 'kuliner', name: 'Nasi Bali Men Weti', desc: 'Nasi campur Bali autentik yang sangat populer di Sanur.', address: 'Jl. Segara Ayu', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop', mapQuery: 'Warung Men Weti' },
    { id: 6, type: 'cafe', name: 'Kopi Bali House', desc: 'Tempat ngopi nyaman dengan nuansa seni dan kopi lokal terbaik.', address: 'Jl. By Pass Ngurah Rai', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop', mapQuery: 'Kopi Bali House' },
    { id: 7, type: 'cafe', name: 'Canvas Cafe', desc: 'Cafe modern dengan suasana tenang untuk meeting santai.', address: 'Sanur area', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop', mapQuery: 'Canvas Cafe Sanur' },
  ];

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

  const UkiranCorner = ({ className, rotate = 0 }) => (
    <div className={`absolute w-28 h-28 pointer-events-none z-0 opacity-15 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 200 200" fill="none" className="text-yellow-700">
        {/* Patra Punggel - Balinese ornamental carving */}
        <g fill="currentColor" opacity="0.8">
          {/* Main spiral leaf */}
          <path d="M20,180 C20,120 40,80 80,60 C60,80 50,110 55,140 C60,110 75,85 100,70 C80,90 70,115 75,140 C80,115 95,95 115,82 C100,98 92,118 95,138 C100,118 112,100 130,90 C115,102 108,120 112,140" />
          {/* Curling tip */}
          <path d="M130,90 C140,82 155,78 170,80 C160,85 152,92 148,102 C158,92 168,88 178,88 C168,95 162,105 160,115 C165,105 172,98 182,96 C174,102 168,112 166,124 C170,116 176,110 184,108 C178,114 174,122 173,132" />
          {/* Inner curl detail */}
          <path d="M55,140 C52,155 54,168 62,178 C58,165 60,152 68,142 C65,155 68,168 76,175 C72,165 73,152 80,145" />
          {/* Small decorative buds */}
          <ellipse cx="35" cy="170" rx="8" ry="12" transform="rotate(-20 35 170)" />
          <ellipse cx="170" cy="80" rx="5" ry="8" transform="rotate(30 170 80)" />
          <circle cx="185" cy="105" r="4" />
          <circle cx="62" cy="180" r="3" />
        </g>
        {/* Fine line details */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.4">
          <path d="M25,175 Q60,100 120,75" fill="none" />
          <path d="M30,170 Q65,105 125,80" fill="none" />
          <path d="M135,88 Q160,80 175,85" fill="none" />
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

  const filterTypes = [
    { id: 'all', label: 'Semua', icon: LayoutGrid },
    { id: 'venue', label: 'Venue', icon: Home },
    { id: 'wisata', label: 'Wisata', icon: Palmtree },
    { id: 'kuliner', label: 'Kuliner', icon: Utensils },
    { id: 'cafe', label: 'Cafe', icon: Coffee },
  ];

  const filteredExplore = exploreFilter === 'all' 
    ? exploreData 
    : exploreData.filter(item => item.type === exploreFilter);

  // Splash Screen
  if (loading || showSplash) {
    return (
      <div className={`fixed inset-0 z-[60] bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <UkiranCorner className="top-0 left-0" rotate={0} />
          <UkiranCorner className="top-0 right-0" rotate={90} />
          <UkiranCorner className="bottom-0 right-0" rotate={180} />
          <UkiranCorner className="bottom-0 left-0" rotate={270} />
        </div>
        <div className="text-center space-y-6 animate-pulse-slow relative z-10">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-yellow-600 rounded-full blur-xl opacity-20 animate-spin-slow"></div>
            <img src="/BPK.png" alt="Logo BPK" className="relative w-24 h-24 rounded-full object-contain shadow-2xl border-2 border-yellow-600/30 bg-white" />
          </div>
          <div>
            <h1 className="text-xl font-serif text-gray-800 tracking-widest mb-2">Om Swastiastu</h1>
            <p className="text-gray-800 text-lg font-serif tracking-wide mb-2">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-gray-800 text-xl font-serif tracking-wide mb-3">Shalom</p>
            <p className="text-yellow-700 text-sm tracking-widest uppercase font-semibold">Badan Pemeriksa Keuangan</p>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src="/BPK.png" alt="Logo BPK" className="w-10 h-10 rounded-full object-contain flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-semibold text-xs leading-tight text-white">Guidebook Entry Meeting Pemeriksaan LKPD Tahun 2025 di lingkungan Ditjen PKN VI BPK</h1>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-yellow-400 text-sm font-medium">12 Februari 2026</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="relative bg-white rounded-2xl p-6 overflow-hidden border border-yellow-600/20 shadow-md">
              <EndekPattern />
              <PatraPunggel className="top-0 right-0" />
              <div className="relative z-10">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Selamat datang di Entry Meeting Pemeriksaan LKPD Tahun 2025. 
                  Semoga pertemuan ini berjalan lancar dan membawa hasil yang bermanfaat.
                </p>
              </div>
            </div>

            {/* Lokasi */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src="/Gedung%20BPK%20Bali.png" alt="Gedung BPK Perwakilan Provinsi Bali" className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-700" />
                  BPK Perwakilan Provinsi Bali
                </p>
                <button
                  onClick={() => openMap('BPK Perwakilan Provinsi Bali')}
                  className="mt-3 w-full bg-yellow-50 text-yellow-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-yellow-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka di Google Maps
                </button>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-700" />
                Rundown Acara
              </h3>
              <div className="space-y-3">
                {agenda.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-start gap-4">
                    <span className="text-yellow-700 text-xs font-mono flex-shrink-0 w-24 pt-0.5">{item.time}</span>
                    <p className="font-medium text-sm text-gray-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6 mb-2">© 2026 - Data Analytics Center BPK BALI</p>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-700" />
              Eksplorasi Sekitar
            </h3>

            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterTypes.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setExploreFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    exploreFilter === filter.id
                      ? 'bg-yellow-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 shadow-sm'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="space-y-4">
              {filteredExplore.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        <p className="text-xs text-yellow-700 mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.address}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openMap(item.mapQuery)}
                      className="mt-3 w-full bg-yellow-50 text-yellow-700 py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-yellow-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di Google Maps
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6 mb-2">© 2026 - Data Analytics Center BPK BALI</p>
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
            <p className="text-center text-xs text-gray-400 mt-6 mb-2">© 2026 - Data Analytics Center BPK BALI</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600 px-4 py-2 z-50 shadow-lg">
        <div className="flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Beranda' },
            { id: 'explore', icon: MapPin, label: 'Eksplorasi' },
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
