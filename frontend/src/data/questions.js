// 설문 질문 데이터 (1-20번: 객관식, 21번: 소득 입력)
export const questions = [
  // 1. 소비 태도 (1-3번)
  {
    id: 1,
    category: "소비 태도",
    question: "물건을 살 때 나는",
    choices: [
      { id: 1, text: "꼭 필요한 것만 산다", score: 4 },
      { id: 2, text: "가끔 충동구매를 한다", score: 3 },
      { id: 3, text: "세일하면 일단 산다", score: 2 },
      { id: 4, text: "사고 후에 후회하는 편이다", score: 1 }
    ]
  },
  {
    id: 2,
    category: "소비 태도",
    question: "가격이 조금 비싸더라도",
    choices: [
      { id: 1, text: "품질이 좋으면 산다", score: 4 },
      { id: 2, text: "가성비를 가장 중요하게 본다", score: 3 },
      { id: 3, text: "브랜드를 본다", score: 2 },
      { id: 4, text: "그냥 가장 싸면 산다", score: 1 }
    ]
  },
  {
    id: 3,
    category: "소비 태도",
    question: "월급이 들어오면",
    choices: [
      { id: 1, text: "먼저 저축부터 한다", score: 4 },
      { id: 2, text: "필요한 지출을 먼저 처리한다", score: 3 },
      { id: 3, text: "바로 사고 싶은 걸 산다", score: 2 },
      { id: 4, text: "그냥 통장에 둔다가 알아서 쓴다", score: 1 }
    ]
  },

  // 2. 생활 지출 습관 (4-6번)
  {
    id: 4,
    category: "생활 지출 습관",
    question: "평소 식비는",
    choices: [
      { id: 1, text: "집에서 식사 위주", score: 4 },
      { id: 2, text: "외식 1~2회 정도", score: 3 },
      { id: 3, text: "주 3회 이상 외식", score: 2 },
      { id: 4, text: "배달앱이 생활의 일부", score: 1 }
    ]
  },
  {
    id: 5,
    category: "생활 지출 습관",
    question: "커피나 간식, 음료 등 소액지출은",
    choices: [
      { id: 1, text: "거의 하지 않는다", score: 4 },
      { id: 2, text: "하루 한두 번 정도", score: 3 },
      { id: 3, text: "자주 마신다", score: 2 },
      { id: 4, text: "계산 안 해도 모를 정도다", score: 1 }
    ]
  },
  {
    id: 6,
    category: "생활 지출 습관",
    question: "교통비는",
    choices: [
      { id: 1, text: "주로 대중교통 이용", score: 4 },
      { id: 2, text: "가끔 택시 이용", score: 3 },
      { id: 3, text: "자차 이용 중심", score: 2 },
      { id: 4, text: "이동비에 크게 신경 쓰지 않는다", score: 1 }
    ]
  },

  // 3. 여가·취미 소비 (7-9번)
  {
    id: 7,
    category: "여가·취미 소비",
    question: "취미활동에 사용하는 돈은",
    choices: [
      { id: 1, text: "거의 없다", score: 4 },
      { id: 2, text: "월 1~2회 소액", score: 3 },
      { id: 3, text: "정기적으로 일정 금액", score: 2 },
      { id: 4, text: "여가가 가장 큰 지출 항목이다", score: 1 }
    ]
  },
  {
    id: 8,
    category: "여가·취미 소비",
    question: "여행이나 놀 때의 소비 패턴은",
    choices: [
      { id: 1, text: "예산을 정하고 지킨다", score: 4 },
      { id: 2, text: "대체로 예산 내에서 쓴다", score: 3 },
      { id: 3, text: "즉흥적으로 쓰는 편이다", score: 2 },
      { id: 4, text: "신용카드로 먼저 쓰고 본다", score: 1 }
    ]
  },
  {
    id: 9,
    category: "여가·취미 소비",
    question: "자기관리(옷, 화장품, 액세서리 등) 지출은",
    choices: [
      { id: 1, text: "꼭 필요할 때만 한다", score: 4 },
      { id: 2, text: "월 단위로 일정 금액", score: 3 },
      { id: 3, text: "유행 따라 자주 구매", score: 2 },
      { id: 4, text: "지출이 많은 편이다", score: 1 }
    ]
  },

  // 4. 금융·저축 습관 (10-12번)
  {
    id: 10,
    category: "금융·저축 습관",
    question: "저축이나 투자 습관은",
    choices: [
      { id: 1, text: "매달 일정 금액 저축", score: 4 },
      { id: 2, text: "여유 있을 때만 저축", score: 3 },
      { id: 3, text: "거의 하지 않는다", score: 2 },
      { id: 4, text: "신용카드 할부가 우선이다", score: 1 }
    ]
  },
  {
    id: 11,
    category: "금융·저축 습관",
    question: "비상금(응급자금)이 있다면",
    choices: [
      { id: 1, text: "3개월치 이상 보유", score: 4 },
      { id: 2, text: "한 달치 정도", score: 3 },
      { id: 3, text: "거의 없다", score: 2 },
      { id: 4, text: "필요할 때 빌리면 된다고 생각한다", score: 1 }
    ]
  },
  {
    id: 12,
    category: "금융·저축 습관",
    question: "투자 경험은",
    choices: [
      { id: 1, text: "예금, 적금 중심", score: 4 },
      { id: 2, text: "주식·펀드 등 일부", score: 3 },
      { id: 3, text: "가상자산 등 고위험 투자", score: 2 },
      { id: 4, text: "투자에 관심 없다", score: 1 }
    ]
  },

  // 5. 대인관계·사회적 소비 (13-15번)
  {
    id: 13,
    category: "대인관계·사회적 소비",
    question: "친구나 연인과의 약속 비용은",
    choices: [
      { id: 1, text: "공평하게 나눈다", score: 4 },
      { id: 2, text: "가끔 내가 더 낸다", score: 3 },
      { id: 3, text: "거의 내가 낸다", score: 2 },
      { id: 4, text: "계산은 신경 안 쓴다", score: 1 }
    ]
  },
  {
    id: 14,
    category: "대인관계·사회적 소비",
    question: "선물이나 경조사비는",
    choices: [
      { id: 1, text: "예산을 정해둔다", score: 4 },
      { id: 2, text: "상황에 따라 달라진다", score: 3 },
      { id: 3, text: "계획 없이 즉흥적으로", score: 2 },
      { id: 4, text: "부담되지만 어쩔 수 없이 낸다", score: 1 }
    ]
  },
  {
    id: 15,
    category: "대인관계·사회적 소비",
    question: "음주나 회식 관련 지출은",
    choices: [
      { id: 1, text: "거의 없다", score: 4 },
      { id: 2, text: "월 1~2회 정도", score: 3 },
      { id: 3, text: "주 1회 이상", score: 2 },
      { id: 4, text: "기억 안 날 정도로 자주", score: 1 }
    ]
  },

  // 6. 소비 계획·통제력 (16-18번)
  {
    id: 16,
    category: "소비 계획·통제력",
    question: "한 달 예산을 세운 후 실제 지출은",
    choices: [
      { id: 1, text: "거의 일치한다", score: 4 },
      { id: 2, text: "약간 초과한다", score: 3 },
      { id: 3, text: "절반 이상 차이난다", score: 2 },
      { id: 4, text: "예산을 세운 적이 없다", score: 1 }
    ]
  },
  {
    id: 17,
    category: "소비 계획·통제력",
    question: "신용카드 사용 습관은",
    choices: [
      { id: 1, text: "최소한으로 사용", score: 4 },
      { id: 2, text: "필요할 때만 사용", score: 3 },
      { id: 3, text: "거의 모든 결제 카드 사용", score: 2 },
      { id: 4, text: "카드값이 부담된다", score: 1 }
    ]
  },
  {
    id: 18,
    category: "소비 계획·통제력",
    question: "가계부나 앱으로 소비 내역을 관리하나요?",
    choices: [
      { id: 1, text: "꼼꼼히 기록한다", score: 4 },
      { id: 2, text: "가끔 기록한다", score: 3 },
      { id: 3, text: "시도했지만 중단했다", score: 2 },
      { id: 4, text: "전혀 안 한다", score: 1 }
    ]
  },

  // 7. 미래 인식·목표 (19-20번)
  {
    id: 19,
    category: "미래 인식·목표",
    question: "5년 뒤 재정 목표가 있다면",
    choices: [
      { id: 1, text: "명확한 목표가 있다", score: 4 },
      { id: 2, text: "막연히 저축해야겠다고 생각", score: 3 },
      { id: 3, text: "아직 생각 안 해봤다", score: 2 },
      { id: 4, text: "목표보다는 현재가 중요하다", score: 1 }
    ]
  },
  {
    id: 20,
    category: "미래 인식·목표",
    question: "돈을 쓰는 가장 큰 이유는",
    choices: [
      { id: 1, text: "생존과 필요", score: 4 },
      { id: 2, text: "삶의 질 향상", score: 3 },
      { id: 3, text: "행복과 보상", score: 2 },
      { id: 4, text: "타인과의 관계 유지", score: 1 }
    ]
  },

  // 8. 소득 정보 (21번 - 특수 처리)
  {
    id: 21,
    category: "소득 정보",
    question: "현재 한 달 평균 소득(세후 기준)을 입력해주세요",
    type: "income", // 특별한 타입 지정
    minIncome: 0,
    maxIncome: 10000000,
    step: 100000 // 10만원 단위
  }
];

// 카테고리별 점수 가중치 (AI 분석용)
export const categoryWeights = {
  "소비 태도": 1.2,
  "생활 지출 습관": 1.1,
  "여가·취미 소비": 1.0,
  "금융·저축 습관": 1.3,
  "대인관계·사회적 소비": 0.9,
  "소비 계획·통제력": 1.2,
  "미래 인식·목표": 1.1
};

// 멍청비용 이미지 매핑 (금액 구간별)
export const foolishExpenseImages = [
  { minAmount: 0, maxAmount: 50000, image: "/sandwich_image/image1.png", label: "5만원 이하" },
  { minAmount: 50000, maxAmount: 100000, image: "/sandwich_image/image2.png", label: "5만원~10만원" },
  { minAmount: 100000, maxAmount: 200000, image: "/sandwich_image/image3.png", label: "10만원~20만원" },
  { minAmount: 200000, maxAmount: 300000, image: "/sandwich_image/image4.png", label: "20만원~30만원" },
  { minAmount: 300000, maxAmount: 500000, image: "/sandwich_image/image5.png", label: "30만원~50만원" },
  { minAmount: 500000, maxAmount: 700000, image: "/sandwich_image/image6.png", label: "50만원~70만원" },
  { minAmount: 700000, maxAmount: 1000000, image: "/sandwich_image/image7.png", label: "70만원~100만원" },
  { minAmount: 1000000, maxAmount: Infinity, image: "/sandwich_image/image8.png", label: "100만원 이상" }
];
