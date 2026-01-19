import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.open
global.window.open = vi.fn();

// Mock DOMParser for testing
if (typeof DOMParser === 'undefined') {
  global.DOMParser = class DOMParser {
    parseFromString(str: string) {
      return {
        querySelector: vi.fn(() => null),
      };
    }
  } as any;
}
