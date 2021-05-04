import React, { useState, useEffect } from "react";
import { getPopupData } from "./fetch";

const Popup = (props) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");
    const { text } = props;

    useEffect(() => {
        getPopupData(text).then((res) => setData(res));
    }, [text]);

    let yaml = data ? data.replaceAll("\n", "<br/>") : "empty";
    yaml = yaml.replaceAll(" ", "&nbsp;&nbsp;");
    return (
        <div
            role="link"
            tabIndex="0"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <p style={{ textDecorationLine: `underline` }}>{text}</p>
            <div
                role="link"
                tabIndex="0"
                onMouseDown={() => setOpen(false)}
                style={{
                    background: `#343a40`,
                    position: `absolute`,
                    zIndex: `1`,
                    marginLeft: `100px`,
                    width: `50%`,
                    textAlign: `left`,
                }}
            >
                {open ? (
                    <div dangerouslySetInnerHTML={{ __html: yaml }}></div>
                ) : null}
            </div>
        </div>
    );
};

export default Popup;
