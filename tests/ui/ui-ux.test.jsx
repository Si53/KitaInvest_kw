import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AppProvider } from '../../src/context/AppContext.jsx';
import { Navbar } from '../../src/components/common/Navbar.jsx';
import { Footer } from '../../src/components/common/Footer.jsx';
import { HomePage } from '../../src/pages/onboarding/HomePage.jsx';
import { CategorySelectPage } from '../../src/pages/onboarding/CategorySelectPage.jsx';
import { ProfileFormPage } from '../../src/pages/onboarding/ProfileFormPage.jsx';
import { DashboardPage } from '../../src/pages/onboarding/DashboardPage.jsx';
import { LearningPage } from '../../src/pages/learning/LearningPage.jsx';
import { JourneyPage } from '../../src/pages/journey/JourneyPage.jsx';
import { SimulationPage } from '../../src/pages/simulation/SimulationPage.jsx';
import { formatRibuan, parseAngka } from '../../src/utils/formatters.js';

const renderPage = (Page) => renderToString(<AppProvider><Page /></AppProvider>);

describe('Antarmuka KitaInvest sederhana', () => {
  beforeEach(() => {
    const stored = {
      kitainvest_user_category: 'Pelajar',
      kitainvest_learning_progress: JSON.stringify({ completedTopics: [1, 2, 3, 4, 5], quizScores: { 1: 100, 2: 90 } }),
    };
    global.window = {
      localStorage: {
        getItem: (key) => stored[key] || null,
        setItem: (key, value) => { stored[key] = String(value); },
        removeItem: (key) => { delete stored[key]; },
      },
      scrollTo: () => {},
    };
  });

  it('Navigasi tetap menyediakan seluruh halaman utama', () => {
    const html = renderPage(Navbar);
    for (const label of ['Beranda', 'Dasbor', 'Belajar', 'Simulasi', 'Perjalanan Belajar', 'Data Profil']) expect(html).toContain(label);
    expect(html).toContain('aria-current="page"');
  });

  it('Beranda tanpa foto dan tetap menyediakan akses materi dan simulasi', () => {
    const html = renderPage(HomePage);
    expect(html).toContain('Belajar mengelola uang');
    expect(html).toContain('Mulai Belajar');
    expect(html).toContain('Buka Materi');
    expect(html).toContain('Coba Simulasi');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('hero-glass-badge');
    expect(renderToString(<Footer />)).toContain('tidak melayani transaksi investasi');
  });

  it('Kategori dan formulir profil tetap tersedia', () => {
    const categoryHtml = renderPage(CategorySelectPage);
    for (const role of ['Pelajar', 'Pekerja', 'Pensiunan']) expect(categoryHtml).toContain(role);
    const html = renderPage(ProfileFormPage);
    expect(html).toContain('Usia Pengguna (Tahun)');
    expect(html).toContain('Uang Saku / Pemasukan Bulanan');
    expect(html).toContain('Simpan &amp; Lihat Ringkasan Data');
  });

  it('Simulasi memakai formulir dan menunggu perhitungan, tanpa grafik', () => {
    const html = renderPage(SimulationPage);
    expect(html).toContain('Hitung Simulasi');
    expect(html).toContain('Hasil akan muncul setelah');
    expect(html).toContain('value="12.000.000"');
    expect(html).toContain('value="1.000.000"');
    expect(html).toContain('value="400.000"');
    expect(html).not.toContain('<canvas');
    expect(html).not.toContain('Proyeksi Pertumbuhan Dana');
  });

  it('Riwayat lama untuk materi yang dikosongkan tidak dihitung sebagai selesai', () => {
    const html = renderPage(JourneyPage);
    expect(html).toContain('1<!-- --> dari 5 topik selesai (<!-- -->20<!-- -->%)');
    expect(html.match(/Belum tersedia/g)).toHaveLength(4);
    expect(html).toContain('100%');
    expect(html).not.toContain('Lencana');
    expect(html).not.toContain('Tingkat Pemahaman');
    expect(renderPage(DashboardPage)).toContain('Materi selesai:');
  });

  it('Materi menampilkan lima judul, satu artikel, dan kuis tanpa pemutar media', () => {
    const html = renderPage(LearningPage);
    expect(html).toContain('5 Topik Wajib');
    expect(html.match(/class="topic-button/g)).toHaveLength(5);
    expect(html).toContain('Contoh Sederhana');
    expect(html).toContain('Kuis Singkat');
    expect(html).toContain('Selesaikan Topik');
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('Putar Animasi');
  });

  it('Format angka Rupiah tetap konsisten', () => {
    expect(formatRibuan('12100001')).toBe('12.100.001');
    expect(formatRibuan('')).toBe('');
    expect(parseAngka('Rp 400.000')).toBe('400000');
    expect(parseAngka('')).toBe('');
  });
});
