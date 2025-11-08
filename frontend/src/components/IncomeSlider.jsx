import React, { useState } from 'react';

/**
 * 소득 입력 슬라이더 컴포넌트 (21번 문항용)
 * @param {Object} props
 * @param {number} props.minIncome - 최소 소득 (기본값: 0)
 * @param {number} props.maxIncome - 최대 소득 (기본값: 10,000,000)
 * @param {number} props.step - 증분 단위 (기본값: 100,000)
 * @param {number} props.value - 현재 선택된 소득
 * @param {Function} props.onChange - 값 변경 시 호출되는 함수
 */
const IncomeSlider = ({
  minIncome = 0,
  maxIncome = 10000000,
  step = 100000,
  value,
  onChange
}) => {
  const [inputValue, setInputValue] = useState(value || 0);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value.replace(/,/g, '')) || 0;
    const clampedValue = Math.max(minIncome, Math.min(maxIncome, newValue));
    setInputValue(clampedValue);
    onChange(clampedValue);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  return (
    <div className="w-full space-y-6">
      {/* 현재 선택된 금액 표시 */}
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">선택한 월 평균 소득 (세후)</div>
        <div className="text-4xl font-bold text-primary-600">
          {formatCurrency(inputValue)}
          <span className="text-2xl ml-2">원</span>
        </div>
      </div>

      {/* 슬라이더 */}
      <div className="relative px-2">
        <input
          type="range"
          min={minIncome}
          max={maxIncome}
          step={step}
          value={inputValue}
          onChange={handleSliderChange}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer
            slider-thumb
            focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-label="월 평균 소득 선택"
          aria-valuemin={minIncome}
          aria-valuemax={maxIncome}
          aria-valuenow={inputValue}
          aria-valuetext={`${formatCurrency(inputValue)}원`}
        />

        {/* 슬라이더 레이블 */}
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
          <span>{formatCurrency(minIncome)}원</span>
          <span>{formatCurrency(maxIncome)}원 이상</span>
        </div>
      </div>

      {/* 직접 입력 필드 */}
      <div className="max-w-xs mx-auto">
        <label htmlFor="income-input" className="block text-sm text-gray-600 mb-2 text-center">
          또는 직접 입력
        </label>
        <div className="relative">
          <input
            id="income-input"
            type="text"
            value={formatCurrency(inputValue)}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-center text-lg font-semibold border-2 border-gray-300
              rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            placeholder="0"
            aria-label="소득 직접 입력"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            원
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          최소 {formatCurrency(minIncome)}원 ~ 최대 {formatCurrency(maxIncome)}원
        </p>
      </div>

      {/* 빠른 선택 버튼 */}
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {[1000000, 2000000, 3000000, 4000000, 5000000, 10000000].map((amount) => (
          <button
            key={amount}
            onClick={() => {
              setInputValue(amount);
              onChange(amount);
            }}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${inputValue === amount
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {amount >= 10000000 ? '1천만+' : `${amount / 10000}만원`}
          </button>
        ))}
      </div>

      {/* CSS for custom slider thumb */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f4b137;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f4b137;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          background: #f2a431;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb:hover {
          background: #f2a431;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default IncomeSlider;
