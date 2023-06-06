import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProduct();
    }, [])
    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/api/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        setProduct(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/api/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        if (result) {
            getProduct();
        }
    }

    const handleSearch = async (e) => {
        let key = e.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/api/search/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            if (result) {
                setProduct(result)
            }
        } else {
            getProduct();
        }

    }

    const handlePurchase = async (bookid) => {
        let result = await fetch(`http://localhost:5000/api/products/${bookid}/${JSON.parse(localStorage.getItem("user"))._id}`, {
            method: "POST",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
    }

    return (
        <div className="product-list">
            <h1>Product list</h1>
            <input onChange={handleSearch} className="search-input" type="text" placeholder="Search Products" />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Author</li>
                <li>Content</li>
                <li>Operation</li>
            </ul>
            {
                product.length > 0 ? product.map((item, i) => {
                    return (
                        <ul key={i}>
                            <li>{i + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.author}</li>
                            <li>{item.content}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}><button>Update</button></Link>
                                <button onClick={() => handlePurchase(item._id)}>Purchase</button>
                            </li>
                        </ul>
                    )

                })
                    :
                    <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList


