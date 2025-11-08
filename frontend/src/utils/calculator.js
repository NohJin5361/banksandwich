import { questions, categoryWeights, foolishExpenseImages } from '../data/questions';
import { ageWeights, jobWeights, ageGroups, jobCategories } from '../data/userProfile';

/**
 * 소비 점수 계산 (0-100점)
 * @param {Object} answers - 사용자 답변 객체 { questionId: choice }
 * @returns {Object} - { totalScore, maxScore, scorePercentage, categoryScores }
 */
export const calculateScore = (answers) => {
  let totalScore = 0;
  let maxScore = 0;
  const categoryScores = {};

  // 1-20번 질문만 점수 계산 (21번은 소득 정보)
  const scorableQuestions = questions.filter(q => q.type !== 'income');

  scorableQuestions.forEach((question) => {
    const userAnswer = answers[question.id];

    if (userAnswer) {
      const score = userAnswer.score || 0;
      totalScore += score;

      // 카테고리별 점수 집계
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = {
          score: 0,
          maxScore: 0,
          count: 0
        };
      }
      categoryScores[question.category].score += score;
      categoryScores[question.category].count += 1;
    }

    // 최대 점수는 4점
    maxScore += 4;
    if (categoryScores[question.category]) {
      categoryScores[question.category].maxScore += 4;
    }
  });

  // 0-100 점수로 변환
  const scorePercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // 카테고리별 백분율 계산
  Object.keys(categoryScores).forEach(category => {
    const catData = categoryScores[category];
    catData.percentage = catData.maxScore > 0
      ? Math.round((catData.score / catData.maxScore) * 100)
      : 0;
    catData.average = catData.count > 0
      ? (catData.score / catData.count).toFixed(1)
      : 0;
  });

  return {
    totalScore,
    maxScore,
    scorePercentage,
    categoryScores
  };
};

/**
 * 저축 추천 금액 계산 (나이와 직업 반영)
 * @param {number} income - 월 소득
 * @param {number} scorePercentage - 소비 점수 (0-100)
 * @param {string} ageGroup - 나이대 (예: '20s_early')
 * @param {string} job - 직업 (예: 'office_worker')
 * @returns {Object} - { recommendedSavings, savingsRate, goalAmount, monthsToGoal }
 */
export const calculateSavings = (income, scorePercentage, ageGroup = null, job = null) => {
  // 기본 점수에 따른 저축률
  let baseSavingsRate;

  if (scorePercentage >= 80) {
    baseSavingsRate = 0.30; // 30%
  } else if (scorePercentage >= 60) {
    baseSavingsRate = 0.25; // 25%
  } else if (scorePercentage >= 40) {
    baseSavingsRate = 0.20; // 20%
  } else if (scorePercentage >= 20) {
    baseSavingsRate = 0.15; // 15%
  } else {
    baseSavingsRate = 0.10; // 10%
  }

  // 나이와 직업 가중치 적용
  let ageWeight = 1.0;
  let jobWeight = 1.0;

  if (ageGroup && ageWeights[ageGroup]) {
    ageWeight = ageWeights[ageGroup].savings;
  }

  if (job && jobWeights[job]) {
    jobWeight = jobWeights[job].savings;
  }

  // 최종 저축률 = 기본 저축률 × 나이 가중치 × 직업 가중치
  const savingsRate = Math.min(0.40, baseSavingsRate * ageWeight * jobWeight); // 최대 40%
  const recommendedSavings = Math.round(income * savingsRate);

  // 목표 금액 (1년치 소득)
  const goalAmount = income * 12;

  // 목표 달성 기간 (개월)
  const monthsToGoal = recommendedSavings > 0
    ? Math.ceil(goalAmount / recommendedSavings)
    : 0;

  return {
    recommendedSavings,
    savingsRate: Math.round(savingsRate * 100),
    goalAmount,
    monthsToGoal,
    ageWeight,
    jobWeight
  };
};

/**
 * 멍청비용 (자유 소비 금액) 계산 (나이와 직업 반영)
 * @param {number} income - 월 소득
 * @param {number} scorePercentage - 소비 점수 (0-100)
 * @param {string} ageGroup - 나이대
 * @param {string} job - 직업
 * @returns {Object} - { foolishExpense, imageInfo }
 */
export const calculateFoolishExpense = (income, scorePercentage, ageGroup = null, job = null) => {
  // 기본 생활비 비율 (점수가 낮을수록 이미 많이 쓰고 있음)
  let necessaryExpenseRate;

  if (scorePercentage >= 80) {
    necessaryExpenseRate = 0.50; // 50%
  } else if (scorePercentage >= 60) {
    necessaryExpenseRate = 0.55; // 55%
  } else if (scorePercentage >= 40) {
    necessaryExpenseRate = 0.60; // 60%
  } else if (scorePercentage >= 20) {
    necessaryExpenseRate = 0.65; // 65%
  } else {
    necessaryExpenseRate = 0.70; // 70%
  }

  const savingsData = calculateSavings(income, scorePercentage, ageGroup, job);
  const necessaryExpense = income * necessaryExpenseRate;

  // 멍청비용 = 소득 - 필수 생활비 - 추천 저축액
  let foolishExpense = income - necessaryExpense - savingsData.recommendedSavings;
  foolishExpense = Math.max(0, Math.round(foolishExpense));

  // 멍청비용에 해당하는 이미지 찾기
  const imageInfo = foolishExpenseImages.find(
    img => foolishExpense >= img.minAmount && foolishExpense < img.maxAmount
  ) || foolishExpenseImages[foolishExpenseImages.length - 1];

  return {
    foolishExpense,
    imageInfo,
    necessaryExpense: Math.round(necessaryExpense),
    necessaryExpenseRate: Math.round(necessaryExpenseRate * 100)
  };
};

/**
 * AI 피드백 생성 (나이와 직업 반영)
 * @param {number} scorePercentage - 소비 점수
 * @param {Object} categoryScores - 카테고리별 점수
 * @param {number} income - 월 소득
 * @param {string} ageGroup - 나이대
 * @param {string} job - 직업
 * @returns {Object} - { message, recommendations, warnings }
 */
export const generateAIFeedback = (scorePercentage, categoryScores, income, ageGroup = null, job = null) => {
  let message = '';
  const recommendations = [];
  const warnings = [];

  // 나이와 직업 레이블
  const ageLabel = ageGroup && ageGroups.find(a => a.value === ageGroup)?.label;
  const jobLabel = job && jobCategories.find(j => j.value === job)?.label;

  // 전체 점수에 따른 메시지 (나이/직업 맞춤)
  if (scorePercentage >= 80) {
    message = `훌륭해요! ${ageLabel && jobLabel ? `${ageLabel} ${jobLabel}로서` : ''} 매우 건전한 소비 습관을 가지고 계십니다. 현재의 패턴을 유지하면서 투자 다각화를 고려해보세요.`;
  } else if (scorePercentage >= 60) {
    message = `좋아요! ${ageLabel && jobLabel ? `${ageLabel} ${jobLabel} 평균보다` : ''} 양호한 소비 패턴입니다. 몇 가지 개선점만 보완하면 더욱 좋을 것 같아요.`;
  } else if (scorePercentage >= 40) {
    message = `보통입니다. ${ageLabel && jobLabel ? `${ageLabel} ${jobLabel}에게는` : ''} 소비 습관 개선이 필요한 부분이 있습니다. 카테고리별 조언을 참고해주세요.`;
  } else if (scorePercentage >= 20) {
    message = `주의가 필요합니다. ${ageLabel && jobLabel ? `${ageLabel} ${jobLabel}로서` : ''} 소비 패턴을 개선하지 않으면 재정적 어려움을 겪을 수 있습니다.`;
  } else {
    message = `긴급 개선이 필요합니다! 현재 소비 패턴은 재정적으로 매우 위험합니다. 즉시 조치가 필요합니다.`;
  }

  // 나이대별 맞춤 조언
  if (ageGroup) {
    if (ageGroup.includes('10s') || ageGroup.includes('20s_early')) {
      recommendations.push('젊은 나이에 저축 습관을 들이면 복리 효과로 큰 자산을 만들 수 있습니다');
    } else if (ageGroup.includes('30s')) {
      recommendations.push('결혼, 주택 마련 등 큰 지출에 대비한 계획적 저축이 중요합니다');
    } else if (ageGroup.includes('40s') || ageGroup.includes('50s')) {
      recommendations.push('노후 준비와 자녀 교육비를 동시에 고려한 재정 계획이 필요합니다');
    }
  }

  // 직업별 맞춤 조언
  if (job) {
    if (job === 'student' || job === 'part_time') {
      recommendations.push('소득이 적은 시기지만 소액이라도 꾸준히 저축하는 습관이 중요합니다');
    } else if (job === 'freelancer' || job === 'self_employed') {
      recommendations.push('불규칙한 수입에 대비해 비상금을 소득의 6개월치 이상 확보하세요');
    } else if (job === 'public_servant') {
      recommendations.push('안정적인 소득을 활용해 장기 투자 상품에 관심을 가져보세요');
    }
  }

  // 카테고리별 분석
  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.percentage < 50) {
      // 점수가 낮은 카테고리에 대한 경고
      switch (category) {
        case '소비 태도':
          warnings.push('충동구매와 계획 없는 소비가 많습니다. 구매 전 24시간 고민 규칙을 적용해보세요.');
          recommendations.push('장바구니에 담고 하루 기다리기');
          break;
        case '생활 지출 습관':
          warnings.push('외식비와 소액 지출이 과다합니다. 주 3회 이상 외식을 줄이고 커피값을 절약해보세요.');
          recommendations.push('외식 주 1-2회로 제한, 텀블러 사용');
          break;
        case '여가·취미 소비':
          warnings.push('여가 활동 지출이 높습니다. 즐거움은 유지하되, 예산을 정해보세요.');
          recommendations.push('월 여가비 예산 설정 (소득의 10% 이하)');
          break;
        case '금융·저축 습관':
          warnings.push('저축과 투자 습관이 부족합니다. 즉시 자동이체로 강제 저축을 시작하세요.');
          recommendations.push('급여일에 자동 저축 설정');
          break;
        case '대인관계·사회적 소비':
          warnings.push('대인관계 비용이 과다합니다. 합리적인 선에서 조절이 필요합니다.');
          recommendations.push('회식/약속 횟수 조절, 더치페이 제안');
          break;
        case '소비 계획·통제력':
          warnings.push('예산 관리와 통제력이 부족합니다. 가계부 앱을 사용해보세요.');
          recommendations.push('가계부 앱 설치 및 매일 기록');
          break;
        case '미래 인식·목표':
          warnings.push('재정 목표가 불분명합니다. 구체적인 목표를 세우고 계획을 수립하세요.');
          recommendations.push('1년, 5년 재정 목표 설정');
          break;
      }
    }
  });

  // 소득 대비 조언
  if (income < 2000000) {
    recommendations.push('소득이 낮은 편이므로 지출 최소화와 수입원 다각화를 고려하세요.');
  } else if (income >= 5000000) {
    recommendations.push('소득이 높으므로 적극적인 투자와 절세 전략을 수립하세요.');
  }

  return {
    message,
    recommendations: recommendations.slice(0, 5), // 최대 5개
    warnings: warnings.slice(0, 3) // 최대 3개
  };
};

/**
 * 전체 결과 계산 (프로필 정보 포함)
 * @param {Object} answers - 사용자 답변
 * @param {number} income - 월 소득
 * @param {Object} userProfile - 사용자 프로필 { age, job }
 * @returns {Object} - 모든 계산 결과
 */
export const calculateResults = (answers, income, userProfile = null) => {
  const ageGroup = userProfile?.age || null;
  const job = userProfile?.job || null;

  const scoreData = calculateScore(answers);
  const savingsData = calculateSavings(income, scoreData.scorePercentage, ageGroup, job);
  const foolishExpenseData = calculateFoolishExpense(income, scoreData.scorePercentage, ageGroup, job);
  const aiFeedback = generateAIFeedback(
    scoreData.scorePercentage,
    scoreData.categoryScores,
    income,
    ageGroup,
    job
  );

  // 사용자 프로필 정보 추가
  const ageLabel = ageGroup && ageGroups.find(a => a.value === ageGroup)?.label;
  const jobLabel = job && jobCategories.find(j => j.value === job)?.label;

  return {
    score: scoreData,
    savings: savingsData,
    foolishExpense: foolishExpenseData,
    feedback: aiFeedback,
    income,
    userProfile: {
      age: ageGroup,
      job,
      ageLabel,
      jobLabel
    }
  };
};
