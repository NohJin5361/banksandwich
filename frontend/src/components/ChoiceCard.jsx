import React from 'react';

/**
 * 카드형 선택지 컴포넌트
 * @param {Object} props
 * @param {Object} props.choice - 선택지 데이터 { id, text, score }
 * @param {boolean} props.selected - 선택 여부
 * @param {Function} props.onSelect - 선택 시 호출되는 함수
 */
const ChoiceCard = ({ choice, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(choice)}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200
        text-left font-medium
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
        ${selected
          ? 'bg-primary-100 border-primary-500 shadow-lg transform scale-105'
          : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-md'
        }
      `}
      aria-pressed={selected}
      role="radio"
      aria-label={choice.text}
    >
      <div className="flex items-center justify-between">
        <span className={`text-base sm:text-lg ${selected ? 'text-primary-800 font-semibold' : 'text-gray-700'}`}>
          {choice.text}
        </span>
        {selected && (
          <svg
            className="w-6 h-6 text-primary-600 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ChoiceCard;
