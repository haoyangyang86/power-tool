import React from 'react';
import clsx from 'clsx'; // 如果报错找不到clsx，请运行 npm install clsx tailwind-merge

interface Props {
  label: string;
  value: string | number;
  unit: string;
  subText?: string;
  warning?: boolean;
}

// 关键点：注意这里必须有 'export' 关键字，且不是 'export default'
export const ResultRow: React.FC<Props> = ({ label, value, unit, subText, warning }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 w-1/3">{label}</span>
      <div className="flex-1 flex flex-col items-end">
        <div className="flex items-baseline">
          <span className={clsx("text-lg font-bold mr-2", warning ? "text-red-500" : "text-gray-800")}>
            {typeof value === 'number' ? value.toFixed(2) : value}
          </span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
        {subText && <span className={clsx("text-xs mt-1", warning ? "text-red-400" : "text-blue-500")}>{subText}</span>}
      </div>
    </div>
  );
};