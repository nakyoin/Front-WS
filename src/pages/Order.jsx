import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Order ({ token, products }) {
    const [loaded, setLoaded] = useState(false);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://api-shop.alabuga.space/api-shop/order", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => setOrder(res))
        .finally(() => setLoaded(true));
    }, [])
    return (
        <main>
            { loaded &&
                order.data.map((ord1, index) => (
                    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
                        <h2 class="w-100">Заказ №{ord1.id}</h2>
                        {
                            products.data.filter((item => ord1.products.includes(item.id)))
                            .map((item, index2) => (
                                <div class="col">
                                    <div class="card mb-4 rounded-3 shadow-sm">
                                        <div class="card-header py-3">
                                            <h4 class="my-0 fw-normal">{item.name}</h4>
                                        </div>
                                        <div class="card-body">
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </main>
    );
}

export default Order;