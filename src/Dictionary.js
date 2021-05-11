import React, { useState, useCallback, useEffect } from "react";
import TagManager from "./components/Tag";
import Popup from "./components/popup";
import { useSortableData } from "./components/filter";
import {
    getDict,
    addItem,
    updateRequestedTag,
    deleteDict,
    getRequestedTag,
} from "./components/fetch";

const Dictionary = (props) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState(null);
    const [request, setRequest] = useState(null);
    const [child, setChild] = useState(true);
    const { items, requestSort } = useSortableData(options);

    useEffect(() => {
        getDict().then((res) => {
            setOptions(res.data);
        });
    }, []);

    const add = useCallback((data) => {
        const tag = addItem(data);
        setOptions((prev) => (prev ? prev.concat(tag) : [tag]));
    }, []);

    const doDelete = useCallback((key) => {
        deleteDict(key);
        setOptions((prev) => (prev ? prev.filter((i) => i.Name !== key) : []));
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
                                onClick={() => requestSort("Name")}
                            >
                                Name
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("Tags")}
                            >
                                Tags
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => requestSort("UpdatedAt")}
                            >
                                Updated
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
                                    <Popup text={option.Name} />
                                </td>
                                <td>{option.Tags}</td>
                                <td>{option.UpdatedAt}</td>
                                <td>{option.requestTags}</td>
                                <td>
                                    <TagManager
                                        selection={option.Name}
                                        childCall={setChild}
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => doDelete(option.Name)}
                                    >
                                        x
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Empty Options</td>
                        </tr>
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
