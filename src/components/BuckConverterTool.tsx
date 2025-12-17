import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// 变化点 1：因为大家都在 components 文件夹里了，所以去掉 "./components/" 前缀，直接引用同级文件
import { InputField } from './InputField';
import { ResultRow } from './ResultRow';
import { BuckSchematic } from './BuckSchematic'; // 如果你有这个组件的话

// 变化点 2：types 和 utils 在上一层目录，所以要加 "../"
import type { BuckParams, BuckResults } from '../types/circuit';
import { calculateBuck } from '../utils/buckMath';

const BuckConverterTool: React.FC = () => {
  // 初始状态
  const [params, setParams] = useState<BuckParams>({
    vinMin: 5, vinMax: 5, vout: 3.3, iout: 1, freq: 1, 
    cin: 10, cout: 10, esrIn: 0, esrOut: 10, inductance: 0
  });

  const [results, setResults] = useState<BuckResults | null>(null);

  // 实时计算
  useEffect(() => {
    const res = calculateBuck(params);
    setResults(res);
  }, [params]);

  const updateParam = (key: keyof BuckParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* --- 左侧：理论与电路图 --- */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-2xl font-bold text-blue-800">Buck Converter</h2>
        <BuckSchematic />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">设计公式</h3>
          <div className="text-sm space-y-4 text-gray-700">
            <div>
                <p>输入电感值公式 (L):</p>
                <BlockMath math="L = \frac{V_{out} \cdot (1 - V_{out}/V_{in})}{F \cdot K \cdot I_{out}}" />
            </div>
            <div>
                <p>纹波电流公式 (Ripple Current):</p>
                <BlockMath math="\Delta I_L = \frac{V_{out} \cdot (1 - D)}{F \cdot L}" />
            </div>
            <div>
                <p>输入功率估算 (Input Power):</p>
                <BlockMath math="P_{in} = \frac{V_{out} \cdot I_{out}}{\eta}" />
            </div>
          </div>
        </div>
      </div>

      {/* --- 右侧：参数输入与计算结果 --- */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* 输入区 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-600 mr-2 rounded"></span> 参数设置 (Parameters)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField label="输入电压最大值 (Vin Max)" value={params.vinMax} unit="V" onChange={v => updateParam('vinMax', v)} hint=">= Vout + Drop" />
            <InputField label="输出电压 (Vout)" value={params.vout} unit="V" onChange={v => updateParam('vout', v)} hint="< Vin" />
            <InputField label="输出电流 (Iout)" value={params.iout} unit="A" onChange={v => updateParam('iout', v)} />
            <InputField label="开关频率 (Switching Freq)" value={params.freq} unit="MHz" onChange={v => updateParam('freq', v)} />
            <InputField label="电感值 (L)" value={params.inductance || ''} placeholder="Auto" unit="uH" onChange={v => updateParam('inductance', v)} hint="Leave 0 for Auto-calc" />
            <InputField label="输入电容 ESR" value={params.esrIn} unit="mΩ" onChange={v => updateParam('esrIn', v)} />
            <InputField label="输出电容 (Cout)" value={params.cout} unit="uF" onChange={v => updateParam('cout', v)} />
            <InputField label="效率 (Efficiency)" value={params.efficiency || ''} placeholder="95%" unit="%" onChange={v => updateParam('efficiency', v)} />
          </div>
        </div>

        {/* 结果区 */}
        {results && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-2 rounded"></span> 计算结果 (Results)
            </h3>
            <div className="space-y-1">
              <ResultRow 
                label="纹波系数 (r)" 
                value={results.rippleFactorK} 
                unit="" 
                subText={results.rippleFactorK > 0.4 ? "Warning: High Ripple (>0.4)" : "Optimal Range: 0.2 - 0.4"} 
                warning={results.rippleFactorK > 0.4 || results.rippleFactorK < 0.1}
              />
              <ResultRow label="实际电感值 (Used)" value={results.l_calc} unit="uH" />
              <ResultRow label="输出电压纹波 (Vout Ripple)" value={results.voutRipple} unit="mV" subText={`< ${params.vout * 50}mV (5%) Recommended`} warning={results.voutRipple > params.vout * 50}/>
              <ResultRow label="电感峰值电流 (Ipeak)" value={results.ipeak} unit="A" subText="Ensure Isat > Ipeak" />
              <ResultRow label="占空比 (Duty Cycle)" value={results.dutyCycle} unit="%" />
              <ResultRow label="输入功率 (Pin)" value={results.pin} unit="W" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuckConverterTool;