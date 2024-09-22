import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Navigate, Link } from 'react-router-dom';
import "../../styles/form.css";

function FormData() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Estado para manejar el mensaje de error

    async function sendData(e) {
        e.preventDefault();
        setError('');  // Reiniciar el mensaje de error antes de intentar loguear

        const response = await actions.login(email, password);

        if (!response.success) {
            setError(response.message);  // Mostrar el mensaje de error si falla el login
        }
    }

    return (
        <>
            {store.auth === true ? <Navigate to="/loginok" /> :
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <form className="form" onSubmit={sendData}>
                        <p className="title">Login</p>
                        <p className="message">Please enter your email and password to login.</p>
                        
                        <label>
                            <input 
                                className="input" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Enter email" 
                                required 
                            />
                            <span>Email</span>
                        </label>

                        <label>
                            <input 
                                className="input" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="Password" 
                                required 
                            />
                            <span>Password</span>
                        </label>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <button className="submit" type="submit">
                            Login
                        </button>
                        <p className="signin">Don't have an account? <Link to="/signup">Register</Link></p>
                    </form>
                </div>
            }
        </>
    );
}

export default FormData;