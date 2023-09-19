import axios from "axios";
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../styles/movieSlider.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function MovieSlider({ movies }) {
	// ----------------slider---------------------
	// const [currentSlide, setCurrentSlide] = useState(0);
	// const [totalSlides, setTotalSlides] = useState(0);

	// const updateArrowButtonsVisibility = () => {
	// 	const prevButton = document.querySelector(".slider-nav");
	// 	const nextButton = document.querySelector(".slider-nav-next");

	// 	if (currentSlide === 0) {
	// 		prevButton.style.display = "none";
	// 	} else {
	// 		prevButton.style.display = "block";
	// 	}

	// 	if (currentSlide === totalSlides - 1) {
	// 		nextButton.style.display = "none";
	// 	} else {
	// 		nextButton.style.display = "block";
	// 	}
	// };

	// const handleSlideChange = (newSlideIndex) => {
	// 	setCurrentSlide(newSlideIndex);
	// };

	useEffect(() => {}, []);

	// useEffect(() => {
	// 	if (movies) {
	// 		setTotalSlides(movies.length);
	// 	}
	// }, [movies]);

	// useEffect(() => {
	// 	updateArrowButtonsVisibility();
	// }, [currentSlide]);
	// -------------------------------------

	return (
		<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
			{movies &&
				movies.map((item, index) => (
					<SwiperSlide key={index}>
						<img
							src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
							alt={item.name}
						/>
					</SwiperSlide>
				))}
		</Swiper>
	);
}

{
	/* {movies &&
    movies.map((item, index) => (
        <button
            key={index}
            aria-label="Go to slide"
            className={currentSlide == index ? "active" : ""}
        >
            {">"}
        </button>
    ))} */
}
