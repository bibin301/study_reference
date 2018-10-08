

import React from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import Modal from 'react-modal';
import Notifications, { notify } from 'react-notify-toast';
import Idle from 'react-idle';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import '../../constant/nicescroll.js';

import '../../../public/assets/css/loader.css';
import Sidebar from '../../common/Sidebar.jsx';
import Footer from '../../common/Footer.jsx';
import Header from '../../common/Header.jsx';
import { API_BASE_URL, REFERRAL_URL } from '../../constant/constant.js';
import CommonService from '../../service/Commonservice';

import user from '../../../public/images/user-2.png';

import give_money from '../../../public/images/give-money.png';
import dollar from '../../../public/images/dollar-symbol-on-poker-piece copy.png';
import dashbalance from '../../../public/images/dashbalance.png';
import dollarsymbol from '../../../public/images/dollar-symbol-on-poker-piece copy.png';

import AdminSidebar from '../../common/AdminSidebar';



import '../../../public/assets/css/reset.css';
import '../../../public/assets/css/font.css';
import '../../../public/assets/css/style.css';
import '../../../public/assets/css/font-awesome.css';
import '../../../public/assets/css/responsive.css';
import '../../../public/assets/css/animate.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '500px',
        transform: 'translate(-50%, -50%)'
    }
};
class Admindashboard extends React.Component {
    constructor(props) {
        super(props);
        let sessionData = JSON.parse(sessionStorage.getItem('userData'));
        this.state = {
            fromsession: sessionData,
            sessionId: '',
            etcBalance: '',
            ethBalance: '',
            toAddress: '',
            amount: '',
            errorResponse: '',
            successResponse: '',
            loading: false,
            userInfo: '',
            errors: {},
            numberOfCoins: '',
            adminWalletAddress: '',
            btcCoinDetails: '',
            etherPassword: ''
        };
        this.handleOnchengeField = this.handleOnchengeField.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.openTransfer = this.openTransfer.bind(this);
        this.closeTransfer = this.closeTransfer.bind(this);
        this.confirmTransfer = this.confirmTransfer.bind(this);
        if (sessionStorage.getItem('userData') == null) {
            props.history.push('/login');
        }
    }

    openTransfer() {
        this.setState({ modalIsOpen: true });
    }

    closeTransfer() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        if (sessionStorage.getItem('userData') != null) {
            const userSession = JSON.parse(sessionStorage.getItem('userData'));
            this.setState({ userInfo: userSession });
            this.getBtcBalance(userSession.sessionId);
            this.getetherBalance(userSession.sessionId);
            this.getbitCoinBalance(userSession.sessionId);
        }
    }

    handleOnchengeField(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    getBtcBalance(value) {
        let set = this;
        var apiBaseUrl = API_BASE_URL + "token/balance";
        set.setState({ loading: true });
        let token = {
            "sessionId": value
        }
        axios.post(apiBaseUrl, token)
            .then(response => {
                if (response.status == 200) {
                    this.setState({ btcCoinDetails: response.data.TokenBalanceInfo });
                    set.setState({ loading: false });
                }
                else {
                    set.setState({ loading: false });
                    if (response.data.message === 'Session expired!') {
                        sessionStorage.removeItem('userData');
                        this.props.history.push('/login');
                        let myColor = { background: 'red', text: "#FFFFFF" };
                        notify.show(response.data.message, "custom", 5000, myColor);
                    }
                    set.setState({ errorResponse: response.data.message });
                    setTimeout(() => set.setState({ errorResponse: '' }), 5000);
                }
            })
    }
    getetherBalance(value) {
        let set = this;
        var apiBaseUrl = API_BASE_URL + "ether/balance";
        set.setState({ loading: true });
        let token = {
            "sessionId": value
        }
        axios.post(apiBaseUrl, token)
            .then(response => {
                if (response.status == 200) {
                    this.setState({ ethBalance: response.data.etherBalanceInfo });
                    set.setState({ loading: false });
                }
                else {
                    set.setState({ loading: false });
                    if (response.data.message === 'Session expired!') {
                        sessionStorage.removeItem('userData');
                        this.props.history.push('/login');
                        let myColor = { background: 'red', text: "#FFFFFF" };
                        notify.show(response.data.message, "custom", 5000, myColor);
                    }
                    set.setState({ errorResponse: response.data.message });
                    setTimeout(() => set.setState({ errorResponse: '' }), 5000);
                }
            })
    }


    getbitCoinBalance(value) {
        let set = this;
        var apiBaseUrl = API_BASE_URL + "bitcoin/balance";
        set.setState({ loading: true });
        let token = {
            "sessionId": value

        }
        axios.post(apiBaseUrl, token)
            .then(response => {
                if (response.status == 200) {
                    this.setState({ etcBalance: response.data.bitcoinBalanceInfo });
                    set.setState({ loading: false });
                }
                else {
                    set.setState({ loading: false });
                    if (response.data.message === 'Session expired!') {
                        sessionStorage.removeItem('userData');
                        this.props.history.push('/login');
                        let myColor = { background: 'red', text: "#FFFFFF" };
                        notify.show(response.data.message, "custom", 5000, myColor);
                    }
                    set.setState({ errorResponse: response.data.message });
                    setTimeout(() => set.setState({ errorResponse: '' }), 5000);
                }
            })
    }


    handleCopy() {
        let myColor = { background: 'blue', text: "#FFFFFF" };
        notify.show("Copied Successfully!", "custom", 1000, myColor);
    }


    validateField(data) {
        const errors = {};
        if (validator.isEmpty(data.toAddress)) {
            errors.toAddress = "Please Enter the Wallet Address"
        } else {
            errors.toAddress = ''
        }

        if (validator.isEmpty(data.amount)) {
            errors.amount = "Please enter the Number of Tokens"
        } else {
            errors.amount = ''
        }
        if (!validator.isDecimal(data.amount)) {
            errors.amount = 'Please Enter Valid Tokens'
        }


        if (!validator.isDecimal(data.amount)) {
            errors.amount = 'Please Enter Valid Tokens'
        }
        return errors;
    }


    handleChange(event) {
        event.preventDefault();

        let errors = {}
        if (event.target.name === "etherPassword") {
            if (!validator.isLength(event.target.value, 6, 25)) {
                errors.etherPassword = 'Length Should be 6-25 Characters';
            }
        }
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ errors });
    }

    handleClick(event) {
        event.preventDefault();
        const props = this.props;
        let payload = {
            "sessionId": this.state.fromsession.sessionId,
            "toAddress": this.state.toAddress,
            "amount": this.state.amount

        }
        let errors = this.validateField(payload);
        if (errors.toAddress == '' && errors.amount == '') {
            this.openTransfer();
            // this.serviceHandler(payload);
        }
        else {
            this.setState({ errors });
            setTimeout(() => this.setState({ errors: '' }), 5000);
        }
    }

    confirmTransfer() {
        event.preventDefault();
        let set = this;
        set.setState({ loading: true });
        var apiBaseUrl = API_BASE_URL + "token/transfer";
        let serverData = {
            "sessionId": this.state.fromsession.sessionId,
            "toAddress": this.state.toAddress,
            "amount": this.state.amount,
            "etherWalletPassword": this.state.etherPassword
        }

        let props = this.props;
        axios.post(apiBaseUrl, serverData)
            .then(response => {
                if (response.data.status == "Success") {
                    this.setState({ modalIsOpen: false });
                    set.setState({ toAddress: '', amount: '', etherPassword: '' })
                    notify.show(response.data.message, 'success');
                    set.setState({ loading: false });
                } else if (response.data.status == "Failure") {
                    set.setState({ loading: false });
                    notify.show(response.data.message, 'error');
                    set.setState({ errorResponse: response.data.message });
                    setTimeout(() => set.setState({ errorResponse: '' }), 500);
                }
            })
            .catch(function (error) {
                set.setState({ loading: false });
                set.setState({ errorResponse: error.message });
                setTimeout(() => set.setState({ errorResponse: '' }), 500);
            });
    }

    render() {
        return (
            <div className="wrapper">
                <Notifications />
                {this.state.userInfo &&
                    <Idle
                        timeout={180000}
                        onChange={({ idle }) => {
                            if (idle) {
                                CommonService.handleIdleTimeout(this.props)
                            }
                        }} />
                }
                {this.state.loading &&
                    <div className="loader-bgclr">
                        <div id="cssload-loader">
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                        </div>
                    </div>
                }
                <AdminSidebar />
                <div className="main-panel">
                    <Header propsdata={this.props} />
                    <section id="main-content">
                        <section className="wrapper">
                            <div className="dashboard-title">
                                <h1>Admin Dashboard</h1>
                            </div>
                            <div className="admin-list-box">
                                <div className="container-fluid">
                                    <div className="col-md-12 col-xs-12 col-sm-12 ttc-wallet-padd">
                                        <div className="menchor-wallet-address">
                                            <p>
                                                <span className="address-strip">ether Wallet  Address  </span>
                                                &nbsp; {this.state.fromsession.etherWalletAddress}
                                            </p>

                                        </div>
                                        <div className="menchor-wallet-address">
                                            <p>
                                                <span className="address-strip">bitcoin Wallet Receiving Address</span>
                                                &nbsp;{this.state.fromsession.bitcoinWalletReceivingAddress}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-pink">

                                                    <h2 className="counter">{this.state.btcCoinDetails.tokenBalance}</h2>
                                                    <div className="visit-list">TTCoin</div>
                                                    <div className="dashboard-icon" >
                                                        <img src={user} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-purple">
                                                    <div className="dashboard-icon">
                                                        <img src={give_money} />
                                                    </div>
                                                    <h2 className="counter">{this.state.fromsession.totalTokens}</h2>
                                                    <div className="visit-list">Total TTC</div>
                                                    <div className="dashboard-icon">
                                                        <img src={give_money} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-success">

                                                    <h2 className="counter">{this.state.fromsession.soldTokens}</h2>
                                                    <div className="visit-list">Sold TTC</div>
                                                    <div className="dashboard-icon">

                                                        <img src={dollar} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-blue">
                                                    <h2 className="counter">0</h2>
                                                    <div className="visit-list">DASH Balance</div>
                                                    <div className="dashboard-icon">
                                                        <img src={dashbalance} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-orange">
                                                    <h2 className="counter">{this.state.fromsession.freezedTokens}</h2>
                                                    <div className="visit-list">Freezed</div>
                                                    <div className="dashboard-icon">
                                                        <img src={dollarsymbol} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-orange">
                                                    <h2 className="counter">{this.state.etcBalance.bitcoinBalance}</h2>
                                                    <div className="visit-list">BTC Balance</div>
                                                    <div className="dashboard-icon">
                                                        <img src={dollarsymbol} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-orange">
                                                    <h2 className="counter">0</h2>
                                                    <div className="visit-list">LTC Balance</div>
                                                    <div className="dashboard-icon">
                                                        <img src={dollarsymbol} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="list-box-4 animated hiding" data-animation="zoomIn">
                                                <div className="widget-panel bg-orange">


                                                    <h2 className="counter">{this.state.ethBalance.etherBalance}</h2>
                                                    <div className="visit-list">ETH Balance</div>
                                                    <div className="dashboard-icon">
                                                        <img src={dollarsymbol} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="coin-transfer">
                                <div className="container-fluid">
                                    <div className="col-md-6 col-sm-6 col-xs-6 coin-transfer-padd">
                                        <div className="transaction-title">
                                            <h1>Coin Transfer</h1>
                                        </div>
                                        <div className="coin-transfer-wrap">
                                            <form className="adjust_padding">
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="control-label"> Wallet Address</label>

                                                    <input name="wallet-address" value={this.state.toAddress} placeholder="Wallet Address" type="text" name='toAddress' onChange={this.handleChange} className="form-control" />
                                                    {this.state.errors.toAddress &&
                                                        <div style={{ color: 'red', paddingTop: '5px' }}>{this.state.errors.toAddress}</div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="control-label"> Number of Tokens</label>

                                                    <input name="wallet-address" placeholder="Number of Coins" value={this.state.amount} type="text" name='amount' onChange={this.handleChange} className="form-control" />
                                                    {this.state.errors.amount &&
                                                        <div style={{ color: 'red', paddingTop: '5px' }}>{this.state.errors.amount}</div>
                                                    }
                                                </div>
                                                {
                                                    this.state.errorResponse &&
                                                    <div className="" style={{ color: 'red' }}><h6 className="login-msg-h6"><b>{this.state.errorResponse}</b></h6>
                                                    </div>
                                                }

                                                {
                                                    this.state.successResponse &&
                                                    <div className="" style={{ color: 'green' }}><h6 className="login-msg-h6"><b>{this.state.successResponse}</b></h6>
                                                    </div>
                                                }

                                                <div className="form-group send-btn-bttm">
                                                    <button type="button" className="btn btn-send" onClick={this.handleClick}>Send</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>



                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.modalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h4 style={{ fontWeight: '600', textTransform: 'uppercase' }}>Ether Wallet Password</h4>
                    <div style={{ textAlign: 'right', top: '5px', right: '7px', position: 'absolute' }}><img src="public/images/cancel.png" style={{ cursor: 'pointer', width: '60%' }} onClick={this.closeTransfer} /></div>
                    <div style={{ borderBottom: '1px solid #d7d7d7' }}></div>
                    <form >

                        <div className="form-group reset-ps">
                            <input name="etherPassword" placeholder="Ether Wallet Password" value={this.state.etherPassword} type="password" onChange={this.handleChange} />
                            {this.state.errors.etherPassword &&
                                <div style={{ color: 'red', paddingTop: '5px' }}>{this.state.errors.etherPassword}</div>
                            }
                        </div>


                    </form>
                    <div className="center-bttn text-center">
                        <button type="button" onClick={this.confirmTransfer} style={{ background: '#66bb6a', fontSize: '16px', marginRight: '18px', textTransform: 'uppercase', border: 'none', padding: '7px 20px', borderRadius: '0px' }} className="btn btn-default" ><b style={{ color: 'white' }}> Confirm</b></button>
                    </div>
                </Modal>
                <Footer />
            </div>
        );
    }
}

export default Admindashboard;




