import React from "react";
import { Link, useNavigate } from 'react-router-dom'

function Header({ auth, setAuth, setToken, token }) {
    
    const logout = () => {
        fetch("http://api-shop.alabuga.space/api-shop/logout", {
            headers: {
                "Content-type": "application/json;charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        }).then(
            api => api.json()
        ).then(
            json => {
                if (json.ok) {
                    setToken('');
                    setAuth(false);
                    navigate("/login");
                }
            } 
        )
    };
    const navigate = useNavigate();
    return (
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <Link to="/products" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">«Just buy»</span>
            </Link>
            {
                auth ? (
                    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link class="me-3 py-2 text-dark text-decoration-none" to="/order">Мои заказы</Link>
                        <Link class="me-3 py-2 text-dark text-decoration-none" to="/cart">Корзина</Link>
                        <Link class="me-3 py-2 text-dark text-decoration-none" onClick={logout} to="/">Выйти</Link>
                    </nav>
                ) : (
                    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <Link class="me-3 py-2 text-dark text-decoration-none" to="/signup">Регистрация</Link>
                        <Link class="me-3 py-2 text-dark text-decoration-none" to="/login">Авторизация</Link> 
                    </nav>
                    
                )
            }
        </div>
    );
}

export default Header;