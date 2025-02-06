import React, { useEffect, useState } from 'react'
import { getPost } from '../API/PostApi'
import Card from './Card'
import AddPosts from './AddPosts'

const ShowPosts = () => {
    // console.log(getPost())

    // State for Main data 
    const [data, setData] = useState([])

    // State for New Data Add to api 
    const [addPost, setAddPost] = useState({ title: "", body: ""});

    // State for edit
    const [editData, setEditData] = useState({})

    // Checking length of editData
    let isEmpty = Object.keys(editData).length !== 0;
    console.log(isEmpty)

    const getPostData = async () => {
        try {
            const response = await getPost();
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPostData()
    }, [])
    return (
        <>
            <section className='flex justify-center'>
                <AddPosts data={data} setData={setData} addPost={addPost} setAddPost={setAddPost} editData={editData} setEditData={setEditData} isEmpty={isEmpty} />
            </section>
            <ul className='flex flex-wrap justify-center gap-3 p-4'>
                {
                    data.map((ele, index) => (
                        <Card key={ele.id} index={index} eleData={ele} data={data} setData={setData} setAddPost={setAddPost} editData={editData} setEditData={setEditData} />
                    ))
                }
            </ul>
        </>
    )
}

export default ShowPosts