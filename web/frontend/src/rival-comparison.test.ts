import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { tr } from "./i18n/tr";

const identify = readFileSync(resolve(import.meta.dirname, "main.tsx"), "utf8");
const comparison = readFileSync(resolve(import.meta.dirname, "RivalComparison.tsx"), "utf8");

describe("rival explanation UI contract", () => {
  it("makes candidate cards selectable and requests the stable graph6 rival", () => {
    expect(identify).toContain("setSelectedRival(x)");
    expect(identify).toContain("Bu rakip neden farklı?");
    expect(comparison).toContain('fetch("/api/identify/compare-rival"');
    expect(comparison).toContain("rival_graph6: rival.graph6");
  });

  it("uses Turkish labels in the headline and never renders an internal ID there", () => {
    expect(comparison).toContain("t.invariant");
    expect(comparison).toContain("nameOf(headline.id)");
    expect(comparison).not.toContain("triangle count farklıdır");
    expect(comparison).toContain("Mevcut 11 invariant bu iki grafı ayırt edemiyor.");
    expect(comparison).toContain("Graflar izomorfik değildir");
    expect(tr.invariant.triangle_count).toBeTruthy();
  });

  it("places structural differences before expandable technical and complete comparisons", () => {
    expect(comparison.indexOf("structuralDifferences")).toBeLessThan(comparison.indexOf("technicalDifferences"));
    expect(comparison).toContain("Teknik / spektral farklar");
    expect(comparison).toContain("<details className=\"rival-technical\"");
    expect(comparison).toContain("Tüm 11 invariantın tam karşılaştırması");
  });
});
