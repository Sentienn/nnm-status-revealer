"use client";

interface ResultProps {
  name: string;
  nim: string;
  status: string;
  grup: string;
  onBack: () => void;
}

export default function Result({
  name,
  nim,
  status,
  grup,
  onBack,
}: ResultProps) {
  const isLulus = status.toLowerCase() === "lulus";

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden font-poppins">
      {/* Background */}
      <img
        src="/images/bg.jpg"
        className="fixed inset-0 w-full h-full object-cover object-[center_35%] -z-10"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Logo */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md">
          <img
            src="/images/logo.png"
            alt="NNM Logo"
            className="h-10 sm:h-12 md:h-14 object-contain"
          />
        </div>
      </div>

      {/* Konten utama */}
      <div className="relative z-10 w-full max-w-2xl text-center text-white mt-32 sm:mt-40">
        <div className="flex justify-center mb-6">
          {isLulus ? (
            <video
              src="/happy.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-40 h-40 md:w-56 md:h-56 rounded-xl shadow-lg object-cover"
            />
          ) : (
            <img
              src="/sad.jpg"
              alt="Sedih"
              className="w-40 h-40 md:w-56 md:h-56 rounded-xl shadow-lg object-cover"
            />
          )}
        </div>

        {/* Kotak transparan */}
        <div className="bg-white/20 border border-white/30 backdrop-blur-md px-6 py-8 md:px-12 md:py-10 rounded-2xl shadow-lg mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isLulus ? "Selamat!" : "Aduh Maaf..."}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-center md:text-center">
            Halo{" "}
            <span className="text-white font-bold">
              {name} ({nim})
            </span>
            ,{" "}
            {isLulus ? (
              <>
                Kamu telah berhasil melewati semua tes di Nihon no Matsuri
                17! Ganbateee ! ヾ(≧▽≦*)o. Silakan bergabung ke grup dan tunggu informasi selanjutnya.
              </>
            ) : (
              "mohon maaf kamu belum bisa lanjut ke tahap selanjutnya di Nihon no Matsuri 17. Terimakasih atas partisipasinya dan tetap semangat!"
            )}
          </p>
        </div>

        {/* Tombol di luar kotak */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          {isLulus && (
            <a
              href="https://line.me/R/ti/g/mZxRcMgveG"
              className="w-4/5 sm:w-auto sm:min-w-[180px] bg-[#BB001D] hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-center transition"
            >
              Masuk Grup
            </a>
          )}
          <button
            onClick={onBack}
            className="w-4/5 sm:w-auto sm:min-w-[180px] bg-white/85 border-2 border-[#BB001D] text-[#BB001D] hover:bg-[#BB001D] hover:text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-center transition"
          >
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
}
