import { afterEach, describe, expect, it } from "vitest";
import { clearTokens, getAccessToken, setAccessToken } from "./token-store";

// The access token is deliberately held in module memory rather than in
// localStorage or a readable cookie. These tests pin that down: a token that
// started being written to storage would survive a tab close and be readable
// by any script on the page, which is the thing this design avoids.

afterEach(() => {
  clearTokens();
});

describe("token store", () => {
  it("starts empty, so a fresh load has no session until refresh runs", () => {
    expect(getAccessToken()).toBeNull();
  });

  it("holds the token it is given", () => {
    setAccessToken("header.payload.signature");
    expect(getAccessToken()).toBe("header.payload.signature");
  });

  it("replaces the token on rotation rather than keeping both", () => {
    setAccessToken("first");
    setAccessToken("second");
    expect(getAccessToken()).toBe("second");
  });

  it("clears the token on sign-out", () => {
    setAccessToken("header.payload.signature");
    clearTokens();
    expect(getAccessToken()).toBeNull();
  });

  it("keeps the token out of browser storage", () => {
    // The store runs in a browser in production. If it ever reached for
    // storage, this would record it.
    const writes: string[] = [];
    const storage = {
      setItem: (key: string) => writes.push(key),
      getItem: () => null,
      removeItem: () => {},
    };

    Object.defineProperty(globalThis, "localStorage", {
      value: storage,
      configurable: true,
    });
    Object.defineProperty(globalThis, "sessionStorage", {
      value: storage,
      configurable: true,
    });

    setAccessToken("header.payload.signature");
    clearTokens();

    expect(writes).toEqual([]);
  });
});
