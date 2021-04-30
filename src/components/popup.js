import React from "react";
import { getPopupData } from "./fetch";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: "",
        };
    }

    componentDidMount() {
        const text = this.props.text;
        getPopupData(text).then((res) => this.setState({ data: res }));
    }

    onPopup = () => {
        this.setState({
            open: true,
        });
    };

    offPopup = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const text = this.state.data;
        let yaml = text.replaceAll("\n", "<br/>");
        yaml = yaml.replaceAll(" ", "&nbsp;&nbsp;");
        return (
            <div
                role="link"
                tabIndex="0"
                onMouseEnter={() => this.onPopup()}
                onMouseLeave={() => this.offPopup()}
            >
                <p style={{ textDecorationLine: `underline` }}>
                    {this.props.text}
                </p>
                <div
                    role="link"
                    tabIndex="0"
                    onMouseDown={() => this.offPopup()}
                    style={{
                        background: `#343a40`,
                        position: `absolute`,
                        zIndex: `1`,
                        marginLeft: `100px`,
                        width: `50%`,
                        textAlign: `left`,
                    }}
                >
                    {this.state.open ? (
                        <div dangerouslySetInnerHTML={{ __html: yaml }}></div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Popup;
