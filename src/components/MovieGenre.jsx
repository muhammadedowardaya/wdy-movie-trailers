import axios from "axios";
import { useEffect, useState } from "react";

import "../styles/movieGenre.css";

export default function MovieGenre() {
	const [movieGenres, setMovieGenres] = useState("");

	async function getMovieGenre() {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTcxYTc2MmY4NWE5ODc2Y2Q0MGUwZWVmNWEwOGE4MyIsInN1YiI6IjYyYWMyMWMzZDAzNmI2MDA1MmY1NjdmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUGsLfxm78uKdRA6OKl1uAnYrNW2GgvAPxdsnWhM0Cg",
			},
		};

		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/genre/movie/list?language=en",
				options
			);
			setMovieGenres(response.data.genres);
			console.info(response.data.genres);
		} catch (error) {
			console.error("Error fetching movie populars:", error);
		}
	}
	useEffect(() => {
		getMovieGenre();
	}, []);

	return (
		<div className="movie-genre__container">
			<div className="movie-genre__title">
				<h2>Genres</h2>
			</div>
			<div className="movie-genre__content">
				{movieGenres &&
					movieGenres.map((item, index) => (
						<a href="#" key={index}>
							{item.name}
						</a>
					))}
			</div>
		</div>
	);
}
