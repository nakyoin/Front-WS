import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

function Cart ({ token }) {
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://api-shop.alabuga.space/api-shop/cart", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(api => {console.log(api.data); setCart(api)})
        .finally(() => {setLoaded(true)})
    }, [])
    function makeOrder() {
        fetch("http://api-shop.alabuga.space/api-shop/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        setCart([]);
        navigate("/order");
    }
    return (
        <main>
            <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {loaded && cart.data.map((product, index) => (
                    <Product 
                        product={product} 
                        index={index} 
                        cart={cart}
                        setCart={setCart}
                        token={token} />
                ))}
            </div>
            <div class="row justify-content-center gap-1">
                <button onClick={() => navigate("/products")} class="col-6 btn btn-lg btn-outline-info mb-3" type="button">Назад</button>
                {cart.data?.length !== 0 && <button type="button" onClick={() => makeOrder()} class="col-6 btn btn-lg btn-primary mb-3">Оформить заказ</button>}

            </div>
        </main>
    );
}

export default Cart;