import React, { useState, useCallback } from "react";

const TagManager = (props) => {
    const [data, setData] = useState("");
    const [visible, setVisible] = useState(false);
    const { selection, childCall } = props;

    const add = useCallback(
        (selection, data) => {
            childCall(selection, data);
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
                    <button onClick={() => add(selection, data)}>ADD</button>
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
