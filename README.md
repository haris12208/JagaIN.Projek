# JagaIN AI — Perisai Cerdas Nusantara dari Hoax & Ancaman Siber

JagaIN adalah platform edukasi, verifikasi berita, pendeteksi link phishing, dan asisten keamanan digital cerdas dengan sentuhan kearifan lokal Indonesia yang dirancang untuk melindungi masyarakat luas dari derasnya arus misinformasi dan kejahatan siber.

---

## 📌 Deskripsi Singkat

Di era digital saat ini, Indonesia menghadapi tantangan besar berupa maraknya penyebaran berita bohong (hoax), penipuan online berbasis tautan phishing (seperti modus file APK palsu), serta minimnya kesadaran akan literasi keamanan siber di kalangan masyarakat awam. Masalah ini diperparah oleh kepanikan pengguna saat menghadapi ancaman digital tanpa adanya asisten yang siap memberikan panduan tanggap darurat secara instan.

**JagaIN** hadir sebagai solusi komprehensif satu pintu yang menggabungkan kecerdasan buatan kelas dunia dengan pengalaman pengguna yang ramah, dan interaktif. Ditargetkan untuk seluruh kalangan masyarakat—mulai dari generasi muda, pekerja digital, hingga orang tua—JagaIN menyederhanakan proses verifikasi informasi yang rumit menjadi percakapan sehari-hari yang intuitif dan kedekatan emosional.

---

## 💡 Fitur Utama

Aplikasi JagaIN memiliki rangkaian fitur unggulan yang dirancang untuk memberikan perlindungan siber secara real-time dan edukatif:

*   **🛡️ Verifikasi Hoax & Berita (Anti-Hoax Verifier)**
    Menganalisis klaim berita, narasi mencurigakan, atau pesan berantai WhatsApp secara mendalam menggunakan AI. Fitur ini menyajikan tingkat akurasi verifikasi, penjelasan fakta pendukung, dan tips langkah pencegahan agar pengguna tidak terjebak berita palsu.
*   **🔗 Analisis Tautan Aman (Phishing & Link Checker)**
    Mendeteksi potensi bahaya dari tautan/URL asing, domain mencurigakan, ataupun modus penipuan online (seperti undangan pernikahan digital palsu .APK) dengan analisis menyeluruh untuk mencegah pencurian data (phishing).
*   **🤖 Asisten JagaIN AI (Chatbot Pendamping Siber)**
    Teman bicara interaktif untuk berkonsultasi seputar tips keamanan digital, cara mengaktifkan autentikasi dua faktor (2FA), penanganan pertama ketika akun diretas, hingga pemahaman tentang privasi data pribadi.
*   **📰 Kabar Keamanan Terintegrasi (Security RSS Feed)**
    Menyajikan pembaruan berita keamanan siber, peringatan ancaman siber terbaru, dan berita resmi terpercaya langsung dari portal berita teknologi nasional.

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
