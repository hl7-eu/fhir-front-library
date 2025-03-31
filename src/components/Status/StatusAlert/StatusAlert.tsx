//React
import { ReactNode } from "react";
import React from "react";
//Component
import StatusFlavor from "../StatusFlavor";
import StatusIcon from "./StatusIcon";

export interface StatusAlertProps {
    flavor: keyof typeof StatusFlavor;
    disableIcon?: boolean;
    children?: ReactNode;
    onClick?: () => void;
}

const getAlertKey = (status: keyof typeof StatusFlavor): any | undefined => {
    switch (status) {
        // return a success alert with a green color
        case StatusFlavor.success:
            return "alert alert-success";
        // return an info alert with a blue color
        case StatusFlavor.info:
            return "alert alert-info";
        // return an error alert with a red color
        case StatusFlavor.error:
            return "alert alert-danger";
        // return a warning alert with an orange color
        case StatusFlavor.warning:
        case StatusFlavor.suspended:
            return "alert alert-warning";
        // return a default alert with a blue color if the status is not recognized
        default:
            return "alert alert-info";
    }
};

const StatusAlert = (config: StatusAlertProps) => (
    <div
        className={getAlertKey(config.flavor) + ' d-flex flex-row align-items-center gap-3'}
        role="alert"
        onClick={config.onClick}
    >
        {
            (!config.disableIcon) &&
            <div className='d-flex'>
                <StatusIcon flavor={config.flavor}/>
            </div>
        }
        <div className='d-flex'>
            {config.children}
        </div>
    </div>
);

export default StatusAlert;