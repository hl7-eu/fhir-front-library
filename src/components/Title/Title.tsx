//React
import React from "react";
//Style
import "./Title.css";

// Define the props type
export interface TitleProps {
    level?: number | null;
    prefix?: string | null;
    content?: string | null;
    // CSS class to override the style of the component in the application
    contentClassname?: string | null;
    prefixClassname?: string | null;
    className?: string | null;
};

// Define the type of levelClassName
type levelClassName = {
    [key: number]: string;
};

// Define the CSS class to be used for each level
const levelClassName: levelClassName = {
    1: "title1",
    2: "title2",
    3: "title3",
    4: "title4",
    5: "title5"
};

// Define the component
const Title = (props: TitleProps) => {
    const { level, prefix, content, contentClassname, prefixClassname, className } = props;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <Tag className={[levelClassName[level || 1], className].join(' ')}>
            {prefix && <span className={['prefix', prefixClassname].join(' ')}>{prefix}</span>}
            <span> </span>
            {content && <span className={['content', contentClassname].join(' ')}>{content}</span>}
        </Tag>
    );
}

export default Title;
