import '@testing-library/jest-dom';

export const mockOrbitControls = jest.fn(() => ({
  minDistance: 7,
  maxDistance: 30,
  minPolarAngle: 0.174533, // 10 degrees in radians
  maxPolarAngle: 1.48353,  // 85 degrees in radians
  target: { set: jest.fn() },
  enablePan: false,
  update: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock('three/addons/controls/OrbitControls.js', () => {
  return {
    OrbitControls: jest.fn().mockImplementation((camera, domElement) => {
      const instance = mockOrbitControls();
      return instance;
    }),
  };
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: false,
  value: jest.fn().mockImplementation(() => ({
    observe: () => { },
    unobserve: () => { },
    disconnect: () => { },
  })),
});

jest.mock("@/context/ModelsContext");