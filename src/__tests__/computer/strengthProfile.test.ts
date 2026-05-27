import { profileForRating } from "@/services/computer/engine/strengthProfile";

describe("profileForRating", () => {
  it("returns Beginner profile at 800", () => {
    const p = profileForRating(800);
    expect(p.skill).toBe(0);
    expect(p.uciElo).toBeUndefined();
    expect(p.maxError).toBe(900);
    expect(p.movetimeMs).toBe(200);
    expect(p.blunderRate).toBeCloseTo(0.4);
  });

  it("returns Novice profile at 1000", () => {
    const p = profileForRating(1000);
    expect(p.skill).toBe(3);
    expect(p.uciElo).toBeUndefined();
    expect(p.movetimeMs).toBe(300);
    expect(p.blunderRate).toBeCloseTo(0.2);
  });

  it("returns Club Player profile at 1200", () => {
    const p = profileForRating(1200);
    expect(p.skill).toBe(6);
    expect(p.uciElo).toBeUndefined();
    expect(p.movetimeMs).toBe(500);
    expect(p.blunderRate).toBeCloseTo(0.08);
  });

  it("returns Tournament profile at 1500", () => {
    const p = profileForRating(1500);
    expect(p.uciElo).toBe(1500);
    expect(p.skill).toBeUndefined();
    expect(p.movetimeMs).toBe(800);
    expect(p.blunderRate).toBe(0);
  });

  it("returns Advanced profile at 1900", () => {
    const p = profileForRating(1900);
    expect(p.uciElo).toBe(1900);
    expect(p.movetimeMs).toBe(1200);
    expect(p.blunderRate).toBe(0);
  });

  describe("boundary handling", () => {
    it("clamps below 800 to Beginner", () => {
      expect(profileForRating(0).skill).toBe(0);
      expect(profileForRating(799).skill).toBe(0);
    });

    it("uses Novice at 999", () => {
      expect(profileForRating(999).skill).toBe(3);
    });

    it("snaps to nearest tier between thresholds", () => {
      // Halfway between Tournament (1500) and Advanced (1900) — picks Tournament.
      expect(profileForRating(1699).uciElo).toBe(1500);
      // Just past midpoint — picks Advanced.
      expect(profileForRating(1701).uciElo).toBe(1900);
    });

    it("clamps above 1900 to Advanced", () => {
      expect(profileForRating(9999).uciElo).toBe(1900);
    });
  });
});
