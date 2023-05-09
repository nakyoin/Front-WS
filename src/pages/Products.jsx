import React, { useEffect, useState } from "react";

function Products ({ products, setProducts, token }) {
    const [loaded, setLoaded] = useState(false);
    const addToCart = (event, product) => {
        fetch(`http://api-shop.alabuga.space/api-shop/cart/${product.id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        }).then(api => api.json()).then(
            json => {
                if (json.ok) {
                    event.target.disabled = true;
                }
            }
        )
    }
    useEffect(() => {
        fetch("http://api-shop.alabuga.space/api-shop/products", {
            headers: {
                "Content-type": "application/json;charset=utf-8"
            }
        })
        .then(api => api.json())
        .then(json => setProducts(json))
        .finally(() => {setLoaded(true)})
    }, [])
    return (
        <>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Каталог товаров</h1>
            </div>
            <main>
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    {loaded && products.data.map((product, index) => (
                        <div key={index} class="col">
                            <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">{product.name}</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">{product.price}</h1>
                                    <p>{product.description}</p>
                                    {token && <button type="button" onClick={event => addToCart(event, product)} class="w-100 btn btn-lg btn-outline-primary">Добавить в корзину</button>}
                                </div>
                            </div>
                        </div>
                    ))}

             </div>
            </main>
        </>
    );
                    }
export default Products;