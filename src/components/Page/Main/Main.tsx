//React
import React, { FunctionComponent, JSXElementConstructor, ReactElement } from "react";
//Component
import Loader from "../../Loader/Loader";
//Style
import "./Main.css";

const Main: FunctionComponent<{ children?: ReactElement<any, string | JSXElementConstructor<any>> | undefined; loading?: boolean; }> = (props) => {

    return <div className="main">
        {props.loading ?
            <>
                <Loader />
            </> :
            <div style={{width: "100%"}}>
                {props.children}
            </div>
        }
    </div>;
};

export default Main;