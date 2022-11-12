import React from "react";
import Routes from "../utils/route";
import Navbar from "./Navbar";

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<div>
			<Navbar routes={Routes} />
			{children}
		</div>
	);
};

export default Layout;
