import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { tr } from "./i18n/tr";

const identify = readFileSync(resolve(import.meta.dirname, "main.tsx"), "utf8");
const explore = readFileSync(resolve(import.meta.dirname, "Explore.tsx"), "utf8");
const research = readFileSync(resolve(import.meta.dirname, "Research.tsx"), "utf8");

describe("n=8 Identify UI safeguards", () => {
  it("keeps the eighth A–H label available and only disables Add Vertex at eight", () => {
    expect(identify).toContain('const labels="ABCDEFGH"');
    expect(identify).toContain("disabled={g.nodes.length>=8}");
    expect(identify).not.toContain("disabled={g.nodes.length===7}");
  });

  it("renders the explicit n=8 unavailable state instead of an empty minimum set", () => {
    expect(identify).toContain("minimumMessage?<p className=\"neutral\">{minimumMessage}</p>:minimum");
    expect(identify).toContain('r.status==="unavailable"');
    expect(tr.editor.limit).toBe("En fazla 8 düğüm destekleniyor.");
  });

  it("retains separate n=8 domain and possible-rival metadata rendering", () => {
    expect(identify).toContain("result.identification.domainSize");
    expect(identify).toContain("result.identification.possibleRivals");
  });

  it("keeps Identify state declarations valid and exposes the n=8 Explore path", () => {
    expect(identify).toContain('[minimumMessage,setMinimumMessage]=useState(""),');
    expect(explore).toContain("useState(8)");
    expect(explore).toContain('max="8"');
    expect(explore).toContain('maxOrder === 8');
  });

  it("documents the integrated n=8 McKay and SQLite runtime path", () => {
    expect(research).toContain("Brendan McKay");
    expect(research).toContain("SQLite");
    expect(research).toContain("11,117");
  });

  it("contains no common UTF-8 mojibake markers in production UI source", () => {
    const sources = [identify, explore, research, readFileSync(resolve(import.meta.dirname, "i18n", "tr.ts"), "utf8")];
    for (const source of sources) {
      expect(source).not.toMatch(/[\u00c3\u00c4\u00c5]|\u00e2\u20ac|\u00e2\u2030/);
    }
  });
});
