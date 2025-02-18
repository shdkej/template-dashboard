import React, { useState, useCallback, useEffect } from "react";
import TagManager from "./components/Tag";
import Popup from "./components/popup";
import Box from "./components/box";
import { useSortableData } from "./components/filter";
import useFetch, {
    getDict,
    addDict,
    updateRequestedTag,
    updateDict,
    deleteDict,
} from "./components/fetch";

const Dictionary = (props) => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState(null);
    const [temp, setTemp] = useState(null);
    const { items, requestSort } = useSortableData(options);
    const { data: data1 } = useFetch("/synonym");
    const { data: data2 } = useFetch("/temp/");

    useEffect(() => {
        /*
        getDict().then((res) => {
            setOptions(res.data);
            setTemp(res.data);
        });
        */
        const data = data1 && data2 ? aggregate(data1, data2) : "";
        setOptions(data);
    }, [data1, data2]);

    const add = useCallback((data) => {
        const tag = addDict(data);
        console.log(tag);
        setOptions((prev) => (prev ? prev.concat(tag) : [tag]));
    }, []);

    const update = useCallback(
        (selection, data) => {
            updateDict(selection, data).then(() => {
                const updateOption = options.map((original) => {
                    if (original.Name === selection) {
                        console.log(original);
                        original.Tags = data;
                    }
                    return;
                });
                setOptions(updateOption);
            });
        },
        [options]
    );

    const doDelete = useCallback((key) => {
        deleteDict(key);
        setOptions((prev) => (prev ? prev.filter((i) => i.Name !== key) : []));
    }, []);

    return (
        <div>
            <h1>단어 사전</h1>
            <Box items={temp} parentCallback={setOptions} />
            <table>
                <thead>
                    <tr>
                        {items ? (
                            Object.keys(items[0]).map((option, index) => (
                                <th key={index}>
                                    <button
                                        type="button"
                                        onClick={() => requestSort(option)}
                                    >
                                        {option}
                                    </button>
                                </th>
                            ))
                        ) : (
                            <></>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {items ? (
                        items.map((option, index) => (
                            <tr key={index}>
                                {Object.keys(option).map((key, index) => (
                                    <td key={index}>{option[key]}</td>
                                ))}
                                <td>
                                    <TagManager
                                        selection={option.Name}
                                        childCall={update}
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
            <div>
                <button onClick={updateRequestedTag}>Update File</button>
            </div>
        </div>
    );
};

const aggregate = (data1, data2) => {
    // NAME-AGE - NAME-GENDER,
    // --> NAME-AGE-GENDER
    let results = [];
    const match1 = "Name";
    const match2 = "Tag";

    if (!data2 || data2 === undefined || data2 === null || data2.length === 0) {
        return;
    }
    console.log(data2);
    const aggregateKey = data2 ? Object.keys(data2[0]) : [];

    data1.map((key1) => {
        const result = data2.filter((key2) => {
            if (key1[match1] && key1[match1] === key2[match2]) {
                let obj = {};
                Object.keys(key1).map((key) => (obj[key] = key1[key]));
                aggregateKey.map((key) => (obj[key] = key2[key]));
                results.push(obj);
                return obj;
            }
        });

        if (result.length > 0) {
            return;
        }

        aggregateKey.map((key) => (key1[key] = ""));
        results.push(key1);
    });
    return results;
};

export default Dictionary;
