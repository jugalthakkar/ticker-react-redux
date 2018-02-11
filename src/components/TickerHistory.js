import React, {Component} from 'react';
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';

class TickerHistory extends Component {
    render() {
        return (<div
            className={"sparkline-container" + (this.props.priceHistory.length > 1 ? '' : ' hidden')}>
            <Sparklines data={this.props.priceHistory} margin={6} limit={10}>
                <SparklinesLine style={{strokeWidth: 3, stroke: "#336aff", fill: "none"}}/>
                <SparklinesSpots size={4}
                                 style={{stroke: "#336aff", strokeWidth: 3, fill: "white"}}/>
            </Sparklines>
        </div>);
    }
}

export default TickerHistory;