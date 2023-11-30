import { ContactsMongo } from "../dao/mongo/contactsManager.js";

export class ContactController{
    static getContacts = async (req,res) => {
        const result = await ContactsMongo.getAll();
    res.json({status:"success", data: result});
    }

    static createContact = async (req,res) => {
        try {
            const newContact = req.body;
            const contactDto = new CreateContactDto(newContact);
            console.log("contactDto",contactDto);
            const result = await ContactsMongo.create(contactDto);
            res.json({status:"success", data: result});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }

    static getContact = async (req,res) => {
        const userId = req.params.id;
        const result = await ContactsMongo.getOne(userId);
        res.json({status:"success", data: result});
    }
}