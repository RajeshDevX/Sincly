import React, { useState, useEffect, useRef } from 'react';
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

// Mobile Backdrop Component
const MobileBackdrop = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)',
                zIndex: 499, // Just below sidebar (500)
                display: window.innerWidth <= 768 ? 'block' : 'none'
            }}
            onClick={onClose}
        />
    );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle outside click for mobile
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Only handle outside clicks on mobile when sidebar is open
            if (isMobile && isSidebarOpen && sidebarRef.current) {
                // Check if click is outside the sidebar
                if (!sidebarRef.current.contains(event.target)) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleSidebar();
                }
            }
        };

        if (isMobile && isSidebarOpen) {
            // Add event listener with capture to prevent other elements from receiving the event
            document.addEventListener('click', handleOutsideClick, true);
            document.addEventListener('touchstart', handleOutsideClick, true);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
            document.removeEventListener('touchstart', handleOutsideClick, true);
        };
    }, [isMobile, isSidebarOpen, toggleSidebar]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, isSidebarOpen]);

    const handleBackdropClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSidebar();
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <MobileBackdrop 
                isVisible={isMobile && isSidebarOpen} 
                onClose={handleBackdropClick}
            />
            
            {/* Sidebar */}
            <div 
                ref={sidebarRef}
                className={`br-sidebar ${isSidebarOpen ? 'open' : 'close'}`}
            >
                <div className='br-sidebar__menubar'>
                    <div className='br-sidebar__menu'>
                        <ul className='br-sidebar__menu_items'>
                            {menuItems.map((item, index) => (
                                <SidebarMenuItem 
                                    key={index} 
                                    text={item.text} 
                                    icon={item.icon} 
                                    path={item.path}
                                    isSidebarOpen={isSidebarOpen} 
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;