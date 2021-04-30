import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Box from "./components/box";
import { TemplateBoard, Dictionary } from "./pages";
import Filter from "./components/filter";

class App extends Component {
    constructor() {
        super();

        this.state = {
            options: [],
            data: [],
            newData: "",
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.getList("http://localhost:8081/search")
            .then((res) => {
                this.setState({ options: res.data, loading: false });
                console.log(res);
            })
            .catch((err) => this.setState({ loading: false, error: err }));
    }

    getList = (url) => {
        return axios.get(url);
    };

    handleUpdate = (value) => {
        this.setState({ data: value });
    };

    handleSubmit = (event) => {
        const newData = event;

        this.setState((prevState) => {
            const updatedData = prevState.data.concat(newData);
            return {
                data: updatedData,
            };
        });
    };

    render() {
        const { options, loading, error } = this.state;
        if (loading) return <p>Loading ...</p>;
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
                </div>
                <h1>Template</h1>
                <Box items={options} parentCallback={this.handleUpdate} />
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
                                options={options}
                                parentCallback={this.handleUpdate}
                            />
                        )}
                    />
                    <Route
                        path="/dictionary"
                        render={(props) => (
                            <Dictionary {...props} options={options} />
                        )}
                    />
                    <Filter name={"Test"} data={options} />
                </div>
            </div>
        );
    }
}

export default App;
