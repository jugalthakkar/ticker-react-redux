import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

class TickerPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPrice: undefined
        };
    }

    render() {
        let changeClassName = 'price-same', iconName = 'minus', iconColor = 'grey';
        if (this.state.lastPrice) {
            if (this.props.price < this.state.lastPrice) {
                changeClassName = 'price-down';
                iconName = 'angle double down';
                iconColor = 'red';
            } else if (this.props.price > this.state.lastPrice) {
                changeClassName = 'price-up';
                iconName = 'angle double up';
                iconColor = 'green';
            }
        }
        return (<div className={changeClassName + " Ticker-price"}>
            <span className="price">{this.props.price.toFixed(3)}</span>
            <span className="symbol"><Icon color={iconColor} size='large' name={iconName}/></span>
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time > this.props.time) {
            const lastPrice = this.props.price;
            this.setState(() => {
                return {
                    lastPrice
                };
            });
        }
    }
}

export default TickerPrice;