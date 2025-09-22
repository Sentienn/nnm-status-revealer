"use client";

interface ResultProps {
  name: string;
  nim: string;
  status: string;
  onBack: () => void;
}

export default function Result({ name, nim, status, onBack }: ResultProps) {
  const isLulus = status.toLowerCase() === "lulus";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 bg-white text-gray-900 text-center">
      <div className="text-6xl mb-6">
        {isLulus ? "🥳" : "🥲"}
      </div>
      <h2 className="text-2xl font-bold mb-5">
        {isLulus ? "Selamat!" : "Aduh Maaf..."}
      </h2>
      <p className="text-gray-800 mb-10 text-base leading-relaxed max-w-md">
        Halo <span className="text-red-600 font-semibold">{name} ({nim})</span>,{" "}
        {isLulus
          ? "Kamu telah berhasil melewati tes wawancara di Nihon no Matsuri 17. Terimakasih atas partisipasinya dan tunggu pengumuman selanjutnya!"
          : "mohon maaf kamu belum bisa lanjut ke tahap selanjutnya di Nihon no Matsuri 17. Terimakasih atas partisipasinya dan tetap semangat!"}
      </p>
      <button
        onClick={onBack}
        className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-base font-semibold"
      >
        Kembali
      </button>
    </main>
  );
}
