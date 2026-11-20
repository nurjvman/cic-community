# CIC — Catatan Informasi Kuliah

Frontend starter untuk community knowledge hub Manajemen Sibermu '11.

## Tech stack
- React + TypeScript
- Vite
- Lucide React
- CSS responsive, mobile-first

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

## Status
Homepage v0.1 menggunakan data contoh lokal. Form Sticky Wall hanya menambahkan note ke state browser saat ini; belum tersimpan ke database dan belum menerapkan expiry 48 jam di server. Agenda, forum, dan rangkuman juga masih berupa data contoh.

## Rencana integrasi berikutnya
1. Firebase Authentication untuk admin/contributor.
2. Cloud Firestore untuk agenda, rangkuman, thread, balasan, dan sticky notes.
3. Security Rules dan moderasi untuk konten publik tanpa login.
4. Scheduled cleanup untuk menghapus sticky notes setelah masa 48 jam.
