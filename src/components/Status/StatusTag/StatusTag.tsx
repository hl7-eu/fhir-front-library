//React
import React from "react";
//Style
import './StatusTag.css';
//Component
import StatusFlavor from "..";

///////////////////////////////
//        Interfaces         //
///////////////////////////////
export interface StatusTagProps {
    message: string;
    flavor: keyof typeof StatusFlavor;
}

///////////////////////////////
//        Functions          //
///////////////////////////////

/**
 * Return a tag based on the status
 * 
 * @param status 
 * 
 */
const getTagKey = (status: keyof typeof StatusFlavor) => {
    switch (status) {
        // return a Tag with a success color (--bs-success)
        case StatusFlavor.success:
            return 'success-tag';
        // return a Tag with an info color (--bs-info)
        case StatusFlavor.info:
            return 'info-tag';
        // return a Tag with an error color (--bs-danger)
        case StatusFlavor.error:
            return 'error-tag';
        // return a Tag with a warning color (--bs-warning)
        case StatusFlavor.warning:
            return 'warning-tag';
        // return a Tag with a pending color (--bs-yellow)
        case StatusFlavor.suspended:
            return 'suspended-tag';
        // return a Tag with an unknown color (--bs-secondary) if the status is not recognized
        default:
            return 'unknown-tag';
    }
};

/**
 * Return a className for the status
 * 
 * @param status 
 * 
 */
const getClassName = (status: keyof typeof StatusFlavor): string => {
    // return `status-tag ${getTagKey(status)}`;
    return `${getTagKey(status)}`;
}

  ////////////////////////////////
  //           Content          //
  ////////////////////////////////

const StatusTag: React.FC<StatusTagProps> = ({ message, flavor }) => {
    return (
        <div>
            <div className={getClassName(flavor)}>
                {message.toUpperCase()}
            </div>
        </div>
    );
};

export default StatusTag;