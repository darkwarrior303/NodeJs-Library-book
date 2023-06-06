import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const AddProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const handleCollectData = async () => {
        if (!name || !price || !author || !content) {
            setError(true);
            return false;
        }
        // console.log(name, price, category, company);

        const userId = JSON.parse(localStorage.getItem('user'));
        // console.log(userId._id);

        let result = await fetch('http://localhost:5000/api/add-book', {
            method: 'post',
            body: JSON.stringify({ name, price, author, content, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })

        result = await result.json();
        console.log(result);
        navigate('/')
    }
    return (
        <div className="product">
            <h1>Add Book</h1>
            <input type="text" className="inputbox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Book Title" />
            {error && !name === true ? <span className="invalid-message">Enter valid Name</span> : ""}
            <input type="number" className="inputbox" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Book Price" />
            {error && !price === true ? <span className="invalid-message">Enter valid price</span> : ""}
            <input type="text" className="inputbox" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter Book Author" />
            {error && !author === true ? <span className="invalid-message">Enter valid author</span> : ""}
            <textarea className="inputbox" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            {error && !content === true ? <span className="invalid-message">Enter valid content</span> : ""}
            <button type="button" className="button" onClick={handleCollectData}>Add Item</button>
        </div>
    )
}

export default AddProduct
