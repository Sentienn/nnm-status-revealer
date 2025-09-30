"use client";

interface ErrorPopupProps {
  onClose: () => void;
}

export default function ErrorPopup({ onClose }: ErrorPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* background gelap */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* kotak popup */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-10 mx-4 text-center">
        {/* tombol close (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* judul */}
        <h2 className="text-black text-3xl font-bold mb-4">Salah 0.o?</h2>

        {/* pesan */}
        <p className="text-gray-700 mb-8 text-base leading-relaxed">
          Maaf NIM yang kamu masukkan salah, silahkan periksa kembali NIM!
        </p>

        {/* tombol coba lagi */}
        <button
          onClick={onClose}
          className="bg-[#BB001D] hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}
