import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import './Sidebar.css';

export default function Sidebar() {
    const navigate = useNavigate();

    const sidebarElements = [
        {
            title: "Home",
            link:"/home",
            icon: <HomeIcon />
        },
        {
            title: "Profile",
            link:"/profile",
            icon: <AccountCircleIcon />
        },
        {
            title: "Mailbox",
            link:"/mailbox",
            icon: <EmailIcon />
        },
        {
            title: "Settings",
            link:"/settings",
            icon: <SettingsIcon />
        },
    ]

    const  handleClick = (linkPath) => {
        navigate(linkPath);
    }

    return (
    <div className="Sidebar">
        {
            sidebarElements.map((val, key) => {
                return (
                    <li key={key} onClick={() => { handleClick(val.link) }}>
                    {" "}
                    <div>{val.icon}</div>
                    {" "}
                    <div className="title" >{val.title}</div>
                    </li>
                )
            })
        }  
    </div>
    );
}