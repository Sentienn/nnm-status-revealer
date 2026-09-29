import { useState, useEffect } from "react";
import Papa from "papaparse";

export interface Participant {
  NIM: string;
  Nama: string;
  Status: string;
  Grup: string;
}

export function parseCSV() {
  const [data, setData] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const extracted: Participant[] = (parsed.data as Record<string, string>[]).map(
          (entry) => ({
            NIM: entry["NIM"]?.trim() || "",
            Nama: entry["Nama"]?.trim() || "",
            Status: entry["Status"]?.trim() || "",
            Grup: entry["Grup"]?.trim() || "",
          })
        );
        setData(extracted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data CSV:", err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
}