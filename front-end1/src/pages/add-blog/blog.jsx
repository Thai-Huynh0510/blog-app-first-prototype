import React, { useContext, useEffect } from 'react'
import classes from './styles.module.css'
import {GlobalContext} from '../../context/index'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
const Addblog = () => {
  const {formData, setFormData, setEdit, Edit} = useContext(GlobalContext)
  console.log(formData)
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = async() => {
    const response = Edit? await axios.patch(`http://localhost:5000/api/v1/blogs/update/${location.state.getCurrentdata._id}`,
    {
      title :formData.title,
      description : formData.description
    }
    ) : await axios.post('http://localhost:5000/api/v1/blogs/add', {
      title: formData.title,
      description: formData.description
    })
    const result = await response.data
    if(result){
      setEdit(false)
      setFormData({
        title :'',
        description: ''
      })
      navigate('/')
  }
}
  useEffect(() => {
    if(location.state){
      const {getCurrentdata} = location.state
      setEdit(true)
      setFormData({
        title: getCurrentdata.title,
        description: getCurrentdata.description
      })
    }
  },[location])
  return (
    <div className={classes.wrapper}> 
    <h1>{Edit ? "Edit This Blog" : "Add blog" }</h1>
    <div className={classes.formWrapper}>
      <input 
      name ='title'
      placeholder='Enter blog title'
      id = 'title'
      type='text'
      value = {formData.title}
      onChange={(e) => setFormData({
        ...formData,
        title : e.target.value
      })}
      />
      <textarea 
      name = 'description'
      placeholder='Enter Description'
      id = 'description'
      value = {formData.description}
      onChange={(e)=> setFormData({
        ...formData,
        description: e.target.value
      })}
      />
      <button onClick={handleClick}> {Edit? "Edit" : "Submit"} </button>
    </div>
    </div>
  )
}

export default Addblog