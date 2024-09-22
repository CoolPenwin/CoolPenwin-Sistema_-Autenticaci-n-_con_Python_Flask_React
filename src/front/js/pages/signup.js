import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/form.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async () => {
        const response = await actions.signup(email, password);
        if (response.success) {
            setRedirectToHome(true);  // Redirige si el registro es exitoso
        } else {
            setErrorMessage(response.message);  // Muestra el mensaje de error
        }
    };

    if (redirectToHome) {
        return <Navigate to="/signupok" replace />;
    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center flex-column">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form className="form" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                <p className="title">Registro</p>
                <p className="message">Por favor, ingresa tu email y contraseña para registrarte.</p>
                
                <label>
                    <input
                        type="email"
                        className="input"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                    <span>Email</span>
                </label>

                <label>
                    <input
                        type="password"
                        className="input"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        />
                    <span>Contraseña</span>
                </label>

                <button type="submit" className="submit">
                    Registrarse
                </button>
                <p className="signin">¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
            </form>
        </div>
                        </>
    );
};

export default Signup;