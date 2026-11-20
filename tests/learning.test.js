import { describe, it, expect } from 'vitest';
import { TOPICS, getTopicById, getTopicBySlug } from '../src/data/topics/topicsData.js';

describe('Materi belajar sederhana', () => {
  it('Tetap memiliki lima judul topik wajib', () => {
    expect(TOPICS.map((topic) => topic.id)).toEqual([1, 2, 3, 4, 5]);
    expect(TOPICS.map((topic) => topic.title).join(' ')).toMatch(/Pengelolaan Uang.*Tujuan Keuangan.*Risiko.*Majemuk.*Inflasi/);
  });

  it('Hanya topik Pengelolaan Uang yang memiliki isi dan kuis', () => {
    expect(TOPICS.filter((topic) => topic.hasContent).map((topic) => topic.id)).toEqual([1]);
    for (const topic of TOPICS.slice(1)) {
      expect(topic.introduction).toBeUndefined();
      expect(topic.quiz).toBeUndefined();
      expect(topic.video).toBeUndefined();
    }
  });

  it('Kuis topik pertama memiliki jawaban dan penjelasan yang lengkap', () => {
    const topic = getTopicById(1);
    expect(topic.introduction.length).toBeGreaterThan(0);
    expect(topic.quiz.length).toBeGreaterThan(0);
    for (const question of topic.quiz) {
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(question.options.length);
      expect(question.explanation.length).toBeGreaterThan(10);
    }
  });

  it('Pencarian topik menerima ID dan slug serta menangani topik yang tidak ada', () => {
    expect(getTopicById('1')).toBe(TOPICS[0]);
    expect(getTopicBySlug('inflasi-daya-beli')).toBe(TOPICS[4]);
    expect(getTopicById(99)).toBeNull();
    expect(getTopicBySlug('tidak-ada')).toBeNull();
  });
});
