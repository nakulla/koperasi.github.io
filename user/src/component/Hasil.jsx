import React, {Component} from 'react';
import {Badge, Col, ListGroup, Row} from 'react-bootstrap';
import {numberWithCommas} from '../utils/Utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './ModalKeranjang';
import {API_URL} from '../utils/Constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Hasil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            keranjangDetail: null,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        };
    }

    handleShow = (menuKeranjang) => {
        this.setState(
            {showModal: true, keranjangDetail: menuKeranjang, jumlah: menuKeranjang.jumlah, keterangan: menuKeranjang.keterangan, totalHarga: menuKeranjang.total_harga}
        );
    }

    handleClose = () => {
        this.setState({showModal: false});
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandle = (event) => {
        this.setState({keterangan: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        };

        axios
            .put(API_URL + "/keranjangs/" + this.state.keranjangDetail.id, data)
            .then((res) => {
                swal({
                    title: "Update Pesanan",
                    text: data.product.nama + " Telah Di Update",
                    icon: "success",
                    button: false,
                    timer: 1500
                });
                this
                    .props
                    .handleUpdateKeranjangs();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    hapusPesanan = (id) => {

        this.handleClose();

        axios
            .delete(API_URL + "/keranjangs/" + id)
            .then((res) => {
                swal({
                    title: "Hapus Pesanan",
                    text: this.state.keranjangDetail.product.nama + " Telah Di Hapus",
                    icon: "success",
                    button: false,
                    timer: 1500
                });
                this
                    .props
                    .handleUpdateKeranjangs();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const {keranjangs} = this.props;
        return (
            <Col md={3} mt="2">
                <h4 className='fw-bold mt-3'>Hasil</h4>
                <hr/>
                <Row className='hasil'>
                    {
                        keranjangs.length !== 0 && (
                            <ListGroup variant="flush">
                                {
                                    keranjangs.map((menuKeranjang) => (
                                        <ListGroup.Item
                                            key={menuKeranjang.product.id}
                                            onClick={() => this.handleShow(menuKeranjang)}
                                            className='list-menu'>
                                            <Row>
                                                <Col xs={2}>
                                                    <h4>
                                                        <Badge pill="pill" variant="success">
                                                            {menuKeranjang.jumlah}
                                                        </Badge>
                                                    </h4>
                                                </Col>
                                                <Col>
                                                    <h5>{menuKeranjang.product.nama}</h5>
                                                    <p className='fw-bold'>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                                </Col>
                                                <Col>
                                                    <strong className='float-right'>
                                                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                                <ModalKeranjang
                                    handleClose={this.handleClose}
                                    {...this.state}
                                    tambah={this.tambah}
                                    kurang={this.kurang}
                                    changeHandle={this.changeHandle}
                                    handleSubmit={this.handleSubmit}
                                    hapusPesanan={this.hapusPesanan}/>
                            </ListGroup>
                        )
                    }
                </Row>
                <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </Col>
        );
    }
}
