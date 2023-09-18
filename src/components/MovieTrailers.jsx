import React, { useEffect, useState } from "react";

import "../styles/movieTrailers.css";

export default function MovieTrailers({ movieVideos }) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="movie-trailers">
			{movieVideos &&
				movieVideos.map((item, index) => (
					<div className="movie-trailers__item" key={index}>
						<div className="movie-trailers__item-title">
							<h2>{item.name}</h2>
						</div>
						{isLoading && <div className="loading-video">Loading video...</div>}
						<iframe
							title="Movie Review"
							src={`https://www.youtube.com/embed/${item.key}`}
							allowFullScreen
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							onLoad={() => setIsLoading(false)}
							className={`${isLoading ? "" : "active"}`}
						></iframe>
					</div>
				))}
		</div>
	);
}
