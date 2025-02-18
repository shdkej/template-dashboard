import React, { useState, useCallback } from "react";
import RenderHTML from "./components/renderHTML";

const SearchBoard = (props) => {
    const [url, setUrl] = useState(["https://shdkej.com/about"]);
    const [temp, setTemp] = useState(null);
    const [data, setData] = useState(["click"]);
    const [cursor, setCursor] = useState(0);

    const rerender = useCallback(
        (data, html) => {
            if (!data.includes("http")) {
                const splitedUrl = url[url.length - 1].split("/");
                data = splitedUrl.slice(0, 3) + data;
                data = data.replaceAll(",", "/");
            }
            setUrl((prev) => [...prev, data]);
            setCursor(url.length);
            setTemp((prev) => (prev ? [...prev, html] : [html]));
        },
        [url, cursor, temp]
    );

    const historyback = useCallback(
        (number) => {
            setCursor(number);
            console.log(url);
        },
        [cursor]
    );

    return (
        <>
            <h1>Search</h1>
            <div className="workflow">
                <div className="setup">
                    <div className="Condition">
                        시작점을 찾는다
                        {data}
                    </div>
                    <div className="Static">단어를 모은다</div>
                    <div className="Deploy">정보를 쌓는다</div>
                    <div className="Delivery">정리한다</div>
                    <div className="Delivery">검증한다</div>
                    <div>변증법 검증 (일반, 반증, 융합)</div>
                    <div>귀류법 검증 (이 결론이 정말 맞는가)</div>
                </div>
                <div className="board">
                    {url.map((node, index) => (
                        <button onClick={() => historyback(index)}>
                            {index}
                        </button>
                    ))}
                    <RenderHTML url={url[cursor]} parentCallback={rerender} />
                </div>
            </div>
        </>
    );
};

export default SearchBoard;
