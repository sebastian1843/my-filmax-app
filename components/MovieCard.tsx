import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { PlayIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import Image from 'next/image';

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const redirectToWatch = useCallback(() => {
    router.push(`/watch/${data.id}`);
  }, [router, data.id]);

  return (
    <div className="group relative col-span h-[12vw] bg-neutral-900 rounded-md overflow-hidden shadow-md transition duration-300 hover:scale-105">
      {/* Imagen de portada */}
      <Image
        src={data.thumbnailUrl}
        alt={data.title}
        onClick={redirectToWatch}
        className="w-full h-full object-cover cursor-pointer transition-opacity duration-300 group-hover:opacity-70"
        width={500}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
        draggable={false}
      />

      {/* Overlay al hacer hover */}
      <div className="absolute top-0 left-0 w-full h-full opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-20 bg-zinc-900 bg-opacity-90 p-4 rounded-md">
        <div className="flex flex-col h-full justify-between">
          {/* Imagen y título */}
          <div>
            <Image
              src={data.thumbnailUrl}
              alt={data.title}
              className="rounded-md mb-2 w-full object-cover"
              width={500}
              height={300}
              draggable={false}
            />
            <h3 className="text-white text-lg font-semibold truncate">{data.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{data.genre}</p>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={redirectToWatch}
              className="bg-white text-black rounded-full p-2 hover:bg-neutral-300 transition"
              aria-label="Play"
            >
              <PlayIcon className="w-6 h-6" />
            </button>

            <FavoriteButton movieId={data.id} />

            <button
              onClick={() => openModal(data.id)}
              className="border border-white text-white rounded-full p-2 hover:border-gray-300 transition"
              aria-label="More Info"
            >
              <ChevronDownIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Datos adicionales */}
          <div className="mt-2 text-xs text-white flex justify-between">
            <span className="text-green-400">Estreno 2023</span>
            <span>{data.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
