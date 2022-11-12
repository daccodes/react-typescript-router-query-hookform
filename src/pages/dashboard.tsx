import Layout from "../components/Layout";
import Loading from "../components/Loading";

const Dashboard = () => {
	return (
		<Layout>
			<div className="mt-24 flex flex-col justify-center">
				<div>{"My custom loader --> "}</div>
				<div>
					<Loading />
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
