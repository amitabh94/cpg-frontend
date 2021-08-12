import React from 'react';
import { query_merchant_wallets } from "../common/GQLInterface";
import { MerchantWallets } from "../common/Entities";
import { QRCode } from 'react-qrcode-logo';

interface WalletsViewProps{
  merchant_id: number;
};

interface WalletsViewState{
  wallets: MerchantWallets[];
};

interface WalletViewProps{
  crypto_name: string;
  valid_balance: number;
  unvalid_balance: number;
  public_address: string;
};

export class WalletsView extends React.Component<WalletsViewProps, WalletsViewState> {
  constructor(props: WalletsViewProps) {
    super(props);
    this.state = { wallets: [] };
  };

  async componentWillMount() {
    const wallets = await query_merchant_wallets(this.props.merchant_id);
    this.setState({ wallets });
  };

  render () {
    return (
      <div>
        <table>
        <tr>
        <td>Crypto Name</td>
        <td>Valid Balance</td>
        <td>Unvalid Balance</td>
        <td>Public Address</td>
        </tr>
        {this.state.wallets.map((wallet) => <WalletView key={wallet.cryptocurrency.longname} crypto_name={wallet.cryptocurrency.longname} valid_balance={wallet.validatedBalance} unvalid_balance={wallet.unvalidatedBalance} public_address={wallet.publicAddress} />) }
      </table>
      </div>
  )
  }
};

function WalletView (props: WalletViewProps) {
  return (<tr>
    <td>{props.crypto_name}</td>
    <td>{props.valid_balance}</td>
    <td>{props.unvalid_balance}</td>
    <td> <QRCode value={props.public_address} /> </td>
    </tr>)
};
