import React, { useState, useCallback } from "react";
import Checkbox from "./components/CheckBox";

const Workflows = (props) => {
    // [[workfows.contents], [], []]
    const [value, setValue] = useState([]);

    const workflows = [
        {
            name: "condition",
            contents: ["only pr", "every action", "after review"],
            state: [
                "stage:pull-request",
                "stage:every",
                "stage:pull-request\n\treview",
            ],
        },
        { name: "statics", contents: ["security", "test coverage"], state: [] },
        //{ name: "deploy", contents: ["docker", "package"], state: [] },
    ];

    const result = useCallback((items, name) => {
        var temp = [];
        console.log(items, "test");
        workflows.map((workflow, index) => {
            if (name === workflow.name) {
                return (temp[name] = items);
            }
            return workflow;
        });
        setValue(temp);
    }, []);

    return (
        <>
            <h1>Workflows</h1>
            <div className="workflow">
                <div className="setup">
                    {workflows.map((workflow, index) => (
                        <div key={index}>
                            <h3>{workflow.name}</h3>
                            <Checkbox
                                items={workflow.contents}
                                name={workflow.name}
                                parentCallback={result}
                            />
                        </div>
                    ))}
                </div>
                <div className="board">
                    <h3>preview</h3>
                    {value}
                </div>
            </div>
        </>
    );
};

export default Workflows;
