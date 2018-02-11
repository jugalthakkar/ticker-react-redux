import React, {Component} from 'react';
import Moment from 'react-moment';

class TickerTime extends Component {
    render() {

        return (<span className="Ticker-time"><Moment fromNow>{this.props.time}</Moment></span>);
    }
}

export default TickerTime;
