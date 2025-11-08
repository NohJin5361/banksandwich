import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChoiceCard from '../components/ChoiceCard';
import IncomeSlider from '../components/IncomeSlider';
import { questions } from '../data/questions';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [income, setIncome] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // 현재 질문에 대한 답변이 있는지 확인
  const hasAnswer = currentQuestion.type === 'income'
    ? income > 0
    : answers[currentQuestion.id] !== undefined;

  const handleChoiceSelect = (choice) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: choice
    });
  };

  const handleIncomeChange = (value) => {
    setIncome(value);
  };

  const handleNext = () => {
    if (!hasAnswer) {
      alert('답변을 선택해주세요.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 질문에 답변 완료 - 결과 계산 후 결과 페이지로 이동
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // 답변 데이터와 소득 정보를 로컬 스토리지에 저장
    const surveyData = {
      answers,
      income,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    // 결과 페이지로 이동
    navigate('/result');
  };

  // 키보드 네비게이션 (접근성)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && hasAnswer) {
        handleNext();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [hasAnswer, currentQuestionIndex]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full space-y-6">
        {/* 진행 상황 표시 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>질문 {currentQuestionIndex + 1} / {totalQuestions}</span>
            <span>{Math.round(progress)}% 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: '#f4b137' }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="card space-y-6">
          {/* 카테고리 뱃지 */}
          <div className="flex justify-center">
            <span className="inline-block px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full text-sm font-semibold">
              {currentQuestion.category}
            </span>
          </div>

          {/* 질문 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {currentQuestion.question}
          </h2>

          {/* 답변 영역 */}
          <div className="mt-8">
            {currentQuestion.type === 'income' ? (
              // 소득 입력 슬라이더
              <IncomeSlider
                minIncome={currentQuestion.minIncome}
                maxIncome={currentQuestion.maxIncome}
                step={currentQuestion.step}
                value={income}
                onChange={handleIncomeChange}
              />
            ) : (
              // 객관식 선택 카드
              <div
                className="space-y-3"
                role="radiogroup"
                aria-label={currentQuestion.question}
              >
                {currentQuestion.choices.map((choice) => (
                  <ChoiceCard
                    key={choice.id}
                    choice={choice}
                    selected={answers[currentQuestion.id]?.id === choice.id}
                    onSelect={handleChoiceSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all
              ${currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400 active:scale-95'
              }`}
          >
            이전
          </button>

          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all text-white
              ${!hasAnswer
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : currentQuestionIndex === totalQuestions - 1
                  ? 'hover:bg-secondary-600 active:scale-95'
                  : 'btn-primary'
              }`}
            style={hasAnswer && currentQuestionIndex === totalQuestions - 1 ? { backgroundColor: '#42abcd' } : {}}
          >
            {currentQuestionIndex === totalQuestions - 1 ? '결과 보기' : '다음'}
          </button>
        </div>

        {/* 진행 상태 텍스트 (모바일 접근성) */}
        <div className="text-center text-sm text-gray-500">
          {currentQuestionIndex === 0 && (
            <p>편안하게 답변해주세요. 정답은 없습니다.</p>
          )}
          {currentQuestionIndex === totalQuestions - 1 && hasAnswer && (
            <p className="text-primary-600 font-semibold">
              마지막 질문입니다! 결과를 확인하세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
