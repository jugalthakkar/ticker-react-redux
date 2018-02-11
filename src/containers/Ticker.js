import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {Container, Header, Icon, Table} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TickerName from '../components/TickerName';
import TickerPrice from '../components/TickerPrice';
import TickerTime from '../components/TickerTime';
import TickerHistory from "../components/TickerHistory";


class Ticker extends Component {
    updateTickers(data) {
        this.setState((prevState) => {
            const tickers = [];
            JSON.parse(data).forEach(([name, price]) => {
                tickers[name] = {
                    price,
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
        const tickerRows = Object
            .keys(this.state.tickers)
            .sort()
            .map(key =>
                (
                    <Table.Row key={key}
                               positive={this.state.tickers[key].price > this.state.tickers[key].previousPrice}
                               negative={this.state.tickers[key].price < this.state.tickers[key].previousPrice}
                    >
                        <Table.Cell textAlign="center">
                            <Header as='h3'><TickerName name={key}/></Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <TickerPrice price={this.state.tickers[key].price}
                                         previousPrice={this.state.tickers[key].previousPrice}/>
                            <TickerTime time={this.props.updateTime}/>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                            <TickerHistory priceHistory={this.state.tickers[key].priceHistory}/>
                        </Table.Cell>
                    </Table.Row>
                )
            );
        return (

            <Container>
                <Table stackable padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center"><Icon name="dollar"/> Price</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center"><Icon name="line chart"/> History</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tickerRows}
                    </Table.Body>
                </Table>
                <Websocket url={this.props.url}
                           onMessage={this.updateTickers.bind(this)}/>
            </Container>
        );
    }
}


export default Ticker;