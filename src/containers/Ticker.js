import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TickerTable from "../components/TickerTable";

class Ticker extends Component {
    updateTickers(data) {
        this.setState((prevState) => {
            const tickers = [];
            JSON.parse(data).forEach(([name, price]) => {
                tickers[name] = {
                    price,
                    name: name,
                    updateTime: new Date(),
                    priceHistory: [price],
                    previousPrice: undefined
                };
                if (prevState.tickers[name]) {
                    tickers[name].previousPrice = prevState.tickers[name].price;
                    tickers[name].priceHistory = [...prevState.tickers[name].priceHistory, price];
                }
            });
            Object.entries(prevState.tickers).forEach(([name, value]) => {
                if (!tickers[name]) {
                    tickers[name] = value;
                }
            });
            return {
                counter: prevState.counter + 1,
                tickers
            };
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            tickers: {},
            counter: 0
        };
    }

    render() {
        const tickers = this.mapStateToProps(this.state).tickers;
        return (
            <Container>
                <TickerTable
                    tickers={tickers}
                />
                <Websocket url={this.props.url}
                           onMessage={this.updateTickers.bind(this)}/>
            </Container>
        );
    }

    mapStateToProps(state) {
        return {
            tickers: Object
                .keys(state.tickers)
                .sort()
                .map(key => {
                    const value = state.tickers[key];
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