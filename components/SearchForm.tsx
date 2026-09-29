import React from "react";

interface SearchFormProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: (e?: React.FormEvent) => void;
  isLoading: boolean;
}

export default function SearchForm({ query, setQuery, onSearch, isLoading }: SearchFormProps) {
  return (
    <div className="w-full flex flex-col items-center pb-6 sm:pb-12 z-10 px-4">
      <div className="mb-5 sm:mb-7 font-extrabold text-[22px] sm:text-[28px] md:text-[32px] leading-[120%] text-center text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
        <h1 className="font-extrabold">
          <span className="block">Pengumuman Hasil</span>
          <span className="block">Calon Anggota Baru NNM 18</span>
        </h1>
      </div>

      <div className="w-full max-w-[400px] sm:max-w-lg md:max-w-2xl flex flex-col items-center">
        <p className="font-medium text-[14px] sm:text-[16px] leading-relaxed text-center text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Silakan Masukkan NIM atau Nama Lengkap
        </p>

        <form onSubmit={onSearch} className="w-full flex flex-col items-center gap-5">
          <div className="w-full relative flex items-center bg-black/45 backdrop-blur-md border border-orange-500/80 rounded-full p-1.5 sm:p-2 shadow-xl transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/50">
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF5500] hover:bg-[#E04800] disabled:bg-gray-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
              aria-label="Cari Peserta"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white px-4 sm:px-5 py-2.5 sm:py-3 focus:outline-none font-medium text-base sm:text-lg placeholder-gray-400"
              placeholder={isLoading ? "Memuat data..." : "Contoh: 10301233..."}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF5500] hover:bg-[#E04800] disabled:bg-gray-500 disabled:scale-100 text-white font-bold text-[16px] sm:text-[18px] py-3.5 sm:py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.98]"
          >
            SELANJUTNYA
          </button>
        </form>
      </div>
    </div>
  );
}