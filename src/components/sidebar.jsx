import React, { useState } from 'react';
import {
    CheckSquare,
    ChevronsLeft,
    ChevronsRight,
    MessageCircle,
    LogOut,
    Phone,
    User,
    Briefcase,
    Database,
    CheckCircle,
    FileText,
    BarChart2,
    Eye,
    Shield,
    Settings
} from 'react-feather';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import { Tooltip, tooltipClasses } from "@mui/joy";
import { styled } from "@mui/material/styles";

const menuItems = [
    { text: 'Task Management', icon: <CheckSquare />, path: '/task-management' },
    { text: 'Chat', icon: <MessageCircle />, path: '/chat' },
];
// Sidebar Toggle Button Component
const SidebarToggle = ({ isSidebarOpen, toggleSidebar }) => (
    <div className='br-sidebar__toggle-icon' onClick={toggleSidebar}>
        {isSidebarOpen ? <ChevronsLeft size={15} color='white' /> : <ChevronsRight size={15} color='white' />}
    </div>
);
const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));
// Sidebar Menu Item Component
const SidebarMenuItem = ({ text, icon, path, isSidebarOpen }) => (
    <li className="br-sidebar__menu-item">
        {isSidebarOpen ? (
            <Link to={path}>
                <span className="br-sidebar__menu-item-icon">{icon}</span>
                <span className="menu-item-text br-sidebar__menu-item-text open">
                    {text}
                </span>
            </Link>
        ) : (
            <BootstrapTooltip title={text} placement="right">
                <Link to={path}>
                    <span className="br-sidebar__menu-item-icon">{icon}</span>
                    <span className="menu-item-text br-sidebar__menu-item-text close">
                        {text}
                    </span>
                </Link>
            </BootstrapTooltip>
        )}
    </li>
);

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {


    return (
        <div className={`br-sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
            {/* <header className={`br-sidebar__header ${isSidebarOpen ? 'open' : 'close'}`}>
                <SidebarToggle isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </header> */}

            <div className='br-sidebar__menubar'>
                <div className='br-sidebar__menu'>
                    <ul className='br-sidebar__menu_items'>
                        {menuItems.map((item, index) => (
                            <SidebarMenuItem key={index} text={item.text} icon={item.icon} path={item.path}
                                isSidebarOpen={isSidebarOpen} />
                        ))}
                    </ul>
                </div>
                {/* <div className={`br-sidebar__footer ${isSidebarOpen ? 'open' : 'close'}`}>
                    <div className='br-sidebar__footer-item'>
                        <span><LogOut size={20} color='white' /></span>
                        <span className='br-sidebar__footer-text'>Sign Out</span>
                    </div>
                    <div className='br-sidebar__footer-item'>
                        <span><LogOut size={20} color='white' /></span>
                        <span className='br-sidebar__footer-text'>Sign Out</span>
                    </div>
                </div> */}
            </div>


        </div>
    );
};

export default Sidebar;
