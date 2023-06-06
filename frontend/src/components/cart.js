import React, { useEffect, useState } from 'react'

const Cart = () => {

    const [cartData, setCartData] = useState([])

    useEffect(() => {
        getCartProducts()
    }, [])

    const getCartProducts = async () => {
        const result = await fetch('http://localhost:5000/api/cart', {
            method: "POST",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerId: JSON.parse(localStorage.getItem('user'))._id
            }),
        })
        const res = await result.json()
        setCartData(res)
    }

    return (
        <>
            cart
            <ul>
                {
                    cartData.length > 0 ? (
                        cartData.map((item, i) => {
                            return (
                                <li key={i}>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.author}</p>
                                        <p>{item.price}</p>
                                    </div>
                                </li>
                            )
                        })
                    ) : (
                        <>No any item in cart.</>
                    )
                }
            </ul>
        </>
    )
}

export default Cart