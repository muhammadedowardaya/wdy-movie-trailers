import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MoviePagination from "./MoviePagination";
import axios from "axios";
import "../styles/movieCardContainer.css";
import { useMatches, useParams } from "react-router-dom";

export default function MovieCardContainer({ showMovieBy, onMoviesChange }) {
	const [movies, setMovies] = useState(null);
	const [totalCount, setTotalCount] = useState(0);
	const [siblingCount, setSiblingCount] = useState(2);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	async function getMovies() {
		setIsLoading(true);

		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTcxYTc2MmY4NWE5ODc2Y2Q0MGUwZWVmNWEwOGE4MyIsInN1YiI6IjYyYWMyMWMzZDAzNmI2MDA1MmY1NjdmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUGsLfxm78uKdRA6OKl1uAnYrNW2GgvAPxdsnWhM0Cg",
			},
		};

        let showBy = showMovieBy == "" ? "popular" : showMovieBy;

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${showBy}?language=en-US&page=${page}`,
				options
			);
			setMovies(response.data);
			setTotalCount(response.data.total_results);
			setCurrentPage(response.data.page);
			setPageSize(response.data.results.length);
			onMoviesChange(response.data);
		} catch (error) {
			console.error("Error fetching movie :", error);
		}
	}

	useEffect(() => {
		getMovies();
	}, [showMovieBy]);

	useEffect(() => {
		if (movies) {
			getMovies();
		}
	}, [page]); // Empty dependency array, run once when component mounts

	useEffect(() => {
		if (movies) {
			setIsLoading(false);
		}
	}, [movies]);

	const handlePageChange = (pageNumber) => {
		setPage(pageNumber);
		setIsLoading(true);
	};

	return (
		<div className="movie-card__container">
			<div className="movie-card__content">
				{isLoading ? (
					<div className="loading-movies">
						<i
							className="fa-regular fa-file-video fa-lg"
							id="loading-movies__icon"
						></i>
						<span>Loading Movies...</span>
					</div>
				) : (
					movies &&
					movies.results.map((item, index) => (
						<MovieCard key={index} movie={item} />
					))
				)}
			</div>
			<MoviePagination
				onPageChange={handlePageChange}
				totalCount={totalCount} // Ganti dengan jumlah total item yang Anda miliki
				siblingCount={siblingCount} // Opsional: Ganti dengan jumlah saudara yang Anda inginkan
				currentPage={currentPage} // Ganti dengan halaman saat ini
				pageSize={pageSize} // Ganti dengan jumlah item per halaman
			/>
		</div>
	);
}
