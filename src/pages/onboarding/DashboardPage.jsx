import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function DashboardPage() {
  const { category, financialData, learningProgress, navigateTo } = useApp();
  return (
    <div className="page-container">
      <h1>Dasbor KitaInvest</h1>
      <p>Silakan pilih kegiatan belajar yang ingin kamu lakukan.</p>
      <div className="simple-card profile-overview">
        <p><strong>Kategori:</strong> {category || 'Belum dipilih'}</p>
        <p><strong>Materi selesai:</strong> {learningProgress.completedTopics.length} dari 5 topik</p>
        <div className="button-row">
          <button type="button" className="btn-secondary-light" onClick={() => navigateTo(category ? 'form' : 'category')}>{financialData.usia ? 'Ubah Data Profil' : 'Isi Data Profil'}</button>
          <button type="button" className="btn-secondary-light" onClick={() => navigateTo('category')}>Ganti Kategori</button>
        </div>
      </div>
      <div className="simple-grid">
        <div className="simple-card">
          <h2>Belajar</h2>
          <p>Baca materi pengelolaan uang dan jawab kuis singkat.</p>
          <button type="button" className="btn-primary-lime" onClick={() => navigateTo('learning')}>Buka Materi</button>
        </div>
        <div className="simple-card">
          <h2>Rencana dan Simulasi</h2>
          <p>Masukkan rencana dana dan lihat hasil perhitungannya.</p>
          <button type="button" className="btn-primary-lime" onClick={() => navigateTo('simulation')}>Buka Simulasi</button>
        </div>
        <div className="simple-card">
          <h2>Perjalanan Belajar</h2>
          <p>Periksa status materi dan nilai kuis yang sudah dikerjakan.</p>
          <button type="button" className="btn-primary-lime" onClick={() => navigateTo('journey')}>Lihat Perjalanan</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
