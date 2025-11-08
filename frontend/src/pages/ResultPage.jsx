import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateResults } from '../utils/calculator';

const ResultPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 설문 데이터 가져오기
    const surveyDataStr = localStorage.getItem('surveyData');
    const userProfileStr = localStorage.getItem('userProfile');

    if (!surveyDataStr) {
      // 설문 데이터가 없으면 시작 페이지로 리다이렉트
      navigate('/');
      return;
    }

    const surveyData = JSON.parse(surveyDataStr);
    const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;

    const calculatedResults = calculateResults(surveyData.answers, surveyData.income, userProfile);
    setResults(calculatedResults);
    setLoading(false);
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('surveyData');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    );
  }

  const { score, savings, foolishExpense, feedback, income, userProfile } = results;

  // 점수에 따른 등급 결정
  const getScoreGrade = (percentage) => {
    if (percentage >= 80) return { grade: 'S', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 60) return { grade: 'A', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 40) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 20) return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const scoreGrade = getScoreGrade(score.scorePercentage);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            진단 결과
          </h1>
          <p className="text-gray-600">
            당신의 소비 습관을 분석했습니다
          </p>
          {userProfile?.ageLabel && userProfile?.jobLabel && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {userProfile.ageLabel}
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                {userProfile.jobLabel}
              </span>
            </div>
          )}
        </div>

        {/* 소비 점수 카드 */}
        <div className="card text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">소비 건전성 점수</h2>
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${scoreGrade.bg}`}>
            <div className="text-center">
              <div className={`text-5xl font-bold ${scoreGrade.color}`}>
                {score.scorePercentage}
              </div>
              <div className={`text-2xl font-semibold ${scoreGrade.color}`}>
                {scoreGrade.grade}등급
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            100점 만점 중 {score.scorePercentage}점
          </p>

          {/* 진행바 */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${score.scorePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI 피드백 카드 */}
        <div className="card space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-8 h-8 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            AI 분석 결과
          </h2>
          <div className="bg-secondary-50 rounded-lg p-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {feedback.message}
            </p>
          </div>

          {/* 경고 사항 */}
          {feedback.warnings.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-red-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                주의할 점
              </h3>
              <ul className="space-y-2">
                {feedback.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 추천 사항 */}
          {feedback.recommendations.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-green-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                추천 행동
              </h3>
              <ul className="space-y-2">
                {feedback.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 재정 계획 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 저축 추천 */}
          <div className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-800">추천 저축액</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">월 소득</span>
                <span className="text-xl font-bold text-gray-800">
                  {formatCurrency(income)}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">저축률</span>
                <span className="text-lg font-semibold text-primary-600">
                  {savings.savingsRate}%
                </span>
              </div>
              <div className="flex justify-between items-center bg-primary-50 rounded-lg p-3">
                <span className="font-semibold text-gray-800">월 저축액</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(savings.recommendedSavings)}원
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  이 금액으로 저축하면 약 <span className="font-semibold text-secondary-600">
                    {savings.monthsToGoal}개월
                  </span> 후 <span className="font-semibold">
                    {formatCurrency(savings.goalAmount)}원
                  </span>을 모을 수 있어요!
                </p>
              </div>
            </div>
          </div>

          {/* 멍청비용 */}
          <div className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-800">멍청비용</h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                자유롭게 쓸 수 있는 금액
              </p>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {formatCurrency(foolishExpense.foolishExpense)}원
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {foolishExpense.imageInfo.label}
                </div>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>필수 생활비</span>
                  <span>{formatCurrency(foolishExpense.necessaryExpense)}원 ({foolishExpense.necessaryExpenseRate}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>저축</span>
                  <span>{formatCurrency(savings.recommendedSavings)}원 ({savings.savingsRate}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 멍청비용 이미지 */}
        <div className="card text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-800">당신의 멍청비용은...</h2>
          <div className="max-w-md mx-auto">
            <img
              src={foolishExpense.imageInfo.image}
              alt={`멍청비용 ${foolishExpense.imageInfo.label}`}
              className="w-full rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          </div>
          <p className="text-gray-600">
            {foolishExpense.imageInfo.label} 범위의 샌드위치입니다!
          </p>
        </div>

        {/* 카테고리별 상세 점수 */}
        <div className="card space-y-4">
          <h2 className="text-xl font-bold text-gray-800">카테고리별 점수</h2>
          <div className="space-y-3">
            {Object.entries(score.categoryScores).map(([category, data]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="text-gray-600">{data.percentage}점</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      data.percentage >= 70 ? 'bg-green-500' :
                      data.percentage >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRestart}
            className="btn-primary flex-1"
          >
            다시 진단하기
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary flex-1"
          >
            결과 저장하기
          </button>
        </div>

        {/* 하단 안내 */}
        <div className="card bg-gray-50 text-center text-sm text-gray-600">
          <p>
            이 진단 결과는 참고용이며, 개인의 재정 상황에 따라 실제와 다를 수 있습니다.
          </p>
          <p className="mt-2">
            전문적인 재무 상담이 필요하시다면 금융 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
