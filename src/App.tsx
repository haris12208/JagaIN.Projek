/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Newspaper,
  ShieldAlert,
  Link2,
  Bot,
  Bell,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Star,
  Send,
  Share2,
  History,
  User,
  Copy,
  PlusCircle,
  Lock,
  ShieldCheck,
  HelpCircle,
  Activity,
  Mail,
  Construction,
  Lightbulb,
  FileText,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Clock,
  ExternalLink,
  Check,
  RefreshCw,
  BookOpen,
  Gamepad2,
  Search
} from "lucide-react";
import { Article, Notification, ChatMessage, HoaxResult, LinkResult } from "./types";
import { ARTICLES, INITIAL_NOTIFICATIONS, INDONESIA_NEWS, SOSMED_TRENDS, EXTRA_EDUKASI_ARTICLES, EXTRA_TERKINI_ARTICLES, generateMoreSyntheticArticles } from "./data";
import { sanitizeSensitiveData, sanitizeUrlCredentials, obfuscateData, deobfuscateData } from "./utils/security";

const GLOSSARY_ITEMS = [
  {
    term: "Phishing (Pengelabuan)",
    category: "Metode Serangan",
    definition: "Upaya penipuan untuk mendapatkan informasi sensitif seperti kata sandi, kartu kredit, PIN, atau OTP dengan menyamar sebagai institusi resmi.",
    analogy: "Mengingatkan pada aktivitas 'memancing' (fishing) di mana penipu melemparkan umpan berupa pesan atau link palsu yang sangat menarik agar korban terjebak.",
    modus: "Mengirim email atau pesan WA tiruan dari bank resmi, meminta Anda memperbarui data rekening atau mengklaim subsidi tunai dengan mengklik tautan palsu.",
    tips: "Selalu periksa nama domain URL. Instansi resmi atau perbankan tidak pernah meminta data sensitif atau verifikasi lewat link tidak resmi."
  },
  {
    term: "APK Palsu (Malware)",
    category: "Modus Populer",
    definition: "File installer aplikasi Android (.apk) berbahaya yang dikirim penipu untuk menyusup ke sistem ponsel, merekam ketukan layar, dan menyadap SMS.",
    analogy: "Seperti penyusup jahat yang mengetok pintu rumah Anda dengan menyamar menggunakan seragam kurir paket tepercaya.",
    modus: "Penipu mengirim pesan WA pura-pura mengirim 'Undangan Pernikahan digital', 'Tagihan Pajak', atau 'Foto Paket J&T' dengan lampiran file format .apk.",
    tips: "Jangan pernah mengunduh dan menginstal file berformat .apk dari nomor WhatsApp asing. Hanya unduh aplikasi dari Google Play Store resmi."
  },
  {
    term: "Social Engineering (Rekayasa Sosial)",
    category: "Metode Serangan",
    definition: "Manipulasi psikologis agar korban merasa panik, senang, atau takut, sehingga bersedia menyerahkan informasi rahasia tanpa sadar.",
    analogy: "Seperti hipnotis verbal di mana penipu memanfaatkan kelengahan emosi Anda untuk mendapatkan kunci brankas pribadi Anda.",
    modus: "Penelepon mengaku dari kepolisian mengabarkan keluarga kecelakaan, atau call center bank meminta kode OTP kartu debit Anda agar rekening tidak diblokir.",
    tips: "Tolak segala desakan telepon yang meminta kode OTP, PIN, atau kata sandi. Tenangkan diri dan konfirmasi langsung ke pihak resmi secara independen."
  },
  {
    term: "Deepfake AI",
    category: "Teknis",
    definition: "Teknologi kecerdasan buatan (AI) yang memanipulasi video, gambar, atau suara agar terlihat dan terdengar sangat mirip dengan orang asli.",
    analogy: "Topeng digital interaktif yang mampu menyalin wajah dan cara berbicara orang lain secara real-time.",
    modus: "Menggunakan video buatan AI wajah pejabat negara untuk mempromosikan penipuan investasi, atau meniru suara anak/kerabat untuk meminta transfer uang darurat.",
    tips: "Selalu verifikasi dengan video call langsung dengan menanyakan pertanyaan spesifik keluarga (kata sandi rahasia keluarga) jika merasa curiga."
  },
  {
    term: "Ransomware (Malware Pemeras)",
    category: "Metode Serangan",
    definition: "Program jahat yang menyandera file atau sistem komputer korban dengan enkripsi kuat, lalu menuntut uang tebusan untuk membukanya.",
    analogy: "Penculik menyelinap ke kantor Anda, merantai seluruh lemari arsip penting, lalu meminta tebusan untuk membagikan kunci gemboknya.",
    modus: "Menyusup melalui celah keamanan sistem instansi atau email phishing, mengunci seluruh sistem operasional dan database penting.",
    tips: "Lakukan pencadangan (backup) data krusial secara berkala di media penyimpanan eksternal yang tidak terhubung terus-menerus ke jaringan internet."
  },
  {
    term: "QRIS Palsu (QR Spoofing)",
    category: "Modus Populer",
    definition: "Mengganti barcode QRIS resmi di merchant, toko, atau tempat ibadah dengan stiker barcode QRIS milik pribadi pelaku penipuan.",
    analogy: "Menempelkan kotak amal palsu di masjid secara sembunyi-sembunyi agar uang jemaah masuk ke kantong pribadi pelaku.",
    modus: "Pelaku menempel stiker QRIS baru bertuliskan nama tempat ibadah tiruan di atas barcode QRIS asli masjid agar dana donasi mengalir ke rekening pelaku.",
    tips: "Periksa kembali kesesuaian nama merchant/penerima pembayaran yang tertera pada layar ponsel Anda sebelum mengonfirmasi PIN pembayaran."
  },
  {
    term: "OTP (One-Time Password)",
    category: "Teknis",
    definition: "Kode sandi sekali pakai berupa angka acak yang dikirimkan sistem via SMS/Email sebagai autentikasi akhir masuk akun atau transaksi.",
    analogy: "Kunci fisik sekali pakai yang langsung hancur menjadi debu segera setelah digunakan sekali untuk membuka brankas.",
    modus: "Penipu mencoba meretas akun e-commerce Anda dan menelpon Anda untuk meminta menyebutkan kode SMS OTP yang masuk ke ponsel Anda.",
    tips: "JANGAN PERNAH berikan kode OTP kepada siapapun. Pihak bank atau aplikasi resmi mana pun tidak pernah berhak meminta kode OTP Anda."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "Anda menerima pesan WhatsApp dari nomor asing yang mengaku sebagai kurir ekspedisi. Pengirim berkata: 'Permisi kak, ada paket dengan nomor resi berikut. Tolong instal aplikasi ini untuk melacak kurir kami ya kak' lalu melampirkan file bernama Lacak_Paket_Exp.apk.",
    type: "APK Palsu",
    clues: [
      "Tautan file berformat installer Android (.apk)",
      "Nomor pengirim tidak dikenal dan tidak bercentang hijau resmi",
      "Mendesak untuk menginstal aplikasi di luar Play Store"
    ],
    choices: [
      {
        id: "A",
        text: "Unduh file tersebut agar kurir tidak kesulitan mengirimkan paket.",
        isCorrect: false,
        feedback: "Salah! File berformat .apk adalah installer aplikasi. Kurir ekspedisi resmi tidak pernah meminta pelanggan memasang file .apk dari WA untuk melacak paket. Ini adalah malware penyadap SMS OTP."
      },
      {
        id: "B",
        text: "Abaikan pesan, jangan unduh file tersebut, lalu blokir nomor pengirim.",
        isCorrect: true,
        feedback: "Benar sekali! Menolak dan memblokir nomor adalah langkah paling aman. Selalu gunakan aplikasi resmi yang diunduh dari Google Play Store untuk pelacakan paket."
      }
    ]
  },
  {
    id: 2,
    scenario: "Anda menerima SMS dari pengirim berkode 'INFO_BANK' yang berisi: 'Pemberitahuan perubahan skema biaya m-banking menjadi Rp 150.000 per bulan. Jika Anda tidak setuju dengan skema tarif baru ini, segera batalkan dengan mengisi formulir di: bank-pembatalan-tarif.info'.",
    type: "Phishing Perbankan",
    clues: [
      "Domain tautan asing (.info bukan .co.id resmi bank)",
      "Berisi ancaman pemotongan saldo bulanan secara sepihak",
      "Meminta konfirmasi dengan mengunjungi link eksternal"
    ],
    choices: [
      {
        id: "A",
        text: "Segera klik link tersebut untuk mengisi formulir pembatalan demi mengamankan saldo m-banking Anda.",
        isCorrect: false,
        feedback: "Salah! Tautan tersebut adalah situs phishing tiruan yang dibuat mirip situs bank asli. Jika diisi, PIN dan password m-banking Anda akan langsung dicuri pelaku."
      },
      {
        id: "B",
        text: "Jangan mengklik tautan. Hubungi langsung call center resmi bank di nomor resmi atau kunjungi kantor cabang terdekat.",
        isCorrect: true,
        feedback: "Benar sekali! Bank resmi selalu menggunakan domain institusi tepercaya (seperti .co.id) dan tidak pernah mengirim SMS berantai mendesak berisi link eksternal tidak jelas."
      }
    ]
  },
  {
    id: 3,
    scenario: "Paman Anda mengirimkan pesan berantai di grup keluarga: 'Daftar segera! Pemerintah membagikan Bantuan Sosial BPJS Kesehatan sebesar Rp 2.000.000 untuk bulan ini. Batas registrasi tinggal malam ini saja. Daftarkan KTP Anda di: bansos-bpjs-pemerintah.org'.",
    type: "Hoax Bansos",
    clues: [
      "Menggunakan iming-iming dana gratis yang bernilai besar",
      "Membatasi waktu pendaftaran untuk memicu kepanikan",
      "Domain menggunakan .org, bukan domain resmi pemerintah .go.id"
    ],
    choices: [
      {
        id: "A",
        text: "Isi formulir pendaftaran tersebut dengan data KTP Anda lalu sebarkan pesan ini ke grup lain agar saling membantu.",
        isCorrect: false,
        feedback: "Salah! Menyebarkan pesan hoax tanpa verifikasi sangat membahayakan data KTP keluarga Anda dan berisiko disalahgunakan untuk pendaftaran pinjol ilegal."
      },
      {
        id: "B",
        text: "Verifikasi berita di website resmi BPJS Kesehatan atau gunakan JagaIN AI untuk memeriksa teks berita tersebut.",
        isCorrect: true,
        feedback: "Benar sekali! Seluruh program bansos resmi hanya diumumkan melalui situs resmi pemerintah berakhiran .go.id atau akun bercentang biru resmi di media sosial."
      }
    ]
  },
  {
    id: 4,
    scenario: "Seseorang menelpon Anda mengaku dari Customer Service dompet digital Anda dan mengabarkan Anda memenangkan undian berhadiah saldo Rp 1.500.000. Dia meminta Anda menyebutkan 6 digit angka kode verifikasi yang baru saja masuk ke SMS Anda.",
    type: "Social Engineering",
    clues: [
      "Menggunakan rayuan hadiah instan bernilai besar",
      "Penelepon meminta kode rahasia (OTP)",
      "Mendesak untuk memberikan jawaban dengan cepat"
    ],
    choices: [
      {
        id: "A",
        text: "Sebutkan kode verifikasi 6 digit tersebut agar hadiah uang tunai bisa segera ditransfer ke akun Anda.",
        isCorrect: false,
        feedback: "Salah! Kode 6 digit tersebut adalah kode OTP (One-Time Password) untuk login/akses transaksi keuangan Anda. Menyebutkannya berarti menyerahkan brankas Anda ke penipu."
      },
      {
        id: "B",
        text: "Tolak permintaan tersebut secara tegas, matikan panggilan telepon, dan simpan kode OTP untuk diri sendiri.",
        isCorrect: true,
        feedback: "Benar sekali! Pihak bank atau aplikasi e-wallet resmi mana pun TIDAK AKAN PERNAH meminta kode OTP, PIN, atau kata sandi Anda untuk alasan apapun."
      }
    ]
  }
];

function VirtualNewsCard({ children }: { children: React.ReactNode; key?: string | number }) {
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && entry.boundingClientRect.height > 0) {
          setHeight(entry.boundingClientRect.height);
        }
      },
      {
        rootMargin: "600px 0px 600px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ minHeight: height ? `${height}px` : "240px" }}
    >
      {isInView ? (
        children
      ) : (
        <div className="w-full h-full glass-card rounded-2xl border border-white/5 opacity-40 flex items-center justify-center py-16">
          <div className="w-7 h-7 rounded-full border-2 border-secondary/20 border-t-secondary animate-spin" />
        </div>
      )}
    </div>
  );
}

function GununganWatermark({ opacity = "opacity-[0.03]" }: { opacity?: string }) {
  return (
    <div className={`absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 overflow-hidden ${opacity}`}>
      <svg width="260" height="340" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00D4AA]">
        {/* Gunungan border - nested pointed shapes */}
        <path d="M50 5 C75 40 95 85 90 120 C85 130 15 130 10 120 C5 85 25 40 50 5 Z" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 3" />
        <path d="M50 12 C72 45 90 87 85 118 C80 125 20 125 15 118 C10 87 28 45 50 12 Z" stroke="currentColor" strokeWidth="0.5" />
        
        {/* Tree of life trunk */}
        <line x1="50" y1="120" x2="50" y2="45" stroke="currentColor" strokeWidth="1.2" />
        <path d="M50 120 L40 130 M50 120 L60 130" stroke="currentColor" strokeWidth="1" />
        
        {/* Branches */}
        <path d="M50 105 Q70 100 78 85" stroke="currentColor" strokeWidth="0.6" />
        <path d="M50 105 Q30 100 22 85" stroke="currentColor" strokeWidth="0.6" />
        
        <path d="M50 90 Q68 85 72 70" stroke="currentColor" strokeWidth="0.6" />
        <path d="M50 90 Q32 85 28 70" stroke="currentColor" strokeWidth="0.6" />
        
        <path d="M50 75 Q65 70 68 58" stroke="currentColor" strokeWidth="0.6" />
        <path d="M50 75 Q35 70 32 58" stroke="currentColor" strokeWidth="0.6" />

        {/* Traditional wings representing guard / wings of protection */}
        <path d="M50 115 C62 110 72 100 75 92" stroke="currentColor" strokeWidth="0.8" />
        <path d="M50 115 C38 110 28 100 25 92" stroke="currentColor" strokeWidth="0.8" />

        {/* Traditional gate (Candi Bentar) representation at the base of the mountain */}
        <rect x="42" y="110" width="16" height="10" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <line x1="50" y1="110" x2="50" y2="120" stroke="currentColor" strokeWidth="0.6" />
        
        {/* Tiny leaves dots */}
        <circle cx="50" cy="35" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="70" cy="80" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="30" cy="80" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="65" cy="65" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="35" cy="65" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}

const INDONESIA_PROVERBS = [
  {
    text: "Sedia payung sebelum hujan",
    origin: "Peribahasa Indonesia",
    meaning: "Selalu bersiap sedia sebelum terjadi bahaya atau kesusahan.",
    digitalContext: "Selalu pasang antivirus, gunakan kata sandi (password) yang kuat, dan jangan sembarangan mengunduh file APK tak dikenal sebelum Anda merugi."
  },
  {
    text: "Berjalan pelihara kaki, berbicara pelihara lidah",
    origin: "Peribahasa Indonesia",
    meaning: "Selalu berhati-hati dalam melakukan suatu pekerjaan dan dalam mengeluarkan perkataan.",
    digitalContext: "Berhati-hatilah saat berkomentar atau mengunggah tautan di internet. Saring sebelum sharing demi keamanan dan reputasi digital Anda."
  },
  {
    text: "Mulutmu adalah harimaumu",
    origin: "Peribahasa Indonesia",
    meaning: "Kata-kata yang diucapkan dapat mendatangkan celaka bagi diri sendiri jika tidak berhati-hati.",
    digitalContext: "Segala yang kita ketik di dunia siber meninggalkan jejak digital permanen. Berpikirlah secara bijak dan sehat sebelum menekan tombol kirim."
  },
  {
    text: "Bagai air di daun talas",
    origin: "Peribahasa Indonesia",
    meaning: "Pendirian atau keputusan yang tidak teguh, sangat mudah terombang-ambing oleh situasi.",
    digitalContext: "Miliki pendirian kokoh saat membaca berita viral di grup percakapan. Verifikasi kebenaran info tersebut secara mandiri sebelum membagikannya."
  },
  {
    text: "Sesal dahulu pendapatan, sesal kemudian tidak berguna",
    origin: "Peribahasa Indonesia",
    meaning: "Pikirlah masak-masak sebelum melakukan sesuatu agar tidak timbul penyesalan yang terlambat di kemudian hari.",
    digitalContext: "Selalu aktifkan Autentikasi Dua Faktor (2FA) di akun media sosial dan perbankan Anda agar tidak menyesal saat akun diretas atau diambil alih."
  }
];


const REGIONAL_GREETINGS = [
  { text: "Selamat Datang", region: "Indonesia", meaning: "Salam hangat untuk Anda" },
  { text: "Selamat Pagi", region: "Indonesia", meaning: "Salam hangat di pagi hari" },
  { text: "Selamat Siang", region: "Indonesia", meaning: "Salam hangat di siang hari" },
  { text: "Selamat Malam", region: "Indonesia", meaning: "Salam hangat di malam hari" },
  { text: "Salam Sejahtera", region: "Indonesia", meaning: "Doa keselamatan dan kedamaian" },
  { text: "Tetap Waspada", region: "Indonesia", meaning: "Himbauan menjaga keamanan digital" },
  { text: "Salam Aman Siber", region: "Indonesia", meaning: "Mari lindungi data pribadi kita" }
];

const SUPPORTED_MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google Gemini", type: "Google", desc: "Model bawaan super cepat dengan Google Search Grounding bawaan.", grounding: true },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google Gemini", type: "Google", desc: "Kemampuan penalaran siber tingkat tinggi & mendalam dengan Google Search Grounding.", grounding: true },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google Gemini", type: "Google", desc: "Model generasi terbaru dengan latensi ultra rendah & Google Search Grounding.", grounding: true },
  { id: "llama-3.1-70b", name: "Meta Llama 3.1 70B", provider: "Vertex AI (Meta)", type: "Non-Google", desc: "Model open-source terkuat untuk penalaran siber.", grounding: false },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Vertex AI (Anthropic)", type: "Non-Google", desc: "Sangat cerdas dalam mendeteksi ancaman digital terstruktur.", grounding: false },
  { id: "mistral-large-2", name: "Mistral Large 2", provider: "Vertex AI (Mistral)", type: "Non-Google", desc: "Keunggulan multilingual yang tangguh untuk analisis teks lokal.", grounding: false }
];

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  isModelMenuOpen: boolean;
  setIsModelMenuOpen: (open: boolean) => void;
}

function ModelSelector({ selectedModel, setSelectedModel, isModelMenuOpen, setIsModelMenuOpen }: ModelSelectorProps) {
  const currentModel = SUPPORTED_MODELS.find(m => m.id === selectedModel) || SUPPORTED_MODELS[0];
  return (
    <div className="relative z-30 w-full select-none">
      <div 
        onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
        className="glass-card rounded-2xl p-3.5 border border-white/5 hover:border-secondary/35 transition-all cursor-pointer flex items-center justify-between group shadow-lg bg-white/[0.02]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary relative shrink-0 border border-secondary/15">
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#d4af37]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest font-mono shrink-0">
                MODEL AKTIF
              </span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded truncate ${
                currentModel.type === 'Google' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
              }`}>
                {currentModel.provider}
              </span>
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-on-background group-hover:text-secondary transition-colors truncate">
              {currentModel.name}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-secondary flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              GROUNDING SIBER
            </span>
            <span className="text-[8px] text-on-surface-variant/60">Google Search Aktif</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-on-surface-variant/60 group-hover:text-secondary transition-transform duration-200 ${isModelMenuOpen ? 'rotate-90' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isModelMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#091119] border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 max-h-72 overflow-y-auto space-y-1.5 no-scrollbar backdrop-blur-xl"
          >
            <div className="text-[9px] font-extrabold text-[#d4af37] px-2 uppercase tracking-widest pb-1.5 border-b border-white/5 flex items-center justify-between font-mono">
              <span>PILIH MODEL PENELITIAN SIBER</span>
              <span>TERPILIH</span>
            </div>
            {SUPPORTED_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    setIsModelMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected 
                      ? 'border-secondary bg-secondary/15 text-secondary shadow-[0_0_12px_rgba(0,212,170,0.1)]' 
                      : 'border-white/5 hover:border-white/25 bg-white/[0.01] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-on-background">{model.name}</span>
                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        model.type === 'Google' ? 'bg-secondary/15 text-secondary border border-secondary/25' : 'bg-amber-400/15 text-amber-300 border border-amber-400/25'
                      }`}>
                        {model.provider}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">
                      {model.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-1" />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'kabar' | 'hoax' | 'link' | 'ai'>('hoax');
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [subView, setSubView] = useState<null | 'kabar-detail' | 'panduan-hoax' | 'panduan-sosmed' | 'notifications' | 'feedback' | 'kamus-siber' | 'simulasi-quiz' | 'aduan-generator'>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [currentWibTime, setCurrentWibTime] = useState<string>("");

  // Update WIB clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const timeStr = now.toLocaleTimeString("id-ID", options);
      setCurrentWibTime(`${timeStr} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Kamus Siber States
  const [kamusSearch, setKamusSearch] = useState("");
  const [kamusFilter, setKamusFilter] = useState("Semua");

  // Simulasi / Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Aduan Generator States
  const [aduanNama, setAduanNama] = useState("");
  const [aduanKontak, setAduanKontak] = useState("");
  const [aduanTanggal, setAduanTanggal] = useState("");
  const [aduanJenis, setAduanJenis] = useState("Phishing Tautan / Teks");
  const [aduanKerugian, setAduanKerugian] = useState("");
  const [aduanKronologi, setAduanKronologi] = useState("");
  const [aduanPelaku, setAduanPelaku] = useState("");
  const [isAduanGenerated, setIsAduanGenerated] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("jagain_notifications");
    try {
      const decrypted = saved ? deobfuscateData(saved) : null;
      return decrypted ? JSON.parse(decrypted) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // History State
  const [hoaxHistory, setHoaxHistory] = useState<{ text: string; isHoax: boolean; time: string }[]>(() => {
    const saved = localStorage.getItem("jagain_hoax_history");
    try {
      const decrypted = saved ? deobfuscateData(saved) : null;
      return decrypted ? JSON.parse(decrypted) : [
        { text: "Pemberian bantuan subsidi listrik 1jt rupiah", isHoax: true, time: "1 hari yang lalu" },
        { text: "Update jadwal perjalanan KRL Commuter Line Jabodetabek", isHoax: false, time: "2 jam yang lalu" }
      ];
    } catch {
      return [
        { text: "Pemberian bantuan subsidi listrik 1jt rupiah", isHoax: true, time: "1 hari yang lalu" },
        { text: "Update jadwal perjalanan KRL Commuter Line Jabodetabek", isHoax: false, time: "2 jam yang lalu" }
      ];
    }
  });

  const [linkHistory, setLinkHistory] = useState<{ url: string; isSafe: boolean; time: string }[]>(() => {
    const saved = localStorage.getItem("jagain_link_history");
    try {
      const decrypted = saved ? deobfuscateData(saved) : null;
      return decrypted ? JSON.parse(decrypted) : [
        { url: "example.com", isSafe: true, time: "Diperiksa 2 jam yang lalu" },
        { url: "phishing.xyz", isSafe: false, time: "Diperiksa 5 jam yang lalu" }
      ];
    } catch {
      return [
        { url: "example.com", isSafe: true, time: "Diperiksa 2 jam yang lalu" },
        { url: "phishing.xyz", isSafe: false, time: "Diperiksa 5 jam yang lalu" }
      ];
    }
  });

  // Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("jagain_chat_messages");
    try {
      const decrypted = saved ? deobfuscateData(saved) : null;
      return decrypted ? JSON.parse(decrypted) : [
        {
          id: "msg-welcome",
          sender: "ai",
          text: "Halo! Saya asisten khusus Keamanan JagaIN. Saya dikhususkan untuk menjawab pertanyaan seputar keamanan siber, privasi data, dan perlindungan dari penipuan digital (seperti phishing, modus APK palsu). Ada masalah keamanan digital yang ingin Anda tanyakan?"
        }
      ];
    } catch {
      return [
        {
          id: "msg-welcome",
          sender: "ai",
          text: "Halo! Saya asisten khusus Keamanan JagaIN. Saya dikhususkan untuk menjawab pertanyaan seputar keamanan siber, privasi data, dan perlindungan dari penipuan digital (seperti phishing, modus APK palsu). Ada masalah keamanan digital yang ingin Anda tanyakan?"
        }
      ];
    }
  });
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Form Inputs
  const [hoaxInput, setHoaxInput] = useState("");
  const [isHoaxLoading, setIsHoaxLoading] = useState(false);
  const [hoaxResult, setHoaxResult] = useState<HoaxResult | null>(null);
  const [isHoaxModalOpen, setIsHoaxModalOpen] = useState(false);

  const [linkInput, setLinkInput] = useState("");
  const [isLinkLoading, setIsLinkLoading] = useState(false);
  const [linkResult, setLinkResult] = useState<LinkResult | null>(null);

  // RSS News and Real-time Dangerous Links database states
  const [articles, setArticles] = useState<Article[]>([]);
  const [isRssLoading, setIsRssLoading] = useState(false);
  const [dangerousLinks, setDangerousLinks] = useState<any[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(false);

  // State for Infinite Scroll (Berita Terbaru Indonesia)
  const [visibleCount, setVisibleCount] = useState(10);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [newsFilter, setNewsFilter] = useState<'terkini' | 'edukasi'>('terkini');

  // State for Indonesian Cultural Features
  const [proverbIndex, setProverbIndex] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);

  // New Dangerous Link report inputs
  const [reportUrlInput, setReportUrlInput] = useState("");
  const [reportCategoryInput, setReportCategoryInput] = useState("Phishing Perbankan");
  const [reportReasonInput, setReportReasonInput] = useState("");
  const [isReportSubmitting, setIsReportSubmitting] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState("");

  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackCategory, setFeedbackCategory] = useState<'Masalah Teknis' | 'Saran Fitur' | 'Konten Berita' | 'Lainnya' | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const fetchRssAndLinks = async (isManualRefresh = false) => {
    setIsRssLoading(true);
    try {
      const url = isManualRefresh ? `/api/rss-news?refresh=true&t=${Date.now()}` : "/api/rss-news";
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const shuffledIndo = [...INDONESIA_NEWS].sort(() => Math.random() - 0.5);
        const shuffledSosmed = [...SOSMED_TRENDS].sort(() => Math.random() - 0.5);
        const processedData = isManualRefresh ? [...data].sort(() => Math.random() - 0.5) : data;
        setArticles([...processedData, ...shuffledIndo, ...shuffledSosmed]);
      } else {
        throw new Error("No articles parsed");
      }
    } catch (err) {
      console.error("Failed to load RSS news:", err);
      // Direct local high-quality client-side fallback to prevent empty screen/errors
      const todayStr = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
      const fallbackList = [
        {
          id: "fallback-comp-cnn-1",
          title: "Ekowisata Indonesia Makin Populer di Kalangan Turis Mancanegara",
          category: "Wisata & Kuliner",
          source: "CNN Indonesia",
          date: todayStr,
          imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
          content: [
            "Kementerian Pariwisata mencatat kenaikan signifikan kunjungan wisatawan ke destinasi ramah lingkungan seperti Bali Barat dan Raja Ampat.",
            "Fokus pengembangan pariwisata berkelanjutan dinilai berhasil melestarikan keanekaragaman hayati sekaligus menggerakkan ekonomi masyarakat sekitar."
          ],
          linkUrl: "https://www.cnnindonesia.com"
        },
        {
          id: "fallback-comp-cnbc-1",
          title: "Rilis Data Makroekonomi Terbaru: Neraca Perdagangan Kembali Surplus",
          category: "Ekonomi & Bisnis",
          source: "CNBC Indonesia",
          date: todayStr,
          imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80",
          content: [
            "Badan Pusat Statistik mengumumkan neraca perdagangan Indonesia mencatatkan surplus berkat tingginya kinerja ekspor komoditas non-migas.",
            "Para pelaku pasar menyambut positif pengumuman ini, yang diharapkan dapat menjaga nilai tukar rupiah tetap stabil di tengah ketidakpastian global."
          ],
          linkUrl: "https://www.cnbcindonesia.com/news"
        }
      ];
      // On manual refresh, shuffle or inject some extra synthetic articles for immediate visual update
      if (isManualRefresh) {
        const randomCat = Math.random() > 0.5 ? 'terkini' : 'edukasi';
        const extraFallback = generateMoreSyntheticArticles(3, randomCat, articles);
        setArticles(prev => [...extraFallback, ...prev]);
      } else {
        setArticles(prev => prev.length > 0 ? prev : [...fallbackList, ...INDONESIA_NEWS, ...SOSMED_TRENDS]);
      }
    } finally {
      setIsRssLoading(false);
    }

    setIsDbLoading(true);
    try {
      const res = await fetch("/api/dangerous-links");
      const data = await res.json();
      setDangerousLinks(data);
    } catch (err) {
      console.error("Failed to load dangerous links:", err);
    } finally {
      setIsDbLoading(false);
    }
  };

  // Fetch RSS news and real-time dangerous links on mount
  useEffect(() => {
    fetchRssAndLinks();
  }, []);

  // Auto-rotate traditional regional greetings every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % REGIONAL_GREETINGS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleReportLink = async () => {
    if (!reportUrlInput.trim()) {
      alert("Mohon masukkan tautan URL terlebih dahulu.");
      return;
    }
    setIsReportSubmitting(true);
    setReportSuccessMsg("");
    try {
      const res = await fetch("/api/report-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: reportUrlInput,
          category: reportCategoryInput,
          reason: reportReasonInput || undefined
        })
      });
      const data = await res.json();
      if (res.ok) {
        setReportSuccessMsg(data.message || "Laporan berhasil dikirim!");
        setReportUrlInput("");
        setReportReasonInput("");
        // Reload dangerous links
        const dbRes = await fetch("/api/dangerous-links");
        const dbData = await dbRes.json();
        setDangerousLinks(dbData);
      } else {
        alert(data.error || "Gagal melaporkan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setIsReportSubmitting(false);
    }
  };

  const handleVoteLink = async (url: string) => {
    try {
      const res = await fetch("/api/report-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (res.ok) {
        // Reload dangerous links
        const dbRes = await fetch("/api/dangerous-links");
        const dbData = await dbRes.json();
        setDangerousLinks(dbData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Persistent States Saving
  useEffect(() => {
    localStorage.setItem("jagain_notifications", obfuscateData(JSON.stringify(notifications)));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("jagain_hoax_history", obfuscateData(JSON.stringify(hoaxHistory)));
  }, [hoaxHistory]);

  useEffect(() => {
    localStorage.setItem("jagain_link_history", obfuscateData(JSON.stringify(linkHistory)));
  }, [linkHistory]);

  useEffect(() => {
    localStorage.setItem("jagain_chat_messages", obfuscateData(JSON.stringify(messages)));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Unread notifications count
  const unreadCount = notifications.filter(n => n.isUnread).length;

  // Actions
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const handleClearHoaxHistory = () => {
    setHoaxHistory([]);
  };

  const handleClearLinkHistory = () => {
    setLinkHistory([]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // 1. Cek Hoax Analyzer Submit
  const handleAnalyzeHoax = async (textToAnalyze?: any) => {
    const text = (typeof textToAnalyze === "string") ? textToAnalyze : hoaxInput;
    if (!text.trim()) {
      alert("Mohon masukkan teks berita terlebih dahulu.");
      return;
    }

    if (typeof textToAnalyze === "string") {
      setHoaxInput(textToAnalyze);
    }

    setIsHoaxLoading(true);
    setHoaxResult(null);

    // SILENT SECURITY FEATURE: Sanitize any accidentally pasted sensitive data (like OTP, PIN, Credit Cards)
    const sanitizedHoaxInput = sanitizeSensitiveData(text);

    try {
      const res = await fetch("/api/check-hoax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sanitizedHoaxInput, model: selectedModel })
      });
      const data = await res.json();
      setHoaxResult(data);

      // Save to recent checks list using sanitized text to protect privacy
      setHoaxHistory(prev => [
        { text: sanitizedHoaxInput, isHoax: data.isHoax, time: "Baru saja" },
        ...prev.slice(0, 4)
      ]);

      // If it's a hoax, inject a high-priority notification to simulate active protection!
      if (data.isHoax) {
        const newNotif: Notification = {
          id: `alert-${Date.now()}`,
          title: "Hoaks Baru Terdeteksi",
          description: `Teks "${sanitizedHoaxInput.slice(0, 25)}..." terkonfirmasi sebagai disinformasi berbahaya.`,
          time: "Baru saja",
          type: "hoax",
          isUnread: true,
          priority: "high"
        };
        setNotifications(prev => [newNotif, ...prev]);
      }

      setIsHoaxModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHoaxLoading(false);
    }
  };

  // 2. Jaga Link Checker Submit
  const handleCheckLink = async (targetUrl?: string) => {
    const urlToTest = targetUrl || linkInput;
    if (!urlToTest.trim()) {
      alert("Mohon masukkan URL tautan terlebih dahulu.");
      return;
    }

    setIsLinkLoading(true);
    setLinkResult(null);

    // SILENT SECURITY FEATURE: Strip sensitive credential parameters (token, pass, otp) and sanitize Indonesian credentials
    const sanitizedUrl = sanitizeSensitiveData(sanitizeUrlCredentials(urlToTest.trim()));

    try {
      const res = await fetch("/api/check-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sanitizedUrl, model: selectedModel })
      });
      const data = await res.json();
      setLinkResult(data);

      // Add to search history using sanitized URL to protect privacy
      setLinkHistory(prev => [
        { url: sanitizedUrl, isSafe: data.isSafe, time: "Baru saja" },
        ...prev.filter(item => item.url !== sanitizedUrl).slice(0, 4)
      ]);

      // If dangerous, inject notification
      if (!data.isSafe) {
        const newNotif: Notification = {
          id: `link-alert-${Date.now()}`,
          title: "Tautan Berbahaya Ditemukan",
          description: `Tautan "${sanitizedUrl}" berisiko tinggi penipuan / phishing.`,
          time: "Baru saja",
          type: "security",
          isUnread: true,
          priority: "high"
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLinkLoading(false);
    }
  };

  // 3. Tanya AI Chatbot send
  const handleSendChat = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    let currentMessages = messages;
    const currentUserQuestionCount = messages.filter(m => m.sender === "user").length;

    // Jika pengguna sudah bertanya sebanyak 3 kali, otomatis hapus history & mulai sesi baru demi privasi
    if (currentUserQuestionCount >= 3) {
      currentMessages = [
        {
          id: `msg-welcome-reset-${Date.now()}`,
          sender: "ai",
          text: "Sesi tanya jawab baru telah dimulai secara otomatis demi melindungi privasi siber Anda. Silakan tanyakan hal baru."
        }
      ];
    }

    // SILENT SECURITY FEATURE: Strip user sensitive data before saving in UI/history or sending to LLM
    const sanitizedTextToSend = sanitizeSensitiveData(textToSend);

    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: "user",
      text: sanitizedTextToSend
    };

    const updatedMessages = [...currentMessages, userMsg];
    setMessages(updatedMessages);
    if (!presetText) setChatInput("");
    setIsAiTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: sanitizedTextToSend,
          history: currentMessages,
          model: selectedModel
        })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-msg-${Date.now()}`,
        sender: "ai",
        text: data.text,
        alert: data.alert,
        provider: data.provider,
        model: data.model
      };

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== "msg-welcome");
        const base = prev.find(m => m.id === userMsg.id) ? prev : [...prev, userMsg];
        return [...base, aiMsg];
      });
    } catch (err) {
      console.error(err);
      const offlineMsg: ChatMessage = {
        id: `ai-msg-offline-${Date.now()}`,
        sender: "ai",
        text: "Maaf, server AI sedang mengalami kendala jaringan. Harap waspada terhadap tautan asing, jangan pernah berikan kode OTP kepada siapapun!"
      };
      setMessages(prev => [...prev, offlineMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // 4. Send Feedback Form
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackRating === 0 || !feedbackMessage.trim()) {
      alert("Mohon berikan penilaian bintang dan pesan detail masukan Anda.");
      return;
    }
    setIsFeedbackSubmitted(true);
  };

  const handleResetFeedback = () => {
    setFeedbackRating(0);
    setFeedbackCategory(null);
    setFeedbackMessage("");
    setFeedbackEmail("");
    setIsFeedbackSubmitted(false);
    setSubView(null);
  };

  // 5. Infinite Scroll Helpers
  const loadMoreArticles = () => {
    if (isInfiniteLoading) return;
    setIsInfiniteLoading(true);
    setTimeout(() => {
      let poolToUse = [...EXTRA_EDUKASI_ARTICLES, ...EXTRA_TERKINI_ARTICLES];

      setArticles(prev => {
        const currentIds = new Set(prev.map(a => a.id));
        const currentTitles = new Set(prev.map(a => a.title.trim().toLowerCase()));

        // Filter pool to see what is unused relative to the fresh prev state
        const availableFromPool = poolToUse.filter(a => 
          !currentIds.has(a.id) && !currentTitles.has(a.title.trim().toLowerCase())
        );

        let newArticlesToAdd = availableFromPool.slice(0, 3);
        
        // If we got fewer than 3 unique articles, procedurally generate the remaining ones
        if (newArticlesToAdd.length < 3) {
          const neededCount = 3 - newArticlesToAdd.length;
          const combinedTemporaryList = [...prev, ...newArticlesToAdd];
          const randomCat = Math.random() > 0.5 ? 'terkini' : 'edukasi';
          const synthetic = generateMoreSyntheticArticles(neededCount, randomCat, combinedTemporaryList);
          newArticlesToAdd = [...newArticlesToAdd, ...synthetic];
        }

        return [...prev, ...newArticlesToAdd];
      });

      setVisibleCount(prev => prev + 3);
      setIsInfiniteLoading(false);
    }, 1200);
  };

  const getDisplayArticles = () => {
    if (!articles || articles.length === 0) return [];
    
    let filtered = [...articles];

    // Strictly de-duplicate the list by case-insensitive title to ensure NO duplicates are returned
    const uniqueMap = new Map<string, Article>();
    filtered.forEach(art => {
      const key = art.title.trim().toLowerCase();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, art);
      }
    });
    const deDuplicatedList = Array.from(uniqueMap.values());

    return deDuplicatedList.slice(0, visibleCount);
  };

  const getSocialMediaInfo = (art: Article) => {
    if (!art) return { platform: "Media Sosial", color: "from-secondary to-primary", badgeColor: "bg-secondary/10 text-secondary border-secondary/20", label: "💬 Sorotan Sosmed" };
    const srcLower = art.source.toLowerCase();
    const catLower = art.category.toLowerCase();
    if (srcLower.includes('tiktok') || catLower.includes('tiktok')) {
      return { platform: "TikTok", color: "from-[#fe2c55] to-[#25f4ee]", badgeColor: "bg-[#fe2c55]/10 text-[#fe2c55] border-[#fe2c55]/20", label: "🎵 TikTok FYP Trend" };
    }
    if (srcLower.includes('instagram') || srcLower.includes('ig') || catLower.includes('instagram') || catLower.includes('kuliner')) {
      return { platform: "Instagram", color: "from-[#f12711] to-[#f5af19]", badgeColor: "bg-[#f12711]/10 text-[#f12711] border-[#f12711]/20", label: "📸 Instagram Viral" };
    }
    if (srcLower.includes('x') || srcLower.includes('twitter') || srcLower.includes('menfess') || catLower.includes('x') || catLower.includes('thread')) {
      return { platform: "X (Twitter)", color: "from-[#1da1f2] to-[#0e1726]", badgeColor: "bg-[#1da1f2]/10 text-[#1da1f2] border-[#1da1f2]/20", label: "🐦 X Trending Topic" };
    }
    return { platform: "Media Sosial", color: "from-secondary to-primary", badgeColor: "bg-secondary/10 text-secondary border-secondary/20", label: "💬 Sorotan Sosmed" };
  };

  const handleMainScroll = (e: React.UIEvent<HTMLElement>) => {
    if (activeTab !== 'kabar' || subView) return;
    const target = e.currentTarget;
    const threshold = 100;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < threshold;
    if (isNearBottom && !isInfiniteLoading) {
      loadMoreArticles();
    }
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <div className="min-h-screen bg-[#04020a] bg-batik-kawung flex justify-center items-center py-0 sm:py-6 px-0 sm:px-4 relative overflow-hidden">
      {/* Decorative Outer Ambient Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none select-none" />

      {/* Screen Mockup Container */}
      <div className="w-full max-w-md bg-[#09081a] h-[100dvh] sm:h-[880px] sm:rounded-3xl sm:border sm:border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden flex flex-col relative">
        
        {/* Full Screen Batik Background Overlay */}
        <div className="absolute inset-0 bg-batik-kawung opacity-[0.25] pointer-events-none select-none z-0" />
        
        {/* TOP BAR / HEADER */}
        <header className="absolute top-0 left-0 w-full z-40 h-16 bg-[#09081a]/80 backdrop-blur-lg border-b border-white/5 flex justify-between items-center px-5">
          <div className="flex items-center gap-3 relative z-10">
            {subView ? (
              <button
                onClick={() => {
                  setSubView(null);
                  if (activeTab === 'kabar' && subView === 'kabar-detail') {
                    setSelectedArticleId(null);
                  }
                }}
                className="p-1 -ml-1 text-on-surface hover:text-secondary transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            ) : (
              <ShieldCheck className="w-7 h-7 text-secondary fill-secondary/10" />
            )}
            
            <h1 className="font-sans text-xl font-bold tracking-tight text-on-background flex items-center gap-1.5">
              {subView === 'notifications' && "Notifikasi"}
              {subView === 'feedback' && "Kirim Masukan"}
              {subView === 'panduan-hoax' && "Panduan Cek Hoax"}
              {subView === 'panduan-sosmed' && "Panduan Media Sosial"}
              {subView === 'kabar-detail' && "Kabar Detail"}
              {subView === 'kamus-siber' && "Kamus Istilah Siber"}
              {subView === 'simulasi-quiz' && "Uji Literasi Siber"}
              {subView === 'aduan-generator' && "Aduan Siber Generator"}
              {!subView && (
                <>
                  <span className="bg-gradient-to-r from-secondary via-[#d4af37] to-secondary bg-clip-text text-transparent font-extrabold tracking-tight">JagaIN</span>
                  {activeTab === 'ai' && (
                    <span className="text-secondary font-semibold text-base ml-2 border-l border-white/20 pl-2">Tanya AI</span>
                  )}
                </>
              )}
            </h1>
          </div>

          <div className="flex items-center">
            {subView !== 'notifications' && (
              <button
                onClick={() => setSubView('notifications')}
                className="p-2 relative hover:opacity-80 transition-opacity active:scale-95 duration-200"
              >
                <Bell className="w-6 h-6 text-on-surface-variant" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-background animate-pulse" />
                )}
              </button>
            )}
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main onScroll={handleMainScroll} className="flex-1 overflow-y-auto pt-20 pb-24 no-scrollbar">
          <AnimatePresence mode="wait">
            
            {/* SUBVIEWS (MODALS/FULL PAGES OVER TAB MAIN CONTENT) */}
            {subView === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-5 space-y-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">HARI INI</h3>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllNotificationsRead}
                        className="text-[10px] font-semibold text-secondary hover:underline transition-all cursor-pointer"
                      >
                        Tandai Semua Dibaca
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearNotifications}
                        className="text-[10px] text-on-surface-variant hover:text-secondary flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <History className="w-3 h-3" /> Bersihkan
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isUnread: false } : n));
                        }}
                        className={`glass-card rounded-xl p-3.5 flex gap-3.5 transition-all cursor-pointer relative ${
                          notif.isUnread ? "bg-white/[0.03] border border-white/10" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        {notif.isUnread && (
                          <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-secondary" />
                        )}
                        
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center text-on-surface-variant">
                          {notif.type === "security" && <ShieldAlert className="w-5 h-5 text-error" />}
                          {notif.type === "news" && <Newspaper className="w-5 h-5 text-primary" />}
                          {notif.type === "hoax" && <AlertTriangle className="w-5 h-5 text-[#d4af37]" />}
                          {notif.type === "system" && <CheckCircle2 className="w-5 h-5 text-secondary" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className={`text-sm text-on-background truncate ${notif.isUnread ? "font-bold" : "font-medium"}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] text-on-surface-variant/60 font-mono shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant/80 mt-1 leading-relaxed">{notif.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-on-surface-variant/40">Tidak ada notifikasi.</div>
                  )}
                </div>
              </motion.div>
            )}

            {subView === 'feedback' && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-5"
              >
                {!isFeedbackSubmitted ? (
                  <form onSubmit={handleSubmitFeedback} className="space-y-6">
                    <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-28 h-28 bg-secondary/10 rounded-full blur-2xl"></div>
                      <h3 className="font-bold text-lg text-secondary mb-1">Suara Anda Penting</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Bantu kami meningkatkan JagaIN Shield System dengan memberikan penilaian dan masukan tulus Anda.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">TINGKAT KEPUASAN</label>
                      <div className="glass-card rounded-xl p-4 flex justify-between items-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((starValue) => (
                            <button
                              type="button"
                              key={starValue}
                              onClick={() => setFeedbackRating(starValue)}
                              className="focus:outline-none transition-transform hover:scale-110 active:scale-95 duration-150"
                            >
                              <Star className={`w-8 h-8 ${
                                feedbackRating >= starValue ? 'text-secondary fill-secondary' : 'text-on-surface-variant/30'
                              }`} />
                            </button>
                          ))}
                        </div>
                        {feedbackRating > 0 && (
                          <span className="text-secondary font-bold text-xs tracking-wider animate-pulse">
                            {["BURUK", "KURANG", "CUKUP", "BAIK", "MEMUASKAN"][feedbackRating - 1]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">KATEGORI MASUKAN</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'Masalah Teknis', icon: Construction },
                          { key: 'Saran Fitur', icon: Lightbulb },
                          { key: 'Konten Berita', icon: Newspaper },
                          { key: 'Lainnya', icon: MoreHorizontal }
                        ].map((cat) => {
                          const IconComp = cat.icon;
                          const isSelected = feedbackCategory === cat.key;
                          return (
                            <button
                              type="button"
                              key={cat.key}
                              onClick={() => setFeedbackCategory(cat.key as any)}
                              className={`glass-card rounded-xl py-3.5 px-4 text-left border transition-all flex items-center gap-2.5 ${
                                isSelected ? 'border-secondary bg-secondary/10' : 'border-white/5 hover:border-white/20'
                              }`}
                            >
                              <IconComp className={`w-5 h-5 ${isSelected ? 'text-secondary' : 'text-on-surface-variant'}`} />
                              <span className="text-sm font-semibold">{cat.key}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">DETAIL MASUKAN</label>
                      <div className="relative">
                        <textarea
                          value={feedbackMessage}
                          onChange={(e) => setFeedbackMessage(e.target.value.slice(0, 500))}
                          className="w-full min-h-[140px] bg-surface-container-low border border-white/5 rounded-2xl p-4 text-on-surface text-sm focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none placeholder:text-white/20 resize-none leading-relaxed"
                          placeholder="Tuliskan pengalaman atau saran Anda di sini..."
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-on-surface-variant/40 font-mono">
                          {feedbackMessage.length}/500
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">EMAIL (OPSIONAL)</label>
                      <div className="glass-card rounded-2xl flex items-center px-4 focus-within:border-secondary transition-all">
                        <Mail className="w-5 h-5 text-white/20 mr-3" />
                        <input
                          type="email"
                          value={feedbackEmail}
                          onChange={(e) => setFeedbackEmail(e.target.value)}
                          className="w-full bg-transparent border-none py-4 text-sm text-on-surface focus:ring-0 outline-none placeholder:text-white/20"
                          placeholder="name@example.com"
                        />
                      </div>
                      <p className="text-[11px] text-white/30 italic">Kami hanya menghubungi jika diperlukan klarifikasi lanjutan.</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-background py-4 rounded-2xl font-bold text-base flex justify-center items-center gap-2 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,212,170,0.25)]"
                    >
                      <Send className="w-5 h-5 fill-background" />
                      Kirim Masukan
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-2 border-secondary animate-ping opacity-25"></div>
                      <CheckCircle2 className="w-14 h-14 text-secondary fill-secondary/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-bold text-2xl text-on-background">Berhasil Terkirim!</h3>
                      <p className="text-on-surface-variant text-base max-w-[280px] mx-auto leading-relaxed">
                        Terima kasih atas partisipasi Anda dalam menjaga ekosistem digital JagaIN.
                      </p>
                    </div>

                    <button
                      onClick={handleResetFeedback}
                      className="glass-card px-8 py-3 rounded-full text-secondary font-bold hover:bg-secondary/5 transition-all active:scale-95 duration-150 border border-secondary/35"
                    >
                      Kembali ke Beranda
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {subView === 'panduan-hoax' && (
              <motion.div
                key="panduan-hoax"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-5 space-y-8"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-secondary/10 blur-xl"></div>
                    <div className="w-full h-full rounded-full bg-surface-container border border-secondary/30 flex items-center justify-center glow-secondary">
                      <ShieldCheck className="w-10 h-10 text-secondary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-on-background">Cara Cek Berita Hoax dengan AI</h3>
                  <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                    Lindungi diri dari disinformasi. JagaIN AI akan memindai dan memvalidasi setiap teks atau tautan yang Anda temukan secara seketika.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[23px] top-6 bottom-12 w-[2px] bg-gradient-to-b from-secondary/50 via-outline-variant/30 to-transparent"></div>
                  
                  {[
                    { step: 1, title: "Salin Tautan atau Teks", icon: Copy, desc: "Temukan pesan, broadcast, atau berita mencurigakan. Blok lalu salin (copy) teks tersebut dari browser atau chat WhatsApp Anda." },
                    { step: 2, title: "Buka Menu Hoax", icon: ShieldAlert, desc: "Kembali ke aplikasi JagaIN dan pilih tab khusus 'Hoax' pada navigasi bar di bagian bawah." },
                    { step: 3, title: "Tempel dan Analisis", icon: FileText, desc: "Tempelkan (paste) konten pada kolom input yang disediakan, lalu tekan tombol 'ANALISIS' untuk memicu verifikasi AI." },
                    { step: 4, title: "Pahami Hasil AI", icon: Sparkles, desc: "Tinjau skor kepercayaan dan rincian penjelasan yang diberikan oleh AI untuk mengambil keputusan yang aman." }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="relative z-10 flex gap-4 mb-6">
                        <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container border border-secondary/20 flex items-center justify-center glow-secondary text-secondary font-bold text-base">
                          {item.step}
                        </div>
                        <div className="flex-1 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-4.5 h-4.5 text-on-surface-variant" />
                            <h4 className="font-semibold text-base text-on-background">{item.title}</h4>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubView(null);
                      setActiveTab('hoax');
                    }}
                    className="w-full bg-secondary hover:bg-secondary/90 text-background rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all glow-secondary"
                  >
                    <ShieldCheck className="w-5 h-5 fill-background" />
                    Coba Cek Sekarang
                  </button>
                </div>
              </motion.div>
            )}

            {subView === 'panduan-sosmed' && (
              <motion.div
                key="panduan-sosmed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-5 space-y-6"
              >
                <div className="glass-card rounded-2xl overflow-hidden relative border border-white/5">
                  <div className="h-32 w-full relative">
                    <img
                      className="w-full h-full object-cover opacity-50"
                      referrerPolicy="no-referrer"
                      alt="Cybersecurity concept illustration"
                      src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09081a] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-4 -mt-6 relative z-10">
                    <h3 className="font-bold text-lg text-on-background mb-1">Panduan Keamanan Media Sosial</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Langkah-langkah esensial untuk melindungi data pribadi dan mencegah pengambilalihan akun Anda dari ancaman siber.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Aktifkan 2FA", icon: Lock, border: "border-secondary/20 font-bold glow-secondary text-secondary", desc: "Gunakan Autentikasi Dua Faktor (2FA) sebagai lapis keamanan ganda. Aplikasi autentikator seperti Google Authenticator sangat disarankan dibanding verifikasi SMS." },
                    { title: "Cek Privasi Akun", icon: User, border: "border-primary/20 text-primary", desc: "Tinjau pengaturan privasi secara berkala. Pastikan hanya teman tepercaya yang dapat melihat informasi pribadi, postingan, dan daftar kontak Anda." },
                    { title: "Gunakan Kata Sandi Kuat", icon: ShieldAlert, border: "border-tertiary/20 text-tertiary", desc: "Buat kata sandi unik untuk setiap akun dengan kombinasi huruf besar-kecil, angka, dan simbol. Lebih baik gunakan bantuan Password Manager." },
                    { title: "Waspada Aplikasi Pihak Ketiga", icon: MoreHorizontal, border: "border-error/20 text-error", desc: "Periksa dan cabut akses aplikasi pihak ketiga yang tidak lagi digunakan atau mencurigakan di bagian pengaturan integrasi akun media sosial Anda." }
                  ].map((tip, idx) => {
                    const IconComp = tip.icon;
                    return (
                      <div key={idx} className="glass-card p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border ${tip.border}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-base text-on-background">{tip.title}</h4>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{tip.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {subView === 'kamus-siber' && (
              <motion.div
                key="kamus-siber"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-5 space-y-6"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={kamusSearch}
                    onChange={(e) => setKamusSearch(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface placeholder:opacity-45"
                    placeholder="Cari kata kunci (misal: APK, OTP)..."
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4.5 h-4.5" />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {["Semua", "Metode Serangan", "Modus Populer", "Teknis"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setKamusFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                        kamusFilter === cat
                          ? 'bg-secondary text-background border-secondary font-bold shadow-[0_0_10px_rgba(0,212,170,0.2)]'
                          : 'bg-white/5 text-on-surface-variant border-white/10 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {GLOSSARY_ITEMS.filter(item => {
                    const matchesSearch = item.term.toLowerCase().includes(kamusSearch.toLowerCase()) || 
                                          item.definition.toLowerCase().includes(kamusSearch.toLowerCase()) ||
                                          item.modus.toLowerCase().includes(kamusSearch.toLowerCase());
                    const matchesCat = kamusFilter === "Semua" || item.category === kamusFilter;
                    return matchesSearch && matchesCat;
                  }).map((item, idx) => (
                    <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col gap-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary opacity-40 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base text-secondary">{item.term}</h4>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-on-surface-variant border border-white/5">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs text-on-surface leading-relaxed font-semibold">
                        {item.definition}
                      </p>

                      <div className="mt-2 space-y-2.5 pt-2 border-t border-white/5 text-xs">
                        <div>
                          <span className="font-bold text-secondary text-[10px] uppercase tracking-widest block mb-0.5">💡 Analogi Sederhana:</span>
                          <p className="text-on-surface-variant leading-relaxed">{item.analogy}</p>
                        </div>
                        <div>
                          <span className="font-bold text-[#ff4757] text-[10px] uppercase tracking-widest block mb-0.5">⚠️ Modus di Indonesia:</span>
                          <p className="text-on-surface-variant leading-relaxed">{item.modus}</p>
                        </div>
                        <div>
                          <span className="font-bold text-secondary text-[10px] uppercase tracking-widest block mb-0.5">🛡️ Cara Pencegahan:</span>
                          <p className="text-on-surface-variant leading-relaxed">{item.tips}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {GLOSSARY_ITEMS.filter(item => {
                    const matchesSearch = item.term.toLowerCase().includes(kamusSearch.toLowerCase()) || 
                                          item.definition.toLowerCase().includes(kamusSearch.toLowerCase()) ||
                                          item.modus.toLowerCase().includes(kamusSearch.toLowerCase());
                    const matchesCat = kamusFilter === "Semua" || item.category === kamusFilter;
                    return matchesSearch && matchesCat;
                  }).length === 0 && (
                    <div className="text-center py-12 text-on-surface-variant/50 text-sm">
                      Istilah atau kata kunci tidak ditemukan.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {subView === 'simulasi-quiz' && (
              <motion.div
                key="simulasi-quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-5 space-y-6"
              >
                {!quizCompleted ? (
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold tracking-widest text-on-surface-variant uppercase font-mono">
                        <span>KASUS {quizIndex + 1} DARI {QUIZ_QUESTIONS.length}</span>
                        <span className="text-secondary">{Math.round(((quizIndex) / QUIZ_QUESTIONS.length) * 100)}% SELESAI</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div 
                          className="bg-secondary h-full transition-all duration-300"
                          style={{ width: `${((quizIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-secondary/10 text-secondary border-b border-l border-white/5 px-2.5 py-1 rounded-bl-xl text-[9px] font-bold uppercase tracking-wider">
                        {QUIZ_QUESTIONS[quizIndex].type}
                      </div>

                      <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">SKENARIO LAPANGAN</h3>
                      <p className="text-xs text-on-background leading-relaxed font-semibold">
                        "{QUIZ_QUESTIONS[quizIndex].scenario}"
                      </p>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider block mb-1">🔍 PETUNJUK ANCAMAN DI LAPANGAN:</span>
                        <div className="flex flex-col gap-1">
                          {QUIZ_QUESTIONS[quizIndex].clues.map((clue, cIdx) => (
                            <div key={cIdx} className="text-[11px] text-on-surface-variant flex items-start gap-1.5 leading-relaxed">
                              <span className="text-error mt-0.5">•</span>
                              <span>{clue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {QUIZ_QUESTIONS[quizIndex].choices.map((choice) => {
                        const isSelected = selectedQuizAnswer === choice.id;
                        return (
                          <button
                            key={choice.id}
                            disabled={showQuizFeedback}
                            onClick={() => {
                              setSelectedQuizAnswer(choice.id);
                              setShowQuizFeedback(true);
                              if (choice.isCorrect) {
                                setQuizScore(prev => prev + 1);
                              }
                            }}
                            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer group ${
                              showQuizFeedback 
                                ? choice.isCorrect 
                                  ? 'bg-secondary/15 border-secondary text-secondary' 
                                  : isSelected 
                                    ? 'bg-error/15 border-error text-error' 
                                    : 'bg-white/5 border-white/5 text-on-surface-variant/40'
                                : 'bg-surface-container border-white/5 hover:border-secondary/40 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              showQuizFeedback
                                ? choice.isCorrect
                                  ? 'border-secondary bg-secondary text-background'
                                  : isSelected
                                    ? 'border-error bg-error text-background'
                                    : 'border-white/10'
                                : 'border-white/20 group-hover:border-secondary group-hover:text-secondary'
                            }`}>
                              {choice.id}
                            </div>
                            <span className="text-xs font-bold leading-relaxed">{choice.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation */}
                    {showQuizFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          {QUIZ_QUESTIONS[quizIndex].choices.find(c => c.id === selectedQuizAnswer)?.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-secondary" />
                              <span className="text-[10px] font-bold text-secondary tracking-wider uppercase font-mono">PILIHAN ANDA BENAR!</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-5 h-5 text-error" />
                              <span className="text-[10px] font-bold text-error tracking-wider uppercase font-mono">PILIHAN ANDA KURANG TEPAT!</span>
                            </>
                          )}
                        </div>

                        <p className="text-xs text-on-surface leading-relaxed">
                          {QUIZ_QUESTIONS[quizIndex].choices.find(c => c.id === selectedQuizAnswer)?.feedback}
                        </p>

                        <button
                          onClick={() => {
                            setSelectedQuizAnswer(null);
                            setShowQuizFeedback(false);
                            if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
                              setQuizIndex(prev => prev + 1);
                            } else {
                              setQuizCompleted(true);
                            }
                          }}
                          className="w-full mt-2 bg-secondary text-background font-bold text-xs tracking-widest py-3 rounded-xl flex justify-center items-center gap-2 glow-secondary cursor-pointer"
                        >
                          <span>{quizIndex + 1 < QUIZ_QUESTIONS.length ? "PERTANYAAN BERIKUTNYA" : "LIHAT HASIL AKHIR"}</span>
                          <ChevronRight className="w-4 h-4 text-background" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-center space-y-6 py-6"
                  >
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-secondary/10 blur-2xl"></div>
                      <div className="w-full h-full rounded-full bg-surface-container border border-secondary/30 flex items-center justify-center">
                        <Star className="w-12 h-12 text-secondary fill-secondary/15 animate-bounce" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-extrabold text-xl text-on-background">Simulasi Selesai!</h3>
                      <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                        Terima kasih telah mengikuti simulasi. Pemahaman aktif seperti ini adalah kunci melindungi diri dari kurangnya literasi informasi siber.
                      </p>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border border-white/5 max-w-xs mx-auto space-y-1 bg-white/[0.01]">
                      <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest font-mono">SKOR KOGNITIF SIBER ANDA</span>
                      <h4 className="text-3xl font-extrabold text-secondary">{quizScore} / {QUIZ_QUESTIONS.length}</h4>
                      <p className="text-[11px] text-on-surface font-semibold pt-1">
                        {quizScore === QUIZ_QUESTIONS.length 
                          ? "🥇 SEMPURNA! Anda Jagoan Siber Sejati!" 
                          : quizScore >= 3 
                            ? "🥈 BAGUS! Anda sudah cukup waspada." 
                            : "🥉 WASPADA! Anda rentan terkena penipuan."}
                      </p>
                    </div>

                    <div className="pt-4 flex gap-3 max-w-sm mx-auto">
                      <button
                        onClick={() => {
                          setQuizIndex(0);
                          setQuizScore(0);
                          setSelectedQuizAnswer(null);
                          setShowQuizFeedback(false);
                          setQuizCompleted(false);
                        }}
                        className="flex-1 py-3.5 text-xs font-bold tracking-wider border border-white/10 rounded-2xl hover:bg-white/5 transition-colors text-on-surface cursor-pointer"
                      >
                        ULANGI KUIS
                      </button>
                      <button
                        onClick={() => {
                          setSubView(null);
                          setActiveTab('kabar');
                        }}
                        className="flex-1 py-3.5 text-xs font-bold tracking-wider bg-secondary text-background rounded-2xl shadow-lg cursor-pointer"
                      >
                        SELESAI
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {subView === 'aduan-generator' && (
              <motion.div
                key="aduan-generator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-5 space-y-6 pb-12"
              >
                {!isAduanGenerated ? (
                  <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Layanan pembuat draf surat pelaporan resmi (aduan) jika Anda atau kerabat menjadi korban penipuan online. Salin hasil draf untuk dikirimkan ke portal resmi pemerintah.
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Nama Korban (Pelapor)</label>
                        <input
                          type="text"
                          value={aduanNama}
                          onChange={(e) => setAduanNama(e.target.value)}
                          placeholder="Nama lengkap Anda"
                          className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Kontak Pelapor (HP/WA)</label>
                          <input
                            type="text"
                            value={aduanKontak}
                            onChange={(e) => setAduanKontak(e.target.value)}
                            placeholder="Nomor ponsel aktif"
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Tanggal Kejadian</label>
                          <input
                            type="date"
                            value={aduanTanggal}
                            onChange={(e) => setAduanTanggal(e.target.value)}
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Jenis Insiden</label>
                          <select
                            value={aduanJenis}
                            onChange={(e) => setAduanJenis(e.target.value)}
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface outline-none focus:border-secondary transition-all"
                          >
                            <option value="Phishing Tautan / Teks">Phishing Tautan</option>
                            <option value="Malware APK Palsu">Malware APK Palsu</option>
                            <option value="Pembajakan Akun Sosmed">Pembajakan Akun</option>
                            <option value="Pemerasan Ransomware">Pemerasan Ransomware</option>
                            <option value="Penipuan Dana / QRIS">Penipuan Dana/QRIS</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Total Kerugian (Rp)</label>
                          <input
                            type="text"
                            value={aduanKerugian}
                            onChange={(e) => setAduanKerugian(e.target.value)}
                            placeholder="Contoh: 5.000.000"
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Identitas Pelaku (Jika Ada)</label>
                        <input
                          type="text"
                          value={aduanPelaku}
                          onChange={(e) => setAduanPelaku(e.target.value)}
                          placeholder="No Rekening / No WA / Akun Sosmed Penipu"
                          className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Kronologi Singkat</label>
                        <textarea
                          value={aduanKronologi}
                          onChange={(e) => setAduanKronologi(e.target.value)}
                          placeholder="Ceritakan kejadiannya secara urut..."
                          className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all h-20 resize-none outline-none leading-normal"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!aduanNama || !aduanKontak || !aduanTanggal || !aduanKronologi) {
                          alert("Mohon lengkapi Nama, Kontak, Tanggal, dan Kronologi terlebih dahulu.");
                          return;
                        }
                        setIsAduanGenerated(true);
                      }}
                      className="w-full bg-secondary text-background font-bold text-xs tracking-widest py-3.5 rounded-2xl flex justify-center items-center gap-2 glow-secondary active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 fill-background" />
                      BUAT SURAT ADUAN
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 animate-fade-in"
                  >
                    <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">DRAF SURAT ADUAN RESMI</span>
                        <button
                          onClick={() => {
                            const doc = `KEPADA YTH.\nKEMENTERIAN KOMINFO RI / KEPOLISIAN REPUBLIK INDONESIA\n\nHAL: LAPORAN INSIDEN KEAMANAN SIBER & PENIPUAN ONLINE\n\nDengan hormat,\nSaya yang bertanda tangan di bawah ini melaporkan insiden kejahatan siber dengan rincian:\n\n1. Identitas Korban (Pelapor):\n   - Nama Lengkap: ${aduanNama}\n   - Kontak: ${aduanKontak}\n\n2. Rincian Insiden Kejahatan:\n   - Jenis Insiden: ${aduanJenis}\n   - Tanggal Kejadian: ${aduanTanggal}\n   - Kerugian Finansial: Rp ${aduanKerugian || "0"}\n   - Identitas Pelaku: ${aduanPelaku || "Tidak Diketahui"}\n\n3. Kronologi Singkat Kejadian:\n   ${aduanKronologi}\n\nDemikian laporan ini saya buat dengan sebenar-benarnya untuk ditindaklanjuti.\n\nHormat Saya,\n${aduanNama}`;
                            navigator.clipboard.writeText(doc);
                            alert("Draf surat laporan berhasil disalin ke clipboard!");
                          }}
                          className="text-[9px] font-bold text-secondary flex items-center gap-1 bg-white/5 border border-white/5 hover:border-secondary/35 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" /> Salin Draf
                        </button>
                      </div>

                      {/* Letter Preview Box */}
                      <div className="bg-background/90 border border-white/5 p-4 rounded-xl text-[10px] font-mono leading-relaxed text-on-surface-variant max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
{`KEPADA YTH.
KEMENTERIAN KOMINFO RI / KEPOLISIAN RI

HAL: LAPORAN INSIDEN KEAMANAN SIBER & PENIPUAN ONLINE

Dengan hormat,
Saya yang bertanda tangan di bawah ini melaporkan insiden kejahatan siber dengan rincian:

1. Identitas Korban (Pelapor):
   - Nama Lengkap: ${aduanNama}
   - Kontak: ${aduanKontak}

2. Rincian Insiden Kejahatan:
   - Jenis Insiden: ${aduanJenis}
   - Tanggal Kejadian: ${aduanTanggal}
   - Kerugian Finansial: Rp ${aduanKerugian || "0"}
   - Identitas Pelaku: ${aduanPelaku || "Tidak Diketahui"}

3. Kronologi Singkat Kejadian:
   ${aduanKronologi}

Demikian laporan ini saya buat dengan sebenar-benarnya untuk ditindaklanjuti.

Hormat Saya,
${aduanNama}`}
                      </div>
                    </div>

                    {/* Official Channels Action Grid */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider block font-mono">SALURAN PENGADUAN RESMI PEMERINTAH</span>
                      <div className="grid grid-cols-1 gap-2">
                        <a
                          href="https://www.patrolisiber.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 glass-card rounded-2xl border border-white/5 hover:border-secondary/30 bg-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-on-background">Patroli Siber Polri</h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">Kirim draf aduan ke portal resmi Kepolisian RI</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                          href="https://www.aduankonten.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 glass-card rounded-2xl border border-white/5 hover:border-secondary/30 bg-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-on-background">Aduan Konten Kominfo</h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">Laporkan konten phishing/hoax berbahaya</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                          href="https://www.lapor.go.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 glass-card rounded-2xl border border-white/5 hover:border-secondary/30 bg-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-on-background">Lapor.go.id</h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">Sampaikan laporan aspirasi dan pengaduan rakyat siber</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsAduanGenerated(false);
                        }}
                        className="flex-1 py-3 text-xs font-bold tracking-wider border border-white/10 rounded-2xl hover:bg-white/5 transition-colors text-on-surface cursor-pointer"
                      >
                        EDIT ADUAN
                      </button>
                      <button
                        onClick={() => {
                          setSubView(null);
                          setActiveTab('kabar');
                          setIsAduanGenerated(false);
                          setAduanNama("");
                          setAduanKontak("");
                          setAduanTanggal("");
                          setAduanKerugian("");
                          setAduanKronologi("");
                          setAduanPelaku("");
                        }}
                        className="flex-1 py-3 text-xs font-bold bg-secondary text-background rounded-2xl tracking-wider hover:opacity-90 transition-all cursor-pointer"
                      >
                        SELESAI
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {subView === 'kabar-detail' && selectedArticle && (
              <motion.div
                key="kabar-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="relative w-full h-64 overflow-hidden bg-surface-container border-b border-white/5">
                  <img
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                    alt={selectedArticle.title}
                    src={selectedArticle.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="bg-secondary/20 text-secondary border border-secondary/35 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase inline-block mb-2">
                      {selectedArticle.category}
                    </span>
                    <h3 className="font-bold text-lg text-on-background leading-snug">
                      {selectedArticle.title}
                    </h3>
                  </div>
                </div>

                <div className="px-5 flex items-center gap-3 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-secondary" /> {selectedArticle.source}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.date}
                  </span>
                </div>

                <div className="px-5 space-y-4 text-sm text-on-surface-variant leading-relaxed">
                  {Array.isArray(selectedArticle.content) ? (
                    selectedArticle.content.map((p, index) => (
                      <p key={index}>{p}</p>
                    ))
                  ) : typeof selectedArticle.content === "string" ? (
                    <p>{selectedArticle.content}</p>
                  ) : (
                    <p>Konten berita tidak tersedia.</p>
                  )}
                  {selectedArticle.linkUrl && selectedArticle.linkUrl !== "#" && (
                    <a 
                      href={selectedArticle.linkUrl.startsWith('http://') || selectedArticle.linkUrl.startsWith('https://') 
                        ? selectedArticle.linkUrl 
                        : 'https://' + selectedArticle.linkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-2 text-secondary font-bold hover:underline flex items-center gap-1 text-sm bg-white/5 py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors w-full text-center justify-center cursor-pointer"
                    >
                      <span>🔗 Baca Selengkapnya di Portal Resmi {selectedArticle.source}</span>
                    </a>
                  )}
                </div>

                <div className="px-5">
                  <div className="glass-card p-5 rounded-2xl border-secondary/30 relative overflow-hidden">
                    <div className="absolute -right-5 -top-5 opacity-10">
                      <ShieldCheck className="w-24 h-24 text-secondary" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-secondary font-bold text-sm mb-1.5 flex items-center gap-2">
                        <Sparkles className="w-4.5 h-4.5" />
                        Validasi Cerdas AI
                      </h4>
                      <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                        Pastikan kebenaran berita ini. AI kami akan memvalidasi konten berdasarkan perbandingan penilaian kredibilitas sumber berita.
                      </p>
                      <button
                        onClick={() => {
                          const contentText = Array.isArray(selectedArticle.content) 
                            ? selectedArticle.content.join(' ') 
                            : selectedArticle.content;
                          const verificationText = `Judul: ${selectedArticle.title}\nSumber Berita: ${selectedArticle.source}\nKategori: ${selectedArticle.category}\nDetail Konten: ${contentText}`;
                          
                          setActiveTab('hoax');
                          setSubView(null);
                          handleAnalyzeHoax(verificationText);
                        }}
                        className="w-full bg-secondary hover:bg-secondary/90 text-background font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm shadow-[0_0_15px_rgba(0,212,170,0.2)]"
                      >
                        <ShieldAlert className="w-4.5 h-4.5 fill-background" />
                        Verifikasi Berita Ini dengan AI
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MAIN NAVIGATION TABS */}
            {!subView && activeTab === 'kabar' && (
              <motion.div
                key="tab-kabar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-5 space-y-6 relative overflow-hidden w-full animate-fade-in"
              >
                <GununganWatermark opacity="opacity-[0.035]" />
                <div className="relative z-10 space-y-6">
                  {/* BEAUTIFIED HEADER SECTION - WARTA UTAMA SIBER */}
                  <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#121c27] via-[#091017] to-[#04080c] p-5.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                    {/* Golden traditional ornament frame glow */}
                    <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                    
                    {/* Full width batik band background watermark with low opacity */}
                    <div className="absolute inset-0 bg-batik-band bg-repeat-x bg-[bottom_0_right_0] bg-[length:140px_20px] opacity-[0.06] pointer-events-none mix-blend-overlay" />
                    
                    <div className="relative z-10 space-y-4">
                      {/* Sub-header bar with interactive dynamic greetings */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                        
                        {/* Dynamic Interactive Greeting Selector */}
                        <button
                          onClick={() => {
                            setGreetingIndex((prev) => (prev + 1) % REGIONAL_GREETINGS.length);
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-secondary bg-secondary/10 hover:bg-secondary/20 px-3 py-1 rounded-full border border-secondary/20 hover:border-secondary/40 active:scale-95 transition-all cursor-pointer"
                          title="Ketuk untuk mengganti salam"
                          id="btn-greeting-rotator"
                        >
                          <span className="animate-bounce">👋</span>
                          <span>{REGIONAL_GREETINGS[greetingIndex].text}!</span>
                          <span className="text-[9px] text-on-surface-variant font-normal">({REGIONAL_GREETINGS[greetingIndex].region})</span>
                        </button>
                      </div>

                      {/* Title block with elegant design */}
                      <div className="space-y-1.5">
                        <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                          Kabar Keamanan & Berita Terbaru
                        </h2>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Tetap waspada terhadap kabar siber teranyar, literasi keamanan siber, dan kabar terpopuler seputar perlindungan digital di Indonesia.
                        </p>
                      </div>

                      {/* Continuous Live Alert Warning / Tip of the moment ticker */}
                      <div className="rounded-xl bg-black/40 border border-white/5 p-3 overflow-hidden relative">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 bg-red-600/90 text-[9px] font-extrabold text-white uppercase px-2.5 py-1 rounded tracking-wider font-mono shrink-0 animate-pulse">
                            <ShieldAlert className="w-3.5 h-3.5" /> SIAGA SIBER
                          </div>
                          
                          {/* Alert Tip content matching the current greeting */}
                          <div className="flex-1 overflow-hidden relative min-h-[16px] flex items-center">
                            <p className="text-[11px] text-[#ff4757] font-bold tracking-wide leading-tight">
                              {greetingIndex === 0 && "⚠️ Waspada modus undangan nikah APK palsu di WhatsApp! Jangan sembarangan memasang aplikasi."}
                              {greetingIndex === 1 && "⚠️ Tips Keamanan: Saling menjaga dan mengingatkan orang tua agar tidak tertipu tautan kuota gratis."}
                              {greetingIndex === 2 && "⚠️ Selalu aktifkan Autentikasi Dua Faktor (2FA) di Instagram & WhatsApp Anda."}
                              {greetingIndex === 3 && "⚠️ Hati-hati panggilan telepon misterius dari nomor tidak dikenal berkedok undian berhadiah!"}
                              {greetingIndex === 4 && "⚠️ Jangan pernah memberikan kode OTP bank kepada siapa pun, termasuk petugas bank!"}
                              {greetingIndex === 5 && "⚠️ Periksa kembali ekstensi file sebelum diunduh (waspadai akhiran ganda seperti file.pdf.apk)"}
                              {greetingIndex === 6 && "⚠️ Waspada! Langsung laporkan ke pihak berwajib atau BSSN jika mendeteksi indikasi insiden kebocoran data."}
                            </p>
                          </div>
                          
                          <span className="text-[8px] text-on-surface-variant font-mono text-right shrink-0">
                            Aktif
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase block">LITERASI & PERLINDUNGAN SIBER</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSubView('panduan-hoax')}
                        className="glass-card rounded-2xl p-4 text-left border border-white/5 hover:border-secondary/30 transition-all flex flex-col justify-between h-28 group"
                      >
                        <ShieldCheck className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xs text-on-background leading-snug">Panduan Cek Hoax</h4>
                          <p className="text-[10px] text-on-surface-variant mt-1">4 langkah mudah</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setSubView('panduan-sosmed')}
                        className="glass-card rounded-2xl p-4 text-left border border-white/5 hover:border-secondary/30 transition-all flex flex-col justify-between h-28 group"
                      >
                        <Lock className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xs text-on-background leading-snug">Keamanan Sosmed</h4>
                          <p className="text-[10px] text-on-surface-variant mt-1">Lindungi akun Anda</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setSubView('kamus-siber')}
                        className="glass-card rounded-2xl p-4 text-left border border-white/5 hover:border-secondary/30 transition-all flex flex-col justify-between h-28 group"
                      >
                        <BookOpen className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xs text-on-background leading-snug">Kamus Istilah Siber</h4>
                          <p className="text-[10px] text-on-surface-variant mt-1">Cari istilah & modus</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setSubView('simulasi-quiz')}
                        className="glass-card rounded-2xl p-4 text-left border border-white/5 hover:border-secondary/30 transition-all flex flex-col justify-between h-28 group"
                      >
                        <Gamepad2 className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xs text-on-background leading-snug">Simulasi Deteksi</h4>
                          <p className="text-[10px] text-on-surface-variant mt-1">Kuis kognitif siber</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setSubView('aduan-generator')}
                        className="col-span-2 glass-card rounded-2xl p-4 text-left border border-secondary/20 hover:border-secondary/50 bg-gradient-to-r from-secondary/5 to-transparent transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-on-background leading-snug flex items-center gap-1.5">
                              Generator Surat Aduan Siber
                              <span className="bg-secondary/20 text-secondary border border-secondary/35 text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                Aksi Korban
                              </span>
                            </h4>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">Buat draf laporan polisi & instansi resmi</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* POJOK PERIBAHASA & LITERASI SIBER */}
                  <div className="space-y-4 border-t border-white/5 pt-5">
                    <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-secondary" /> POJOK PERIBAHASA & LITERASI SIBER
                    </span>
 
                    {/* Mutiara Waspada (Pojok Peribahasa) */}
                    <div className="glass-card rounded-2xl p-5 border border-[#d4af37]/20 relative overflow-hidden bg-batik-band bg-repeat-x bg-[bottom_0_right_0] bg-[length:120px_16px] bg-blend-soft-light shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_30px_rgb(0,0,0,0.3)]">
                      {/* Gold border strip */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#d4af37]/20"></div>
                      
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="text-[9px] font-bold tracking-widest text-[#d4af37] uppercase font-mono bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                          🏛️ PERIBAHASA • {INDONESIA_PROVERBS[proverbIndex].origin}
                        </span>
                        <button
                          onClick={() => {
                            setProverbIndex((prev) => (prev + 1) % INDONESIA_PROVERBS.length);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-[#d4af37]/30 hover:text-[#d4af37] text-on-surface-variant transition-all hover:bg-white/10 active:scale-90 cursor-pointer"
                          title="Ganti Peribahasa"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
 
                      <div className="space-y-3 relative z-10">
                        <div>
                          <p className="text-sm font-extrabold text-amber-200 italic leading-snug font-serif tracking-wide">
                            "{INDONESIA_PROVERBS[proverbIndex].text}"
                          </p>
                          <p className="text-[11px] text-on-surface-variant/70 italic mt-1 leading-relaxed">
                            Artinya: {INDONESIA_PROVERBS[proverbIndex].meaning}
                          </p>
                        </div>
 
                        <div className="pt-2.5 border-t border-white/5 flex gap-2">
                          <div className="text-secondary shrink-0 text-xs mt-0.5">🛡️</div>
                          <div>
                            <span className="text-[9px] font-bold text-secondary uppercase tracking-wider block font-mono">Penerapan Keamanan Siber:</span>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                              {INDONESIA_PROVERBS[proverbIndex].digitalContext}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase font-mono">BERITA & TREN TERBARU INDONESIA</span>
                      <button
                        onClick={() => fetchRssAndLinks(true)}
                        disabled={isRssLoading}
                        className="p-1.5 px-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-secondary/30 active:scale-95 text-on-surface-variant hover:text-secondary hover:bg-white/10 transition-all flex items-center gap-1.5 font-mono"
                        title="Perbarui Berita"
                        id="btn-refresh-news"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRssLoading ? "animate-spin text-secondary" : ""}`} />
                        <span className="text-[10px] font-semibold">{isRssLoading ? "Memperbarui..." : "Perbarui"}</span>
                      </button>
                    </div>



                    {isRssLoading && articles.length === 0 ? (
                      [1, 2].map((idx) => (
                        <div key={idx} className="glass-card rounded-2xl overflow-hidden animate-pulse flex flex-col border border-white/5">
                          <div className="h-40 w-full bg-white/5"></div>
                          <div className="p-4 space-y-3">
                            <div className="h-4 bg-white/10 rounded w-5/6"></div>
                            <div className="h-4 bg-white/10 rounded w-1/2"></div>
                            <div className="flex justify-between">
                              <div className="h-3 bg-white/10 rounded w-12"></div>
                              <div className="h-3 bg-white/10 rounded w-16"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : getDisplayArticles().length === 0 ? (
                      <div className="glass-card p-8 rounded-2xl text-center border border-white/5 space-y-3">
                        <Newspaper className="w-10 h-10 text-on-surface-variant/30 mx-auto animate-pulse" />
                        <p className="text-sm text-on-surface-variant">Tidak ada berita dalam kategori ini saat ini.</p>
                      </div>
                    ) : (
                      getDisplayArticles().map((article) => {
                        const smInfo = getSocialMediaInfo(article);
                        const isSos = article.id.includes('sosmed') || 
                                      article.id.includes('trend') || 
                                      ['tiktok', 'instagram', 'threads', 'x', 'twitter', 'sosmed'].some(x => 
                                        article.category.toLowerCase().includes(x) || 
                                        article.source.toLowerCase().includes(x) ||
                                        article.source.toLowerCase().includes('@') ||
                                        article.source.toLowerCase().includes('menfess')
                                      );
                        
                        return (
                          <VirtualNewsCard key={article.id}>
                            <div
                              onClick={() => {
                                setSelectedArticleId(article.id);
                                setSubView('kabar-detail');
                              }}
                              className={`glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-white/10 hover:shadow-lg transition-all flex flex-col group border ${
                                isSos ? 'border-white/5 hover:border-secondary/30' : 'border-white/5 hover:border-secondary/20'
                              }`}
                            >
                              <div className="h-40 w-full relative bg-surface-container overflow-hidden">
                                <img
                                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                  alt={article.title}
                                  src={article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80"}
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80";
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                                
                                {isSos && (
                                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${smInfo.color}`}></div>
                                )}

                                <span className={`absolute top-4 left-4 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                                  isSos ? smInfo.badgeColor : 'bg-secondary text-background'
                                }`}>
                                  {article.category}
                                </span>
                                
                                <span className="absolute bottom-4 right-4 text-[10px] bg-background/80 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                                  <ExternalLink className="w-2.5 h-2.5" /> {isSos ? smInfo.platform : 'Portal Berita'}
                                </span>
                              </div>
                              <div className="p-4 space-y-2">
                                <h4 className="font-bold text-sm text-on-background line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                                  {article.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-white/5">
                                  <span className="font-semibold text-secondary">{article.source}</span>
                                  <span>{article.date}</span>
                                </div>
                              </div>
                            </div>
                          </VirtualNewsCard>
                        );
                      })
                    )}

                    {articles.length > 0 && (
                      <div className="py-4 flex flex-col items-center justify-center gap-2 border-t border-white/5 mt-2">
                        {isInfiniteLoading ? (
                          <div className="flex items-center gap-2 text-secondary text-xs font-semibold tracking-wider uppercase animate-pulse">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
                            Memuat berita lainnya...
                          </div>
                        ) : (
                          <div className="text-[10px] text-on-surface-variant/40 font-mono tracking-wider uppercase text-center animate-pulse">
                            Gulir ke bawah untuk memuat berita lainnya
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {!subView && activeTab === 'hoax' && (
              <motion.div
                key="tab-hoax"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-5 space-y-6 relative overflow-hidden"
              >
                <GununganWatermark opacity="opacity-[0.035]" />
                <div className="relative z-10 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-on-background flex items-center gap-2">
                      <ShieldAlert className="w-7 h-7 text-secondary" /> Cek Hoax
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Periksa kebenaran teks berita atau pesan berantai menggunakan AI verifikator kami.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="glass-card rounded-2xl p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-secondary/20">
                      <textarea
                        value={hoaxInput}
                        onChange={(e) => setHoaxInput(e.target.value)}
                        className="w-full h-44 bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none outline-none leading-relaxed"
                        placeholder="Paste teks berita di sini..."
                      />
                      
                      {hoaxInput && (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setHoaxInput("")}
                            className="text-xs text-on-surface-variant/60 hover:text-secondary"
                          >
                            Hapus Teks
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleAnalyzeHoax}
                      disabled={isHoaxLoading}
                      className="w-full bg-secondary text-background font-bold text-xs tracking-widest py-4 rounded-2xl flex justify-center items-center gap-2 glow-secondary active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isHoaxLoading ? (
                        <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Activity className="w-4.5 h-4.5" />
                          ANALISIS SEKARANG
                        </>
                      )}
                    </button>
                  </div>

                  <section className="pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xs font-bold tracking-widest uppercase">CEK TERAKHIR</h3>
                      {hoaxHistory.length > 0 && (
                        <button onClick={handleClearHoaxHistory} className="text-[10px] text-on-surface-variant hover:text-secondary flex items-center gap-1 cursor-pointer">
                          <History className="w-3 h-3" /> Bersihkan
                        </button>
                      )}
                    </div>
                    
                    {hoaxHistory.length > 0 ? (
                      <div className="space-y-3">
                        {hoaxHistory.slice(0, 5).map((item, index) => (
                          <div
                            key={index}
                            onClick={() => setHoaxInput(item.text)}
                            className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${item.isHoax ? 'bg-error' : 'bg-secondary'}`} />
                              <p className="text-xs text-on-surface truncate pr-2 leading-none">{item.text}</p>
                            </div>
                            <span className="text-[9px] text-on-surface-variant/60 whitespace-nowrap">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-xs text-on-surface-variant/40">Belum ada riwayat pengecekan.</div>
                    )}
                  </section>

                  <div
                    onClick={() => setSubView('feedback')}
                    className="glass-card rounded-2xl p-4 border border-secondary/20 hover:border-secondary/50 cursor-pointer transition-all flex items-center justify-between relative overflow-hidden group"
                  >
                    <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-colors"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                        <Star className="w-5 h-5 fill-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-background">Kirim Masukan Anda</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">Bantu tingkatkan sistem JagaIN</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )}

            {!subView && activeTab === 'link' && (
              <motion.div
                key="tab-link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-5 space-y-6 relative overflow-hidden"
              >
                <GununganWatermark opacity="opacity-[0.035]" />
                <div className="relative z-10 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-on-background flex items-center gap-2">
                      <Link2 className="w-7 h-7 text-secondary" /> Jaga Link
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Periksa keamanan link atau tautan mencurigakan sebelum Anda klik.
                    </p>
                  </div>
                  <div className="glass-card p-5 rounded-2xl flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-widest text-on-surface-variant uppercase" htmlFor="url-input">
                        Masukkan URL
                      </label>
                      <div className="relative group">
                        <input
                          id="url-input"
                          type="text"
                          value={linkInput}
                          onChange={(e) => setLinkInput(e.target.value)}
                          className="w-full bg-surface-container-low border border-surface-container-high rounded-xl py-4 pl-4 pr-12 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface placeholder:opacity-45"
                          placeholder="https://secure-bank-login.com..."
                        />
                        <Link2 className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5 group-focus-within:text-secondary" />
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckLink()}
                      disabled={isLinkLoading}
                      className="w-full bg-secondary text-background py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,212,170,0.15)] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isLinkLoading ? (
                        <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Link2 className="w-4.5 h-4.5" />
                          Periksa Link
                        </>
                      )}
                    </button>
                  </div>

                  {linkResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card p-5 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 opacity-10">
                        <ShieldCheck className="w-28 h-28 text-secondary" />
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                          linkResult.isSafe ? 'bg-secondary/15 text-secondary border-secondary/35' : 'bg-error/15 text-error border-error/35'
                        }`}>
                          {linkResult.isSafe ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg ${linkResult.isSafe ? 'text-secondary' : 'text-error'}`}>
                            {linkResult.isSafe ? "AMAN" : "BAHAYA"}
                          </h3>
                          <p className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                            Terverifikasi oleh JagaIN Engine
                          </p>
                          {linkResult.model && (
                            <span className="text-[9px] text-secondary font-mono flex items-center gap-1 mt-0.5 bg-secondary/5 px-1.5 py-0.5 rounded border border-secondary/10">
                              <Sparkles className="w-2.5 h-2.5 animate-pulse text-secondary" />
                              {linkResult.provider} ({linkResult.model})
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{linkResult.explanation}</p>

                      <div className="flex flex-col gap-2.5">
                        {[
                          { label: "Domain terdaftar", status: linkResult.registered },
                          { label: "SSL valid", status: linkResult.sslValid },
                          { label: "Tidak di blacklist", status: linkResult.notBlacklisted }
                        ].map((chk, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-highest/40">
                            <span className="text-xs font-semibold">{chk.label}</span>
                            {chk.status ? (
                              <Check className="w-4.5 h-4.5 text-secondary" />
                            ) : (
                              <span className="text-[10px] font-bold text-error uppercase">Gagal</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <section className="space-y-3">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">RIWAYAT PENCARIAN</h3>
                      {linkHistory.length > 0 && (
                        <button onClick={handleClearLinkHistory} className="text-[10px] text-on-surface-variant hover:text-secondary flex items-center gap-1 cursor-pointer">
                          <History className="w-3 h-3" /> Bersihkan
                        </button>
                      )}
                    </div>
                    {linkHistory.length > 0 ? (
                      <div className="space-y-3">
                        {linkHistory.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setLinkInput(item.url);
                              handleCheckLink(item.url);
                            }}
                            className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-secondary cursor-pointer hover:bg-white/5 transition-all"
                            style={{ borderLeftColor: item.isSafe ? "#00D4AA" : "#ff4757" }}
                          >
                            <div className="flex items-center gap-3 overflow-hidden pr-2">
                              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                                {item.isSafe ? <ShieldCheck className="w-4.5 h-4.5 text-secondary" /> : <AlertTriangle className="w-4.5 h-4.5 text-error" />}
                              </div>
                              <div className="truncate">
                                <p className="font-semibold text-sm truncate">{item.url}</p>
                                <p className="text-[10px] text-on-surface-variant/60">{item.time}</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold shrink-0">{item.isSafe ? "✅" : "❌"}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-xs text-on-surface-variant/40">Belum ada riwayat pengecekan.</div>
                    )}
                  </section>

                  <section className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold tracking-widest text-on-surface-variant uppercase flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4 text-secondary" /> LAPORKAN TAUTAN PENIPUAN
                    </h3>
                    
                    <div className="glass-card p-4 rounded-xl border border-white/5 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">URL Tautan Penipuan</label>
                        <input
                          type="text"
                          value={reportUrlInput}
                          onChange={(e) => setReportUrlInput(e.target.value)}
                          placeholder="contoh: kuota-gratis-2026.xyz"
                          className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all placeholder:opacity-30"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Kategori</label>
                          <select
                            value={reportCategoryInput}
                            onChange={(e) => setReportCategoryInput(e.target.value)}
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface outline-none focus:border-secondary transition-all"
                          >
                            <option value="Phishing Perbankan">Phishing Perbankan</option>
                            <option value="Penipuan Berhadiah">Penipuan Berhadiah</option>
                            <option value="Phishing Media Sosial">Phishing Media Sosial</option>
                            <option value="Bantuan Sosial Palsu">Bantuan Sosial Palsu</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-on-surface-variant/80 uppercase">Alasan Singkat</label>
                          <input
                            type="text"
                            value={reportReasonInput}
                            onChange={(e) => setReportReasonInput(e.target.value)}
                            placeholder="Mengapa link ini berbahaya?"
                            className="w-full bg-surface-container-low border border-white/5 rounded-lg p-2.5 text-xs text-on-surface focus:border-secondary outline-none transition-all placeholder:opacity-30"
                          />
                        </div>
                      </div>

                      {reportSuccessMsg && (
                        <p className="text-[11px] font-bold text-secondary bg-secondary/10 border border-secondary/20 p-2 rounded-lg">
                          {reportSuccessMsg}
                        </p>
                      )}

                      <button
                        onClick={handleReportLink}
                        disabled={isReportSubmitting}
                        className="w-full bg-surface-container-high hover:bg-secondary hover:text-background text-on-surface py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isReportSubmitting ? (
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5" /> Laporkan Tautan
                          </>
                        )}
                      </button>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {!subView && activeTab === 'ai' && (
              <motion.div
                key="tab-ai"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-[72px] bottom-20 left-0 right-0 z-30 flex flex-col bg-[#09081a] overflow-hidden"
              >
                <GununganWatermark opacity="opacity-[0.02]" />
                
                <div className="flex-1 overflow-y-auto space-y-4 px-5 pt-4 pb-48 no-scrollbar">
                  <div className="flex flex-col items-center text-center px-5 mb-6 mt-2 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mb-2.5 shadow-lg">
                      <Bot className="w-7 h-7 text-secondary" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">ASISTEN KEAMANAN</span>
                  </div>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                        msg.sender === 'user' ? 'bg-secondary/15 text-secondary' : 'bg-primary-container text-on-primary-container'
                      }`}>
                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                        msg.sender === 'user'
                          ? 'bg-secondary text-background font-medium rounded-br-none border-secondary/20'
                          : 'bg-primary-container text-on-primary-container rounded-bl-none border-white/5'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {msg.alert && (
                          <div className="mt-3 p-3 bg-[#09081a]/70 rounded-xl border border-error/30 text-xs">
                            <div className="flex items-center gap-1.5 text-error font-bold mb-1">
                              <AlertTriangle className="w-4 h-4" />
                              {msg.alert.title}
                            </div>
                            <p className="text-on-surface-variant">{msg.alert.description}</p>
                            <div className="mt-2 text-error font-semibold uppercase">{msg.alert.action}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center mt-1">
                        <Bot className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="bg-primary-container text-on-primary-container rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1 border border-white/5">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                <div className="absolute bottom-0 left-0 w-full z-40 bg-gradient-to-t from-[#09081a] via-[#09081a]/95 to-transparent px-5 pb-5 pt-12 pointer-events-none">
                  {messages.length < 3 && (
                    <div className="pb-3 flex gap-2 pointer-events-auto overflow-x-auto no-scrollbar">
                      {[
                        "Tips menjaga keamanan digital",
                        "Cara mengamankan akun dari pembajakan",
                        "Bagaimana cara menghindari penipuan APK palsu?"
                      ].map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendChat(prompt)}
                          className="glass-card py-2 px-3 rounded-full text-xs font-semibold whitespace-nowrap border border-white/5 hover:border-secondary/30 text-on-surface transition-all flex items-center gap-1 bg-[#09081a]/80 cursor-pointer shrink-0"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-secondary" />
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="glass-card rounded-2xl p-2.5 flex items-center gap-2 shadow-2xl border border-white/10 pointer-events-auto bg-[#09081a]/90">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-white/30 py-2 pl-2 outline-none"
                      placeholder="Tanyakan masalah keamanan digital..."
                    />
                    <button
                      onClick={() => handleSendChat()}
                      className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-background hover:opacity-90 active:scale-90 transition-transform duration-100 cursor-pointer"
                    >
                      <Send className="w-4.5 h-4.5 fill-background" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* HOAX RESULT SHEET SLIDE-UP MODAL */}
        <AnimatePresence>
          {isHoaxModalOpen && hoaxResult && (
            <div className="absolute inset-0 z-50 flex items-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsHoaxModalOpen(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-full glass-card rounded-t-[32px] p-6 pb-10 z-10 border-t border-white/10 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${hoaxResult.isHoax ? 'bg-error' : 'bg-secondary'}`} />
                
                <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto mb-6"></div>
                
                <div className="flex flex-col items-center text-center">
                  
                  <div className={`px-5 py-2 border rounded-full mb-3 flex items-center gap-1.5 ${
                    hoaxResult.isHoax 
                      ? 'bg-error/10 border-error/40 text-error'
                      : 'bg-secondary/10 border-secondary/40 text-secondary'
                  }`}>
                    {hoaxResult.isHoax ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span className="text-xs font-bold tracking-widest">{hoaxResult.badge}</span>
                  </div>



                  <h3 className="font-bold text-xl text-on-background mb-3">{hoaxResult.title}</h3>
                  
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6 max-h-40 overflow-y-auto pr-1">
                    {hoaxResult.explanation}
                  </p>

                  {hoaxResult.sources && hoaxResult.sources.length > 0 && (
                    <div className="w-full text-left bg-white/5 rounded-2xl p-4 border border-white/5 mb-6 space-y-2">
                      <span className="text-[10px] font-bold tracking-widest text-secondary uppercase flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> Sumber Klarifikasi / Rujukan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {hoaxResult.sources.map((src, index) => (
                          <div 
                            key={index} 
                            className="text-[11px] text-on-surface bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 font-semibold flex items-center gap-1 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            {src}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="w-full bg-surface-container-high rounded-full h-9 relative mb-8 overflow-hidden border border-white/5 flex items-center">
                    <span className="absolute left-4 z-10 text-[10px] font-bold tracking-widest text-background">
                      TINGKAT KEYAKINAN
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${hoaxResult.confidence}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full flex justify-end items-center pr-3 ${hoaxResult.isHoax ? 'bg-error' : 'bg-secondary'}`}
                    >
                      <span className="font-bold text-xs text-background">{hoaxResult.confidence}%</span>
                    </motion.div>
                  </div>

                  <div className="flex w-full gap-3">
                    <button
                      onClick={() => setIsHoaxModalOpen(false)}
                      className="flex-1 py-4 text-xs font-bold tracking-wider border border-white/10 rounded-2xl hover:bg-white/5 transition-colors text-on-surface cursor-pointer"
                    >
                      TUTUP
                    </button>
                    
                    <button
                      onClick={() => {
                        alert("Terima kasih! Laporan Anda telah diteruskan ke kominfo & tim analis JagaIN.");
                        setIsHoaxModalOpen(false);
                      }}
                      className="flex-1 py-4 text-xs font-bold tracking-wider bg-secondary text-background rounded-2xl flex justify-center items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,212,170,0.15)] cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 fill-background" />
                      LAPORKAN
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* BOTTOM NAVIGATION SHELL */}
        <nav className="absolute bottom-0 left-0 w-full z-40 bg-background/70 backdrop-blur-xl border-t border-white/5 flex justify-around items-center h-20 px-2 pb-safe shadow-[0_-4px_30px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/40 via-[#d4af37]/60 to-secondary/40" />
          
          <button
            onClick={() => {
              setSubView(null);
              setActiveTab('kabar');
            }}
            className={`flex flex-col items-center justify-center pt-1 transition-all w-16 relative cursor-pointer ${
              activeTab === 'kabar' && !subView ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <Newspaper className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Kabar</span>
            {activeTab === 'kabar' && !subView && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#00D4AA]" />
            )}
          </button>

          <button
            onClick={() => {
              setSubView(null);
              setActiveTab('hoax');
            }}
            className={`flex flex-col items-center justify-center pt-1 transition-all w-16 relative cursor-pointer ${
              activeTab === 'hoax' && !subView ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <ShieldAlert className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Hoax</span>
            {activeTab === 'hoax' && !subView && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#00D4AA]" />
            )}
          </button>

          <button
            onClick={() => {
              setSubView(null);
              setActiveTab('link');
            }}
            className={`flex flex-col items-center justify-center pt-1 transition-all w-16 relative cursor-pointer ${
              activeTab === 'link' && !subView ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <Link2 className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Link</span>
            {activeTab === 'link' && !subView && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#00D4AA]" />
            )}
          </button>

          <button
            onClick={() => {
              setSubView(null);
              setActiveTab('ai');
            }}
            className={`flex flex-col items-center justify-center pt-1 transition-all w-16 relative cursor-pointer ${
              activeTab === 'ai' && !subView ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <Bot className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold tracking-widest uppercase">AI</span>
            {activeTab === 'ai' && !subView && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_#00D4AA]" />
            )}
          </button>
        </nav>

      </div>
    </div>
  );
}
