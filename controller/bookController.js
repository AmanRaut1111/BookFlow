const bookModel = require('../models/bookModel');




const addBook = async (req, res) => {
    try {
        const { title, desc, authorName, publishedOn, price } = req.body
        const bookData = bookModel({
            title: title,
            desc: desc,
            authorName: authorName,
            price: price,
            publishedOn: publishedOn
        })


        console.log(new Date());
        const data = await bookData.save();
        if (data) {
            res.status(200).json({ message: "Book Added Sucessfully...!", status: true, statusCode: 200, data: data })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
};


const getAllBook = async (req, res) => {
    try {
        const bookData = await bookModel.find();
        if (bookData) {
            res.status(200).json({ message: "Book Data Found sucessfully...!", status: true, statusCode: 200, data: bookData })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
};


const updateBookDetail = async (req, res) => {
    try {
        const id = req.params


        const data = await bookModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (data) {
            res.status(200).json({ message: "Data Updated Sucessfully..!", status: true, statusCode: 200, data: data })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
}


const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const Bookdata = await bookModel.findOneAndDelete(id)

        console.log(Bookdata);
        if (Bookdata) {
            res.status(200).json({ message: "Book Deleted Sucessfully..!", status: true, statusCode: 200 })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
}

module.exports = { addBook, getAllBook, updateBookDetail, deleteBook }