import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login ({ setToken, setAuth }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const login = (event) => {
        event.preventDefault();
        fetch("http://api-shop.alabuga.space/api-shop/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(res)
            }
            return res.json()
        }).then(({ data }) => {
            setAuth(true);
            setToken(data.user_token);
            navigate("/products")
        }).catch(() => {
            setError(true);
        })
    }
    return (
        <>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Авторизация</h1>
            </div>
            <main>
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                    <div class="col">
                        <div class="row">
                            <form>
                                <div class="form-floating mb-3">
                                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" class={`form-control ${error && "is-invalid"} `} id="floatingPassword" placeholder="Password"/>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                {error &&
                                   <div style={{ color: "red" }} class="h3 mb-3 fw-normal">
                                    Password is not valid
                                </div> 
                                }
                                <button class="w-100 btn btn-lg btn-primary mb-3" onClick={event => login(event)} type="submit">Войти</button>
                                <button class="w-100 btn btn-lg btn-outline-info" onClick={() => navigate("/")} type="submit">Назад</button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;