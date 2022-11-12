import localforage from "localforage";
import axios from "axios";

export async function getActivity() {
	const response = await fetch("http://localhost:3000/timetracking");
	const activities = await response.json();
	return activities || [];
}

export async function addActivity(newActivity: any) {
	const activity = await getActivity();
	axios.post("http://localhost:3000/timetracking", newActivity);
	await localforage.setItem("timetracking", [...activity, newActivity]);
	return newActivity;
}

export async function removeActivity(id: number) {
	const activity = await getActivity();

	const newActivities = activity.filter((t: any) => t.id !== id);
	const deleted = activity.find((t: any) => t.id === id)!;
	axios.delete(`http://localhost:3000/timetracking/${id}`);
	await localforage.setItem("todos", newActivities);
	return deleted;
}
