import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TickerTable from "../components/TickerTable";

class Ticker extends Component {


    dispatch(action) {
        this.setState((prevState) => {
            return this.reduce(prevState, action);
        });
    }

    reduce(prevState = {}, action) {
        if (action.type === 'UPDATE') {
            const nextState = {};
            action.data.forEach(([name, price]) => {
                nextState[name] = {
                    price,
                    name,
                    updateTime: new Date(),
                    priceHistory: [price],
                    previousPrice: undefined
                };
                if (prevState && prevState[name]) {
                    nextState[name].previousPrice = prevState[name].price;
                    nextState[name].priceHistory = [...prevState[name].priceHistory, price];
                }
            });
            Object.entries(prevState).forEach(([name, value]) => {
                if (!nextState[name]) {
                    nextState[name] = value;
                }
            });
            return nextState;
        } else {
            return prevState;
        }

    }

    handleMessage(data) {
        const action = {
            type: 'UPDATE',
            data: JSON.parse(data)
        };
        this.dispatch(action);
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const tickers = this.mapStateToProps(this.state).tickers;
        return (
            <Container>
                <TickerTable
                    tickers={tickers}
                />
                <Websocket url={this.props.url}
                           onMessage={this.handleMessage.bind(this)}/>
            </Container>
        );
    }

    mapStateToProps(state) {
        return {
            tickers: Object
                .keys(state)
                .sort()
                .map(key => {
                    const value = state[key];
                    return {
                        name: value.name,
                        price: value.price,
                        previousPrice: value.previousPrice,
                        priceHistory: value.priceHistory,
                        updateTime: value.updateTime
                    };
                })
        }
    }
}


export default Ticker;