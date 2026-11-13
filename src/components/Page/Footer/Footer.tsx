// React
import React, { FunctionComponent } from "react";
// Style
import "./Footer.css";

////////////////////////////////
//            Props           //
////////////////////////////////

interface FooterItem {
    label: string;
    link: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
}

interface FooterImplementationGuide {
    label?: string;
    link: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    visible?: boolean;
}

export interface FooterProps {
    languages?: LanguagesProps;
    logo?: {
        logoLink: string;
        link?: string;
        alt: string;
    }[] | undefined;
    items?: FooterItem[];
    implementationGuide?: FooterImplementationGuide;
}

interface LanguagesProps {
    default: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

interface Option {
    label: string;
    value: string;
}

////////////////////////////////
//           Content          //
////////////////////////////////

const Footer: FunctionComponent<FooterProps> = ({
    languages,
    logo,
    items,
    implementationGuide,
}) => {
    const displayedItems: FooterItem[] = [
        ...(items ?? []),
        ...(implementationGuide && implementationGuide.visible !== false
            ? [
                {
                    label: implementationGuide.label ?? "Implementation Guide",
                    link: implementationGuide.link,
                    target: implementationGuide.target,
                    rel: implementationGuide.rel ?? "noopener noreferrer",
                },
            ]
            : []),
    ];

    return (
        <footer
            className="w-100 d-flex justify-content-between align-items-center px-3 px-md-5 py-4"
        >
            {logo && logo.length > 0 &&
                <div className="side-container d-flex justify-content-center">
                    <a
                        rel="noopener noreferrer"
                        href={logo[0].link ? logo[0].link : ""}
                    >
                        {logo.map((item, index) => (
                            <img className="footer-logo"
                                key={index}
                                src={item.logoLink}
                                alt={item.alt}
                            />
                        ))}
                    </a>
                </div>
            }

            {displayedItems.length > 0 &&
                <div className="d-flex align-items-center gap-2 flex-md-row flex-column">
                    {displayedItems.map((item, index) => (
                        <a
                            className="items"
                            key={index}
                            href={item.link}
                            target={item.target}
                            rel={item.rel}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            }

            {languages &&
                <div className="side-container d-flex justify-content-center">
                    <select
                        className="form-select w-auto"
                        defaultValue={languages.default}
                        onChange={languages.onChange}
                    >
                        {languages.options.map((option, index) => (
                            <option
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </footer>
    );
};

export default Footer;