import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                console.log(error);
            });
    }, [url]);

    return { loading, data, error };
}

export const getItem = () => {
    return axios.get("http://localhost:8080");
};

export const deleteItem = (key) => {
    const url = "http://localhost:8080/" + key;
    axios.delete(url);
};

export const getPopupData = (text) => {
    const value = text.replace(/ /g, "_");
    const url = "http://localhost:8080/" + value;
    return axios
        .get(url)
        .then((res) => {
            return res.data.TagLine;
        })
        .catch((error) => console.log(error));
};

export const addTag = (data, selection) => {
    const url = "http://localhost:8081";
    const key = data;
    axios.post(url, { Tag: selection, TagLine: key });
};

export const getRequestedTag = () => {
    //return axios.get("/request");
    return axios.get("http://localhost:8081");
};

export const getDict = () => {
    //return axios.get("/request");
    return axios.get("http://localhost:8082");
};

export const addItem = (data) => {
    const url = "http://localhost:8082";
    const today = new Date().toISOString().slice(0, 10);
    const tag = {
        Name: data,
        Tags: "default",
        UpdatedAt: today,
    };
    axios.post(url, tag);
    return tag;
};

export const updateRequestedTag = () => {
    const url = "http://localhost:8082";
    getRequestedTag()
        .then((res) => {
            return res.data.map((value) => {
                return axios.post(url + value.Tag, value.TagLine);
            });
        })
        .catch((error) => console.log(error));
};

export default useFetch;
