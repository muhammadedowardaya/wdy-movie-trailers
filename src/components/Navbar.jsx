import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ links, currentPath }) {
	// const [navbarAnimation, setNavbarAnimation] = useState(() => {
	// 	const navListItems = document.querySelectorAll(".navbar > ul > li");
	// 	return () => {
	// 		gsap
	// 			.to(navListItems, {
	// 				x: "105vw",
	// 				duration: 0.5,
	// 				ease: "power1.inOut",
	// 				stagger: 0.2, // Ubah ke 0.2 agar lebih terlihat secara bertahap
	// 			})
	// 			.pause();
	// 	};
	// });

	const navListItems = useRef(null);
	const navListAnimation = useRef(null);

	const [showNavItem, setShowNavItem] = useState(false);

	function handleMenuClick() {
		const navList = document.querySelector(".navbar ul");
		const burgerMenuButton = document.querySelector(".burger-menu");

		burgerMenuButton.classList.toggle("active");
		navList.classList.toggle("active");

		if (showNavItem) {
			setShowNavItem(false);
		} else {
			setShowNavItem(true);
		}
	}

	useEffect(() => {
		const navListItemAnimations = gsap.to(".navbar ul li", {
			x: "105vw",
			duration: 0.5,
			ease: "power1.inOut",
			stagger: 0.2,
		});

		navListAnimation.current = navListItemAnimations;
	}, []);

	useEffect(() => {
		const navListItemAnimation = navListAnimation.current;

		if (showNavItem) {
			// Mainkan animasi untuk memunculkan
			navListItemAnimation.restart();
		} else {
			// Putar animasi ke belakang untuk menyembunyikan
			navListItemAnimation.reverse();
		}
	}, [showNavItem]);

	return (
		<nav className="navbar">
			<div className="nav-brand">WDY MT</div>
			<ul>
				{links &&
					links.map((item, index) => (
						<li
							key={index}
							className={`${currentPath == item.href ? "active" : ""}`}
						>
							<Link to={item.href} className="nav-item">
								{item.caption}
							</Link>
						</li>
					))}
			</ul>
			<div className="burger-menu" onClick={handleMenuClick}>
				<i className="fa-solid fa-bars" style={{ color: "#fff" }}></i>
			</div>
		</nav>
	);
}
