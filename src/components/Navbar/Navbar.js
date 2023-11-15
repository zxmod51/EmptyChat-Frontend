import React, { useContext } from "react";
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../assets/EmptyChatLogo1.png'
import defaultProfileImage from '../../assets/DefaultProfileImage.png'
import {AuthContext} from '../../App'
import './Navbar.css';

export default function CustomNavbar({ username }) {
    const authContext = useContext(AuthContext);

    return (
        <Navbar bg="dark" data-bs-theme="dark" className="navbar">
          <Navbar.Brand className="navbarBrand">
            <img
              alt=""
              src={logoImg}
              width="55"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            EmptyChat
        </Navbar.Brand>
        {
            (authContext.user.userData === undefined) ? <p></p> : <><p>Willkommen {authContext.user.userData.username}!</p> <img src={authContext.pathAvatar === "" ? defaultProfileImage : authContext.pathAvatar} className="profilePic" alt="" width="40" height="40"/></>
        }
      </Navbar>
    );
}