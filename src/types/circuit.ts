export interface BuckParams {
  vinMin: number;
  vinMax: number;
  vout: number;
  iout: number;
  freq: number; // MHz
  cin: number;  // uF
  cout: number; // uF
  esrIn: number; // mΩ
  esrOut: number; // mΩ
  inductance?: number; // uH (Optional, if user specifies)
  efficiency?: number; // % (Optional, if user specifies)
}

export interface BuckResults {
  dutyCycle: number;
  ton: number; // us
  toff: number; // us
  l_calc: number; // uH (Calculated L)
  rippleCurrent: number; // A
  rippleFactorK: number; // Dimensionless
  voutRipple: number; // mV
  ipeak: number; // A
  pin: number; // W
}