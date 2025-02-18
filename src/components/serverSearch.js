import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
    const [output, setOutput] = useState([]);
    const { name, data } = props;

    useEffect(() => {
        autoComplete(data, setOutput);
        console.log("effected in serverSearch", data);
    }, [data]);

    return (
        <div>
            <h3>Server Side Search for {name}</h3>
            <div>
                synonym is {output ? output.map((item) => item.Name) : "empty"}
            </div>
        </div>
    );
};

const autoComplete = (value, setOutput) => {
    value = value.toString().replaceAll(",", "%20").replaceAll("#", "");
    axios.get("http://localhost:8080/synonym/" + value).then((res) => {
        console.log(value, res.data);
        setOutput(res.data);
    });
};

export default Search;
