// React
import React, { FunctionComponent } from "react";
// Style
import "./ApplicationsMenu.css";
// Font Awesome
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ApplicationItem {
    link?: string,
    logoLink: string,
    alt?: string
}

const ApplicationsMenu: FunctionComponent<{items: ApplicationItem[]}> = (applicationItems) => {

    return (
        <div className='position-relative d-inline-block dropdown application-menu'>
            <div className="d-flex justify-content-center">
                <FontAwesomeIcon
                    className="landmark-icon"
                    icon={faLandmark}
                />
            </div>
            <div className="dropdown-content">
                <div className="d-flex flex-wrap gap-2 p-2">
                    {applicationItems.items.map((item, index) => {
                        return <React.Fragment
                            key={index}
                            
                        >
                            <a
                                href={item.link}
                                className={item.link ? 'hover-icon' : 'disabled-link'}
                            >
                                <img
                                    src={item.logoLink}
                                    alt={item.alt}
                                    className={item.link ? 'application-logo m-2' : 'application-logo disabled-logo m-2'}
                                />
                            </a>
                        </React.Fragment>
                    })}
                </div>
            </div>
        </div >
    );
}

export default ApplicationsMenu;