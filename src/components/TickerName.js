import React,{Component} from "react";

class TickerName extends Component {
    render() {
        return (<span className="Ticker-name">{this.props.name.toUpperCase()}</span>);
    }
}

export default TickerName