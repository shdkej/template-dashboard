import React, { useState, useCallback } from "react";
import { addTag } from "./fetch";

const TagManager = (props) => {
    const [data, setData] = useState("");
    const [visible, setVisible] = useState(false);
    const { selection, childCall } = props;

    const add = useCallback(
        (data, selection) => {
            addTag(data, selection);
            childCall((prev) => !prev);
            console.log("callback in tagmanager", data);
        },
        [childCall]
    );

    return (
        <div>
            {visible ? (
                <div>
                    <button onClick={() => setVisible(!visible)}>back</button>
                    <input
                        type="text"
                        value={data}
                        placeholder="Tell Me Anything"
                        onChange={(event) => setData(event.target.value)}
                    />
                    <button onClick={() => add(data, selection)}>ADD</button>
                </div>
            ) : (
                <button onClick={() => setVisible(!visible)}>
                    add request
                </button>
            )}
        </div>
    );
};

export default TagManager;
