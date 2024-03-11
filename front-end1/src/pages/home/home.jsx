import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context'
import axios from 'axios'
import classes from './styles.module.css'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const { edit, setEdit,blogList, setBlogList, pending, setPending } = useContext(GlobalContext)
  const navigate = useNavigate()
  async function fetchListOfBlogs() {
    try {
      setPending(true);
      const response = await axios.get('http://localhost:5000/api/v1/blogs/');
      console.log('API Response:', response.data); // Log the entire response
      const result = response.data;
      console.log('Blog List from Response:', result.blogList); // Log the blogList directly from response
      if (result.blogs && result.blogs.length) {
        setBlogList(result.blogs);
      } else {
        console.warn('Blog list is empty or not available in the response.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setPending(false);
    }
  }
  const handleDelete = async (getCurrentId) => {
    console.log(getCurrentId)
    const response = await axios.delete(`http://localhost:5000/api/v1/blogs/delete/${getCurrentId}`)
    const result = await response.data
    if(result.msg){
      fetchListOfBlogs()
    }
  }
  const handleEdit = async(getCurrentdata) => {
    console.log(getCurrentdata)
    navigate('/add-blog', {state : {getCurrentdata}})
  }
  useEffect(() => {
    fetchListOfBlogs()
  }, [])
  console.log('Blog List:', blogList)
  console.log('Pending:', pending)

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading ...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <FaEdit onClick={() => handleEdit(item)} size={30}/>
              <FaTrash onClick={() => handleDelete(item._id)} size={30}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home