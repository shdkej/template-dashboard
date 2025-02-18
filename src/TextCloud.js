import React, { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import useFetch from "./components/fetch";

const width = 500,
    height = 500;

const TextCloud = (props) => {
    const [value, setValue] = useState(null);
    const handleChange = useCallback((e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => {
            setValue(e.target.result.split(" "));
        };
    });

    useEffect(() => {
        clouding(value);
        console.log("render cloud done");
    }, [value]);

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <div className="word-cloud" style={{ width: `100%` }}></div>
        </div>
    );
};

function clouding(data) {
    if (!data || data.length < 1) {
        return;
    }
    cloud()
        .size([width, height])
        .words(
            data.map((d) => {
                return { text: d };
            })
        )
        .padding(5)
        .font("Impact")
        .fontSize((d) => {
            return wordCount(data, d.text);
        })
        .on("end", draw)
        .start();
}

function draw(words) {
    d3.select(".word-cloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid white")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => {
            return d.size + "px";
        })
        .attr("transform", (d) => {
            return "translate(" + [d.x, d.y] + ")";
        })
        .text((d) => {
            return d.text;
        });
}

function wordCount(words, word) {
    let count = 10;
    const hit = words.filter((w) => {
        return w === word;
    });
    console.log(hit.length);
    return count * hit.length;
}

export default TextCloud;
