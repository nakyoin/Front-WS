import React, { useState } from "react";

function Product ({ product, index, cart, setCart, token, setTotalPrice, totalPrice }) {
    const [count, setCount] = useState(1);
    function plus() {
        setCount(count + 1);
    }
    function minus() {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    function removeFromCart() {
        fetch(`http://api-shop.alabuga.space/api-shop/cart/${product.id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        })
        fetch("http://api-shop.alabuga.space/api-shop/cart", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(api => {console.log(api.data); setCart(api)})
    }
    return (

            <div key={index} class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">{product.name}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">{product.price}р.<small class="text-muted fw-light"> &times; {count}
                            шт.</small></h1>
                        <p>{product.description}</p>
                        <button onClick={() => plus()} type="button" class="btn btn-lg btn-info mb-3">+</button>
                        <button onClick={() => minus()} type="button" class="btn btn-lg btn-warning mb-3">&minus;</button>
                        <button onClick={() => removeFromCart()} type="button" class="btn btn-lg btn-outline-danger mb-3">Удалить из корзины</button>
                    </div>
                </div>
            </div>
    );
}

export default Product;