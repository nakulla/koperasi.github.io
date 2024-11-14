import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../utils/Constants';
import axios from 'axios';

class TotalBayar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pemesan: ''
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_harga: totalBayar,
            pemesan: this.state.pemesan,
            menus: this.props.keranjangs
        };

        axios
            .post(API_URL + '/pesanans', pesanan)
            .then((res) => {
                if (this._isMounted) {
                    this.props.history.push('/Sukses');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    changePemesan = (event) => {
        this.setState({ pemesan: event.target.value });
    };

    render() {
        const TotalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + parseFloat(item.total_harga);
        }, 0);

        return (
            <div className="fixed-bottom">
                <Row className="">
                    <Col
                        md={{
                            span: 3,
                            offset: 9
                        }}
                        className="bayar">
                        <h5 className="mt-3">
                            Total Harga :
                            <strong className="rupiah">Rp. {numberWithCommas(TotalBayar)}</strong>
                        </h5>
                        <h5>
                            Pemesan :{' '}
                            <input
                                type="text"
                                placeholder="Nama Pemesan"
                                value={this.state.pemesan}
                                onChange={this.changePemesan}
                                className="pemesan ms-2 text-center"/>
                        </h5>
                        <Button
                            className="btn-bayar"
                            variant="primary"
                            onClick={() => this.submitTotalBayar(TotalBayar)}>
                            <FontAwesomeIcon icon={faShoppingCart} className="me-1"/>{' '}
                            <strong>BAYAR</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(TotalBayar);
