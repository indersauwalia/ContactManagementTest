import { useState } from "react";
import ContactEditRow from './ContactEditRow';

export default function ContactItem({ contact, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        try {
            const res = await fetch(`/api/contacts/${contact._id}`, { method: "DELETE" });
            if (res.ok) onDelete(contact._id);
        } catch (err) {
            console.error(err);
        }
    };

    if (isEditing) {
        return (
            <ContactEditRow
                contact={contact}
                onSave={(updated) => {
                    onUpdate(updated);
                    setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <tr className="border-b hover:bg-gray-50 transition">
            <td className="p-4 font-medium">{contact.name}</td>
            <td className="p-4">{contact.email}</td>
            <td className="p-4">{contact.phone}</td>
            <td className="p-4 text-gray-600">{contact.message || "-"}</td>
            <td className="p-4 text-sm text-gray-500">
                {new Date(contact.createdAt).toLocaleDateString()}
            </td>
            <td className="p-4 space-x-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
