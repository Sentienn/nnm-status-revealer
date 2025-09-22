"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import Result from "../components/Result";
import ErrorPopup from "../components/ErrorPopup";

interface Entry {
  NIM: string;
  Nama: string;
  Status: string;
}

export default function Home() {
  const [data, setData] = useState<Entry[]>([]);
  const [nim, setNim] = useState("");
  const [result, setResult] = useState<Entry | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const extracted: Entry[] = (parsed.data as Record<string, string>[]).map((entry) => ({
          NIM: entry["NIM"]?.trim(),
          Nama: entry["Nama"]?.trim(),
          Status: entry["Status"]?.trim(),
        }));
        setData(extracted);
      });
  }, []);

  const handleSearch = () => {
    const found = data.find((d) => d.NIM === nim.trim());
    if (found) {
      setResult(found);
      setShowError(false);
    } else {
      setResult(null);
      setShowError(true);
    }
  };

  if (result) {
    return (
      <Result
        name={result.Nama || "Peserta"}
        nim={result.NIM}
        status={result.Status}
        onBack={() => setResult(null)}
      />
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 bg-white text-gray-900">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        
        {/* LOGO */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://i.imgur.com/sG7OgyT.png"
            alt="Nihon no Matsuri Logo"
            className="w-56 sm:w-72"
          />
        </div>

        {/* TITLE */}
        {/* TITLE */}
<div className="mb-8 text-center">
  {/* Mobile: 2 baris kecil */}
  <h1 className="block sm:hidden text-lg font-bold leading-snug">
    Pengumuman Hasil Tes <br />
    Calon Anggota Baru NNM 17
  </h1>

  {/* Desktop: 2 baris besar */}
  <h1 className="hidden sm:block text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
    Pengumuman Hasil Tes <br />
    Calon Anggota Baru NNM 17
  </h1>
</div>


        {/* INPUT + BUTTON */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Masukkan NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="flex-1 bg-[#F5FAFD] border border-gray-300 rounded-full pl-4 pr-3 py-3 
                       text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600
                       placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-[#BB001D] hover:bg-red-700 text-white rounded-full 
                       px-6 py-3 text-sm sm:text-base font-semibold
                       w-full sm:w-auto flex items-center justify-center"
          >
            Cek Hasil
          </button>
        </div>
      </div>
      {showError && <ErrorPopup onClose={() => setShowError(false)} />}
    </main>
  );
}
