const express = require("express");
const { createContact, getContacts } = require("../controller/contact");
const router = express.Router();

router.post("/", createContact);  
router.get("/", getContacts);      

module.exports = router;
