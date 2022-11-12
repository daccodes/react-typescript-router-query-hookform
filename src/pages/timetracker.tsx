import Layout from "../components/Layout";
import {
	useMutation,
	useQueryClient,
	QueryClient,
	useQuery,
} from "@tanstack/react-query";
import * as api from "../utils/api/apiTime";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseOutline, IoSaveOutline } from "react-icons/io5";
import { ActivityProps } from "../models/activity";

const Timetracker = () => {
	let hours = [];
	for (var i = 12; i <= 48; i++) {
		var h = i % 2 == 0 ? i / 2 + ".00" : (i + 1) / 2 - 1 + ".30";
		hours.push(h);
	}

	const queryClient = useQueryClient();

	const { data } = useQuery(["timetracking"], api.getActivity, {
		initialData: [],
	});

	const addActivity = useMutation(
		(formData: ActivityProps) => {
			return api.addActivity(formData);
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData(
					["timetracking"],
					(activities: Array<ActivityProps> | undefined) => [
						...activities!,
						data,
					]
				);
			},
			onSettled: () => {
				queryClient.invalidateQueries(["timetracking"]);
			},
		}
	);

	const removeActivity = useMutation(
		(id: number) => {
			return api.removeActivity(id);
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData(
					["timetracking"],
					(activities: Array<ActivityProps> | undefined) =>
						activities &&
						activities.filter((t: ActivityProps) => t.id !== data.id)
				);
			},
		}
	);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ActivityProps>();

	const onSubmit: SubmitHandler<ActivityProps> = (data) => {
		addActivity.mutate(data);
	};

	return (
		<Layout>
			<div className="flex flex-row mx-auto max-w-6xl mt-10 text-4xl justify-between">
				<p>Time Tracker:</p>
			</div>
			<div className="flex flex-col mx-auto max-w-6xl mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4">
					<label>Dalle:</label>
					<select className="border rounded-lg" {...register("from")}>
						{hours.map((hour) => (
							<option>{`${hour}`}</option>
						))}
					</select>
					<label>Alle:</label>
					<select className="border rounded-lg" {...register("to")}>
						{hours.map((hour) => (
							<option value={hour}>{`${hour}`}</option>
						))}
					</select>
					<label>Attività</label>
					<input
						type="text"
						className="border rounded-lg"
						{...register("activity")}
					/>
					<label>Categoria</label>
					<input
						type="text"
						className="border rounded-lg"
						{...register("category")}
					/>
					<label>LOE</label>
					<select className="border rounded-lg" {...register("loe")}>
						<option>{`😊`}</option>
						<option>{`😐`}</option>
						<option>{`🙃`}</option>
					</select>
					<label>Distrazione</label>
					<input
						type="text"
						className="border rounded-lg"
						{...register("distraction")}
					/>
					<button>
						<IoSaveOutline size={24} />
					</button>
				</form>
			</div>
			<div className="flex flex-col mx-auto max-w-6xl mt-10">
				<table className="text-center">
					<thead>
						<th>Dalle</th>
						<th>Alle</th>
						<th>Attività</th>
						<th>Categoria</th>
						<th>LOE</th>
						<th>Distrazione</th>
					</thead>
					<tbody>
						{data.map((activity: ActivityProps) => (
							<tr className="border border-x-transparent border-y-black">
								<td>{activity.from}</td>
								<td>{activity.to}</td>
								<td>{activity.activity}</td>
								<td>{activity.category}</td>
								<td>{activity.loe}</td>
								<td>{activity.distraction}</td>
								<td>
									<button
										onClick={() => removeActivity.mutate(activity.id)}
										className="flex flex-col justify-center"
									>
										<IoCloseOutline size={24} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default Timetracker;
