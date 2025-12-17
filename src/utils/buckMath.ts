import type { BuckParams, BuckResults } from "../types/circuit";

export const calculateBuck = (params: BuckParams): BuckResults => {
  const { vinMax, vout, freq, iout, cout, esrOut, inductance } = params;
  
  // 基础参数转换
  const f_hz = freq * 1000000;
  
  // 1. 占空比 (Duty Cycle)
  const duty = vout / vinMax; // 使用 VinMax 考虑最恶劣情况
  
  // 2. 时间参数
  const period = 1 / f_hz;
  const ton = duty * period * 1e6; // us
  const toff = (1 - duty) * period * 1e6; // us
  
  // 3. 电感计算 (如果用户没填，默认按 K=0.3 计算建议值；如果填了，按填的反算 K)
  let l_uH = inductance || 0;
  let rippleCurrent = 0;
  
  if (!inductance) {
    // 默认设计：假设 K = 0.3
    const K_target = 0.3;
    const l_henry = (vout * (1 - duty)) / (f_hz * K_target * iout);
    l_uH = l_henry * 1e6;
  }
  
  // 基于实际 L 计算纹波电流
  const l_henry_actual = l_uH * 1e-6;
  rippleCurrent = (vout * (1 - duty)) / (f_hz * l_henry_actual);
  
  // 4. 纹波系数 K
  const k_factor = rippleCurrent / iout;
  
  // 5. 输出电压纹波 (电容分量 + ESR 分量)
  const v_ripple_c = rippleCurrent / (8 * f_hz * (cout * 1e-6));
  const v_ripple_esr = rippleCurrent * (esrOut * 1e-3);
  const voutRipple = (v_ripple_c + v_ripple_esr) * 1000; // mV
  
  // 6. 峰值电流
  const ipeak = iout + (rippleCurrent / 2);

  // 7. 输入功率
  const efficiency = params.efficiency || 0.95; // 假设效率 95%
  const powerOut = vout * iout;
  const pin = powerOut / efficiency;

  return {
    dutyCycle: duty * 100, // %
    ton,
    toff,
    l_calc: l_uH,
    rippleCurrent,
    rippleFactorK: k_factor,
    voutRipple,
    ipeak,
    pin: pin, // W
  };
};