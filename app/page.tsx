"use client";

import { useState } from "react";
import ErrorPopup from "@/components/ErrorPopup";
import Result from "@/components/Result";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { parseCSV, Participant } from "@/hook/parseCSV";

export default function Home() {
  const { data, isLoading } = parseCSV();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Participant | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = query.trim().toLowerCase();
    if (!input || isLoading) return;

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
        onBack={() => {
          setResult(null);
          setQuery("");
        }}
      />
    );
  }

  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center overflow-x-hidden font-montserrat select-none">
      {/* BACKGROUND */}
      <img
        src="/images/bg.webp"
        alt="Natsu no Kinen Background"
        className="fixed inset-0 w-full h-[100dvh] object-cover object-center -z-20"
      />

      {/* HEADER AREA */}
      <Header />

      {/* SEARCH AREA */}
      <SearchForm 
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* ERROR POPUP */}
      {showError && <ErrorPopup onClose={() => setShowError(false)} />}
    </main>
  );
}