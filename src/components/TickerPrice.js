import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css'
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';
import FontAwesome from 'react-fontawesome';

class TickerPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPrice: undefined,
            priceHistory: []
        };
    }

    render() {
        let changeClassName = 'price-same', iconName = 'minus';
        if (this.state.lastPrice) {
            if (this.props.price < this.state.lastPrice) {
                changeClassName = 'price-down';
                iconName = 'angle-double-down';
            } else if (this.props.price > this.state.lastPrice) {
                changeClassName = 'price-up';
                iconName = 'angle-double-up';
            }
        }
        return (<div className={changeClassName + " Ticker-price"}>
            <span className="price">{this.props.price.toFixed(3)}</span>
            <span className="symbol"><FontAwesome name={iconName}/></span>
            <span className={"sparkline " + (this.state.priceHistory.length > 0 ? '' : 'hidden')}>
                    <Sparklines data={[...this.state.priceHistory, this.props.price]} limit={10}>
                    <SparklinesLine color="#1c8cdc"/>
                    <SparklinesSpots/>
                    </Sparklines>
            </span>
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time > this.props.time) {
            const lastPrice = this.props.price;
            this.setState((prevState, props) => {
                return {
                    priceHistory: [...prevState.priceHistory, lastPrice],
                    lastPrice
                };
            });
        }
    }
}

export default TickerPrice;