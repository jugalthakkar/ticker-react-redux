import React, {Component} from 'react';
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';

class TickerHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceHistory: []
        };
    }

    render() {
        if (this.state.priceHistory.length === 0) {
            return null;
        }
        return (
            <span className="sparkline">
                    <Sparklines data={[...this.state.priceHistory, this.props.price]} limit={10}>
                        <SparklinesLine color="#1c8cdc"/>
                        <SparklinesSpots/>
                    </Sparklines>
            </span>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time > this.props.time) {
            const lastPrice = this.props.price;
            this.setState((prevState) => {
                return {
                    priceHistory: [...prevState.priceHistory, lastPrice]
                };
            });
        }
    }
}

export default TickerHistory;