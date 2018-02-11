import React, {Component} from 'react';
import Moment from 'react-moment';
import {Icon, Header} from 'semantic-ui-react';

class TickerPrice extends Component {
    render() {
        let changeClassName = 'price-same', iconName = 'minus', iconColor = 'grey';
        if (this.props.previousPrice) {
            if (this.props.price < this.props.previousPrice) {
                changeClassName = 'price-down';
                iconName = 'angle double down';
                iconColor = 'red';
            } else if (this.props.price > this.props.previousPrice) {
                changeClassName = 'price-up';
                iconName = 'angle double up';
                iconColor = 'green';
            }
        }
        return (<div className={changeClassName + " Ticker-price"}>
            <Header as='h2'>
                <Icon color={iconColor} name={iconName}/>
                <Header.Content>
                    {this.props.price.toFixed(3)}
                    <Header.Subheader>
                        <Moment fromNow>{this.props.time}</Moment>
                    </Header.Subheader>
                </Header.Content>
            </Header>
        </div>);
    }
}

export default TickerPrice;