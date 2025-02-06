import axios from "axios";

const API = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// get method
export const getPost = () => {
    return API.get("/posts");
}

// Deleted method
export const deletePost = (id) => {
    return API.delete(`/posts/${id}`);
}

// Add Post
export const addPostData = (post) => {
    return API.post("/posts", post)
}

// PUT Post (Update)
export const updatePost = (id, post) => {
    return API.put(`/posts/${id}`, post)
} 