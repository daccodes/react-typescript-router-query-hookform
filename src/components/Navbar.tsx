import { NavLink } from "react-router-dom";

const Navbar = ({ routes }: any) => {
	let activeStyle = {
		color: "#333D55",
		borderRadius: "8px",
		border: "1px #333D55 solid",
	};
	return (
		<div className=" border border-x-transparent border-t-transparent border-bottom ">
			<ul className="flex flex-row gap-1 justify-center py-1 bg-[#F4F5F7] text-black font-serif">
				{routes.map(
					({ name, link, logo }: any) =>
						name.length > 0 && (
							<li key={name}>
								<NavLink
									to={link}
									style={({ isActive }) => (isActive ? activeStyle : undefined)}
									className="px-10 py-3 flex flex-row border border-[#F4F5F7] hover:border hover:border-[#333D55] hover:rounded-lg "
								>
									{logo}
								</NavLink>
							</li>
						)
				)}
			</ul>
		</div>
	);
};

export default Navbar;
