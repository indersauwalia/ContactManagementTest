import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contacts - Create new contact
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            message: message || "",
        });

        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/contacts - Get all contacts
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json(updatedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;