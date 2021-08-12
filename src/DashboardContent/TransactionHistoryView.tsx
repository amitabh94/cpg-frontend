import React from 'react';
import { query_merchant_transactions } from "../common/GQLInterface";
import { MerchantTransactions } from "../common/Entities";

interface TransactionHistoryViewProps{
  merchant_id: number;
};

interface TransactionHistoryViewState{
  transactions: MerchantTransactions[];
};

interface TransactionProps{
  crypto_name: string;
  status: boolean;
  from_address: string;
  to_address: string;
  amount: number;
  block_number: number;
  gas_fee: number;
  transaction_hash: number;
};

export class TransactionHistoryView extends React.Component<TransactionHistoryViewProps, TransactionHistoryViewState> {
  constructor(props: TransactionHistoryViewProps) {
    super(props);
    this.state = { transactions: [] };
  };

  async componentWillMount() {
    const transactions = await query_merchant_transactions(this.props.merchant_id);
    this.setState({ transactions });
  };

  render () {
    return (
      <div>
        <table>
        <tr>
        <td>Crypto Name</td>
        <td>Status</td>
        <td>From Address</td>
        <td>To Address</td>
        <td>Amount</td>
        <td>Block Number</td>
        <td>Gas Fee</td>
        <td>Transaction Hash</td>
        </tr>
        {this.state.transactions.map((transaction) => <TransactionView key={transaction.cryptocurrency.longname}
                                     crypto_name={transaction.cryptocurrency.longname} status={Boolean(transaction.status)} from_address={transaction.fromAddress} to_address={transaction.toAddress} amount={transaction.amount} block_number={transaction.blockNumber} gas_fee={transaction.gasFee} transaction_hash={transaction.transactionHash} />) }
      </table>
      </div>
  )
  }
};

function TransactionView (props: TransactionProps) {
  return (<tr>
    <td>{props.crypto_name}</td>
    <td>{props.status}</td>
    <td>{props.from_address}</td>
    <td>{props.to_address}</td>
    <td>{props.amount}</td>
    <td>{props.block_number}</td>
    <td>{props.gas_fee}</td>
    <td>{props.transaction_hash}</td>
    </tr>)
};
