import React, { useState, useCallback } from "react";
import TagManager from "./Tag";
import useFetch from "./fetch";

const CustomSelection = (props) => {
    const [data, setData] = useState([]);
    const { url, parentCallback } = props;
    const { loading, data: options, error } = useFetch(url);

    const handleSelectChange = useCallback(
        (event) => {
            const value = [...event.target.selectedOptions].map(
                (option) => option.value
            );
            setData(value);
            parentCallback(props.name, value);
        },
        [setData, parentCallback, props.name]
    );

    const renderOutput = useCallback(
        (items) => {
            return items.map((item, index) => (
                <span key={index}>
                    {item}
                    <button
                        type="button"
                        onClick={() =>
                            setData((prev) => prev.filter((i) => i !== item))
                        }
                    >
                        x
                    </button>
                </span>
            ));
        },
        [setData]
    );

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>error</p>;
    if (typeof options !== "object" || !options) {
        return <div>nothing</div>;
    }

    return (
        <div>
            <div>
                <h3>
                    {props.name} {options.length}
                </h3>
                <select
                    multiple={true}
                    onChange={(event) => handleSelectChange(event)}
                >
                    {options[0].hasOwnProperty("Tag")
                        ? options.map((item, index) =>
                              renderInput(index, item.Tag)
                          )
                        : options.map((item, index) =>
                              renderInput(index, item)
                          )}
                </select>
            </div>

            <TagManager selection={props.name} />

            <div>{data.length > 0 ? renderOutput(data) : ""}</div>
        </div>
    );
};

const renderInput = (i, input) => {
    return (
        <option key={i} value={input}>
            {input}
        </option>
    );
};

export default CustomSelection;
