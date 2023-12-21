import React, { useState, useContext, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Home.css';
import {AuthContext} from '../../App'

export default function Home() {
    return (
      <div className="home">
        <div className="homeComponent">
          <InputFieldPosts />
          <Posts />
        </div>
      </div>
    );
  }

  function Posts() {
    const auth = useContext(AuthContext);
    const [postItems, setPostItems] = useState([]);

    useEffect( () => {
      getPosts();
    }, []);

    const getPosts = () => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/getPosts`, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            setPostItems(data.reverse());
        });
        } else {
          response.text()
          .then(data => {
            console.log(data);
          })
        }     
    })};

    const handleDeletePost = (postId) => {
      var postData = {
          _id: postId
        }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify(postData)
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/deletePost`, requestOptions)
      .then(response => {
        if (response.ok) {
          getPosts()
        } else {
          response.text()
          .then(data => {
          })
        }     
    })};


    return (
      <div className="Posts">
      <div className="refreshIcon">
        <RefreshIcon onClick={getPosts}/>
      </div>
      { postItems.map((item, key) => 
      <div key={key} className="posts">
        <Card bg="dark" data-bs-theme="dark">
          <Card.Header className="cardHeader">
            <div className="cardTitle"><b>{item.title}</b></div>
            <div className="cardAuthor">Author: {item.author.username}</div>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {item.body}
            </Card.Text>
          </Card.Body>
          {
            (item.author.username === auth.user.userData.username)
            ? <>
              <Card.Body className="cardFooter">
                <a className="cardFooterButton deleteButton" onClick={() => handleDeletePost(item._id)}>Delete</a>
              </Card.Body></>
            : <>
              </>
          }
        </Card>
      </div>
    ) } </div>)
  }


  function InputFieldPosts() {
    const auth = useContext(AuthContext);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const handlePost = () => {
      var postData = {
          _id: auth.user.userData._id,
          title: postTitle, 
          body: postBody,
          author: { username: auth.user.userData.username, profileImgPath: "/test"}
        }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify(postData)
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/post`, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
        });
        } else {
          response.text()
          .then(data => {
          })
        }     
    })};

    return (
        <div className="inputPost">
            <h2>Create a post</h2>
            <label htmlFor="postTitle">Title</label>
            <input type="text" name="postTitle" value={postTitle} onChange={e => setPostTitle(e.target.value)}></input>
            <label htmlFor="postBody">Body</label>
            <textarea name="postBody" rows="5" cols="33" value={postBody} onChange={e => setPostBody(e.target.value)}></textarea>
            <Button className="postButton" variant="light" onClick={handlePost}>Post</Button>
        </div>
    );
  }