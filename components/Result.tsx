"use client";

interface ResultProps {
  name: string;
  nim: string;
  status: string;
  grup?: string;
  onBack: () => void;
}

export default function Result({ name, nim, status, onBack }: ResultProps) {
  const isLulus = status.toLowerCase() === "lulus";

  return (
    <main className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 pb-16 sm:pb-24 overflow-hidden font-montserrat select-none">
      <img
        src="/images/bg.webp"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center text-white pt-2 sm:pt-4">
        
        {/* LOGO */}
        <div className="mb-0 relative z-20">
          <img 
            src="/images/logo.png" 
            alt="Logo Natsu no Kinen" 
            className="w-[140px] sm:w-[170px] md:w-[190px] h-auto object-contain drop-shadow-xl" 
          />
        </div>

        {/* GAMBAR KARAKTER */}
        <div className="flex justify-center mb-4 sm:mb-5 relative z-10">
          {isLulus ? (
            <video
              src="/happy.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg object-cover border-2 sm:border-4 border-white/20"
            />
          ) : (
            <img
              src="/sad.jpg"
              alt="Sedih"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg object-cover border-2 sm:border-4 border-white/20"
            />
          )}
        </div>

        {/* KOTAK PENGUMUMAN */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg px-5 py-6 sm:px-10 sm:py-8 rounded-3xl shadow-2xl mb-5 sm:mb-7 w-full max-w-[95%]">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-3 sm:mb-4 drop-shadow-md">
            {isLulus ? "Yeyy Selamat!" : "Aduh Maaf..."}
          </h2>
          <p className="text-[14px] sm:text-base md:text-lg leading-relaxed">
            Halo <span className="font-bold text-[#FF5500] drop-shadow-sm">{name} ({nim})</span>,{" "}
            {isLulus ? (
              <>
                Kamu telah berhasil melewati semua tes di Nihon no Matsuri 18! Ganbateee! ヾ(≧▽≦*)o Silakan bergabung ke grup dan tunggu informasi selanjutnya.
              </>
            ) : (
              "Mohon maaf kamu belum bisa lanjut ke tahap selanjutnya di Nihon no Matsuri 18. Terima kasih atas partisipasinya dan tetap semangat!"
            )}
          </p>
        </div>

        {/* TOMBOL */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[90%] sm:max-w-sm">
          {isLulus && (
            <a
              href="https://line.me/R/ti/g/mZxRcMgveG"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF5500] hover:bg-[#E04800] text-white px-5 py-3 sm:py-3.5 rounded-full text-[13px] sm:text-[14px] font-extrabold shadow-md transition-transform hover:scale-105 uppercase tracking-wide text-center"
            >
              KLIK UNTUK MASUK GRUP
            </a>
          )}
          <button
            onClick={onBack}
            className="w-full bg-black/40 border border-white/30 hover:bg-black/60 text-white px-5 py-3 sm:py-3.5 rounded-full text-[13px] sm:text-[14px] font-extrabold shadow-md transition-transform hover:scale-105 uppercase tracking-wide"
          >
            KEMBALI KE HALAMAN PERTAMA
          </button>
        </div>

      </div>
    </main>
  );
}