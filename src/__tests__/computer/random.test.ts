import { createRng } from "@/services/computer/engine/random";

describe("createRng", () => {
  it("is deterministic given a seed", () => {
    const a = createRng(42);
    const b = createRng(42);
    for (let i = 0; i < 10; i++) {
      expect(a()).toBe(b());
    }
  });

  it("returns values in [0, 1)", () => {
    const rng = createRng(7);
    for (let i = 0; i < 1000; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("differs across seeds", () => {
    const a = createRng(1);
    const b = createRng(2);
    expect(a()).not.toBe(b());
  });
});
