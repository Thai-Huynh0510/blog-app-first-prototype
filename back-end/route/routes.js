const express = require('express')

const blogRouter = express.Router()

const {fetchListOfBlogs, deleteBlog, updateBlog, addBlog} = require('../controller/blog_controller')

blogRouter.get('/',fetchListOfBlogs)
blogRouter.post('/add',addBlog)
blogRouter.patch('/update/:id', updateBlog)
blogRouter.delete('/delete/:id', deleteBlog)
module.exports = blogRouter