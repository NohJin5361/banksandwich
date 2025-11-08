import React, { useState } from 'react';
import { jobCategories, ageGroups } from '../data/userProfile';

const UserProfileForm = ({ onSubmit }) => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAge || !selectedJob) {
      setShowError(true);
      return;
    }

    onSubmit({ age: selectedAge, job: selectedJob });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 나이대 선택 */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-800">
          <span className="inline-flex items-center gap-2">
            <span className="text-2xl">👤</span>
            <span>나이대를 선택해주세요</span>
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ageGroups.map((age) => (
            <button
              key={age.value}
              type="button"
              onClick={() => {
                setSelectedAge(age.value);
                setShowError(false);
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedAge === age.value
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 text-white shadow-lg transform scale-105'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:shadow-md'
              }`}
            >
              <div className="font-bold text-base">{age.label}</div>
              <div className={`text-xs mt-1 ${
                selectedAge === age.value ? 'text-orange-100' : 'text-gray-500'
              }`}>
                {age.range}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 직업 선택 */}
      <div className="space-y-4">
        <label className="block text-xl font-bold text-gray-800">
          <span className="inline-flex items-center gap-2">
            <span className="text-2xl">💼</span>
            <span>직업을 선택해주세요</span>
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {jobCategories.map((job) => (
            <button
              key={job.value}
              type="button"
              onClick={() => {
                setSelectedJob(job.value);
                setShowError(false);
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedJob === job.value
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{job.icon}</div>
              <div className="font-semibold text-sm">{job.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 오류 메시지 */}
      {showError && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-center gap-3 animate-shake">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-800 font-semibold">나이대와 직업을 모두 선택해주세요!</p>
        </div>
      )}

      {/* 선택 요약 */}
      {(selectedAge || selectedJob) && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            선택한 정보
          </h3>
          <div className="space-y-2 text-gray-700">
            {selectedAge && (
              <p className="flex items-center gap-2">
                <span className="font-semibold">나이:</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {ageGroups.find(a => a.value === selectedAge)?.label}
                </span>
              </p>
            )}
            {selectedJob && (
              <p className="flex items-center gap-2">
                <span className="font-semibold">직업:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {jobCategories.find(j => j.value === selectedJob)?.icon}{' '}
                  {jobCategories.find(j => j.value === selectedJob)?.label}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={!selectedAge || !selectedJob}
        className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 ${
          selectedAge && selectedJob
            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <span className="flex items-center justify-center gap-3">
          <span>설문 시작하기</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>

      {/* 안내 문구 */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          <svg className="w-4 h-4 inline text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          이 정보는 <strong className="text-gray-800">더 정확한 분석</strong>을 위해 사용됩니다
        </p>
        <p className="text-xs text-gray-500">
          개인정보는 익명화되어 통계 목적으로만 활용됩니다
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </form>
  );
};

export default UserProfileForm;
