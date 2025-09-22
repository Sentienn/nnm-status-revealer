"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import ScratchResult from "../components/ScratchResult";

interface Entry {
  NIM: string;
  Status: string;
}

export default function Home() {
  const [data, setData] = useState<Entry[]>([]);
  const [nim, setNim] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        const extracted: Entry[] = (parsed.data as Record<string, string>[]).map((entry) => ({
          NIM: entry["NIM"]?.trim(),
          Status: entry["Status"]?.trim(),
        }));

        setData(extracted);
      });
  }, []);

  const handleSearch = () => {
    const found = data.find((d) => d.NIM === nim.trim());
    if (found) {
      setResult(found.Status);
    } else {
      setResult(null);
      alert("Maaf, NIM tidak ditemukan. Coba lagi ya.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#e3e4e4] text-gray-800">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#107C64]">
          Cek Status Kelulusan
        </h1>

        <input
          type="text"
          placeholder="Masukkan NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className="border border-gray-300 rounded w-full p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#107C64] mb-4"
        />

        <button
          onClick={handleSearch}
          className="bg-[#107C64] hover:bg-[#0d6653] text-white w-full py-3 rounded text-sm sm:text-base font-semibold"
        >
          Cek
        </button>

        {result && (
          <div className="mt-6">
            <ScratchResult result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
