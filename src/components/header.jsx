import React from 'react';
import '../styles/header.css';
import { Chip, Avatar, IconButton, Tooltip } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';

// Custom Sincly Logo Component
const SinclyLogo = ({ size = 'normal', className = '' }) => {
  const isSmall = size === 'small';
  const logoClass = isSmall ? 'sincly-logo-small' : 'sincly-logo';
  
  return (
    <div className={`${logoClass} ${className}`}>
      <span className="sincly-logo-s">S</span>
    </div>
  );
};

// Custom Sincly Text Component
const SinclyText = ({ size = 'normal', className = '' }) => {
  const isSmall = size === 'small';
  const textClass = isSmall ? 'sincly-text-small' : 'sincly-text';
  
  return (
    <div className={`${textClass} ${className}`}>
      Sincly
    </div>
  );
};

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.theme); // 'light' or 'dark'

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className='br-header'>
      <div className='br-header__left'>
        <div className='sidebar_openClose_toggle_menu' onClick={toggleSidebar}>
          {isSidebarOpen ? <MenuOpenIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
        </div>

        <div className='br-header__site-name'>
          {/* <div className='br-header__site-name_logo1'>
            <SinclyLogo size="normal" />
          </div> */}
          <div className='br-header__site-name_logo2'>
            <SinclyText size="normal" />
          </div>
        </div>
      </div>

      <div className='br-header__right'>
        <Tooltip title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}>
          <IconButton 
            onClick={handleThemeToggle} 
            size="large" 
            aria-label="toggle theme"
            className="theme-toggle-btn"
          >
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        <div className='user_profile'>
          <img 
            src="https://www.w3schools.com/howto/img_avatar.png" 
            alt="User Profile" 
            className="user-profile-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;