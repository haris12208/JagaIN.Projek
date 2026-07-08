# JagaIN AI — Perisai Cerdas Nusantara dari Hoax & Ancaman Siber

JagaIN adalah platform edukasi, verifikasi berita, pendeteksi link phishing, dan asisten keamanan digital cerdas dengan sentuhan kearifan lokal Indonesia yang dirancang untuk melindungi masyarakat luas dari derasnya arus misinformasi dan kejahatan siber.

---

## 📌 Deskripsi Singkat

Di era digital saat ini, Indonesia menghadapi tantangan besar berupa maraknya penyebaran berita bohong (hoax), penipuan online berbasis tautan phishing (seperti modus file APK palsu), serta minimnya kesadaran akan literasi keamanan siber di kalangan masyarakat awam. Masalah ini diperparah oleh kepanikan pengguna saat menghadapi ancaman digital tanpa adanya asisten yang siap memberikan panduan tanggap darurat secara instan.

**JagaIN** hadir sebagai solusi komprehensif satu pintu yang menggabungkan kecerdasan buatan kelas dunia dengan pengalaman pengguna yang ramah, interaktif, dan kental akan budaya Indonesia. Ditargetkan untuk seluruh kalangan masyarakat—mulai dari generasi muda, pekerja digital, hingga orang tua—JagaIN menyederhanakan proses verifikasi informasi yang rumit menjadi percakapan sehari-hari yang intuitif, dibalut visualisasi futuristik bermotif Batik Kawung yang anggun guna membangun rasa aman dan kedekatan emosional.

---

## 💡 Fitur Utama

Aplikasi JagaIN memiliki rangkaian fitur unggulan yang dirancang untuk memberikan perlindungan siber secara real-time dan edukatif:

*   **🛡️ Verifikasi Hoax & Berita (Anti-Hoax Verifier)**
    Menganalisis klaim berita, narasi mencurigakan, atau pesan berantai WhatsApp secara mendalam menggunakan AI. Fitur ini menyajikan tingkat akurasi verifikasi, penjelasan fakta pendukung, dan tips langkah pencegahan agar pengguna tidak terjebak berita palsu.
*   **🔗 Analisis Tautan Aman (Phishing & Link Checker)**
    Mendeteksi potensi bahaya dari tautan/URL asing, domain mencurigakan, ataupun modus penipuan online (seperti undangan pernikahan digital palsu .APK) dengan analisis menyeluruh untuk mencegah pencurian data (phishing).
*   **🤖 Asisten JagaIN AI (Chatbot Pendamping Siber)**
    Teman bicara interaktif untuk berkonsultasi seputar tips keamanan digital, cara mengaktifkan autentikasi dua faktor (2FA), penanganan pertama ketika akun diretas, hingga pemahaman tentang privasi data pribadi.
*   **⚙️ Multi-LLM Smart Fallback System (Sistem Ketahanan Kuota AI)**
    Fitur arsitektur canggih di sisi server yang menjamin keandalan sistem tanpa henti. Jika kuota API Gemini habis atau mencapai batas limit, JagaIN secara otomatis beralih (*failover*) ke OpenAI (GPT-4o-mini), Groq (Llama 3.1 8b), hingga mesin heuristik lokal (*JagaIN-Heuristics Engine v2.5*) agar layanan pengecekan berita dan chat tetap dapat diakses setiap saat tanpa gangguan.
*   **📰 Kabar Keamanan Terintegrasi (Security RSS Feed)**
    Menyajikan pembaruan berita keamanan siber, peringatan ancaman siber terbaru, dan pengumuman resmi terpercaya langsung dari portal berita teknologi nasional.
*   **🎨 Estetika Cyber Batik Nusantara**
    Antarmuka web premium dengan perpaduan tema warna gelap *Deep Indigo & Cyan Neon* yang elegan, dihiasi motif Batik Kawung yang interaktif, Gunungan Wayang dinamis, serta kutipan Peribahasa Indonesia yang memberikan pesan kebijaksanaan digital di setiap layarnya.

---

## 🛠️ Tech Stack (Teknologi yang Digunakan)

JagaIN dibangun menggunakan arsitektur full-stack modern berkinerja tinggi:

*   **Frontend**: 
    *   **React 19** & **TypeScript** (Memastikan tipe data aman dan terstruktur)
    *   **Tailwind CSS** (Desain responsif yang sangat ringan dan presisi)
    *   **Motion (Framer Motion)** (Animasi mikro, efek ripple, dan transisi halaman yang mulus)
    *   **Lucide React** (Kumpulan ikon minimalis modern)
*   **Backend**: 
    *   **Node.js** & **Express** (Server API yang cepat dan modular)
    *   **TSX & Esbuild** (Alat kompilasi kilat untuk performa produksi)
*   **AI Engine**: 
    *   **@google/genai SDK** (Integrasi utama model Gemini Pro & Flash)
    *   **OpenAI & Groq API Client** (Lapisan failover sekunder)
    *   **Local Rule-based Heuristic Engine** (Lapisan pertahanan terakhir)
*   **Tools**:
    *   **Git** (Sistem kontrol versi)
    *   **Vite** (Bundler frontend generasi baru berkecepatan tinggi)

---

## 🚀 Instalasi dan Cara Menjalankan

### A. Menjalankan di Lingkungan Lokal (Localhost)

Ikuti langkah-langkah di bawah ini untuk menguji kode JagaIN di komputer Anda:

1.  **Unduh atau Clone Repositori**
    Ekstrak file ZIP proyek atau jalankan perintah git clone jika repositori sudah diunggah:
    ```bash
    git clone <url-repositori-github-anda>
    cd JagaIN
    ```

2.  **Pasang Dependensi Node.js**
    Pastikan Anda sudah menginstal Node.js versi 18 ke atas, kemudian jalankan perintah berikut di terminal:
    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan (.env)**
    Buat file bernama `.env` di direktori utama (root) proyek, lalu salin isinya dari `.env.example`:
    ```env
    PORT=3000
    GEMINI_API_KEY=Kunci_API_Gemini_Anda_Disini
    
    # Opsional (Sebagai cadangan jika kuota Gemini habis):
    OPENAI_API_KEY=Kunci_API_OpenAI_Anda
    GROQ_API_KEY=Kunci_API_Groq_Anda
    ```

4.  **Jalankan Server Pengembangan**
    Mulai server lokal Anda dengan perintah:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan dan dapat diakses melalui browser di alamat: `http://localhost:3000`.

---

### B. Cara Mengunggah Proyek ke GitHub

Untuk menyerahkan proyek ini atau menyimpan riwayat perubahan di GitHub, ikuti panduan berikut:

1.  **Masuk ke GitHub**
    Buka akun [GitHub](https://github.com/) Anda dan buat repositori baru (*New Repository*). Beri nama repositori tersebut, misalnya `JagaIN-AI`, dan biarkan pengaturannya tetap publik. Jangan centang opsi "Add a README" jika ingin menggunakan file ini langsung.
2.  **Inisialisasi Git di Komputer Lokal**
    Buka terminal di folder proyek Anda dan ketik perintah berikut:
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Meluncurkan JagaIN AI"
    ```
3.  **Hubungkan dan Unggah ke GitHub**
    Salin baris perintah yang disediakan oleh GitHub setelah membuat repositori baru, lalu jalankan di terminal Anda:
    ```bash
    git branch -M main
    git remote add origin <URL_REPOSITORI_GITHUB_ANDA>
    git push -u origin main
    ```
    *Catatan: Pastikan file `.env` tidak ikut terunggah ke GitHub karena sudah tercantum di `.gitignore` demi menjaga keamanan API Key Anda.*

---

### C. Cara Mengonlinekan Aplikasi (Deploy Ke Internet)

Agar aplikasi full-stack JagaIN dapat diakses secara online oleh juri atau publik, Anda memiliki beberapa pilihan metode deployment yang aman:

#### Pilihan 1: Deploy Langsung lewat Google AI Studio Build (Rekomendasi Utama)
Jika Anda menggunakan workspace Google AI Studio Build, Anda dapat menekan tombol **"Deploy"** atau **"Share"** yang ada di bagian pojok kanan atas layar. Platform akan secara otomatis melakukan kompilasi produksi (`npm run build`) dan menghosting aplikasi Anda di Google Cloud Run dengan aman. API Key akan dikelola secara privat tanpa risiko bocor ke sisi browser.

#### Pilihan 2: Deploy Mandiri ke Platform Cloud (Render / Railway / Heroku)
Karena JagaIN menggunakan arsitektur full-stack Express + React, Anda dapat menghostingnya ke penyedia layanan cloud gratis atau berbayar dengan langkah berikut:

1.  **Gunakan Platform Railway atau Render**
    *   Hubungkan akun GitHub Anda ke platform pilihan (misal: [Railway](https://railway.app) atau [Render](https://render.com)).
    *   Pilih repositori `JagaIN-AI` yang telah Anda buat.
2.  **Konfigurasi Variabel Lingkungan di Dashboard Cloud**
    Buka tab *Environment Variables* / *Config Vars* pada dashboard hosting Anda, kemudian tambahkan:
    *   `NODE_ENV` = `production`
    *   `GEMINI_API_KEY` = `Kunci_API_Gemini_Aktif_Anda`
    *   *(Dan kunci API cadangan lainnya jika ada)*
3.  **Atur Perintah Build & Start**
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm run start` (ini akan menjalankan `node dist/server.cjs` yang telah dikompilasi secara optimal oleh bundler esbuild kita)
    *   **Port**: Atur port default sesuai anjuran layanan hosting (biasanya otomatis dideteksi).
4.  **Selesai!**
    Tunggu proses build selesai, dan Anda akan mendapatkan URL web publik (contoh: `https://jagain-ai.up.railway.app`) yang siap diuji dan disebarluaskan dengan aman.
