// 직업 목록
export const jobCategories = [
  { value: 'student', label: '학생', icon: '🎓' },
  { value: 'office_worker', label: '회사원', icon: '💼' },
  { value: 'public_servant', label: '공무원', icon: '🏛️' },
  { value: 'professional', label: '전문직 (의사, 변호사 등)', icon: '⚕️' },
  { value: 'self_employed', label: '자영업', icon: '🏪' },
  { value: 'freelancer', label: '프리랜서', icon: '💻' },
  { value: 'part_time', label: '아르바이트', icon: '⏰' },
  { value: 'housewife', label: '주부/주夫', icon: '🏠' },
  { value: 'unemployed', label: '구직중', icon: '🔍' },
  { value: 'retired', label: '은퇴', icon: '🌅' },
  { value: 'other', label: '기타', icon: '📋' },
];

// 나이대 목록
export const ageGroups = [
  { value: '10s', label: '10대', range: '10-19세' },
  { value: '20s_early', label: '20대 초반', range: '20-24세' },
  { value: '20s_late', label: '20대 후반', range: '25-29세' },
  { value: '30s_early', label: '30대 초반', range: '30-34세' },
  { value: '30s_late', label: '30대 후반', range: '35-39세' },
  { value: '40s', label: '40대', range: '40-49세' },
  { value: '50s', label: '50대', range: '50-59세' },
  { value: '60s_plus', label: '60대 이상', range: '60세 이상' },
];

// 직업별 평균 소득 가이드 (참고용)
export const averageIncomeByJob = {
  student: 500000,
  office_worker: 3000000,
  public_servant: 3500000,
  professional: 5000000,
  self_employed: 2500000,
  freelancer: 2800000,
  part_time: 1500000,
  housewife: 0,
  unemployed: 0,
  retired: 2000000,
  other: 2500000,
};

// 나이대별 소비 패턴 가중치
export const ageWeights = {
  '10s': { savings: 0.8, foolish: 1.2 },
  '20s_early': { savings: 0.9, foolish: 1.1 },
  '20s_late': { savings: 1.0, foolish: 1.0 },
  '30s_early': { savings: 1.1, foolish: 0.9 },
  '30s_late': { savings: 1.2, foolish: 0.8 },
  '40s': { savings: 1.3, foolish: 0.7 },
  '50s': { savings: 1.4, foolish: 0.6 },
  '60s_plus': { savings: 1.2, foolish: 0.5 },
};

// 직업별 소비 패턴 가중치
export const jobWeights = {
  student: { savings: 0.7, foolish: 1.3 },
  office_worker: { savings: 1.0, foolish: 1.0 },
  public_servant: { savings: 1.2, foolish: 0.8 },
  professional: { savings: 1.1, foolish: 0.9 },
  self_employed: { savings: 0.9, foolish: 1.1 },
  freelancer: { savings: 0.8, foolish: 1.2 },
  part_time: { savings: 0.6, foolish: 1.4 },
  housewife: { savings: 1.3, foolish: 0.7 },
  unemployed: { savings: 0.5, foolish: 1.5 },
  retired: { savings: 1.4, foolish: 0.6 },
  other: { savings: 1.0, foolish: 1.0 },
};
