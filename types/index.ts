// Definir la interfaz para una película
export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // La propiedad 'imageUrl' se opcional
  videoUrl: string; //URL del video de la pelicula  (nuevo campo opcional)
  thumbnailUrl: string; // Nueva propiedad para la miniatura (thumbnail)
  genre: string; // <- Añadido para evitar el error
  duration: string; // puedes usar `number` si estás manejando minutos como 120
}

// Crear un objeto que implemente la interfaz MovieInterface
const movie: MovieInterface = {
  id: "1",
  title: "Inception",
  description: "A mind-bending thriller",
  videoUrl: "/videos/inception.mp4",
  thumbnailUrl: "/images/inception-thumb.jpg",
  imageUrl: "/images/inception.jpg", // ✅ Esta es la que faltaba
  genre: "Sci-Fi",
  duration: "148min"
};

// Función que muestra los detalles de la película
function showMovieDetails(movie: MovieInterface): void {
  console.log(`ID: ${movie.id}`);
  console.log(`Title: ${movie.title}`);
  console.log(`Description: ${movie.description}`);
  console.log(`Video URL: ${movie.videoUrl}`);
  console.log(`Thumbnail URL: ${movie.thumbnailUrl}`);
  console.log(`Genre: ${movie.genre}`);
  console.log(`Duration: ${movie.duration}`);
}

// Mostrar los detalles de la película
showMovieDetails(movie);
