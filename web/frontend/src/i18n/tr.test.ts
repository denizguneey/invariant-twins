import { describe, expect, it } from "vitest";
import { tr } from "./tr";

describe("Türkçe ilk arayüz metinleri", () => {
  it("ana navigasyonu ve analiz eylemini Türkçe sağlar", () => {
    expect(tr.nav.identify).toBe("Grafımı Tanımla");
    expect(tr.analysis.update).toBe("Analizi Güncelle");
    expect(tr.editor.addVertex).toBe("Düğüm Ekle");
  });

  it("tema seçeneklerini merkezi sözlükten sunar", () => {
    expect([tr.theme.system, tr.theme.light, tr.theme.dark]).toEqual(["Sistem", "Açık", "Koyu"]);
  });
});
