import React, { useState } from 'react'
import { addPostData, updatePost } from '../API/PostApi';

const AddPosts = ({ data, setData, addPost, setAddPost, editData, setEditData, isEmpty }) => {


  const handleInputChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    setAddPost({ [name]: val })
    // console.log(addPost)
  }

  const dataAddToApi = async () => {
    const response = await addPostData(addPost);
    console.log(response.data)
    if (response.status === 201) {
      setData([...data, response.data])
      setAddPost({ title: "", body: "" })
    }
  }

  // Update data function
  const updatePostData = async () => {
    try {
      const response = await updatePost(editData.id, addPost)
      setData((prev) => {
        return prev.map((currEle) => {
          return currEle.id === response.data.id ? response.data : currEle
        })
      })
      console.log(data)
      setAddPost({title:"", body:""})
      isEmpty = false;
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const action = isEmpty ? "Update" : "Add";
    if (action === "Add") {
      dataAddToApi();
    } else if (action === "Update") {
      updatePostData()
    }
  }

  return (
    <div className='text-white p-5 my-3 rounded-md w-[50%] bg-gray-800 text-center'>
      <form action="" onSubmit={handleFormSubmit} className='flex justify-around'>
        <div>
          <label htmlFor="title"></label>
          <input onChange={handleInputChange} value={addPost.title} type="text" id='title' className='bg-white p-2 rounded-md text-black outline-none' name='title' placeholder='Add Title' />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input onChange={handleInputChange} value={addPost.body} type="text" id='body' name='body' className='bg-white p-2 rounded-md text-black outline-none' placeholder='Add Post' />
        </div>
        <button type="submit" value={isEmpty ? "Update" : "Add"} className=' hover:cursor-pointer bg-green-600 py-2 px-7 rounded-md hover:bg-green-400'>{isEmpty ? "Update Post" : "Add Post"}</button>
      </form>
    </div>
  )
}

export default AddPosts