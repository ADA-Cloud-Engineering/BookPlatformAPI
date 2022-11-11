const bcrypt = require('bcrypt');
const Book = require('../models/Book');
const cloudinary = require("../utils/Cloudinary");




const upload = async (req, res) =>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const book = await Book.create({
            title: req.body.title,
            imageUrl : req.body.imageUrl,
            author: req.body.author,
            referencenumber: req.body.referencenumber,
            format: req.body.format,
            language: req.body.language,
            isbn3: req.body.isbn3,
            releasedate: req.body.releasedate,
            publisher: req.body.publisher,
            weight: req.body.weight,
            downloadurl: result.secure_url,
            user : req.user._doc._id,
            category : req.body.category 
          });
        res.status(201).json({'message': 'Book uploaded successfully', data : {
            ...book
        }});

    }
    catch(err){
        res.status(500).json({'message': err.message});
    }
}

const list  =  async (req, res) =>{
   const param = req.query;
    const books = await Book.find({...param});

    res.status(200).json({'message': 'Fetched books successfully', data : [
        ...books
    ]});
}

module.exports = {upload, list};
