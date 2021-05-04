import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
    const [output, setOutput] = useState([]);
    const { name, data } = props;

    useEffect(() => {
        sss(data, setOutput);
        console.log("effected in serverSearch", data);
    }, [data]);

    return (
        <div>
            <h3>Server Side Search for {name}</h3>
            <button onClick={() => console.log("")}>search</button>
            <div>{output ? output.map((item) => item.Tag) : "empty"}</div>
        </div>
    );
};

const sss = (value, setOutput) => {
    value = value.toString().replaceAll(",", "%20").replaceAll("#", "");
    axios
        .get("http://localhost:8082/" + value)
        .then((res) => setOutput(res.data));
};

export default Search;
