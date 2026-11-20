import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function HomePage() {
  const { navigateTo, category } = useApp();
  return (
    <div className="page-container home-page">
      <section className="home-intro">
        <h1>Belajar mengelola uang bersama KitaInvest</h1>
        <p className="home-tagline">Belajar. Rencanakan. Tumbuhkan.</p>
        <p>KitaInvest membantu kamu mengenal dasar pengelolaan uang dan mencoba perhitungan rencana tabungan dengan sederhana.</p>
        <button type="button" className="btn-primary-lime" onClick={() => navigateTo(category ? 'dashboard' : 'category')}>Mulai Belajar</button>
      </section>
      <section className="home-about">
        <h2>Apa yang bisa dipelajari?</h2>
        <p>Mulai dari materi pengelolaan uang, lalu coba membuat rencana dana sendiri.</p>
        <div className="simple-grid">
          <div className="simple-card">
            <h3>Materi Belajar</h3>
            <p>Mengenal pemasukan, pengeluaran, kebutuhan, dan tabungan.</p>
            <button type="button" className="btn-secondary-light" onClick={() => navigateTo('learning')}>Buka Materi</button>
          </div>
          <div className="simple-card">
            <h3>Simulasi Dana</h3>
            <p>Menghitung perkiraan dana dari saldo awal dan setoran bulanan.</p>
            <button type="button" className="btn-secondary-light" onClick={() => navigateTo('simulation')}>Coba Simulasi</button>
          </div>
          <div className="simple-card">
            <h3>Perjalanan Belajar</h3>
            <p>Melihat materi yang sudah selesai dan nilai kuis terakhir.</p>
            <button type="button" className="btn-secondary-light" onClick={() => navigateTo('journey')}>Lihat Catatan</button>
          </div>
        </div>
      </section>
      <p className="simple-note">KitaInvest hanya untuk belajar dan tidak melayani transaksi produk investasi.</p>
    </div>
  );
}

export default HomePage;
