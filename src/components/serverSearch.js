import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        sss(value, setData);
        console.log(data);
    }, [value]);

    return (
        <div>
            <h3>Server Side Search</h3>
            <input
                type="text"
                name="ss-search"
                value={value}
                placeholder="Server Side Search"
                onChange={(event) => setValue(event.target.value)}
            />
            <div>{data ? data.map((item) => item.Tag) : "empty"}</div>
        </div>
    );
};

const sss = (value, setData) => {
    axios
        .get("http://localhost:8081/search/" + value)
        .then((res) => setData(res.data));
};

export default Search;
