import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from '../header';
import SideBar from '../sidebar';
import '../../styles/layout.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleTheme } from '../../redux/slices/themeSlice'; // Import toggleTheme

const Layout = () => {
    const dispatch = useDispatch();

    const isSidebarOpen = useSelector((state) => state.theme.sidebarOpen);
    const currentTheme = useSelector((state) => state.theme.theme);  // get current theme

    useEffect(() => {
        if (currentTheme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [currentTheme]);
    const toggleSidebarHandler = () => {
        dispatch(toggleSidebar());
    };

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className="layout-container">
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebarHandler} />
            <div className="layout-body">
                <div className={`layout-sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
                    <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebarHandler} />
                </div>
                {isSidebarOpen && (
                    <div className="layout-overlay" onClick={toggleSidebarHandler}></div>
                )}
                <div className={`app-container ${isSidebarOpen ? 'blur-background' : ''}`}>
                    <div style={{ height: '100%', overflowY: 'auto', paddingTop: '65px' }}>
                        {/* Tabs  */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
