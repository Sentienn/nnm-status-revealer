"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import ErrorPopup from "@/components/ErrorPopup";
import Result from "@/components/Result";

interface Entry {
  NIM: string;
  Nama: string;
  Status: string;
  Grup: string;
}

export default function Home() {
  const [data, setData] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Entry | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch("/data.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const extracted: Entry[] = (parsed.data as Record<string, string>[]).map(
          (entry) => ({
            NIM: entry["NIM"]?.trim(),
            Nama: entry["Nama"]?.trim(),
            Status: entry["Status"]?.trim(),
            Grup: entry["Grup"]?.trim(),
          })
        );
        setData(extracted);
      });
  }, []);

  const handleSearch = () => {
    const input = query.trim().toLowerCase();
    const found = data.find(
      (d) => d.NIM.toLowerCase() === input || d.Nama.toLowerCase() === input
    );
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
        grup={result.Grup}
        onBack={() => setResult(null)}
      />
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden font-poppins">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="https://ik.imagekit.io/senttt/6b9e72a6082f607be35d0f3fc502e5d5%202(1)(1).png?updatedAt=1759245970297"
        />
        <img
          src="https://ik.imagekit.io/senttt/6b9e72a6082f607be35d0f3fc502e5d5%202.png?updatedAt=1759239802547"
          className="absolute inset-0 w-full h-full object-cover object-center -z-10"
        />
      </picture>
      <div className="absolute inset-0 bg-black/40 -z-10" />
      <img
        src="/logo-nnm.png"
        alt="NNM Logo"
        className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 z-20"
      />
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center text-white mt-24 sm:mt-32 px-4">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-10 text-justify sm:text-center px-2 sm:px-0">
          Hai! Para calon anggota NNM 17 yang baru, sebelum kamu menemukan
          takdirmu, kami dari pihak NNM 17 mau bilang kamu hebat, kamu mau
          mencoba, kamu mau belajar, dan tetap semangat ^^!
        </p>
        <div className="mb-12 p-4 rounded-xl bg-white/30 border border-white/30 shadow-md w-[260px] sm:w-[320px] md:w-[400px] lg:w-[480px]">
          <img
            src="https://ik.imagekit.io/senttt/logo%20eo.png"
            alt="Logo EO"
            className="w-full object-contain"
          />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-8 text-center">
          <span className="block sm:inline">Pengumuman Hasil Tes</span>{" "}
          <span className="block sm:inline">Calon Anggota Baru NNM 17</span>
        </h1>
        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Masukkan NIM"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-white/80 text-black border border-gray-300 rounded-full pl-4 pr-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-[#BB001D] hover:bg-red-700 text-white rounded-full px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold w-full sm:w-auto flex items-center justify-center"
          >
            Cek Hasil
          </button>
        </div>
      </div>
      {showError && <ErrorPopup onClose={() => setShowError(false)} />}
    </main>
  );
}
