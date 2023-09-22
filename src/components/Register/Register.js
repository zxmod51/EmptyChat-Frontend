import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import './Register.css';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({})
    const navigate = useNavigate();

    const  handleRegisterRequest = () => {
        var requestData = {
            name: name,
            email: email,
            username: username, 
            password: password
          }
          
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/register`, requestOptions)
        .then(response => 
          {
            if (response.ok) {
              navigate("/login")
            } else {
              response.text()
              .then(data => {
                setToastProps({header: "Oops. Etwas ist schiefgelaufen!", body: data});
                setShowToast(true)
              });
            }  
          })
      };

    return (
      <div className="registerComponent">
            <ToastContainer position="bottom-end">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} bg='danger' autohide>
                <Toast.Header>
                  {toastProps.header}
                </Toast.Header>
                <Toast.Body>
                  {toastProps.body}
                </Toast.Body>
              </Toast>
            </ToastContainer>
            <div className="registerWindow">
            <h1>Registrierungsformular</h1>

            <label htmlFor="name"><b>Name</b></label>
            <input type="text" placeholder="Enter Name" name="name" value={name} onChange={e => setName(e.target.value)} required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />

            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />

            <label htmlFor="pw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="pw" value={password} onChange={e => setPassword(e.target.value)} required />
            
            <Button className="loginButton" variant="light" onClick={handleRegisterRequest}>Registrieren</Button>

            <p>Du hast bereits einen Account? <a href="/login">Einloggen</a>.</p>
            </div>
      </div>
    );
  }