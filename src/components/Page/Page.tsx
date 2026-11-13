// React
import React, { FunctionComponent, JSXElementConstructor, ReactElement, useEffect } from "react";
// Components
import NavigationBar, { NavigationBarConfig } from "./NavigationBar/NavigationBar";
import Main from "./Main/Main";
import Footer, { FooterProps } from "./Footer/Footer";
import Title from "../Title/Title";
// Styles
import "./Page.css";

////////////////////////////
//         Props          //
////////////////////////////

export interface PageConfiguration {
    needsLogin: boolean;
    language?: (key: string) => string;
    isAuthenticated?: () => boolean;
    doLogin?: () => void;
    navigationBarConfigs: NavigationBarConfig;
    titleKey?: string;
    pageAction?: ReactElement;
    loading?: boolean;
    children?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
    footerConfigs?: FooterProps;
}

////////////////////////////////
//           Content          //
////////////////////////////////

const Page: FunctionComponent<PageConfiguration> = (configs) => {

    if (configs.needsLogin && configs.isAuthenticated && !configs.isAuthenticated() && configs.doLogin) {
        configs.doLogin();
        return <div></div>;
    } else {
        return <div className="page">
            <NavigationBar
                {...configs.navigationBarConfigs}
                language={configs.language}
            />
            {configs.titleKey && (
              <div className="titleContainer d-flex align-items-center">
                  <Title
                    level={1}
                    content={configs.language ? configs.language(configs.titleKey) : configs.titleKey}
                  />
                  {configs.pageAction && (
                    <div className="ms-4">{configs.pageAction}</div>
                  )}
              </div>
            )}
            <Main loading={configs.loading}>
                {configs.children}
            </Main>
            <Footer {...configs.footerConfigs} />
        </div>;
    }
};

export default Page;