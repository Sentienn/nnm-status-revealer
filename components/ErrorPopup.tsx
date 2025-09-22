"use client";

interface ErrorPopupProps {
  onClose: () => void;
}

export default function ErrorPopup({ onClose }: ErrorPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full p-8 mx-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-3">Salah 0.o?</h2>
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          Maaf NIM yang kamu masukkan salah, silahkan periksa kembali NIM lagi!
        </p>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-base font-semibold"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}
