import localforage from "localforage";
import axios from "axios";
import { ContactProps } from "../../models/contact";

export async function getContacts() {
	const response = await fetch("http://localhost:3000/contacts");
	const contacts = await response.json();
	return contacts || [];
}

export async function addContact(newContact: ContactProps) {
	const contacts = await getContacts();
	axios.post("http://localhost:3000/contacts", newContact);
	await localforage.setItem("contacts", [...contacts, newContact]);
	return newContact;
}
