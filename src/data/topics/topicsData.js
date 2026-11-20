// Lima judul tetap ditampilkan. Saat ini hanya topik pertama yang berisi materi.
export const TOPICS = [
  {
    id: 1,
    slug: 'pengelolaan-uang',
    title: 'Pengelolaan Uang dan Aliran Kas',
    hasContent: true,
    introduction: [
      'Pengelolaan uang dimulai dengan mencatat pemasukan dan pengeluaran. Pemasukan bisa berasal dari uang saku, gaji, atau penghasilan lain. Pengeluaran adalah uang yang dipakai untuk kebutuhan sehari-hari.',
      'Bedakan kebutuhan dan keinginan. Kebutuhan adalah hal yang perlu dipenuhi, seperti makan, transportasi, dan biaya belajar. Keinginan adalah hal yang bisa ditunda, seperti mengganti barang yang masih layak dipakai.',
      'Menabung berarti menyimpan uang untuk kebutuhan atau tujuan tertentu. Investasi bertujuan mengembangkan dana, tetapi nilainya dapat naik atau turun. Sebelum memulai, pahami kebutuhan dan kemampuan keuangan sendiri.',
    ],
    example: {
      description: 'Contoh catatan uang bulanan seorang mahasiswa:',
      rows: [
        ['Uang saku', 'Rp1.500.000'],
        ['Makan dan kebutuhan harian', 'Rp900.000'],
        ['Transportasi dan internet', 'Rp300.000'],
        ['Sisa uang', 'Rp300.000'],
      ],
      note: 'Sisa uang dapat disimpan untuk tabungan atau kebutuhan mendadak. Jumlah yang disisihkan disesuaikan dengan kondisi masing-masing.',
    },
    keyTakeaways: [
      'Catat pemasukan dan pengeluaran secara rutin.',
      'Utamakan kebutuhan sebelum membeli keinginan.',
      'Sisihkan uang sesuai kemampuan dan tujuan.',
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Apa langkah awal untuk mengelola uang?',
        options: ['Menghabiskan seluruh pemasukan.', 'Mencatat pemasukan dan pengeluaran.', 'Membeli semua barang yang diinginkan.'],
        correctIndex: 1,
        explanation: 'Catatan pemasukan dan pengeluaran membantu kita mengetahui ke mana uang digunakan.',
      },
      {
        id: 'q1-2',
        question: 'Manakah yang termasuk kebutuhan sehari-hari?',
        options: ['Mengganti ponsel yang masih berfungsi.', 'Membeli barang hanya karena diskon.', 'Membayar transportasi untuk kuliah.'],
        correctIndex: 2,
        explanation: 'Transportasi untuk kuliah mendukung kegiatan utama, sehingga termasuk kebutuhan.',
      },
    ],
  },
  { id: 2, slug: 'tujuan-keuangan', title: 'Tujuan Keuangan dan Jangka Waktu', hasContent: false },
  { id: 3, slug: 'risiko', title: 'Memahami Risiko dan Fluktuasi Nilai', hasContent: false },
  { id: 4, slug: 'pertumbuhan-majemuk', title: 'Setoran Berkala dan Pertumbuhan Majemuk', hasContent: false },
  { id: 5, slug: 'inflasi-daya-beli', title: 'Inflasi dan Daya Beli Riil', hasContent: false },
];

export function getTopicById(id) {
  return TOPICS.find((topic) => topic.id === Number(id)) || null;
}

export function getTopicBySlug(slug) {
  return TOPICS.find((topic) => topic.slug === slug) || null;
}
