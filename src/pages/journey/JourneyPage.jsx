import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { TOPICS } from '../../data/topics/topicsData.js';

export function JourneyPage() {
  const { learningProgress, resetLearningData, navigateTo } = useApp();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  return (
    <div className="page-container">
      <h1>Perjalanan Belajar</h1>
      <p>Catatan materi yang sudah dipelajari dan nilai kuis terakhir.</p>
      <div className="simple-card">
        <p><strong>{learningProgress.completedTopics.length} dari 5 topik selesai ({learningProgress.progressPercent}%)</strong></p>
        <p className="muted-text">Saat ini hanya materi Pengelolaan Uang yang tersedia.</p>
        <div className="table-responsive">
          <table>
            <thead><tr><th>Topik</th><th>Status</th><th>Nilai Kuis</th></tr></thead>
            <tbody>
              {TOPICS.map((topic) => {
                const done = topic.hasContent && learningProgress.completedTopics.includes(topic.id);
                return (
                  <tr key={topic.id}>
                    <td>{topic.title}</td>
                    <td>{!topic.hasContent ? 'Belum tersedia' : done ? 'Selesai' : 'Belum selesai'}</td>
                    <td>{done ? `${learningProgress.quizScores[topic.id] ?? 0}%` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn-primary-lime" onClick={() => navigateTo('learning')}>Buka Materi Belajar</button>
      </div>
      <section className="reset-section">
        <h2>Hapus Catatan</h2>
        <p>Catatan belajar tersimpan di peramban ini. Menghapus catatan juga menghapus pilihan kategori.</p>
        {showConfirmReset ? (
          <div>
            <p>Hapus seluruh catatan belajar dan pilihan kategori?</p>
            <div className="button-row">
              <button type="button" className="btn-danger-outline" onClick={() => { resetLearningData(); setShowConfirmReset(false); }}>Ya, Hapus Catatan</button>
              <button type="button" className="btn-secondary-light" onClick={() => setShowConfirmReset(false)}>Batal</button>
            </div>
          </div>
        ) : <button type="button" className="btn-danger-outline" onClick={() => setShowConfirmReset(true)}>Hapus Catatan Belajar</button>}
      </section>
    </div>
  );
}

export default JourneyPage;
