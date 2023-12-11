const ContactUs = require('../models/ContactUsModel');

// POST MESSAGE
const SendMessage = async (req, res) => {
    const {body} = req;

    if(!body.username || !body.email || !body.phone_number || !body.message){
        return res.status(400).json({
            message: "Data yang anda masukkan tidak lengkap",
            data: null
        })
    }

    try {
        const Contact_Us = {
          username: req.body.username,
          email: req.body.email.trim(),
          phone_number: req.body.phone_number.trim(),
          message: req.body.message
        };
    
        await ContactUs.create(Contact_Us);
    
        res.status(201).send({ 
            msg: "Send Message Success",
            data: body 
        });
      } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
      }
}

// GET ALL MESSAGE
const getMessage = async (req, res) => {
    try {
        const Message = await ContactUs.findAll()

        res.json({
            message: 'Get Messages Success',
            data: Message // Mengirim data artikel sebagai respons
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

module.exports = {
    SendMessage,
    getMessage
}



