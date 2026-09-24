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
    if (!input) return;

    const found = data.find(
      (d) => d.NIM?.toLowerCase() === input || d.Nama?.toLowerCase() === input
    );
    if (found) {
      setResult(found);
      setShowError(false);
    } else {
      setResult(null);
      setShowError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
    <main className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center overflow-x-hidden font-montserrat select-none">
      {/* Menggunakan flex-col dan justify-between untuk mendorong elemen ke atas dan bawah layar */}

      {/* 1. BACKGROUND */}
      <img
        src="/images/bg.jpg"
        alt="Nihon No Matsuri Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-20"
      />
      <div className="absolute inset-0 bg-black/10 -z-10" />
      {/* 2. HEADER AREA (Logo & Greeting) */}
      <div className="flex flex-col items-center pt-2 sm:pt-4 z-10 px-4">
        <img
          src="/images/logo.png"
          alt="Nihon No Matsuri Logo"
          className="w-[160px] sm:w-[205px] h-auto object-contain drop-shadow-lg mb-1 sm:mb-2"
        />
        <div className="text-center max-w-[90%] sm:max-w-xl font-montserrat font-medium text-[12px] sm:text-[14px] md:text-[15px] leading-[140%] text-white drop-shadow-md">
          <p>Halo calon keluarga NNM 18! 👋</p>
          <p>
            Sebelum lanjut ke babak baru, kami cuma mau bilang: KALIAN KEREN! Terima kasih udah berani mencoba dan ngasih yang terbaik. Tetap semangat! ✨
          </p>
        </div>
      </div>

      {/* 3. AREA BAWAH (Judul & Form Pencarian) */}
      {/* pb-6 mengatur jarak form dari dasar layar agar pas berada di area jalan setapak */}
      <div className="w-full flex flex-col items-center pb-6 sm:pb-10 z-10 px-4">

        {/* Title */}
        <div className="mb-3 sm:mb-4 font-montserrat font-extrabold text-[18px] sm:text-[22px] md:text-[26px] leading-[120%] text-center text-white drop-shadow-lg">
          <h1 className="font-extrabold">
            <span className="block">Pengumuman Hasil Tes</span>
            <span className="block">Calon Anggota Baru NNM 18</span>
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[360px] sm:max-w-md md:max-w-xl flex flex-col items-center">
          <p className="font-montserrat font-medium text-[12px] sm:text-[14px] leading-[122%] text-center text-white mb-2 sm:mb-3 drop-shadow-md">
            Silahkan Masukkan NIM atau Nama Lengkap
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="w-full flex flex-col items-center gap-3"
          >
            {/* Input Pill */}
            <div className="w-full relative flex items-center bg-black/45 backdrop-blur-md border border-orange-500/80 rounded-full p-1 sm:p-1.5 shadow-xl transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/50">
              <button
                type="button"
                onClick={handleSearch}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FF5500] hover:bg-[#E04800] text-white rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder=""
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white px-3 sm:px-4 py-2 focus:outline-none font-montserrat font-medium text-sm sm:text-base placeholder-gray-400"
              />
            </div>

            {/* SELANJUTNYA Button */}
            <button
              type="submit"
              className="w-full bg-[#FF5500] hover:bg-[#E04800] text-white font-montserrat font-bold text-[14px] sm:text-[16px] tracking-normal py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.98]"
            >
              SELANJUTNYA
            </button>
          </form>
        </div>
      </div>

      {showError && <ErrorPopup onClose={() => setShowError(false)} />}
    </main>
  );
}