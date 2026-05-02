import { describe, expect, it } from "vitest";
import { displayNameFromEmail } from "./pages.jsx";

describe("displayNameFromEmail", () => {
  it("uses local part when no dot", () => {
    expect(displayNameFromEmail("kemalrevaldnsyh@gmail.com")).toBe("Kemalrevaldnsyh");
  });

  it("uses segment before first dot", () => {
    expect(displayNameFromEmail("susilo.sudarman@gmail.com")).toBe("Susilo");
  });

  it("ignores domain", () => {
    expect(displayNameFromEmail("user.name@company.co.id")).toBe("User");
  });

  it("normalizes mixed case from email local part", () => {
    expect(displayNameFromEmail("SuSiLo.test@mail.com")).toBe("Susilo");
  });

  it("returns empty for missing email", () => {
    expect(displayNameFromEmail("")).toBe("");
    expect(displayNameFromEmail(undefined)).toBe("");
  });
});
