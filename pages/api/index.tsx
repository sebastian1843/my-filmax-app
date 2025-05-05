// pages/index.tsx

import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList"; // Hook para obtener las películas
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal"; // Modal para mostrar detalles de la película

export default function Home() {
  const { data: movies = [] } = useMovieList(); // Obtener las películas

  return (
    <>
      {/* Modal para mostrar información de las películas */}
      <InfoModal visible onClose={() => {}} />
      
      {/* Barra de navegación */}
      <Navbar />

      {/* Sección de Billboard (Banner principal) */}
      <Billboard />

      {/* Listas de películas */}
      <div className="pb-40">
        {/* Lista de películas populares */}
        <MovieList title="Trending Now" data={movies} />
        
        {/* Lista de películas favoritas (deberías tener un hook para manejar esto) */}
        <MovieList title="My List" data={movies} />
      </div>
    </>
  );
}
