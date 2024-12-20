//Fontawesome
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//React
import React from "react";
//Component
import StatusFlavor from "../../StatusFlavor";

export interface StatusIconProps {
    flavor: keyof typeof StatusFlavor;
}

const getIconKey = (status: keyof typeof StatusFlavor): any | undefined => {
    switch (status) {
        // return a success icon with a check in a circle
        case StatusFlavor.success:
            return faCircleCheck;
        // return an info icon with an 'i' in a circle
        case StatusFlavor.info:
            return faCircleInfo;
        // return an error icon with an 'x' in a circle
        case StatusFlavor.error:
            return faCircleXmark;
        // return a warning icon with a triangle in a circle
        case StatusFlavor.warning:
            return faTriangleExclamation;
        // return a suspended icon with a clock in a circle
        case StatusFlavor.suspended:
            return faClock;
        // return an unknown icon with a question mark in a circle if the status is not recognized
        default:
            return faQuestionCircle;
    }
};

const StatusIcon = ({ flavor }: StatusIconProps): JSX.Element => (
    <FontAwesomeIcon icon={getIconKey(flavor)} />
);

export default StatusIcon;