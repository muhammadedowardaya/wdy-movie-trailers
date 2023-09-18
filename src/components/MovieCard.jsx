import React from "react";

import "../styles/movieCard.css";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
	const formattedNumber = (number) => {
		// Menggunakan metode toLocaleString() untuk format ribuan
		return number.toLocaleString();
	};

	return (
		<div className="movie-card">
			<div className="movie-card__image">
				<img
					src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
					alt="movie title image"
				/>
			</div>
			<div className="movie-card__info">
				<h2 className="movie-card__title">{movie.title}</h2>
				<table>
					<tbody>
						<tr>
							<td>Popularity</td>
							<td>{formattedNumber(movie.popularity)}</td>
						</tr>
						<tr>
							<td>Release date</td>
							<td>{movie.release_date}</td>
						</tr>
					</tbody>
				</table>
				<div className="movie-card__action">
					<Link
						to={`/movie/${movie.id}`} // Tentukan URL dengan ID film
						className="details-link"
					>
						Details
						<i
							id="movie-details__icon"
							className="fa-solid fa-circle-info"
							style={{ marginLeft: "4px" }}
						></i>
					</Link>
				</div>
			</div>
		</div>
	);
}
