import React, { useState } from "react";
import gsap from "gsap";

import "../styles/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ links, currentPath }) {
	let animation;

	const [showNavItem, setShowNavItem] = useState(false);

	function handleMenuClick() {
		const navList = document.querySelector(".navbar ul");
		const navListItems = document.querySelectorAll(".navbar > ul > li");

		const burgerMenuButton = document.querySelector(".burger-menu");

		burgerMenuButton.classList.toggle("active");
		navList.classList.toggle("active");

		const defineAnimation = () => {
			animation = gsap.to(navListItems, {
				x: "105vw",
				duration: 0.5,
				ease: "power1.inOut",
				stagger: 0.2, // Ubah ke 0.2 agar lebih terlihat secara bertahap
			});
		};

		const reverseAnimation = () => {
			if (animation && animation.progress() !== 0) {
				animation.reverse();
			}
		};

		if (navList.classList.contains("active")) {
			defineAnimation();
		} else {
			reverseAnimation(); // Reverse animation when navList is not active
		}
	}

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
