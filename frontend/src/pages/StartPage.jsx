import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileForm from '../components/UserProfileForm';

const StartPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  // 8개 샌드위치 이미지 순환
  const sandwichImages = [
    '/sandwich_image/image1.png',
    '/sandwich_image/image2.png',
    '/sandwich_image/image3.png',
    '/sandwich_image/image4.png',
    '/sandwich_image/image5.png',
    '/sandwich_image/image6.png',
    '/sandwich_image/image7.png',
    '/sandwich_image/image8.png',
  ];

  useEffect(() => {
    setIsVisible(true);

    // 3초마다 이미지 변경
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sandwichImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    setShowProfileForm(true);
    // 부드럽게 스크롤
    setTimeout(() => {
      document.getElementById('profile-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleProfileSubmit = (profileData) => {
    // 프로필 데이터를 localStorage에 저장
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    // 설문 페이지로 이동
    navigate('/survey');
  };

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 opacity-60"></div>

      {/* 장식 원들 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-24 h-24 bg-yellow-200 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* 메인 소개 섹션 */}
      <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">

          {/* 왼쪽: 샌드위치 이미지 영역 */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* 이미지 배경 원 */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>

              {/* 메인 이미지 */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                  {sandwichImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`샌드위치 ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${
                        index === currentImageIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Sandwich';
                      }}
                    />
                  ))}
                </div>

                {/* 이미지 인디케이터 */}
                <div className="flex justify-center gap-2 mt-6">
                  {sandwichImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-orange-500 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`이미지 ${index + 1}`}
                    />
                  ))}
                </div>

                {/* 단계 표시 */}
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    멍청비용 단계 {currentImageIndex + 1}/8
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {['5만원 이하', '5만~10만원', '10만~20만원', '20만~30만원',
                      '30만~50만원', '50만~70만원', '70만~100만원', '100만원 이상'][currentImageIndex]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 텍스트 및 버튼 영역 */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* 타이틀 */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  무료 재정 진단
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Bank
                </span>
                <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Sandwich
                </span>
              </h1>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                나의 소비 습관,
                <br />
                <span className="text-orange-600">샌드위치</span>로 확인하세요! 🥪
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                21개의 간단한 질문으로 당신의 <span className="font-bold text-gray-800">소비 점수</span>,
                <span className="font-bold text-gray-800"> 저축 추천액</span>, 그리고
                <span className="font-bold text-orange-600"> 멍청비용</span>을 확인할 수 있습니다.
              </p>
            </div>

            {/* 특징 리스트 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">소비 건전성 점수</h3>
                  <p className="text-gray-600 text-sm">나이와 직업별 맞춤 분석</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">개인화 저축 플랜</h3>
                  <p className="text-gray-600 text-sm">연령대·직업 기반 최적 저축액</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-2xl">🥪</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">멍청비용 샌드위치</h3>
                  <p className="text-gray-600 text-sm">8단계 시각화 + 또래 비교</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">AI 맞춤 조언</h3>
                  <p className="text-gray-600 text-sm">라이프스타일 맞춤 재정 팁</p>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-orange-400">21</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">질문</p>
              </div>
              <div className="text-center border-x border-gray-700">
                <p className="text-3xl sm:text-4xl font-bold text-blue-400">3-5</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">분</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-green-400">FREE</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">무료</p>
              </div>
            </div>

            {/* 시작 버튼 */}
            {!showProfileForm && (
              <div className="space-y-4">
                <button
                  onClick={handleStartClick}
                  className="group w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 text-xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span>지금 바로 진단 시작하기</span>
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <p className="text-center text-sm text-gray-600">
                  <svg className="w-4 h-4 inline text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  모든 응답은 <strong className="text-gray-800">익명 처리</strong>되며 안전하게 보호됩니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 프로필 입력 폼 (버튼 클릭 시 표시) */}
        {showProfileForm && (
          <div id="profile-form" className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 transform transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg mb-4">
                  STEP 1/2
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                  기본 정보를 입력해주세요
                </h2>
                <p className="text-gray-600">
                  더 정확한 분석을 위해 나이와 직업 정보가 필요합니다
                </p>
              </div>

              <UserProfileForm onSubmit={handleProfileSubmit} />

              <button
                onClick={() => setShowProfileForm(false)}
                className="mt-6 text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 mx-auto transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>뒤로 가기</span>
              </button>
            </div>
          </div>
        )}

        {/* 하단 안내 */}
        {!showProfileForm && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-full px-6 py-3 shadow-lg">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm">
                자주 묻는 질문
              </a>
              <span className="w-px h-4 bg-gray-300"></span>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm">
                문의하기
              </a>
              <span className="w-px h-4 bg-gray-300"></span>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm">
                이용 방법
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;
