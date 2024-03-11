const mongoose = require('mongoose')
const blog = require("../model/blog")

//get all blogs
const fetchListOfBlogs = async(req,res) => {
    let blogs 
    try {
        blogs = await blog.find()
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(404).json({msg: 'The is no Blog'})
    }
    return res.status(200).json({blogs})
}
//get a blog

//add
const addBlog = async(req,res) => {
    const {title, description} = req.body
    const currentDate = new Date()

    const newBlog = new blog({
        title,
        description,
        date: currentDate
    })
    try {
        await newBlog.save()
    } catch (error) {
        console.log(error)
    }
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save(session)
        session.commitTransaction()
    } catch (error) {
        return res.status(500).json({msg: error})
    }
    return res.status(200).json({newBlog})
}
//edit
const updateBlog = async (req, res) => {
    const id = req.params.id
    const {title, description} = req.body

    let editBlog
    try {
        editBlog = await blog.findByIdAndUpdate(id, {title, description})
    } catch (error) {
        console.log(error)
        return res.send(500).json({msg: 'something went wrong '})
    }
    if(!editBlog){
        return res.status(500).json({msg:'blog not found'})
    }
    res.status(200).json({editBlog})
}
//delete
const deleteBlog = async(req,res) =>{
    const id = req.params.id

    try{
        const findBlog = await blog.findByIdAndDelete(id)
        if(!findBlog){
            return res.status(404).json({msg: 'blog not found'})
        }
        return res.status(200).json({msg: 'deleted'})
    } catch(error){
        console.log(error)
        return res.status(500).json({msg: 'unable to delete'})
    }
    
}
module.exports = {fetchListOfBlogs, deleteBlog, updateBlog, addBlog};