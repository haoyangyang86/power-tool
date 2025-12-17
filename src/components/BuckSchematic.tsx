import React from 'react';
// 关键点：通过 import 引入图片，Vite 会自动处理路径
import buckImage from '../assets/buck_diagram.png'; 

export const BuckSchematic: React.FC = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center overflow-hidden">
      {/* 使用标准的 img 标签，object-contain 保证图片按比例缩放不走样 */}
      <img 
        src={buckImage} 
        alt="Buck Converter Topology" 
        className="max-w-full h-auto max-h-64 object-contain"
      />
    </div>
  );
};