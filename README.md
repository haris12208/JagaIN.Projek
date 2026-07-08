# JagaIN - Platform Edukasi & Verifikasi Keamanan Siber

JagaIN adalah aplikasi full-stack interaktif berbasis **React (Vite)** dan **Express (Node.js)** yang dirancang untuk melindungi masyarakat Indonesia dari ancaman kejahatan siber, seperti penyebaran berita hoax, tautan phishing berbahaya, serta memberikan edukasi interaktif seputar keamanan siber menggunakan kecerdasan buatan (AI).

---

## 🚀 Fitur Utama

1. **Cek Hoax Interaktif**: Verifikasi klaim berita atau pesan berantai menggunakan teknologi AI Gemini untuk mendeteksi potensi misinformasi/hoax dengan analisis transparan.
2. **Analisis Tautan (Link Checker)**: Memeriksa keamanan domain/URL dari risiko phishing, malware, atau penipuan siber.
3. **Tanya AI (Asisten JagaIN)**: Chatbot asisten siber interaktif yang ditenagai oleh model Gemini untuk memberikan tips keamanan digital, menjaga privasi data, dan panduan mitigasi ancaman siber.
4. **Kabar Keamanan Resmi**: Menyediakan pembaruan berita dan peringatan siber langsung (real-time RSS feed dari BSSN & portal teknologi) dengan mekanisme failover lokal yang handal.

---

## 🛠️ Prasyarat (Prerequisites)

Sebelum menjalankan aplikasi ini secara lokal, pastikan Anda telah memasang:
- **Node.js** (Versi 18 ke atas direkomendasikan)
- **NPM** (Bawaan dari instalasi Node.js)

---

## ⚙️ Panduan Instalasi & Konfigurasi untuk Juri / Penguji

Ikuti langkah-langkah mudah berikut untuk menyetel JagaIN secara mandiri:

1. **Unduh Repositori**: Unduh atau ekstrak file ZIP JagaIN.
2. **Pasang Dependensi**: Jalankan perintah `npm install` untuk mengunduh modul dependensi.
3. **Setel Kunci API**: Duplikasi `.env.example` menjadi `.env`, lalu masukkan `GEMINI_API_KEY="AIzaSy..."` Anda.
4. **Jalankan Aplikasi**: Jalankan `npm run dev` untuk memulai development server pada port 3000.
