import React from 'react';

interface Props {
  label: string;
  value: number | string;
  onChange: (val: number) => void;
  unit: string;
  hint?: string;
  placeholder?: string;
}

export const InputField: React.FC<Props> = ({ label, value, onChange, unit, hint, placeholder }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hint && <span className="text-xs text-blue-600 italic">{hint}</span>}
      </div>
      <div className="flex items-center">
        <input
          type="number"
          step="any"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-gray-600 text-sm w-12 text-center">
          {unit}
        </span>
      </div>
    </div>
  );
};