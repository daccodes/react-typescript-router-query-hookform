import { useForm, SubmitHandler } from "react-hook-form";
import { ContactProps } from "../models/contact";

interface NewContactProps {
	onAdd: { mutate: (T: ContactProps) => void };
	onClose: () => void;
}

const NewContact = ({ onAdd, onClose }: NewContactProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ContactProps>();

	const onSubmit: SubmitHandler<ContactProps> = (data) => {
		onAdd.mutate(data);
		onClose();
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-row flex-wrap gap-6"
			>
				<label>Image Url:</label>
				<input className="border w-[40rem]" autoFocus {...register("image")} />
				<label>Name:</label>
				<input className="border" {...register("name")} />
				<label>Surname:</label>
				<input className="border" {...register("surname")} />
				<label>Role:</label>
				<input className="border" {...register("role")} />
				<label>Company:</label>
				<input className="border" {...register("company")} />
				<label>Tel.</label>
				<input className="border " {...register("tel")} />
				<label>Email:</label>
				<input className="border" {...register("email")} />
				<label>Notes:</label>
				<input className="border" {...register("notes")} />
				<button className="border px-8 bg-[#333D55] text-[#F4F5F7] rounded-xl">
					save
				</button>
			</form>
		</>
	);
};

export default NewContact;
