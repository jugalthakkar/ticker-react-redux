import React, {Component} from 'react';
import Websocket from 'react-websocket';
import {Header, Table} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TickerName from '../components/TickerName';
import TickerPrice from '../components/TickerPrice';
import TickerTime from '../components/TickerTime';
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';

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
                    <Table.Row key={key}>
                        <Table.Cell>
                            <Header as='h3' textAlign='center'><TickerName name={key}/></Header>
                        </Table.Cell>
                        <Table.Cell>
                            <TickerPrice price={this.state.tickers[key].price}
                                         previousPrice={this.state.tickers[key].previousPrice}/>
                            <TickerTime time={this.props.updateTime}/>
                        </Table.Cell>
                        <Table.Cell>
                            <Sparklines data={this.state.tickers[key].priceHistory} limit={10}>
                                <SparklinesLine color="#1c8cdc"/>
                                <SparklinesSpots/>
                            </Sparklines>
                        </Table.Cell>
                    </Table.Row>
                )
            );
        return (
            <div className="Ticker">
                <Table sortable stackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>History</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tickerRows}
                    </Table.Body>
                </Table>
                <Websocket url={this.props.url}
                           onMessage={this.updateTickers.bind(this)}/>
            </div>
        );
    }
}


export default Ticker;