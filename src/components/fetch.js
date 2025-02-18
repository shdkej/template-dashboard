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
    return axios.get("/item");
};

export const deleteItem = (key) => {
    const url = "/item/" + key;
    axios.delete(url);
};

export const getPopupData = (text) => {
    const value = text.replace(/ /g, "_");
    const url = "/synonym/" + value;
    return axios
        .get(url)
        .then((res) => {
            return res.data.TagLine;
        })
        .catch((error) => console.log(error));
};

export const addTag = (data, selection) => {
    const url = "/temp/";
    const key = data;
    axios.post(url, { Tag: selection, TagLine: key });
};

export const getRequestedTag = () => {
    return axios.get("/temp/");
};

export const getDict = () => {
    return axios.get("/synonym");
};

export const deleteDict = (key) => {
    const url = "/synonym/" + key;
    axios.delete(url);
};

export const addDict = (data) => {
    const url = "/synonym";
    const today = new Date().toISOString().slice(0, 10);
    const tag = {
        name: data,
        tags: "default",
        UpdatedAt: today,
    };
    console.log("add dictionary", tag);
    axios.post(url, tag);
    return tag;
};

export const updateDict = (key, value) => {
    const url = "/synonym/" + key;
    const tag = {
        tags: value,
    };
    return axios.post(url, tag);
};

export const updateRequestedTag = () => {
    const url = "/synonym/";
    getRequestedTag()
        .then((res) => {
            return res.data.map((value) => {
                return axios.post(url + value.Tag, value.TagLine);
            });
        })
        .catch((error) => console.log(error));
};

export default useFetch;
