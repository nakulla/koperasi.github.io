import React, {Component} from 'react';
import axios from 'axios';
import {
    Container,
    Accordion,
    ListGroup,
    ListGroupItem,
    Row,
    Button
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {API_URL} from '../utils/Constants';
import {numberWithCommas} from '../utils/Utils';

export default class Pesanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesanans: []
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + '/pesanans')
            .then((response) => {
                this.setState({pesanans: response.data});
            })
            .catch((error) => {
                console.error('Terjadi kesalahan saat mengambil data pesanan: ', error);
            });
    }

    handleHapusClick = (pesananId) => {
        swal({
            title: "Pesanan Ingin di Hapus?",
            text: "Pastikan Pesanan Telah di Bayar",
            icon: "warning",
            buttons: [
                "Batal", "Lunas"
            ],
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(API_URL + `/pesanans/${pesananId}`)
                    .then(() => {
                        this.setState((prevState) => ({
                            pesanans: prevState
                                .pesanans
                                .filter((pesanan) => pesanan.id !== pesananId)
                        }));
                        swal({title: 'Sukses', text: 'Pesanan Berhasil di Hapus', icon: 'success', button: false, timer: 1500});
                    })
                    .catch((error) => {
                        console.error('Terjadi kesalahan saat menghapus pesanan: ', error);
                        swal("Oops!", "Terjadi kesalahan saat menghapus pesanan.", "error");
                    });
            } else {
                swal({title: 'Batal', text: 'Penghapusan Pesanan dibatalkan', icon: 'success', button: false, timer: 1500});
            }
        });
    };

    handleButtonClick = () => {
        this
            .props
            .history
            .push("/Home");
    };

    render() {
        const {pesanans} = this.state;

        return (
            <div className='list-pesanan'>
                <Row>
                    <h1 className='text-center fw-bold'>Seluruh Pesanan</h1>
                </Row>
                <Row>
                    <Accordion className='pesanan-list'>
                        {
                            pesanans.map((pesanan, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()} className='pembeli'>
                                    <Accordion.Header>Pesanan dari {pesanan.pemesan}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Total Harga: Rp. {numberWithCommas(pesanan.total_harga)}</p>
                                        <ListGroup>
                                            {
                                                pesanan
                                                    .menus
                                                    .map((menu, menuIndex) => (
                                                        <ListGroupItem key={menuIndex}>
                                                            <div className='list-menu py-1'>
                                                                <h6 className='px-2 fw-bold'>{menu.product.nama}</h6>
                                                                <p className='px-2'>Jumlah: {menu.jumlah}</p>
                                                                <p className='px-2'>Total Harga: {menu.total_harga}</p>
                                                                {
                                                                    menu.keterangan && (
                                                                        <p className='keterangan p-2'>Keterangan: {menu.keterangan}</p>
                                                                    )
                                                                }
                                                            </div>
                                                        </ListGroupItem>
                                                    ))
                                            }
                                        </ListGroup>
                                        <Button
                                            variant='danger'
                                            className='my-3'
                                            onClick={() => this.handleHapusClick(pesanan.id)}>
                                            Lunas
                                        </Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                </Row>
                <Row className='d-flex pesanan-button'>
                    <Button
                        variant='primary'
                        className='btn-pesanan'
                        onClick={this.handleButtonClick}>
                        Home
                    </Button>
                </Row>
            </div>
        );
    }
}
