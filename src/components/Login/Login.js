import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../App'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Button from 'react-bootstrap/Button';
import './Login.css';

export default function Login() {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastProps, setToastProps] = useState({})
    const navigate = useNavigate();

    const  handleLoginRequest = () => {
        var requestData = {
            username: username, 
            password: password
          }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(requestData)
        };
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json()
            .then(data => {
              auth.signin(data);
              navigate("/home")
          });
          } else {
            response.text()
            .then(data => {
              setToastProps({header: "Oops. Etwas ist schiefgelaufen!", body: data})
              setShowToast(true);
            })
          }     
      })};

    return (
      <div className="loginPage">
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
        <div className="loginWindow">
          <label htmlFor="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />

          <label htmlFor="pw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="pw" value={password} onChange={e => setPassword(e.target.value)} required />

          <Button className="loginButton" variant="light" onClick={handleLoginRequest}>Login</Button>

          <p>Hast du noch keinen Account?</p>
          <a href="/register">Registriere dich!</a>
        </div>
      </div>
    );
  }