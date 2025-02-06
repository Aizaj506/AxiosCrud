import React, { useEffect, useState } from 'react'
import { deletePost } from '../API/PostApi';

const Card = ({ eleData, index, data, setData, setAddPost, editData, setEditData }) => {
 
  const {id, title, body } = eleData;
  
  // Delete Functionality
  const onDelete = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        const updatedPost = data.filter((currPost) => (currPost.id !== id))
        setData(updatedPost);
      } else {
        console.log("Faild to delete the Post:", response.status)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //Edit/Update Functionnality
  const onEdit = (eleData) => {
    setEditData(eleData)
  }
  useEffect(() => {
    editData && setAddPost({title:editData.title || "", body:editData.body || ""})
  },[editData])

  // console.log(editData)

  return (
    <div className="border-l-6 border-green-500 w-[30%] p-4 rounded-lg shadow-md bg-gradient-to-r from-violet-500 to-blue-500 flex flex-col justify-between">
      <p className="font-bold text-gray-700">{index + 1}.</p>
      <h1 className="font-bold  text-gray-900">Title: {title}</h1>
      <p className="text-white">{body}</p>
      <div className="flex justify-between mt-3 ">
        <button
          className="border px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer"
          onClick={() => onEdit(eleData)}
        >
          Edit Post
        </button>
        <button
          className="border px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
          onClick={() => onDelete(id)}
        >
          Delete Post
        </button>
      </div>
    </div>
  )
}

export default Card