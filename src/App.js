import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import {
    TemplateBoard,
    Dictionary,
    Workflows,
    SearchBoard,
    TextCloud,
} from "./pages";

class App extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            error: null,
        };
    }

    handleUpdate = (value) => {
        this.setState({ data: value });
    };

    render() {
        const { data, error } = this.state;
        if (error) return <p>error</p>;

        return (
            <div>
                <div>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dictionary">Dictionary</Link>
                    </li>
                    <li>
                        <Link to="/workflow">Workflow</Link>
                    </li>
                    <li>
                        <Link to="/searchboard">SearchBoard</Link>
                    </li>
                    <li>
                        <Link to="/textcloud">TextCloud</Link>
                    </li>
                </div>
                <h1>Template</h1>
                {this.state.data.map((d, index) => {
                    if (typeof d !== "object") {
                        return <p key={index}>{d}</p>;
                    }
                    if ("name" in d) {
                        return <p key={index}>{d.name}</p>;
                    }
                    return <p key={index}>{d}</p>;
                })}
                <div>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <TemplateBoard
                                {...props}
                                parentCallback={this.handleUpdate}
                            />
                        )}
                    />
                    <Route
                        path="/dictionary"
                        render={(props) => <Dictionary />}
                    />
                    <Route path="/workflow" render={(props) => <Workflows />} />
                    <Route
                        path="/searchboard"
                        render={(props) => <SearchBoard />}
                    />
                    <Route
                        path="/textcloud"
                        render={(props) => <TextCloud />}
                    />
                </div>
            </div>
        );
    }
}

export default App;
