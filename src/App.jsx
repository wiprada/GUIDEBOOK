import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Info, Phone, Home, User, ExternalLink, ChevronRight, Clock, Award, Flower2, Utensils, Coffee, Palmtree, BarChart3, FileText, LayoutGrid, Car, MonitorPlay } from 'lucide-react';

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
    { time: '13:30', title: 'Penyambutan Tamu', desc: 'Luring', icon: User },
    { time: '13:45', title: 'Tarian Pembukaan', desc: 'Pertunjukan Seni', icon: Flower2 },
    { time: '13:55', title: 'Pembukaan oleh MC', desc: 'Master of Ceremony', icon: User },
    { time: '14:05', title: 'Lagu Indonesia Raya', desc: 'Menyanyikan Lagu Kebangsaan', icon: Award },
    { time: '14:10', title: 'Pembacaan Doa', desc: 'Khidmat', icon: FileTextIcon },
    { time: '14:15', title: 'Video Kaleidoskop', desc: 'Kegiatan BPK & Pemprov', icon: MonitorPlay },
    { time: '14:25', title: 'Sambutan Anggota VI BPK', desc: 'Pidato Utama', icon: User },
    { time: '14:55', title: 'Sambutan Gubernur Kaltim', desc: 'Ketua APPSI / Perwakilan Kepala Daerah', icon: User },
    { time: '15:10', title: 'Sambutan Wamendagri', desc: 'Ibu Ribka Haluk', icon: User },
    { time: '15:30', title: 'Dialog Interaktif', desc: 'Anggota VI, Wamendagri & Gubernur', icon: Phone },
    { time: '16:00', title: 'Surat Tugas & Foto Bersama', desc: 'Simbolis', icon: FileTextIcon },
    { time: '16:15', title: 'Penutup', desc: 'Selesai', icon: Home },
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
    <div className={`absolute w-24 h-24 pointer-events-none z-0 opacity-20 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-400">
        <path d="M10,10 C30,10 40,20 50,40 C60,20 70,10 90,10 C80,30 70,50 90,90 C70,70 50,70 50,50 C50,70 30,70 10,90 C30,50 20,30 10,10 Z M50,50 C45,45 45,55 50,60 C55,55 55,45 50,50 Z" />
        <path d="M0,0 Q50,0 50,50 Q0,50 0,0" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="20" r="3" />
        <circle cx="80" cy="20" r="2" />
        <circle cx="20" cy="80" r="2" />
      </svg>
    </div>
  );

  const EndekPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none z-0" 
         style={{
           backgroundImage: `radial-gradient(#fbbf24 1px, transparent 1px)`,
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
      <div className={`fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <UkiranCorner className="top-0 left-0" rotate={0} />
          <UkiranCorner className="top-0 right-0" rotate={90} />
          <UkiranCorner className="bottom-0 right-0" rotate={180} />
          <UkiranCorner className="bottom-0 left-0" rotate={270} />
        </div>
        <div className="text-center space-y-6 animate-pulse-slow relative z-10">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-20 animate-spin-slow"></div>
            <img src="/BPK.png" alt="Logo BPK" className="relative w-24 h-24 rounded-full object-contain shadow-2xl border-2 border-amber-500/30 bg-slate-800/50" />
          </div>
          <div>
            <h1 className="text-xl font-serif text-white tracking-widest mb-2">OM SWASTIASTU</h1>
            <p className="text-white text-xl font-serif tracking-wide mb-2">Assalamualaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-white text-xl font-serif tracking-wide mb-3">Shalom</p>
            <p className="text-amber-500 text-sm tracking-widest uppercase">Badan Pemeriksa Keuangan</p>
          </div>
        </div>
      </div>
    );
  }

  // Main App Content
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 sticky top-0 z-50 border-b border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src="/BPK.png" alt="Logo BPK" className="w-10 h-10 rounded-full object-contain flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-semibold text-xs leading-tight">Guidebook Entry Meeting Pemeriksaan LKPD Tahun 2025 di lingkungan Ditjen PKN VI BPK</h1>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-amber-500 text-sm font-medium">12 Februari 2026</p>
            <p className="text-xs text-slate-400">BPK Perwakilan Provinsi Bali</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 overflow-hidden border border-amber-500/20">
              <EndekPattern />
              <UkiranCorner className="top-0 right-0" rotate={90} />
              <div className="relative z-10">
                <h2 className="text-2xl font-serif text-amber-500 mb-2">Om Swastiastu</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Selamat datang di Entry Meeting Pemeriksaan LKPD TA 2025. 
                  Semoga pertemuan ini berjalan lancar dan membawa hasil yang bermanfaat.
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <MapPin className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-sm font-medium">Lokasi</p>
                <p className="text-xs text-slate-400">The Meru Sanur</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <Clock className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-sm font-medium">Waktu</p>
                <p className="text-xs text-slate-400">13:30 WITA - Selesai</p>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                Rundown Acara
              </h3>
              <div className="space-y-3">
                {agenda.map((item, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
                    <span className="text-amber-500 text-sm font-mono flex-shrink-0 w-12">{item.time}</span>
                    <p className="font-medium text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
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
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
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
                <div key={item.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                        <p className="text-xs text-amber-500 mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.address}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openMap(item.mapQuery)}
                      className="mt-3 w-full bg-amber-500/20 text-amber-500 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di Google Maps
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-500" />
              Informasi
            </h3>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h4 className="font-medium mb-2">Kontak Panitia</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  +62 812-3456-7890
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  Sekretariat BPK Bali
                </p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h4 className="font-medium mb-2">Tentang Acara</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Entry Meeting Pemeriksaan LKPD Tahun Anggaran 2025 adalah pertemuan awal 
                antara tim pemeriksa BPK dengan entitas yang diperiksa untuk menyamakan 
                persepsi dan menyepakati jadwal pemeriksaan.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 py-2 z-50">
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
                  ? 'text-amber-500'
                  : 'text-slate-500'
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
