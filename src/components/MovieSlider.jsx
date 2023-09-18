import axios from "axios";
import React, { useEffect, useState } from "react";

// import Swiffy Slider JS
import { swiffyslider } from "swiffy-slider";
window.swiffyslider = swiffyslider;

window.addEventListener("load", () => {
	window.swiffyslider.init();
});

// import Swiffy Slider CSS
import "swiffy-slider/css";
import "../styles/movieSlider.css";

export default function MovieSlider({ movies }) {
	// ----------------slider---------------------
	const [currentSlide, setCurrentSlide] = useState(0);
	const [totalSlides, setTotalSlides] = useState(0);

	const updateArrowButtonsVisibility = () => {
		const prevButton = document.querySelector(".slider-nav");
		const nextButton = document.querySelector(".slider-nav-next");

		if (currentSlide === 0) {
			prevButton.style.display = "none";
		} else {
			prevButton.style.display = "block";
		}

		if (currentSlide === totalSlides - 1) {
			nextButton.style.display = "none";
		} else {
			nextButton.style.display = "block";
		}
	};

	const handleSlideChange = (newSlideIndex) => {
		setCurrentSlide(newSlideIndex);
	};

	useEffect(() => {
		if (movies) {
			setTotalSlides(movies.length);
		}
	}, [movies]);

	useEffect(() => {
		updateArrowButtonsVisibility();
	}, [currentSlide]);
	// -------------------------------------

	return (
		<div
			className="swiffy-slider slider-nav-visible slider-nav-animation slider-nav-animation-slow"
			id="animatedText"
		>
			<ul className="slider-container" id="container1">
				{movies &&
					movies.map((item, index) => (
						<li
							id={`slide${index}`}
							key={index}
							className={index === currentSlide ? "active" : ""}
						>
							<div>
								<img
									src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
									alt="..."
									loading="lazy"
									className="w-100"
								/>
								<h1 className="movie-slider__title">{item.title}</h1>
							</div>
						</li>
					))}
			</ul>

			<button
				type="button"
				className="slider-nav"
				aria-label="Go to previous"
				onClick={() => handleSlideChange(currentSlide - 1)}
			></button>
			<button
				type="button"
				className="slider-nav slider-nav-next"
				aria-label="Go to next"
				onClick={() => handleSlideChange(currentSlide + 1)}
			></button>
		</div>
	);
}
