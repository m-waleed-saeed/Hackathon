const Contact = require("../models/contact");

// Add new contact message
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const newContact = new Contact({ fullName, email, phone, subject, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!", data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get all messages
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { createContact, getContacts };