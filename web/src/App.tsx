import './styles/main.css';
import Logo from './assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog';

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }

}

function App() {
  const [games, setGames] = useState<Game[]>([])

  const [sliderRef, instanceRef] = useKeenSlider(
    {
        loop: true,
        breakpoints: {
            "(min-width: 200px)": {
                slides: { perView: 2.2, spacing: 5 },
            },
            "(min-width: 400px)": {
                slides: { perView: 2.5, spacing: 5 },
            },
            "(min-width: 600px)": {
                slides: { perView: 3.5, spacing: 5 },
            },
            "(min-width: 800px)": {
                slides: { perView: 4.5, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 5.5, spacing: 10 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 6.5, spacing: 10 },
            },
        },
        mode: "free",
        slides: { origin: "center", perView: 5.5, spacing: 10 },
        // range: {
        //     min: 1,
        //     max: 100,
        //     align: true,
        // },
    },
    [
        // add plugins here
    ]
);

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={Logo} alt="" />

      <h1 className="text-4xl md:text-6xl text-white font-black mt-20 mb-7">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider">
        {games.map((game) => {
          return (
            <div key={game.id} className="keen-slider__slide">
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />

            </div>
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
        
      </Dialog.Root>
    </div>

  )
}

export default App
