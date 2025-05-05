import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { MovieInterface } from "@/types";  // Asegúrate de que MovieInterface esté correctamente definido

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import Image from "next/image";

// Obtiene la sesión y verifica si el usuario está autenticado
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},  // Si no necesitas pasar datos, se puede dejar vacío
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <InfoModal visible onClose={() => {}} />
      <Navbar />
      <Billboard />

      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />

        <div className="overflow-x-hidden">
          <div className="flex space-x-4 p-4 sm:space-x-2 overflow-x-auto">
            {movies?.slice(0, 5).map((movie: MovieInterface) => (
              <div
                key={movie.id}  // Usar id único en lugar de index
                className="relative flex-shrink-0 w-64 bg-gray-800 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src={movie.imageUrl || "/movie1.jpg"}  // Imagen predeterminada si no hay URL
                  alt={movie.title || "Movie"}  // Título como alt para accesibilidad
                  width={256}
                  height={384}
                  className="rounded-lg transition-all duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  <p>{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
