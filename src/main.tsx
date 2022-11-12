import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./utils/route";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from "react-router-dom";

interface RouteProps {
	name: string;
	link: string;
	page: JSX.Element;
}

import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		Routes.map((route: RouteProps) => (
			<Route
				path={route.link}
				element={route.page}
				errorElement={<NotFound />}
			/>
		))
	)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
