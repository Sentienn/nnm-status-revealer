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
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="https://ik.imagekit.io/senttt/6b9e72a6082f607be35d0f3fc502e5d5%202(1)(1).png?updatedAt=1759245970297"
        />
        <img
          src="https://ik.imagekit.io/senttt/6b9e72a6082f607be35d0f3fc502e5d5%202.png?updatedAt=1759239802547"
          className="absolute inset-0 w-full h-full object-cover object-center -z-10"
          alt="Background"
        />
      </picture>
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="relative z-10 w-full max-w-2xl text-center text-white">
        <div className="text-7xl md:text-8xl mb-6">{isLulus ? "🥳" : "🥲"}</div>

        <div className="bg-white/20 border border-white/30 backdrop-blur-md px-6 py-8 md:px-12 md:py-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isLulus ? "Selamat!" : "Aduh Maaf..."}
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-10 text-justify md:text-center">
            Halo{" "}
            <span className="text-white font-bold">
              {name} ({nim})
            </span>
            ,{" "}
            {isLulus ? (
              <>
                Kamu telah berhasil melewati tes wawancara di Nihon no Matsuri
                17 dan tergabung dalam{" "}
                <span className="text-white font-bold">
                  Kelompok {grup || "-"}
                </span>
                ! Terimakasih atas partisipasinya dan tunggu pengumuman
                selanjutnya!
              </>
            ) : (
              "mohon maaf kamu belum bisa lanjut ke tahap selanjutnya di Nihon no Matsuri 17. Terimakasih atas partisipasinya dan tetap semangat!"
            )}
          </p>

          {isLulus && (
            <a
              href="#"
              className="block w-4/5 max-w-sm mx-auto bg-[#BB001D] hover:bg-red-700 text-white px-6 py-2 sm:py-3 md:px-10 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold mb-4 text-center transition"
            >
              Masuk Grup
            </a>
          )}

          <button
            onClick={onBack}
            className="block w-4/5 max-w-sm mx-auto bg-white/85 border-2 border-[#BB001D] text-[#BB001D] hover:bg-[#BB001D] hover:text-white px-6 py-2 sm:py-3 md:px-10 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold text-center transition"
          >
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
}
