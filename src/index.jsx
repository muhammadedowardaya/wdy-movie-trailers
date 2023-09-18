import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/style.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import MovieDetails from "./components/MovieDetails";
import App from "./components/App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/movie/:id",
		element: <MovieDetails />,
		errorElement: <ErrorPage />,
	},
    {
		path: "/upcoming",
		element: <App />,
		errorElement: <ErrorPage />,
	},
    {
		path: "/popular",
		element: <App />,
		errorElement: <ErrorPage />,
	},
    {
		path: "/top_rated",
		element: <App />,
		errorElement: <ErrorPage />,
	},
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
