import { useState } from "react";

export default function ContactEditRow({ contact, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        message: contact.message || "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Phone must be exactly 10 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/contacts/${contact._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const updated = await res.json();
                onSave(updated);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const isValid =
        formData.name.trim() &&
        formData.email.trim() &&
        /^\S+@\S+\.\S+$/.test(formData.email) &&
        /^\d{10}$/.test(formData.phone.replace(/\s/g, ""));

    return (
        <tr className="bg-indigo-50">
            <td className="p-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </td>
            <td className="p-4">
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </td>
            <td className="p-4">
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digits"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </td>
            <td className="p-4">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </td>
            <td className="p-4 text-sm text-gray-500">
                {new Date(contact.createdAt).toLocaleDateString()}
            </td>
            <td className="p-4 space-x-3">
                <button
                    onClick={handleSave}
                    disabled={!isValid || loading}
                    className={`px-5 py-2 rounded-lg text-white font-medium ${
                        isValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                    }`}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
                <button
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
                >
                    Cancel
                </button>
            </td>
        </tr>
    );
}