import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
    const [contacts, setContacts] = useState([]);
    const [sortBy, setSortBy] = useState("dateDesc");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contacts");
            const data = await res.json();
            setContacts(data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleAddContact = (newContact) => {
        setContacts((prev) => [newContact, ...prev]);
    };

    const handleUpdateContact = (updatedContact) => {
        setContacts((prev) => prev.map((c) => (c._id === updatedContact._id ? updatedContact : c)));
    };

    const handleDeleteContact = (id) => {
        setContacts((prev) => prev.filter((c) => c._id !== id));
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm)
    );

    const sortedContacts = [...filteredContacts].sort((a, b) => {
        if (sortBy === "dateDesc") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "dateAsc") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "nameAsc") return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        if (sortBy === "nameDesc") return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto p-6">
                <header className="text-center my-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                        Contact Management App
                    </h1>
                    <p className="text-lg text-gray-600">Manage your contacts effortlessly</p>
                </header>

                <ContactForm onAddContact={handleAddContact} />

                <div className="my-10">
                    <input
                        type="text"
                        placeholder="Search contacts by name, email or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                    />
                </div>

                <ContactList
                    contacts={sortedContacts}
                    onUpdateContact={handleUpdateContact}
                    onDeleteContact={handleDeleteContact}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    );
}

export default App;
