import React, { Component } from "react";
import CustomSelection from "./components/Selection";
import Search from "./components/serverSearch";
import Filter from "./components/filter";

class TemplateBoard extends Component {
    constructor() {
        super();

        this.state = {
            requestData: [],
            urls: [
                {
                    name: "workflows",
                    url: "http://localhost:8082",
                    request: [],
                },
                { name: "note", url: "http://localhost:8080", request: [] },
                {
                    name: "dict-request",
                    url: "http://localhost:8081",
                    request: [],
                },
            ],
            production: false,
            data: [],
        };
    }

    handleUpdate = (name, value) => {
        const items = this.state.urls.slice();
        const updateData = [];
        items.map((item, i) => {
            if (item.name === name) {
                item.request = value;
            }
            updateData.push(item.request);
            return item;
        });
        this.setState({ requestData: updateData });
    };

    render() {
        return (
            <div className="square-field">
                {this.state.urls.map((item, index) => (
                    <CustomSelection
                        name={item.name}
                        url={item.url}
                        key={index}
                        parentCallback={this.handleUpdate}
                    />
                ))}
                <div className="square">Most used</div>
                <div>Most recent</div>
                <div className="square">
                    <h3>stage</h3>
                    <label>
                        develop
                        <input type="checkbox" value={this.state.production} />
                    </label>
                    <label>
                        production
                        <input type="checkbox" value={this.state.production} />
                    </label>
                </div>
                <div>
                    <h3>repositories</h3>
                </div>
                <div>Total: {this.state.requestData}</div>
                <Search name={"Test"} data={this.state.requestData} />
                <Filter name={"Test"} data={this.state.requestData} />
            </div>
        );
    }
}

export default TemplateBoard;
