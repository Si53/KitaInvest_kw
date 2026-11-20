import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { TOPICS, getTopicById } from '../../data/topics/topicsData.js';
import { QuizComponent } from '../../components/quiz/QuizComponent.jsx';

export function LearningPage() {
  const { learningProgress, completeTopic } = useApp();
  const [activeTopicId, setActiveTopicId] = useState(1);
  const topic = getTopicById(activeTopicId);
  return (
    <div className="page-container">
      <h1>Materi Belajar</h1>
      <p>Pelajari dasar pengelolaan uang dan kerjakan kuis di akhir materi.</p>
      <div className="learning-layout">
        <aside className="simple-card topics-sidebar">
          <h2>5 Topik Wajib</h2>
          <nav aria-label="Daftar topik belajar">
            {TOPICS.map((item) => (
              <button key={item.id} type="button" className={`topic-button ${item.id === activeTopicId ? 'active' : ''}`} aria-current={item.id === activeTopicId ? 'true' : undefined} onClick={() => setActiveTopicId(item.id)}>
                {item.id}. {item.title}
              </button>
            ))}
          </nav>
        </aside>
        <article className="simple-card learning-article">
          <h2>{topic.title}</h2>
          {topic.hasContent ? (
            <>
              {topic.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <section>
                <h3>Contoh Sederhana</h3>
                <p>{topic.example.description}</p>
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Keterangan</th><th>Jumlah</th></tr></thead>
                    <tbody>{topic.example.rows.map(([label, amount]) => <tr key={label}><td>{label}</td><td>{amount}</td></tr>)}</tbody>
                  </table>
                </div>
                <p className="simple-note">{topic.example.note}</p>
              </section>
              <section>
                <h3>Hal yang Perlu Diingat</h3>
                <ul>{topic.keyTakeaways.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <QuizComponent key={topic.id} topicId={topic.id} questions={topic.quiz} onCompleteTopic={completeTopic} isAlreadyCompleted={learningProgress.completedTopics.includes(topic.id)} previousScore={learningProgress.quizScores[topic.id] ?? null} />
            </>
          ) : <p className="empty-topic">Materi belum tersedia.</p>}
        </article>
      </div>
    </div>
  );
}

export default LearningPage;
