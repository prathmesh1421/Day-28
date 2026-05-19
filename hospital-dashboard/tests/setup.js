import {
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "vitest";

import "@testing-library/jest-dom";
import "whatwg-fetch";

// Mock matchMedia
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,

    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,

      addListener: vi.fn(),
      removeListener: vi.fn(),

      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),

      dispatchEvent: vi.fn(),
    })),
  });
}

// Mock Fetch API
beforeAll(() => {

  global.fetch = vi.fn((url, options) => {

    if (url === "/api/login") {

      const body = JSON.parse(options.body);

      // Success Login
      if (
        body.email === "admin@gmail.com" &&
        body.password === "123456"
      ) {
        return Promise.resolve({
          ok: true,

          json: () =>
            Promise.resolve({
              name: "Admin User",
              token: "123",
            }),
        });
      }

      // Failed Login
      return Promise.resolve({
        ok: false,

        json: () =>
          Promise.resolve({
            message: "Invalid Credentials",
          }),
      });
    }

    return Promise.resolve({
      ok: false,
    });

  });

});

// Clear Mocks
afterEach(() => {
  vi.clearAllMocks();
});

// Restore Mocks
afterAll(() => {
  vi.restoreAllMocks();
});
