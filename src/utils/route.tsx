import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import { IoHomeOutline, IoPeopleOutline, IoTimeOutline } from "react-icons/io5";
import People from "../pages/people";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Timetracker from "../pages/timetracker";

const Dashboard = lazy(() => import("../pages/dashboard"));

const queryClient = new QueryClient();

const Routes = [
	{
		name: "",
		link: "/",
		page: <Navigate to={"/dashboard"} />,
	},
	{
		name: "Dashboard",
		link: "/dashboard",
		logo: <IoHomeOutline size={24} />,
		page: (
			<Suspense fallback={<Loading />}>
				<Dashboard />
			</Suspense>
		),
	},
	{
		name: "People",
		link: "/people",
		logo: <IoPeopleOutline size={24} />,
		page: (
			<QueryClientProvider client={queryClient}>
				<People />
			</QueryClientProvider>
		),
	},
	{
		name: "Time Tracker",
		link: "/time",
		logo: <IoTimeOutline size={24} />,
		page: (
			<QueryClientProvider client={queryClient}>
				<Timetracker />
			</QueryClientProvider>
		),
	},
];

export default Routes;
