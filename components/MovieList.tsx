import React, { useRef, useState, useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';
import { MovieInterface } from '@/types';
import styles from './MovieList.module.css';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const filteredData = useMemo(() => {
    return isEmpty(data) ? [] : data;
  }, [data]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const updateScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setScrollPosition(container.scrollLeft);
      setScrollWidth(container.scrollWidth - container.clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollPosition);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollPosition);
      }
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const scrollAmount = itemWidth;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (filteredData.length === 0) return null;

  const progressBarWidth = (scrollPosition / scrollWidth) * 100;
  const progressBarClass = progressBarWidth === 100 ? styles.progressBarDynamic : styles.progressBar;

  return (
    <div className="px-4 md:px-12 mt-8 space-y-6">
      <h2 className="text-white text-lg md:text-2xl lg:text-3xl font-semibold">
        {title}
      </h2>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 py-4 scrollbar-hide"
        >
          {filteredData.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]"
            >
              <MovieCard data={movie} />
            </div>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
          <div className={styles.progressBackground}>
            <div
              className={progressBarClass}
              style={{ '--progress-width': `${progressBarWidth}%` } as React.CSSProperties} 
            />
          </div>
        </div>

        {/* Botones de desplazamiento */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 z-10">
          <button
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition"
            onClick={() => handleScroll('left')}
          >
            &#10094;
          </button>
          <button
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition"
            onClick={() => handleScroll('right')}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
