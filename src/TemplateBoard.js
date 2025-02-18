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
                    name: "synonym",
                    url: "/synonym",
                    request: [],
                },
                { name: "note", url: "http://localhost:8080", request: [] },
                {
                    name: "dict-request",
                    url: "http://localhost:8081",
                    request: [],
                },
                {
                    name: "github",
                    url: "https://api.github.com/users/shdkej/repos",
                    request: [],
                },
                {
                    name: "docker-hub",
                    url: "https://hub.docker.com/v2/repositories/shdkej/",
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
                <div>
                    <h3>repositories</h3>
                </div>
                <div>Total: {this.state.requestData}</div>
                <Search name={"Test"} data={this.state.requestData} />
            </div>
        );
    }
}

export default TemplateBoard;
