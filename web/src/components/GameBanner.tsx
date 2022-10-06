interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount}: GameBannerProps) {
    return (
        <div className="relative rounded-lg overflow-hidden hover:cursor-pointer">
          <img src={bannerUrl} alt=""  className="rounded-lg overflow-hidden"/>

          <div className="absolute bottom-0 left-0 right-0 w-full px-2 py-2 pt-16 md:pb-4 md:px-4 bg-game-gradient">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block mt-1">{adsCount} anúncio(s)</span>
          </div>
        </div>
    )
}