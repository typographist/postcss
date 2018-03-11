export const toggleAdaptiveRhythm = () => ({
  type: 'TOGGLE_ADAPTIVE_RHYTHM',
});

export const toggleFluidRhythm = () => ({
  type: 'TOGGLE_FLUID_RHYTHM',
});

export const setRhythm = rhythm => ({
  type: 'SET_RHYTHM',
  rhythm,
});
