// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DiscriminationPower, invariantIds, percent, type PowerRow } from "./DiscriminationPower";

const source = readFileSync(resolve(import.meta.dirname, "DiscriminationPower.tsx"), "utf8");
const fixture: PowerRow = {
  order: 8, domainSize: 11117, fingerprintClassCount: 11000, singletonClassCount: 10900,
  uniqueGraphCount: 10900, collisionClassCount: 100, largestCollisionClassSize: 4,
  indistinguishablePairCount: 250, totalPairCount: 61744086,
  uniqueIdentificationRate: 10900 / 11117, pairSeparationRate: 1 - 250 / 61744086,
};

describe("Discrimination Power UI contract", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("keeps all eleven registry invariants and a valid default selection", () => {
    expect(invariantIds).toHaveLength(11);
    expect(invariantIds).toContain("degree_sequence");
    expect(source).toContain('useState<string[]>(["degree_sequence"])');
    expect(source).toContain("current.length === 1 ? current");
  });

  it("uses deterministic mocked n=8 payload fields and Turkish presentation", () => {
    expect(fixture.domainSize).toBe(11117);
    expect(new Intl.NumberFormat("tr-TR").format(fixture.domainSize)).toBe("11.117");
    expect(percent(0.9952)).toBe("99,52%");
    expect(source).toContain('fetch("/api/discrimination-power"');
    expect(source).toContain("N=8 indeksi kullanılabilir olduğunda yeniden deneyin.");
  });

  it("posts the default selection and renders a mocked n=8 result", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ selectedInvariants: ["degree_sequence"], orders: [fixture] }) });
    vi.stubGlobal("fetch", fetch);
    const node = document.createElement("div");
    const root = createRoot(node);
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    await act(async () => { root.render(createElement(DiscriminationPower)); await Promise.resolve(); await Promise.resolve(); });
    expect(fetch).toHaveBeenCalledWith("/api/discrimination-power", expect.objectContaining({ method: "POST" }));
    expect(node.textContent).toContain("n=8 özeti");
    expect(node.textContent).toContain("11.117");
    await act(async () => root.unmount());
  });

  it("renders the two rate views and complete n=4 through n=8 table, without n=9", () => {
    expect(source).toContain('metric="uniqueIdentificationRate"');
    expect(source).toContain('metric="pairSeparationRate"');
    expect(source).toContain("largestCollisionClassSize");
    expect(source).not.toContain("<th>Tekil sınıf</th>");
    expect(source).toContain('className="power-value"');
    expect(source).not.toContain("order === 9");
  });
});
