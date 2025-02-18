import React from "react";
import parse, { domToReact } from "html-react-parser";
import useFetch from "./fetch";

const RenderHTML = (props) => {
    const { url, parentCallback } = props;
    const { loading, data: html, error } = useFetch(url);

    const options = {
        replace: (domNode) => {
            if (domNode.name === "main") {
                return;
            }

            if (domNode.name === "a") {
                return (
                    <a
                        href=""
                        onClick={(event) =>
                            renderLink(
                                event,
                                html,
                                domNode.attribs,
                                parentCallback
                            )
                        }
                    >
                        {domToReact(domNode.children)}
                    </a>
                );
            }

            if (["footer", "header", "script", "meta"].includes(domNode.name)) {
                return <></>;
            }
        },
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>error</p>;

    return <div>{parse(html, options)}</div>;
};

const renderLink = (event, html, attrib, parentCallback) => {
    event.preventDefault();
    const data = attrib.href;
    parentCallback(data, html);
};

export default RenderHTML;
