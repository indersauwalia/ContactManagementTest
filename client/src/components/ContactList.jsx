import ContactItem from "./ContactItem";

export default function ContactList({
    contacts,
    onUpdateContact,
    onDeleteContact,
    sortBy,
    setSortBy,
    searchTerm,
}) {
    if (contacts.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600 text-lg">
                    {searchTerm
                        ? `No contacts found matching "${searchTerm}"`
                        : "No contacts yet. Add one above!"}
                </p>
            </div>
        );
    }

    const toggleSort = (type) => {
        setSortBy(sortBy === `${type}Asc` ? `${type}Desc` : `${type}Asc`);
    };

    const getArrow = (type) => {
        if (sortBy === `${type}Asc`) return "↑";
        if (sortBy === `${type}Desc`) return "↓";
        return "";
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                Contacts List
                {searchTerm && (
                    <span className="text-blue-600 ml-3">({contacts.length} results)</span>
                )}
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                onClick={() => toggleSort("name")}
                                className="text-left p-4 cursor-pointer hover:bg-gray-200"
                            >
                                Name <span className="ml-1">{getArrow("name")}</span>
                            </th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Phone</th>
                            <th className="text-left p-4">Message</th>
                            <th
                                onClick={() => toggleSort("date")}
                                className="text-left p-4 cursor-pointer hover:bg-gray-200"
                            >
                                Date <span className="ml-1">{getArrow("date")}</span>
                            </th>
                            <th className="text-left p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <ContactItem
                                key={contact._id}
                                contact={contact}
                                onUpdate={onUpdateContact}
                                onDelete={onDeleteContact}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
