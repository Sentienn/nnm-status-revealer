export default function Header() {
  return (
    <div className="flex flex-col items-center pt-4 sm:pt-6 z-10 px-4 w-full">
      <img
        src="/images/logo.png"
        alt="Nihon No Matsuri Logo"
        className="w-[160px] sm:w-[190px] h-auto object-contain drop-shadow-xl mb-2"
      />

      <div className="text-center max-w-[90%] sm:max-w-xl font-medium text-[12px] sm:text-[14px] md:text-[15px] leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <p>Halo calon panitia Nihon no Matsuri 18! 👋</p>
        <p className="mt-1">
          Sebelum lanjut ke babak baru, kami cuma mau bilang: KALIAN KEREN! Terima kasih sudah berani mencoba dan memberikan yang terbaik. Tetap semangat! ✨
        </p>
      </div>
    </div>
  );
}