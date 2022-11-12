import { FormEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { IoAddOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import NewContact from "../components/NewContact";
import * as api from "../utils/api/apiPeople";
import { ContactProps } from "../models/contact";
type FilterType =
	| "name"
	| "surname"
	| "role"
	| "company"
	| "tel"
	| "email"
	| "notes";

export default function People() {
	const [filter, setFiltered] = useState("");
	const [filterType, setFilterType] = useState<FilterType>("name");
	const [show, setShow] = useState(false);
	const [privacy, setPrivacy] = useState(true);
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (show === false) {
			ref.current?.focus();
		}
	}, [show]);

	const queryClient = useQueryClient();

	const { data } = useQuery(["contacts"], api.getContacts, {
		initialData: [],
	});

	const addContact = useMutation(
		(formData: ContactProps) => {
			return api.addContact(formData);
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData(
					["contacts"],
					(contacts: Array<ContactProps> | undefined) => [...contacts!, data]
				);
			},
		}
	);

	function onChangeHandler(e: FormEvent<HTMLInputElement>) {
		setFiltered(e.currentTarget.value);
	}
	function onChangeFilter(e: FormEvent<HTMLSelectElement>) {
		setFilterType(e.currentTarget.value as FilterType);
		setFiltered("");
		ref.current?.focus();
	}
	function handleClick() {
		setShow((s) => !s);
	}
	return (
		<Layout>
			<div className="flex flex-row mx-auto max-w-6xl mt-10 text-4xl justify-between">
				<p>Rubrica:</p>
				<button className="rounded-full border px-3 py-3" onClick={handleClick}>
					<IoAddOutline size={22} />
				</button>
			</div>

			<div className="flex flex-row mx-auto max-w-6xl mt-10 justify-between">
				<form className="flex flex-row gap-2 justify-start">
					<label htmlFor="search"> {"Search: "} </label>
					<select
						onChange={onChangeFilter}
						defaultValue={"name"}
						className="h-7 px-3 border border-gray-400 grow-0"
					>
						<option value="name">Nome</option>
						<option value="surname">Cognome</option>
						<option value="role">Ruolo</option>
						<option value="company">Azienda</option>
						<option value="tel">Telefono</option>
						<option value="email">Email</option>
						<option value="notes">Note</option>
					</select>
					<input
						name="search"
						onChange={onChangeHandler}
						className="h-7 px-3 border border-gray-400 grow-0"
						ref={ref}
						value={filter}
					/>
				</form>
				<div className="flex flex-row gap-8">
					<button onClick={() => setPrivacy((s) => !s)}>
						{privacy ? (
							<IoEyeOutline size={24} />
						) : (
							<IoEyeOffOutline size={24} />
						)}
					</button>
					<span className="">
						{"Found: "}
						{
							data?.filter((p: ContactProps) =>
								p[filterType].toLowerCase().includes(filter)
							).length
						}
						{"/"}
						{data?.length}
					</span>
				</div>
			</div>

			{show && (
				<div className="flex flex-col mx-auto max-w-6xl mt-10 bg-slate-300 px-6 py-8 rounded-xl">
					<NewContact onAdd={addContact} onClose={handleClick} />
				</div>
			)}
			<div className="flex flex-col mx-auto max-w-6xl mt-10">
				<table className="table-auto">
					<thead>
						<tr className="h-14">
							<th></th>
							<th>Nome</th>
							<th>Cognome</th>
							<th>Ruolo</th>
							<th>Azienda</th>
							<th>Tel.</th>
							<th>Mail</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data
								.sort((a: ContactProps, b: ContactProps) =>
									a.surname.localeCompare(b.surname)
								)
								.filter((p: ContactProps) =>
									p[filterType].toLowerCase().includes(filter)
								)
								.map((person: ContactProps) => (
									<tr
										className=" border border-y-black border-x-transparent"
										key={`${person.name}+${person.surname}`}
									>
										<td className="py-3 px-0 w-16">
											<img
												src={person.image}
												alt={person.name}
												className="rounded-full h-14 w-14"
											/>
										</td>
										<td className="py-3 px-6 text-sm">{person.name}</td>
										<td className="py-3 px-6 text-sm">{person.surname}</td>
										<td className="py-3 px-6 text-sm">{person.role}</td>
										<td className="py-3 px-6 text-sm">{person.company}</td>
										<td className="py-3 px-6 text-sm">
											{privacy ? `+39 ${person.tel}` : `**********`}
										</td>
										<td className="py-3 px-6 text-sm">
											{privacy ? `${person.email}` : `**********`}
										</td>
										<td className="py-3 px-6 text-sm">{person.notes}</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}
