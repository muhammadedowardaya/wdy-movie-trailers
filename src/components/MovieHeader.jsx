import React, { useEffect } from "react";
import MovieSlider from "./MovieSlider";

import "../styles/movieHeader.css";

export default function MovieHeader({ movies }) {
	return (
		<div className="movie-header">
			<div className="movie-header__banner">
				<h1>WDY MOVIE TRAILERS</h1>
				<p>
					Selamat datang di <b>WDY Movie Trailers</b>, tempat di mana Anda dapat
					menemukan berbagai daftar film terkini dan menikmati
					trailer-trailernya. Jelajahi dunia perfilman dan nikmati cuplikan
					eksklusif dari film-film terbaik, semua dalam satu tempat
				</p>
			</div>
			<div className="movie-header__slider">
				{movies.length > 0 && <MovieSlider movies={movies} />}
			</div>
		</div>
	);
}
