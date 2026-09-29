"use client";

interface ErrorPopupProps {
  onClose: () => void;
}

export default function ErrorPopup({ onClose }: ErrorPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-montserrat px-4">
      {/* Overlay background */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Kotak Popup */}
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10 text-center">
        {/* Tombol Close (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-white text-xl transition-colors"
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Judul */}
        <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-5">
          Salah O.o?
        </h2>

        {/* Pesan Error */}
        <p className="text-gray-200 mb-8 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
          Halo! Kalau nama atau NIM kamu belum muncul di website, mohon maaf banget kamu belum bisa lanjut ke tahap berikutnya. 😔 Tapi tenang, kalau cuma salah satu data aja yang bisa diakses, buruan hubungi CP kita untuk pemeriksaan lebih lanjut, ya. Terima kasih banyak atas antusiasmenya! 🙌
        </p>

        {/* Tombol Kembali */}
        <button
          onClick={onClose}
          className="w-full bg-[#FF5500] hover:bg-[#E04800] text-white py-3.5 rounded-full text-sm sm:text-base font-bold shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
        >
          KEMBALI
        </button>
      </div>
    </div>
  );
}