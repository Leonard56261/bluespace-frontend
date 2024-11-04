// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
jest.mock('react-konva');
// Mock `IntersectionObserver` globally to prevent errors in tests
global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
  // Mock `window.scrollTo` to avoid issues with `window` functions not being implemented in JSDOM
  window.scrollTo = jest.fn();
  
  // Additional global mocks or configurations can go here, such as:
  // - Mocking localStorage, sessionStorage, or other browser APIs
  // - Setting up global fetch mocks if needed