import React, { useState, useCallback } from "react";
import TagManager from "./components/Tag";
import Popup from "./components/popup";
import { useSortableData } from "./components/filter";
import { addItem, updateRequestedTag, deleteItem } from "./components/fetch";

const Dictionary = (props) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState(props.options);
    const { items, requestSort } = useSortableData(options);

    const add = useCallback((data) => {
        const tag = addItem(data);
        setOptions((prev) => (prev ? prev.concat(tag) : [tag]));
    }, []);

    const doDelete = useCallback((key) => {
        deleteItem(key);
        setOptions((prev) => (prev ? prev.filter((i) => i.Tag !== key) : []));
    }, []);

    return (
        <div>
            <h1>단어 사전</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("Tag")}
                            >
                                key
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("TagLine")}
                            >
                                key
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("UpdatedAt")}
                            >
                                key
                            </button>
                        </th>
                        <th>requested</th>
                    </tr>
                </thead>
                <tbody>
                    {items ? (
                        items.map((option, index) => (
                            <tr key={index}>
                                <td>
                                    <Popup text={option.Tag} />
                                </td>
                                <td>{option.TagLine}</td>
                                <td>{option.CreatedAt}</td>
                                <td>
                                    <TagManager selection={option.Tag} />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => doDelete(option.Tag)}
                                    >
                                        x
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>Empty Options</p>
                    )}
                </tbody>
            </table>
            <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={() => add(value)}>ADD New Item</button>
            <button onClick={updateRequestedTag}>Update File</button>
        </div>
    );
};

export default Dictionary;
