import React, {Component} from "react";
import { Header, Icon, Table} from 'semantic-ui-react';
import TickerName from '../components/TickerName';
import TickerPrice from '../components/TickerPrice';
import TickerHistory from "../components/TickerHistory";

class TickerTable extends Component {
    render() {
        const tickerRows = this.props.tickers.map(({name, price, previousPrice, priceHistory, updateTime}) =>
            (
                <Table.Row key={name}
                           positive={price > previousPrice}
                           negative={price < previousPrice}
                >
                    <Table.Cell textAlign="left">
                        <Header as='h2'><TickerName name={name}/></Header>
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                        <TickerPrice price={price}
                                     previousPrice={previousPrice}
                                     time={updateTime}
                        />
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                        <TickerHistory priceHistory={priceHistory}/>
                    </Table.Cell>
                </Table.Row>
            )
        );
        return (
            <Table stackable padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="left">Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="left"><Icon name="dollar"/> Price</Table.HeaderCell>
                        <Table.HeaderCell textAlign="left"><Icon name="line chart"/> History</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tickerRows}
                </Table.Body>
            </Table>
        );
    }
}

export default TickerTable