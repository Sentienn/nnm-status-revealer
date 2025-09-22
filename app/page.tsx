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
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <img
          src="https://via.placeholder.com/200x80.png?text=NNM+Logo"
          alt="Nihon no Matsuri Logo"
          className="w-48 sm:w-56 mb-6"
        />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Pengumuman Hasil Tes
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-8">
          Calon Anggota Baru NNM 17
        </h2>
        <div className="w-full flex flex-col sm:flex-row items-center gap-3 p-3 rounded-full bg-white">
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
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full 
                       text-sm sm:text-base font-semibold w-full sm:w-auto"
          >
            Cek Hasil
          </button>
        </div>
      </div>
      {showError && <ErrorPopup onClose={() => setShowError(false)} />}
    </main>
  );
}
