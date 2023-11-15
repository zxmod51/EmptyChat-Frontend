import React, { useState, useContext} from "react";
import {AuthContext} from '../../App'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import defaultBanner from '../../assets/banner.png'
import defaultProfileImage from '../../assets/DefaultProfileImage.png'
import CreateIcon from '@mui/icons-material/Create';
import './Profile.css';

export default function Profile() {
    const auth = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    }

    const handleUpload = () => {
      const formData = new FormData();
      formData.append("avatarFile", selectedFile);
      formData.append("username", auth.user.userData.username);
      
      const requestOptions = {
          method: 'POST',
          body: formData,
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/changeAvatar`, requestOptions)
      .then(response => 
        {
          if (response.ok) {
            console.log("Avatar successfully changed!")
            response.json()
            .then(data => {
              auth.setPathAvatar(data.pathToAvatar);
              handleClose();
            })
          } else {
            response.text()
            .then(data => {
              console.log("Something wrong happened!")
            });
          }  
        })
    }

    return (
      <div className="profilePage">
        <div className="profile">
          <div className="header">
            <img src={defaultBanner} className="banner" alt=""/>
          </div>
          <div className="main">
            <div className="profileImage">
              <img src={auth.pathAvatar === "" ? defaultProfileImage : auth.pathAvatar} alt="" height={180} width={180}/>
              <button className="myButton" onClick={handleShow}><CreateIcon /></button>
            </div>
            <div className="userInfo">
              <label>Nutzername:</label>
              <p>{auth.user.userData.username}</p>
              <label>Name:</label>
              <p>{auth.user.userData.name}</p>
            </div>
          </div>
          <div className="posts">
            <h1>Posts</h1>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit profile image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="file" onChange={handleFileChange} id="avatar" name="avatar" accept="image/png, image/jpeg"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpload}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}