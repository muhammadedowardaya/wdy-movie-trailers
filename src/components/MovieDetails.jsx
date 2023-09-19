import React, { useEffect, useState } from "react";

import "../styles/movieDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieTrailers from "./MovieTrailers";
import gsap from "gsap";
import Splitting from "splitting";

export default function MovieDetails() {
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = useState("");
	const [showMovieDetails, setShowMovieDetails] = useState(false);
	const [showMovieVideos, setShowMovieVideos] = useState(false);
	const [movieVideos, setMovieVideos] = useState("");
	const [error, setError] = useState(null);

	const path = window.location.pathname;

	const getMovieDetails = async () => {
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
				`https://api.themoviedb.org/3/movie/${id}?language=en-US`,
				options
			);
			setMovieDetails(response.data);
		} catch (error) {
			setError("Error fetching movie details");
		}

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
				options
			);
			setMovieVideos(response.data.results);
		} catch (error) {
			setError("Error fetching movie videos");
		}
	};

	const getMovieVideos = async () => {
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
				`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
				options
			);
			setMovieVideos(response.data.results);
		} catch (error) {
			setError("Error fetching movie videos");
		}
	};

	useEffect(() => {
		const titleText = document.querySelector("#title-text");
		const titleUnderline = document.querySelector("#title-underline");

		if (titleText && titleUnderline) {
			const splitTitleText = new Splitting({ target: titleText });
			let chars = splitTitleText[0].chars;

			// Animasikan teks menggunakan GSAP
			const animate = gsap.from(chars, {
				duration: 1,
				opacity: 0,
				y: 50,
				stagger: 0.1,
				repeatDelay: 4,
				onComplete: () => {
					const textUnderline = gsap.to(titleUnderline, {
						width: 200,
						opacity: 1,
						duration: 2,
						onComplete: () => {
							setTimeout(() => {
								gsap.to(titleUnderline, {
									opacity: 0,
									onComplete: () => textUnderline.revert(),
								});
								const animateEnd = gsap.to(chars, {
									duration: 1,
									opacity: 0,
									y: 50,
									stagger: 0.1,
									onComplete: () => {
										animate.restart();
									},
								});
							}, 2000);
						},
					});
				},
			});
		}
	}, []);

	useEffect(() => {
		getMovieDetails();
		getMovieVideos();
	}, [id]);

	useEffect(() => {
		if (Object.keys(movieDetails).length > 0) {
			setShowMovieDetails(true);
		} else {
			setShowMovieDetails(false);
		}
	}, [movieDetails]);

	useEffect(() => {
		if (Object.keys(movieVideos).length > 0) {
			setShowMovieVideos(true);
		} else {
			setShowMovieVideos(false);
		}
	}, [movieVideos]);

	if (!movieDetails) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className={`movie-details`}>
			<h1>Movie Details</h1>
			{showMovieDetails ? (
				<div className="movie-details_content">
					<div className="info">
						<table>
							<tbody>
								<tr>
									<th>Title</th>

									<td>{movieDetails && movieDetails.title}</td>
								</tr>
								<tr>
									<th>Popularity</th>

									<td>
										{movieDetails && formattedNumber(movieDetails.popularity)}
									</td>
								</tr>
								<tr>
									<th>Release date</th>

									<td>{movieDetails && movieDetails.release_date}</td>
								</tr>
								<tr>
									<th>Genres</th>

									<td className="genres">
										{movieDetails &&
											movieDetails.genres.map((genre, index) => (
												<a href="#" key={index}>
													{genre.name}
												</a>
											))}
									</td>
								</tr>
								<tr>
									<th>Spoken Language</th>

									<td>
										{movieDetails && movieDetails.spoken_languages[0].name}
									</td>
								</tr>
								<tr>
									<th>Status</th>

									<td>{movieDetails && movieDetails.status}</td>
								</tr>
								<tr>
									<th>Tagline</th>

									<td>{movieDetails && movieDetails.tagline}</td>
								</tr>
								<tr>
									<th>Overview</th>

									<td>{movieDetails && movieDetails.overview}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="related-videos">
						<div className="related-videos__title">
							<h3 id="title-text">Related Videos</h3>
							<hr id="title-underline" />
						</div>
						{showMovieVideos && <MovieTrailers movieVideos={movieVideos} />}
					</div>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}

const formattedNumber = (number) => {
	// Menggunakan metode toLocaleString() untuk format ribuan
	return number.toLocaleString();
};
