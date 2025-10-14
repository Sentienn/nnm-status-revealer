"use client";

interface ErrorPopupProps {
  onClose: () => void;
}

export default function ErrorPopup({ onClose }: ErrorPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
        <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
          Salah 0.o?
        </h2>
        <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed">
          Bagi yang NIM atau namanya tidak terdaftar di website, mohon maaf karena belum lolos ke tahap selanjutnya. Jika salah satu datanya berhasil diakses, silakan hubungi CP untuk pemeriksaan lebih lanjut. Terima kasih atas partisipasinya! 
        </p>
        <button
          onClick={onClose}
          className="bg-[#BB001D] hover:bg-red-700 text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-md transition"
        >
          back
        </button>
      </div>
    </div>
  );
}
