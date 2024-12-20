// React
import { FunctionComponent, JSXElementConstructor, ReactElement } from "react";
// FontAwesome
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Style
import "./NavigationBar.css";
// Component
import ApplicationsMenu, { ApplicationItem } from "./ApplicationsMenu/ApplicationsMenu";
import React from "react";

export interface NavigationBarConfig {
    //Applications to feature in the ApplicationMenu. If none is provided, the menu will not show.
    applicationItems?: ApplicationItem[];

    // Application logo
    logoLink: string;
    logoWidth?: string;
    //Alternative name for the logo
    alt?: string;

    // Menu items which represent the different pages of the application 
    menuItems: MenuItem[];

    // Dropdown user items
    // Login, Logout are the default items if authentication configuration is provided
    dropDownItems?: DropdownItem[];
    // Authentication
    authentication?: Authentication;
}

export interface MenuItem {
    // the name of the item
    title: string;
    // the link of the item to a specific page
    link?: string;
    // If the item has sub items
    subItems?: MenuItem[];
}

export interface DropdownItem {
    // the name of the item
    title: string;
    // the link of the item to a specific page
    link?: string;
}

export interface Authentication {
    // The function to check if the user is logged in
    isAuthenticated: () => boolean | undefined;
    // The function to login the user
    doLogin: () => Promise<void>;
    // The function to logout the user
    doLogout: () => Promise<void>;
    // The function to get the username of the user
    getUserName: () => any | undefined;
}

const NavigationBar: FunctionComponent<NavigationBarConfig & { language?: (key: string) => string }> = (configs) => {

    /*
    **  This function is used to get the menu item.
    **  If the menu item has sub items, it will return a dropdown menu.
    **  If the menu item doesn't have sub items, it will return a simple link.
    */
    function getMenuItem(item: MenuItem) {
        if (!item.subItems || item.subItems.length === 0) {
            return <li className="nav-item">
                <a
                    key={item.title}
                    className="nav-link active"
                    href={item.link ?? '/Error'}
                    rel="noopener noreferrer">
                    {item.title}
                </a>
            </li>
        } else {
            return <li className="nav-item dropdown full-width">
                <a className="nav-link dropdown-toggle"
                    role="button"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {item.title}
                </a>
                <div>
                <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
          >
                    {item.subItems.map((subItem, index) => {
                        return <div key={index} >
                            {getMenuItem(subItem)}
                        </div>
                    }
                    )}
                    </ul>
                </div>
            </li>
        }
    }

    /*
    ** This function is used to get the menu item from the users dropdown.
    ** If the menu item includes the item 'Admin', it will refer to the navigation managed by the application and passed as props. This element will systematically appear by default.
    ** If the menu item includes the 'Login' item, it will refer to the connection managed by the application and hide the Logout item.
    ** If the menu item includes the 'Logout' item, it will log out the user (functionality managed by the application) and display the 'Login' item.
    */
    function getDropdownItem(item: DropdownItem) {
        return <a
            className="dropdown-item"
            href={item.link}
            rel="noopener noreferrer"
        >
            {item.title}
        </a>
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid gap-4">
                    {configs.applicationItems &&
                        <ApplicationsMenu
                            items={configs.applicationItems}
                        />
                    }
                    <div>
                        <a
                            className="navbar-brand"
                            href="/"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="navbar-logo"
                                alt={configs.alt}
                                src={configs.logoLink}
                                style={{ width: configs.logoWidth }}
                            />
                        </a>
                    </div>

                    <button
                        id='burgerButton'
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {configs.menuItems.map((item, index) => {
                                return <div key={index}>
                                    {getMenuItem(item)}
                                </div>
                            })}

                            <div className="dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle-no-caret login-button"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {
                                        configs.authentication?.isAuthenticated() ?
                                            <span>
                                                {configs.authentication.getUserName?.()}
                                            </span>
                                            :
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                className="login-icon"
                                            />
                                    }
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end w-auto custom-dropdown"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    {
                                        configs.authentication?.isAuthenticated() &&
                                        <li key="logout">
                                            <a
                                                className="dropdown-item"
                                                rel="noopener noreferrer"
                                                onClick={() => configs.authentication?.doLogout()}
                                            >
                                                {configs.language ? configs.language('navbar.dropdown.logout') : "Log out"}
                                            </a>
                                        </li>
                                    }
                                    {
                                        configs.authentication && !configs.authentication.isAuthenticated() &&
                                        <li key="login">
                                            <a
                                                className="dropdown-item"
                                                rel="noopener noreferrer"
                                                onClick={() => configs.authentication?.doLogin()}
                                            >
                                                {configs.language ? configs.language('navbar.dropdown.login') : "Log in"}
                                            </a>
                                        </li>
                                    }
                                    {configs.dropDownItems?.map((item, index) => {
                                        return <li key={index}>
                                            {getDropdownItem(item)}
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </ul>
                    </div >
                </div >
            </nav >
        </>
    );
};

export default NavigationBar;
