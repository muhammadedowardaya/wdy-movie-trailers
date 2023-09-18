import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MovieCardContainer from "./MovieCardContainer";
import OfflinePage from "../offline-page";
import MovieHeader from "./MovieHeader";

// -------- animation
import { gsap } from "gsap/gsap-core";
import Splitting from "splitting";
import "splitting/dist/splitting.css"; // Import CSS splitting jika diperlukan
// Inisialisasi Splitting
Splitting();
// --------- end of animation

const isOnline = () => {
	return window.navigator.onLine;
};

export default function App() {
	const [online, setOnline] = useState(isOnline());
	const path = window.location.pathname;
	let showMovieBy = Array.from(path)
		.filter((item) => item != "/")
		.join("");

	const [movies, setMovies] = useState({});

	useEffect(() => {
		// ---------
		const handleOnline = () => {
			setOnline(true);
		};

		const handleOffline = () => {
			setOnline(false);
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	useEffect(() => {
		// animasi
		const titleUnderline = document.querySelector(
			"#movie-list__title-underline"
		);
		const titleText = document.getElementById("movie-list__title");

		if (titleUnderline && titleText) {
			const splitTitleText = new Splitting({
				target: titleText,
			});
			// Animasikan teks menggunakan GSAP
			const chars = splitTitleText[0].chars;

			const animate = gsap.from(chars, {
				duration: 1,
				opacity: 0,
				y: 50,
				stagger: 0.1, // Stagger animasi untuk setiap karakter
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
	}, [path]);

	useEffect(() => {}, []);

	const links = [
		{
			href: "/upcoming",
			caption: "Upcoming",
		},
		{
			href: "/popular",
			caption: "Popular",
		},
		{
			href: "/top_rated",
			caption: "Top Rated",
		},
	];

	const handleMovieChange = (movies) => {
		setMovies(movies.results);
	};

	if (online) {
		return (
			<div>
				<Navbar links={links} currentPath={path} />
				<MovieHeader movies={movies} />
				<div className="movie-list">
					<div id="movie-list__title-container">
						<div className="movie-list__title">
							<h2 id="movie-list__title">Movie Lists</h2>
							<hr id="movie-list__title-underline" />
						</div>
					</div>

					<MovieCardContainer
						showMovieBy={showMovieBy}
						onMoviesChange={handleMovieChange}
					/>
				</div>
			</div>
		);
	} else {
		return <OfflinePage />;
	}
}
