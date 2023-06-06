import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Updateproduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails();
    },[])
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setAuthor(result.author)
        setContent(result.content)
    }

    const handleUpdateData = async () => {
        let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, author, content }),
            headers: {
                'Content-Type': "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        navigate('/')
    }
    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" className="inputbox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
            <input type="text" className="inputbox" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" />
            <input type="text" className="inputbox" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter Product Category" />
            <input type="text" className="inputbox" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter Product Company" />
            <button type="button" className="button" onClick={handleUpdateData}>Update Item</button>
        </div>
    )
}

export default Updateproduct
