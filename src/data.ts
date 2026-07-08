import { Article, Notification } from "./types";

export const ARTICLES: Article[] = [
  {
    id: "global-cyber-attack",
    title: "Judul Lengkap Berita: Jaringan Keamanan Global Terancam Serangan Siber Terbaru",
    category: "Breaking News",
    source: "Portal XYZ",
    date: "30 Jun 2026",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBejroCMrnHo3bUnqDOP-XTVkD-GWnMdMbPlmG6fU6ZjZEd_arnIcKU4udoG7L_6pwhyMxZFyZaxsVuj-0q2GohBYWTPtvAGpCjoCGCrs9jzxxXJpUkhL0Kzp5ApyCU6NcPboxKZLxYv5sDtrYat54APQ24gC1zewUX0pnVkwoyuAQsFQ7vaEj7yrk0mYnMYYhzPYQgHmAIYSdmt46WMy-sIU5EfDSA2_vrc0KcnopZYavPQOXIKY2MgEEGVPmZRj53VoH_r785zlPL",
    content: [
      "Laporan terbaru mengungkapkan adanya upaya penetrasi terorganisir yang menargetkan infrastruktur digital nasional. Pakar keamanan memperingatkan bahwa metode yang digunakan melibatkan algoritma pembelajaran mesin tingkat lanjut yang mampu melewati protokol enkripsi standar.",
      "Tim respons insiden sedang bekerja sepanjang waktu untuk mengisolasi segmen jaringan yang terdampak. Warga dihimbau untuk tetap waspada terhadap upaya phising yang mungkin memanfaatkan momentum berita ini untuk mencuri kredensial akses pengguna.",
      "Hingga saat ini, belum ada konfirmasi resmi mengenai kebocoran data sensitif, namun langkah-langkah preventif sedang diperketat di seluruh sektor vital."
    ],
    linkUrl: "#"
  },
  {
    id: "whatsapp-scams",
    title: "Waspada Modus Penipuan Undangan APK dan Link Kuota Gratis di WhatsApp",
    category: "Penting",
    source: "Direktorat Keamanan Siber",
    date: "29 Jun 2026",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT1iC5bIB3Tjy-vx-O5Cle-7wtbkYV3pu5YyH3YwDwgNgxcqCzeHyuKgZIGDDHpZhN27ExGAGYoBInF2atZxBIp6TQXmumIK-In7O_Ym8GV9RrNEb2iNJBpN3ylyPCyyotn6h_9oQyEwJvl3Ik0mWBxUgmArHkreulLEGnUMgUydMn93QcWYrE6hJE_WvY8yIc-W95j4Uu2yOyvomBtjNFmbWXzfJtpiM11zxDlr4J3R1SqJMk9JqTOHo9EiUECUQ74Y3eIEE4r8VR",
    content: [
      "Kementerian Komunikasi dan Informatika mengimbau masyarakat untuk mewaspadai modus penipuan pengiriman file APK (Application Package) berkedok undangan pernikahan digital, tagihan BPJS, atau kurir paket.",
      "Modus penipuan ini menargetkan pengguna WhatsApp dengan harapan korban menginstal file berbahaya tersebut. Begitu terinstal, aplikasi jahat ini dapat mengakses SMS, OTP perbankan, dan data pribadi sensitif lainnya tanpa sepengetahuan korban.",
      "Selain APK, pesan berantai yang menawarkan subsidi energi atau kuota internet gratis 100GB juga dipastikan adalah hoaks phishing untuk mencuri data pribadi. Pastikan Anda hanya mengandalkan saluran komunikasi resmi instansi pemerintah."
    ],
    linkUrl: "#"
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "login-alert",
    title: "Upaya Login Mencurigakan",
    description: "Seseorang mencoba masuk ke akun Anda dari Jakarta. Segera amankan akun.",
    time: "5m",
    type: "security",
    isUnread: true,
    priority: "high"
  },
  {
    id: "top-news",
    title: "Berita Terpopuler Hari Ini",
    description: "Waspada penipuan link melalui pesan WhatsApp yang sedang marak.",
    time: "2h",
    type: "news",
    isUnread: true
  },
  {
    id: "database-update",
    title: "Keamanan Link Diperbarui",
    description: "Database link berbahaya kami telah diperbarui untuk perlindungan maksimal.",
    time: "5h",
    type: "system",
    isUnread: true
  },
  {
    id: "hoax-detected-notif",
    title: "Hoax Terdeteksi",
    description: "Pesan berantai subsidi listrik 1jt telah dikonfirmasi Hoax oleh tim AI.",
    time: "1d",
    type: "hoax",
    isUnread: false
  }
];

export const INDONESIA_NEWS: Article[] = [
  {
    id: "indo-news-antihoax-1",
    title: "TurnBackHoax.id: Database Klasifikasi Berita Palsu dan Klarifikasi Informasi Terbesar di Indonesia",
    category: "Cek Fakta",
    source: "TurnBackHoax.id (MAFINDO)",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=80",
    content: [
      "TurnBackHoax.id yang dikelola oleh Masyarakat Anti Fitnah Indonesia (MAFINDO) merupakan rujukan utama nasional dalam mengonfirmasi isu miring, disinformasi, hoax, dan pesan berantai yang menyebar di kalangan masyarakat.",
      "Seluruh artikel verifikasi disusun oleh tim analis independen secara transparan dengan menyertakan bukti pembanding ilmiah, rilis berita tandingan dari lembaga resmi, serta screenshot informasi hoaks yang telah ditandai."
    ],
    linkUrl: "https://turnbackhoax.id"
  },
  {
    id: "indo-news-antihoax-2",
    title: "Kominfo Cek Fakta: Portal Resmi Kementerian Kominfo untuk Menangkal Hoaks Isu Nasional & Siber",
    category: "Cek Fakta",
    source: "Kemenkominfo RI",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    content: [
      "Kementerian Komunikasi dan Informatika secara aktif merilis laporan mingguan mengenai konten internet bermuatan negatif, penipuan online, siber kriminal, serta klasifikasi hoaks resmi pemerintah.",
      "Masyarakat dapat mengirimkan aduan konten mencurigakan ke situs aduankonten.id atau memverifikasi link kuota gratis, hadiah dana, atau penipuan finansial langsung di situs resmi Kominfo."
    ],
    linkUrl: "https://www.kominfo.go.id"
  },
  {
    id: "indo-news-antihoax-3",
    title: "Tempo Cek Fakta: Verifikasi Berita Mendalam Berstandar Internasional (IFCN Member)",
    category: "Cek Fakta",
    source: "Tempo Cek Fakta",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
    content: [
      "Tempo Cek Fakta merupakan unit verifikasi jurnalisme berskala internasional yang telah tersertifikasi oleh International Fact-Checking Network (IFCN).",
      "Mereka melakukan investigasi dan penelusuran digital forensik mendalam (termasuk reverse image search dan wawancara saksi ahli) untuk memecahkan kebenaran di balik video manipulasi, audio deepfake, serta isu politik sensitif."
    ],
    linkUrl: "https://cekfakta.tempo.co"
  },
  {
    id: "indo-news-antihoax-4",
    title: "Laporan Validitas Antara News: Konfirmasi Resmi Isu Internasional dan Kebijakan Publik",
    category: "Cek Fakta",
    source: "Antara News Cek Fakta",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
    content: [
      "Kantor Berita Negara ANTARA meluncurkan kanal khusus Cek Fakta guna meluruskan hoaks internasional, rumor saham/ekonomi makro, serta pernyataan publik dari para pejabat negara.",
      "Sebagai lembaga pemberitaan resmi pemerintah, Antara menjamin netralitas dan akurasi rilis klarifikasi berbasis dokumen negara yang sah."
    ],
    linkUrl: "https://www.antaranews.com"
  },
  {
    id: "indo-news-disaster-1",
    title: "BMKG Rilis Peringatan Dini Cuaca Ekstrem dan Potensi Banjir Bandang di Sejumlah Wilayah Indonesia",
    category: "Bencana Alam",
    source: "BMKG Indonesia",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    content: [
      "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) mengimbau warga di sepanjang lereng sungai dan wilayah pesisir untuk mengantisipasi potensi curah hujan ekstrem yang dapat memicu banjir bandang dan tanah longsor.",
      "Sistem pemantauan radar cuaca mendeteksi anomali atmosfer aktif yang membawa massa udara basah tinggi di atas sebagian besar pulau Sumatera, Jawa, dan Sulawesi."
    ],
    linkUrl: "https://www.bmkg.go.id"
  },
  {
    id: "indo-news-disaster-2",
    title: "Gunung Merapi Kembali Luncurkan Guguran Awan Panas Sejauh 1,5 Kilometer, Warga Diimbau Waspada",
    category: "Bencana Alam",
    source: "BPPTKG Yogyakarta",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?w=800&auto=format&fit=crop&q=80",
    content: [
      "Balai Penyelidikan dan Pengembangan Teknologi Kebencanaan Geologi (BPPTKG) melaporkan aktivitas vulkanik Gunung Merapi berupa luncuran awan panas guguran ke arah barat daya.",
      "Warga diimbau untuk tidak melakukan aktivitas apa pun di daerah potensi bahaya radius 5 kilometer dari puncak demi keselamatan bersama."
    ],
    linkUrl: "https://bpptkg.esdm.go.id"
  },
  {
    id: "indo-news-politics-1",
    title: "Sidang Parlemen Ketat: RUU Keamanan Data Pribadi dan Regulasi Etika AI Memasuki Tahap Finalisasi",
    category: "Politik",
    source: "Humas DPR RI",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Dewan Perwakilan Rakyat mempercepat pembahasan regulasi tata kelola kecerdasan buatan demi menekan maraknya penyalahgunaan teknologi deepfake dan manipulasi opini publik menjelang masa kampanye.",
      "Undang-undang baru ini dirancang untuk memberikan sanksi administratif dan pidana berat bagi korporasi atau individu yang menyebarkan informasi manipulatif bertenaga AI tanpa label peringatan."
    ],
    linkUrl: "https://www.dpr.go.id"
  },
  {
    id: "indo-news-politics-2",
    title: "Komisi Pemilihan Umum Siapkan Simulasi Sistem Pemungutan Suara Digital dan E-Voting Nasional",
    category: "Politik",
    source: "KPU RI",
    date: "3 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    content: [
      "KPU RI mulai menguji coba sistem e-voting terenkripsi untuk wilayah terpencil guna meningkatkan efisiensi penghitungan suara secara real-time.",
      "Tim ahli keamanan siber dilibatkan secara penuh untuk melakukan penetrasi pengujian (penetration testing) guna meminimalkan risiko sabotase digital."
    ],
    linkUrl: "https://www.kpu.go.id"
  },
  {
    id: "indo-news-1",
    title: "Rekor Baru MRT Jakarta Tembus 150.000 Penumpang Sehari Pasca Perluasan Rute Utama",
    category: "Megapolitan",
    source: "Detikcom",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    content: [
      "Jumlah pengguna MRT Jakarta mencapai rekor tertinggi baru sepanjang sejarah. Perluasan rute ke wilayah utara dan integrasi moda transportasi Transjakarta menjadi faktor utama lonjakan penumpang yang sangat signifikan ini.",
      "Integrasi fisik antarmoda dan kemudahan tap-in menggunakan sistem pembayaran digital turut mendongkrak minat masyarakat beralih dari transportasi pribadi."
    ],
    linkUrl: "https://www.detik.com"
  },
  {
    id: "indo-news-2",
    title: "Kualifikasi Piala Dunia: STY Optimistis Timnas Indonesia Amankan Poin Penuh di Laga Kandang",
    category: "Sepak Bola",
    source: "Kompas.com",
    date: "Hari ini",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    content: [
      "Pelatih Shin Tae-yong menegaskan bahwa seluruh skuad Garuda berada dalam kondisi fisik prima dan fokus penuh menghadapi pertandingan krusial besok malam di Stadion Utama Gelora Bung Karno.",
      "Para pemain siap bertarung mati-matian demi menjaga asa lolos ke putaran berikutnya dan meminta dukungan penuh dari seluruh masyarakat Indonesia."
    ],
    linkUrl: "https://www.kompas.com"
  },
  {
    id: "indo-news-3",
    title: "Penampakan Langka Komet Hijau Melintasi Candi Borobudur, Terjadi 75 Tahun Sekali",
    category: "Sains & Viral",
    source: "Tribunnews.com",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&auto=format&fit=crop&q=80",
    content: [
      "Para astronom and fotografer berhasil mengabadikan momen magis saat komet hijau melintas tepat di atas stupa Candi Borobudur. Fenomena astronomi langka ini menarik perhatian ribuan warga lokal dan wisatawan.",
      "Komet ini memiliki pancaran warna kehijauan yang khas akibat kandungan gas karbon diatomik di kepalanya saat mendekati matahari."
    ],
    linkUrl: "https://www.tribunnews.com"
  },
  {
    id: "indo-news-4",
    title: "Flagship Baru Diluncurkan! Smartphone Layar Lipat Generasi Terbaru Dobrak Pasar Indonesia",
    category: "Teknologi",
    source: "Liputan6.com",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Produsen teknologi terkemuka resmi merilis ponsel lipat teringan dan tertipis dengan engsel titanium yang diklaim mampu bertahan hingga 500.000 lipatan. Dilengkapi kamera sensor raksasa dan AI terintegrasi.",
      "Ponsel pintar ini juga menawarkan fungsionalitas produktivitas tingkat tinggi dengan fitur multitasking mutakhir bagi profesional muda."
    ],
    linkUrl: "https://www.liputan6.com"
  },
  {
    id: "indo-news-5",
    title: "Kuliner Nusantara Pecahkan Rekor Dunia: Sate Padang Terpanjang Disajikan di Festival Padang",
    category: "Kuliner & Budaya",
    source: "Suara.com",
    date: "2 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    content: [
      "Festival Kuliner Padang sukses menyajikan sate padang sepanjang 500 meter tanpa putus, memanggang ribuan tusuk sate secara serentak menggunakan bumbu rempah khas Sumatera Barat yang otentik.",
      "Ribuan pengunjung memadati lokasi festival untuk mencicipi hidangan tradisional legendaris ini secara gratis pasca penilaian rekor."
    ],
    linkUrl: "https://www.suara.com"
  }
];

export const SOSMED_TRENDS: Article[] = [
  {
    id: "sosmed-trend-1",
    title: "Viral Tren 'Glow Up' Challenge di TikTok, Jutaan Kreator Bagikan Transformasi Penampilan Inspiratif",
    category: "FYP TikTok",
    source: "TikTok @kreator_id",
    date: "3 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sebuah tren baru bernama 'Glow Up Challenge' sedang mendominasi linimasa TikTok di Indonesia. Jutaan pengguna mengunggah video kompilasi foto masa kecil mereka yang disandingkan dengan penampilan saat ini.",
      "Tren ini dinilai sangat positif karena banyak kreator yang menyisipkan pesan tentang pentingnya mencintai diri sendiri (self-love), menjaga kesehatan kulit, serta berolahraga secara teratur."
    ],
    linkUrl: "https://tiktok.com"
  },
  {
    id: "sosmed-trend-disaster-1",
    title: "Viral Kepanikan Warga saat Gempa Ringan Mengguncang Sejumlah Wilayah Barat Jawa, Video Amatir Banjiri X",
    category: "Trending X",
    source: "X @InfoBencana_RI",
    date: "4 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sejumlah video rekaman CCTV dan ponsel pintar milik warga yang merekam getaran gempa ringan berdurasi singkat mendadak viral di platform X (Twitter). Banyak warganet saling membagikan info kondisi wilayah masing-masing.",
      "Getaran dilaporkan terasa di beberapa wilayah perumahan padat penduduk. Warga dihimbau tidak panik namun tetap waspada terhadap informasi ramalan gempa hoaks yang sering beredar setelah kejadian."
    ],
    linkUrl: "https://x.com"
  },
  {
    id: "sosmed-trend-2",
    title: "Heboh Konser Rahasia Musisi Internasional di Jakarta, Tiket Sold Out dalam Waktu Kurang dari 5 Menit",
    category: "Trending X",
    source: "Menfess @X_Trend",
    date: "6 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    content: [
      "Penggemar musik di tanah air dikejutkan dengan pengumuman mendadak konser rahasia (secret show) salah satu grup band legendaris dunia yang akan digelar di Jakarta minggu depan.",
      "Penjualan tiket yang dibuka tanpa pemberitahuan awal langsung diserbu hingga ludes terjual dalam kurun waktu kurang dari lima menit, menyisakan kekecewaan bagi puluhan ribu fans yang kehabisan tiket."
    ],
    linkUrl: "https://x.com"
  },
  {
    id: "sosmed-trend-politics-1",
    title: "Debat Sengit Netizen di Instagram Mengenai Kebijakan Baru Simulasi Pemungutan Suara Digital (E-Voting) KPU",
    category: "Politik Sosmed",
    source: "IG @suaramahasiswa",
    date: "8 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    content: [
      "Halaman komentar salah satu postingan infografis KPU mengenai simulasi e-voting dipenuhi oleh ribuan komentar pro dan kontra dari warganet Instagram.",
      "Sebagian warganet menyambut baik modernisasi sistem pemilu demi efisiensi, sementara sebagian lainnya menyatakan keraguan terkait kesiapan infrastruktur keamanan siber untuk mencegah potensi manipulasi data digital."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "sosmed-trend-3",
    title: "Tren Kuliner Baru 'Mochi Bakar' Viral di Instagram, Antrean Pengunjung di Blok M Mengular hingga Ratusan Meter",
    category: "Kuliner Viral",
    source: "IG @infokuliner",
    date: "12 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    content: [
      "Kawasan kuliner Blok M Jakarta Selatan kembali menghadirkan sensasi baru berupa kedai 'Mochi Bakar' khas Jepang yang dimodifikasi dengan saus karamel lokal dan keju meleleh.",
      "Antrean pembeli terlihat memadati area trotoar sejak siang hingga malam hari, dengan waktu tunggu rata-rata mencapai satu hingga dua jam demi mencicipi mochi bertekstur kenyal dan harum tersebut."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "sosmed-trend-disaster-2",
    title: "Viral Rekaman Menegangkan Guguran Awan Panas Gunung Merapi Terpantau Jelas Melalui Siaran Langsung TikTok",
    category: "FYP TikTok",
    source: "TikTok @merapi_live",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sebuah siaran langsung yang menampilkan puncak Gunung Merapi saat meluncurkan awan panas mendadak ditonton oleh puluhan ribu pengguna TikTok secara real-time.",
      "Warganet berbondong-bondong memberikan doa keselamatan bagi warga yang berada di lereng Merapi. Rekomendasi zona aman dari BPPTKG pun ramai dibagikan ulang sebagai panduan resmi evakuasi mandiri."
    ],
    linkUrl: "https://tiktok.com"
  },
  {
    id: "sosmed-trend-4",
    title: "Kucing 'Oyen' Penjaga Minimarket di Bandung Jadi Idola Baru Netizen, Punya Akun Sosmed dengan Ratusan Ribu Followers",
    category: "Viral Menarik",
    source: "Threads @dunia_hewan",
    date: "Kemarin",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
    content: [
      "Seekor kucing berbulu oranye alias 'Oyen' yang kerap terlihat tertidur dengan tenang di atas keset pintu masuk sebuah minimarket di Bandung mendadak jadi selebritis internet.",
      "Kombinasi tingkahnya yang ramah saat diajak berfoto bersama pelanggan dan ekspresi wajahnya yang menggemaskan membuat akun media sosial buatannya kebanjiran pengikut dari seluruh penjuru nusantara."
    ],
    linkUrl: "https://threads.net"
  },
  {
    id: "sosmed-trend-politics-2",
    title: "Ramai Utas Panjang di X Membedah RUU Keamanan Data Pribadi Baru dan Regulasi Ketat Etika Penggunaan AI",
    category: "Trending X",
    source: "X @TeknoPolitik_ID",
    date: "2 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sebuah thread analisis hukum mengenai rancangan regulasi etika AI nasional viral di X dengan ribuan retweets. Utas tersebut mengupas dampak sanksi bagi penyebar deepfake AI manipulatif.",
      "Masyarakat akademis dan praktisi IT menyuarakan pentingnya pengawasan independen agar implementasi undang-undang ini berjalan adil tanpa mematikan kreativitas inovator lokal."
    ],
    linkUrl: "https://x.com"
  }
];

export const EXTRA_EDUKASI_ARTICLES: Article[] = [
  {
    id: "extra-edu-1",
    title: "BSSN Ingatkan Kebocoran Kredensial via Infostealer, Bahaya Autocomplete Browser",
    category: "Penting",
    source: "BSSN (Badan Siber & Sandi Negara)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    content: [
      "Badan Siber dan Sandi Negara (BSSN) mendeteksi peningkatan aktivitas malware infostealer yang menyasar kredensial login di perangkat pribadi.",
      "Pengguna dihimbau menonaktifkan fitur simpan sandi otomatis (autocomplete) di peramban publik dan disarankan menggunakan aplikasi password manager terenkripsi."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-2",
    title: "Waspada Penipuan PDF Tagihan Listrik Palsu yang Menguras Rekening Bank",
    category: "Peringatan",
    source: "Direktorat Keamanan Siber",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    content: [
      "Setelah heboh file .APK, kini penipu menggunakan ekstensi file .PDF palsu untuk mengecoh korban agar mengunduh exploit yang dapat mengambil alih layar.",
      "Periksa kembali ukuran file dan jangan pernah memberikan izin akses khusus (Accessibility Service) saat diminta oleh aplikasi yang baru dipasang."
    ],
    linkUrl: "https://www.kominfo.go.id"
  },
  {
    id: "extra-edu-3",
    title: "Kenali Kejahatan SIM Hijacking: Ketika Nomor Telepon Anda Diambil Alih Hacker",
    category: "Edukasi",
    source: "BSSN (Badan Siber & Sandi Negara)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80",
    content: [
      "SIM Hijacking terjadi saat pelaku membuat duplikat kartu SIM Anda ke operator seluler dengan memalsukan identitas untuk mendapatkan kode OTP SMS bank.",
      "Hubungi operator segera jika sinyal handphone Anda mendadak mati total tanpa alasan yang jelas di wilayah perkotaan."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-4",
    title: "Panduan Praktis Mengamankan Akun WhatsApp dari Pembajakan Kode OTP",
    category: "Panduan Keamanan",
    source: "Kemenkominfo RI Cek Fakta",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
    content: [
      "Banyak kasus akun WhatsApp diambil alih karena korban tergiur memberikan kode 6 digit SMS yang dikirimkan penipu dengan alasan salah kirim.",
      "Segera aktifkan Verifikasi Dua Langkah (Two-Step Verification) dengan memasukkan PIN 6 digit mandiri di bagian pengaturan keamanan WhatsApp."
    ],
    linkUrl: "https://www.kominfo.go.id"
  },
  {
    id: "extra-edu-5",
    title: "Celah Keamanan Baru Ditemukan pada Router Wi-Fi Publik, Imbauan Gunakan VPN",
    category: "Penting",
    source: "BSSN (Badan Siber & Sandi Negara)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    content: [
      "Kerentanan baru memungkinkan peretas melakukan serangan Man-in-the-Middle (MitM) untuk menyadap lalu lintas data pengguna Wi-Fi gratis.",
      "Disarankan untuk menghindari transaksi perbankan atau memasukkan sandi penting saat terhubung ke jaringan Wi-Fi umum tanpa proteksi VPN."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-6",
    title: "Awas Serangan Ransomware Baru Bermodus File Update Windows Palsu",
    category: "Peringatan",
    source: "Direktorat Keamanan Siber",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff270190?w=800&auto=format&fit=crop&q=80",
    content: [
      "Serangan ransomware jenis baru menyebar melalui iklan pencarian Google yang mengarahkan korban ke situs pembaruan sistem operasi palsu.",
      "Pastikan Anda selalu melakukan pembaruan OS langsung melalui menu resmi 'Windows Update' di dalam sistem pengaturan komputer Anda."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-7",
    title: "Modus Scam Lowongan Kerja Paruh Waktu di Telegram yang Meminta Uang Jaminan",
    category: "Edukasi",
    source: "Kemenkominfo RI Cek Fakta",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=80",
    content: [
      "Penipu menjanjikan komisi besar hanya dengan menyukai video YouTube atau memberikan ulasan hotel bintang lima melalui chat grup Telegram.",
      "Waspadalah apabila setelah beberapa tugas awal Anda diminta mentransfer uang deposit dengan kedok meningkatkan level komisi kerja."
    ],
    linkUrl: "https://www.kominfo.go.id"
  },
  {
    id: "extra-edu-8",
    title: "Panduan BSSN: Cara Menghindari Pencurian Data Pribadi saat Belanja Online",
    category: "Panduan Keamanan",
    source: "BSSN (Badan Siber & Sandi Negara)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    content: [
      "Kejahatan carding dan phishing sering terjadi pada platform belanja online yang tidak menggunakan sistem pembayaran gerbang (payment gateway) resmi.",
      "Periksa reputasi toko dan pastikan URL situs belanja memiliki tanda gembok SSL (HTTPS) sebelum memasukkan data kartu debit/kredit."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-9",
    title: "Hati-hati dengan Akun Bot Telegram yang Meminta Izin Akses Kontak Anda",
    category: "Penting",
    source: "Direktorat Keamanan Siber",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
    content: [
      "Beberapa bot Telegram palsu dibuat oleh peretas untuk mengoleksi nomor kontak pengguna guna melancarkan aksi penipuan SMS berantai.",
      "Jaga privasi Anda dengan menolak permintaan share nomor kontak atau lokasi dari bot Telegram yang tidak dikenal kegunaannya."
    ],
    linkUrl: "https://govcsirt.bssn.go.id"
  },
  {
    id: "extra-edu-10",
    title: "Mengenal Phishing Email Berkedok Konfirmasi Pengiriman Paket Pos Indonesia",
    category: "Edukasi",
    source: "Kemenkominfo RI Cek Fakta",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80",
    content: [
      "Email palsu mengatasnamakan BUMN kurir mengabarkan bahwa paket Anda tertahan di bea cukai dan meminta pembayaran biaya administrasi kecil.",
      "Jangan klik link yang dikirimkan. Cek nomor resi paket Anda langsung pada situs resmi posindonesia.co.id untuk status pengiriman yang valid."
    ],
    linkUrl: "https://www.kominfo.go.id"
  }
];

export const EXTRA_TERKINI_ARTICLES: Article[] = [
  {
    id: "extra-terkini-1",
    title: "Tren Edit Foto AI Estetik ala Korea Sedang Booming di Kalangan Selebgram Instagram",
    category: "Tren Sosmed",
    source: "Instagram",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Aplikasi editing wajah bertenaga kecerdasan buatan (AI) yang mengubah potret biasa menjadi ala aktor Korea mendadak viral di story para pengguna Instagram.",
      "Netizen dihimbau untuk tetap berhati-hati saat mengunggah foto wajah pribadi ke platform gratisan guna menghindari risiko pencurian biometrik."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "extra-terkini-2",
    title: "Viral Video Kreator X Membedah Tips Lolos Wawancara Kerja di Perusahaan Startup",
    category: "Trending X",
    source: "X (Twitter)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sebuah utas video pendek yang mengupas tips negosiasi gaji dan cara menjawab pertanyaan jebakan HRD mendapat respon luar biasa dari jutaan pencari kerja.",
      "Banyak warganet merasa terbantu dan membagikan pengalaman serupa mereka di kolom reply, menciptakan wadah diskusi karir yang interaktif."
    ],
    linkUrl: "https://x.com"
  },
  {
    id: "extra-terkini-3",
    title: "Ramai Diskusi di Threads Mengenai Dampak Work-Life Balance pada Kesehatan Mental",
    category: "Tren Sosmed",
    source: "Threads",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    content: [
      "Warganet Threads berbagi opini mengenai pentingnya menetapkan batasan waktu kerja yang jelas pasca jam kantor demi menjaga kesehatan pikiran.",
      "Tren perbincangan ini memicu banyak psikolog ikut memberikan panduan mengelola stres kerja harian secara praktis bagi pekerja perkotaan."
    ],
    linkUrl: "https://threads.net"
  },
  {
    id: "extra-terkini-4",
    title: "Heboh Fenomena Jasa Sewa iPhone untuk Gaya Hidup di Media Sosial",
    category: "Tren Sosmed",
    source: "Instagram",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Layanan sewa gawai premium untuk kebutuhan foto estetik atau menghadiri acara sosial menjadi bahan perbincangan hangat di dunia maya.",
      "Sebagian netizen mengkritik gaya hidup konsumtif ini, sementara yang lain melihatnya sebagai peluang bisnis menjanjikan bagi industri penyewaan."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "extra-terkini-5",
    title: "TikTokers Bagikan Tips Menabung Unik 'Tantangan 52 Minggu' hingga Capai Puluhan Juta",
    category: "FYP TikTok",
    source: "TikTok",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    content: [
      "Video edukasi finansial kreatif yang mengajarkan teknik menabung secara bertahap setiap minggu masuk ke dalam jajaran video paling populer di TikTok.",
      "Kreator menyertakan file tabel cetak gratis agar pengikutnya dapat memantau perkembangan tabungan mereka secara konsisten."
    ],
    linkUrl: "https://tiktok.com"
  },
  {
    id: "extra-terkini-6",
    title: "Kuliner Viral Pekan Ini: Croissant Geprek yang Bikin Netizen Instagram Heran Tapi Penasaran",
    category: "Tren Sosmed",
    source: "Instagram",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    content: [
      "Perpaduan pastry khas Perancis yang dipipihkan lalu dipanggang garing dan disajikan bersama sambal bawang pedas viral di media sosial kuliner.",
      "Para food vlogger berlomba-lomba memberikan ulasan jujur mengenai sensasi rasa pedas manis mentega dari sajian unik tersebut."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "extra-terkini-7",
    title: "Tren Tantangan No-Handphone Selama 24 Jam Ramai Diikuti Kalangan Remaja di X",
    category: "Trending X",
    source: "X (Twitter)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    content: [
      "Untuk memerangi kecanduan media sosial, ratusan pengguna X menantang diri mereka sendiri untuk menyimpan ponsel mereka di dalam laci selama seharian penuh.",
      "Hasilnya dibagikan lewat utas refleksi diri yang menceritakan naiknya produktivitas dan membaiknya kualitas tidur mereka."
    ],
    linkUrl: "https://x.com"
  },
  {
    id: "extra-terkini-8",
    title: "Kisah Haru Driver Ojol Bantu Siswa Kurang Mampu Dapat Sepeda Viral di Instagram",
    category: "Tren Sosmed",
    source: "Instagram",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
    content: [
      "Seorang mitra ojek online menggalang donasi kecil dari rekan-rekan komunitasnya untuk membelikan sepeda baru bagi anak yatim piatu agar bisa bersekolah.",
      "Aksi kemanusiaan spontan ini menuai banyak pujian dan menyebarkan getaran positif yang hangat di tengah padatnya arus informasi dunia maya."
    ],
    linkUrl: "https://instagram.com"
  },
  {
    id: "extra-terkini-9",
    title: "Heboh Utas di X Bongkar Taktik Jual Beli Follower dan Akun Bodong Media Sosial",
    category: "Trending X",
    source: "X (Twitter)",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Sebuah akun teknologi membongkar modus operandi peternakan bot (bot farm) yang menjual jasa engagement palsu untuk memanipulasi opini publik.",
      "Pengguna dihimbau lebih teliti menyaring akun yang tiba-tiba viral tanpa kredibilitas atau riwayat cuitan yang jelas di masa lalu."
    ],
    linkUrl: "https://x.com"
  },
  {
    id: "extra-terkini-10",
    title: "Kreator TikTok Bagikan Rahasia Membuat Konten Video Sinematik Hanya Modal HP Jadul",
    category: "FYP TikTok",
    source: "TikTok",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    content: [
      "Seorang fotografer ponsel menunjukkan teknik pencahayaan alami dan trik pergerakan kamera lambat yang menghasilkan video bernilai estetika tinggi.",
      "Video tutorialnya membuktikan bahwa kreativitas dan pemahaman sudut pandang kamera jauh lebih berharga dibandingkan harga perangkat gadget mahal."
    ],
    linkUrl: "https://tiktok.com"
  }
];

export function generateMoreSyntheticArticles(
  count: number,
  category: "edukasi" | "terkini",
  existingArticles: Article[]
): Article[] {
  const generated: Article[] = [];
  const existingTitles = new Set(existingArticles.map(a => a.title.trim().toLowerCase()));

  // Pool of high quality image URLs
  const eduImages = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601597111158-2fceff270190?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80"
  ];

  const terkiniImages = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80"
  ];

  // Cyber security templates (Edukasi)
  const eduCrimes = ["Phishing Rekening Bank", "SIM Swapping", "Social Engineering", "Pencurian Kredensial", "Ransomware Layanan Publik", "OTP Hijacking", "Quishing (QR Code Phishing)", "Skimming Kartu ATM", "Data Harvesting"];
  const eduFiles = [".APK Tagihan Listrik", ".PDF Undangan Pernikahan", ".APK Surat Tilang Elektronik", ".PDF Resi Pengiriman Palsu", ".EXE Update Windows Palsu", ".ZIP Lampiran Email Lowongan"];
  const eduMalwares = ["Infostealer pencuri sandi", "Ransomware pengunci data", "Spyware pelacak lokasi", "Trojan perbankan", "Adware penyusup browser"];
  const eduPlatforms = ["Android", "iOS", "Windows 11", "MacOS", "Router Wi-Fi Rumah", "Google Chrome", "Aplikasi WA", "E-Wallet"];
  const eduApps = ["WhatsApp", "Instagram", "Telegram", "Mobile Banking", "Gmail", "Threads", "TikTok"];
  const eduPhishings = ["Lotre Berhadiah", "Konfirmasi Paket Tertahan", "Pendaftaran Bansos", "Lowongan Kerja Palsu", "Hadiah Akhir Tahun"];
  const eduSeasons = ["Belanja Akhir Tahun", "Penerimaan Negara", "Promo Hari Raya", "Pendaftaran CPNS", "Bantuan Sosial"];
  const eduSources = ["BSSN (Badan Siber & Sandi Negara)", "Kemenkominfo RI Cek Fakta", "Direktorat Keamanan Siber", "Lembaga Riset Siber CISSReC", "Siber Polri"];

  const eduTemplates = [
    {
      title: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => `Waspada Modus ${c} Baru Menggunakan File ${f} Palsu`,
      content: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => [
        `Pakar siber mendeteksi penyebaran masif file ${f} yang dirancang untuk mengelabui korban agar mengunduh exploit berbahaya.`,
        `Setelah terpasang, file ini akan mengaktifkan malware yang dapat mencuri sandi serta memindahkan dana dari rekening tanpa sepengetahuan korban. Harap selalu memeriksa ekstensi file sebelum mengunduhnya.`
      ]
    },
    {
      title: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => `BSSN Deteksi Serangan ${m} Baru yang Menyasar Pengguna ${p}`,
      content: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => [
        `Laporan terbaru dari BSSN mengonfirmasi adanya kampanye siber yang menyebarkan ${m} melalui iklan pencarian web palsu.`,
        `Kerentanan ini menargetkan sistem ${p} dan dapat memberikan akses penuh kepada peretas untuk menyadap seluruh aktivitas korban. Segera perbarui patch keamanan perangkat Anda.`
      ]
    },
    {
      title: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => `Tips Mengamankan Akun ${a} dari Ancaman Kejahatan ${c}`,
      content: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => [
        `Kejahatan ${c} semakin marak terjadi dengan memalsukan identitas customer service guna membajak akun ${a} milik pengguna.`,
        `Guna mengamankan akun, pastikan Anda mengaktifkan verifikasi dua langkah dan tidak pernah membagikan kode OTP atau PIN kepada siapapun, termasuk pihak yang mengaku sebagai petugas resmi.`
      ]
    },
    {
      title: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => `Kemenkominfo Himbau Masyarakat Waspadai Link ${ph} saat Musim ${s}`,
      content: (c: string, f: string, m: string, p: string, a: string, ph: string, s: string) => [
        `Kementerian Komunikasi dan Informatika mengidentifikasi puluhan situs phishing baru yang menggunakan tema ${ph} untuk menjebak korban.`,
        `Situs-situs palsu ini marak beredar menyambut momen ${s} dengan menjanjikan keuntungan instan yang pada akhirnya menguras data pribadi dan keuangan korban.`
      ]
    }
  ];

  // Social Media templates (Terkini)
  const sosSources = ["Instagram", "TikTok", "Threads", "X (Twitter)"];
  const sosTrends = ["Detoks Media Sosial 24 Jam", "Edit Foto Wajah AI ala Korea", "Sewa iPhone untuk Estetika", "Kuliner Unik Croissant Geprek", "Tantangan Menabung 52 Minggu", "Live Streaming Jualan UMKM"];
  const sosTopics = ["Work-Life Balance", "Sindrom JOMO (Joy of Missing Out)", "Kecanduan Layar Gadget", "Kesehatan Mental Pekerja Kreatif", "Gaya Hidup Frugal Living"];
  const sosTips = ["Membuat Video Sinematik Aesthetic", "Lolos Wawancara Kerja Startup", "Mengelola Keuangan Anak Kos", "Membangun Personal Branding", "Membuat Feed Estetik"];
  const sosLifestyles = ["Minimalis Kamar Estetik", "Slow Living di Perkotaan Padat", "Berbagi Kehidupan Pribadi secara Berlebihan", "Gaya Hidup Sehat Tanpa Begadang"];
  const sosCampaigns = ["Peduli Kesehatan Mental", "Donasi Gotong Royong Ojol", "No-Handphone Saat Akhir Pekan", "Saling Bantu UMKM Lokal", "Bebas Sampah Plastik"];

  const sosTemplates = [
    {
      title: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => `Viral di ${src}, Tren ${trnd} Ramai Diikuti Kalangan Remaja`,
      content: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => [
        `Media sosial ${src} saat ini sedang diramaikan oleh tagar populer yang mengajak pengguna berpartisipasi dalam tantangan ${trnd}.`,
        `Banyak netizen membagikan video atau foto seru mereka, menciptakan gelombang kreatif yang positif dan menghibur di jagat maya.`
      ]
    },
    {
      title: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => `Netizen di ${src} Heboh Bahas Dampak ${top} pada Produktivitas Kerja`,
      content: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => [
        `Sebuah diskusi hangat pecah di platform ${src} setelah seorang praktisi kesehatan membagikan opini mengenai pentingnya ${top}.`,
        `Ribuan pengguna ikut menuangkan curahan hati mereka mengenai kerasnya tuntutan dunia kerja modern dan cara mereka bertahan.`
      ]
    },
    {
      title: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => `Kreator ${src} Bagikan Tips Jitu ${tps} Hanya Modal Smartphone`,
      content: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => [
        `Seorang kreator konten berbakat di ${src} membagikan panduan praktis dan tutorial lengkap mengenai cara mudah ${tps}.`,
        `Utas edukatif ini langsung disukai dan disimpan oleh ratusan ribu netizen yang ingin meningkatkan keterampilan mereka secara gratis.`
      ]
    },
    {
      title: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => `Ramai Kampanye Gerakan ${cmp} di ${src} yang Menginspirasi Jutaan Orang`,
      content: (src: string, trnd: string, top: string, tps: string, life: string, cmp: string) => [
        `Sebuah gerakan sosial bertajuk ${cmp} mendadak viral di platform ${src} berkat dukungan dari berbagai komunitas pegiat sosial.`,
        `Aksi nyata ini membuktikan kekuatan kolaborasi media sosial dalam mendorong perubahan nyata yang bermanfaat bagi kesejahteraan bersama.`
      ]
    }
  ];

  let attempts = 0;
  while (generated.length < count && attempts < 100) {
    attempts++;
    const seed = Math.floor(Math.random() * 100000);
    
    let artTitle = "";
    let artContent: string[] = [];
    let artSource = "";
    let artCategory = "";
    let artImageUrl = "";
    const id = `synthetic-${category}-${Date.now()}-${generated.length}-${seed}`;

    if (category === "edukasi") {
      const c = eduCrimes[seed % eduCrimes.length];
      const f = eduFiles[(seed + 1) % eduFiles.length];
      const m = eduMalwares[(seed + 2) % eduMalwares.length];
      const p = eduPlatforms[(seed + 3) % eduPlatforms.length];
      const a = eduApps[(seed + 4) % eduApps.length];
      const ph = eduPhishings[(seed + 5) % eduPhishings.length];
      const s = eduSeasons[(seed + 6) % eduSeasons.length];
      
      const tpl = eduTemplates[seed % eduTemplates.length];
      artTitle = tpl.title(c, f, m, p, a, ph, s);
      artContent = tpl.content(c, f, m, p, a, ph, s);
      artSource = eduSources[seed % eduSources.length];
      artCategory = seed % 3 === 0 ? "Penting" : seed % 3 === 1 ? "Peringatan" : "Edukasi";
      artImageUrl = eduImages[seed % eduImages.length];
    } else {
      const src = sosSources[seed % sosSources.length];
      const trnd = sosTrends[(seed + 1) % sosTrends.length];
      const top = sosTopics[(seed + 2) % sosTopics.length];
      const tps = sosTips[(seed + 3) % sosTips.length];
      const life = sosLifestyles[(seed + 4) % sosLifestyles.length];
      const cmp = sosCampaigns[(seed + 5) % sosCampaigns.length];

      const tpl = sosTemplates[seed % sosTemplates.length];
      artTitle = tpl.title(src, trnd, top, tps, life, cmp);
      artContent = tpl.content(src, trnd, top, tps, life, cmp);
      artSource = src;
      artCategory = seed % 2 === 0 ? "Tren Sosmed" : src === "TikTok" ? "FYP TikTok" : `Trending ${src}`;
      artImageUrl = terkiniImages[seed % terkiniImages.length];
    }

    const titleLower = artTitle.trim().toLowerCase();
    if (!existingTitles.has(titleLower)) {
      existingTitles.add(titleLower);
      generated.push({
        id,
        title: artTitle,
        category: artCategory,
        source: artSource,
        date: "Baru saja",
        imageUrl: artImageUrl,
        content: artContent,
        linkUrl: category === "edukasi" ? "https://govcsirt.bssn.go.id" : "https://instagram.com"
      });
    }
  }

  return generated;
}
