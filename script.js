const provinces = [
  ['Aceh', 'Banda Aceh'],
  ['Sumatra Utara', 'Medan'],
  ['Sumatra Barat', 'Padang'],
  ['Riau', 'Pekanbaru'],
  ['Kepulauan Riau', 'Tanjung Pinang'],
  ['Jambi', 'Jambi'],
  ['Sumatra Selatan', 'Palembang'],
  ['Kepulauan Bangka Belitung', 'Pangkal Pinang'],
  ['Bengkulu', 'Bengkulu'],
  ['Lampung', 'Bandar Lampung'],
  ['DKI Jakarta', 'Jakarta'],
  ['Jawa Barat', 'Bandung'],
  ['Jawa Tengah', 'Semarang'],
  ['DI Yogyakarta', 'Yogyakarta'],
  ['Jawa Timur', 'Surabaya'],
  ['Banten', 'Serang'],
  ['Bali', 'Denpasar'],
  ['Nusa Tenggara Barat', 'Mataram'],
  ['Nusa Tenggara Timur', 'Kupang'],
  ['Kalimantan Barat', 'Pontianak'],
  ['Kalimantan Tengah', 'Palangka Raya'],
  ['Kalimantan Selatan', 'Banjarmasin'],
  ['Kalimantan Timur', 'Samarinda'],
  ['Kalimantan Utara', 'Tanjung Selor'],
  ['Sulawesi Utara', 'Manado'],
  ['Gorontalo', 'Gorontalo'],
  ['Sulawesi Tengah', 'Palu'],
  ['Sulawesi Barat', 'Mamuju'],
  ['Sulawesi Selatan', 'Makassar'],
  ['Sulawesi Tenggara', 'Kendari'],
  ['Maluku', 'Ambon'],
  ['Maluku Utara', 'Sofifi'],
  ['Papua', 'Jayapura'],
  ['Papua Barat', 'Manokwari'],
  ['Papua Selatan', 'Merauke'],
  ['Papua Tengah', 'Nabire'],
  ['Papua Pegunungan', 'Wamena'],
  ['Papua Barat Daya', 'Sorong'],
];

const ESSAY_QUESTION_POINTS = 10;
const MCQ_FILL_QUESTION_POINTS = 8;

const questions = [
  {
    type: 'mcq',
    prompt: '1) Indonesia menganut sistem pemerintahan ...',
    options: ['Parlementer', 'Presidensial', 'Monarki', 'Oligarki'],
    answer: 'Presidensial',
  },
  {
    type: 'mcq',
    prompt: '2) Kepala pemerintahan provinsi adalah ...',
    options: ['Bupati', 'Wali Kota', 'Gubernur', 'Camat'],
    answer: 'Gubernur',
  },
  {
    type: 'mcq',
    prompt: '3) Ibu kota Provinsi Jawa Barat adalah ...',
    options: ['Bandung', 'Semarang', 'Surabaya', 'Jakarta'],
    answer: 'Bandung',
  },
  {
    type: 'mcq',
    prompt: '4) Lembaga pemerintahan paling dekat dengan warga adalah ...',
    options: ['RT/RW', 'Provinsi', 'Kementerian', 'DPR'],
    answer: 'RT/RW',
  },
  {
    type: 'fill',
    prompt: '5) Masa jabatan presiden adalah ___ tahun.',
    answer: '5',
  },
  {
    type: 'fill',
    prompt: '6) Indonesia memiliki ___ provinsi.',
    answer: '38',
  },
  {
    type: 'fill',
    prompt: '7) Ibu kota Sulawesi Selatan adalah ___.',
    answer: 'Makassar',
  },
  {
    type: 'fill',
    prompt: '8) Kecamatan dipimpin oleh ___.',
    answer: 'Camat',
  },
  {
    type: 'mcq',
    prompt: '9) Kepala desa dipilih oleh ...',
    options: ['Presiden', 'Rakyat', 'Menteri', 'Gubernur'],
    answer: 'Rakyat',
  },
  {
    type: 'mcq',
    prompt: '10) Urutan yang benar adalah ...',
    options: [
      'Provinsi → Nasional → Desa',
      'Nasional → Provinsi → Kabupaten/Kota',
      'Desa → Kecamatan → Nasional',
      'RT/RW → Provinsi → Kecamatan',
    ],
    answer: 'Nasional → Provinsi → Kabupaten/Kota',
  },
  {
    type: 'essay',
    prompt:
      '11) Jelaskan perbedaan desa dan kelurahan secara singkat (minimal 1 kalimat).',
    keywords: ['desa', 'kelurahan', 'dipilih', 'ditunjuk'],
  },
  {
    type: 'essay',
    prompt:
      '12) Mengapa RT/RW penting dalam kehidupan masyarakat? Jelaskan singkat.',
    keywords: ['warga', 'gotong royong', 'lingkungan', 'koordinasi'],
  },
];

const sectionButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

function showSection(id) {
  sections.forEach((section) => section.classList.toggle('active', section.id === id));
  sectionButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => showSection(button.dataset.target));
});

document.querySelectorAll('.next-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const nextSection = button.dataset.next;
    if (nextSection) showSection(nextSection);
  });
});

function renderProvinces() {
  const tableBody = document.getElementById('province-table');
  tableBody.innerHTML = provinces
    .map(
      ([province, capital], index) =>
        `<tr><td>${index + 1}</td><td>${province}</td><td>${capital}</td></tr>`
    )
    .join('');
}

function renderQuiz() {
  const container = document.getElementById('quiz-container');

  container.innerHTML = questions
    .map((question, index) => {
      if (question.type === 'mcq') {
        const options = question.options
          .map(
            (option) =>
              `<label><input type="radio" name="q${index}" value="${option}" /> ${option}</label>`
          )
          .join('');
        return `<article class="question"><h4>${question.prompt}</h4>${options}</article>`;
      }

      if (question.type === 'fill') {
        return `<article class="question"><h4>${question.prompt}</h4><input type="text" name="q${index}" /></article>`;
      }

      return `<article class="question"><h4>${question.prompt}</h4><textarea name="q${index}" rows="3"></textarea></article>`;
    })
    .join('');
}

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

function getAnswerValue(field) {
  if (typeof RadioNodeList !== 'undefined' && field instanceof RadioNodeList) {
    return field.value || '';
  }
  return field?.value || '';
}

function scoreQuiz(event) {
  event.preventDefault();

  const form = event.target;
  let score = 0;
  const maxScore = questions.reduce(
    (total, question) =>
      total + (question.type === 'essay' ? ESSAY_QUESTION_POINTS : MCQ_FILL_QUESTION_POINTS),
    0
  );

  questions.forEach((question, index) => {
    const field = form.elements[`q${index}`];
    const answer = normalize(getAnswerValue(field));

    if (question.type === 'essay') {
      const hits = question.keywords.filter((keyword) => answer.includes(keyword)).length;
      score += Math.round((hits / question.keywords.length) * ESSAY_QUESTION_POINTS);
      return;
    }

    if (answer === normalize(question.answer)) {
      score += MCQ_FILL_QUESTION_POINTS;
    }
  });

  const result = document.getElementById('result');
  const roundedScore = Math.min(maxScore, score);
  const status = roundedScore >= 75 ? 'Hebat! 🎉' : 'Tetap semangat! 💪';

  result.classList.add('show');
  result.innerHTML = `
    <h3>Hasil Penilaian</h3>
    <p><strong>Skor kamu: ${roundedScore}/${maxScore}</strong></p>
    <p>${status} Pelajari kembali bagian yang belum dikuasai ya.</p>
  `;
}

function resetQuiz() {
  const form = document.getElementById('quiz-form');
  form.reset();
  const result = document.getElementById('result');
  result.classList.remove('show');
  result.innerHTML = '';
}

renderProvinces();
renderQuiz();

document.getElementById('quiz-form').addEventListener('submit', scoreQuiz);
document.getElementById('reset-btn').addEventListener('click', resetQuiz);
