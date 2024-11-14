import React, {Component} from 'react'
import {Row, Col, Container, Form, Button} from 'react-bootstrap';
import ListCategories from '../component/ListCategories';
import Menus from '../component/Menus';
import axios from 'axios';
import Hasil from '../component/Hasil';
import {API_URL} from '../utils/Constants';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            searchTerm: '',
            hasilPencarian: [],
            keranjangs: [],
            categoryYangDipilih: 'Makanan',
            showCategories: []
        };
    }

    componentDidMount() {
        this.fetchMenus();
        this.fetchKeranjangs();
    }

    fetchMenus = () => {
        const {categoryYangDipilih, searchTerm} = this.state;

        const query = searchTerm
            ? `?category.nama=${categoryYangDipilih}&q=${searchTerm}`
            : `?category.nama=${categoryYangDipilih}`;

        axios
            .get(API_URL + '/products' + query)
            .then((res) => {
                const menus = res.data;
                this.setState({menus});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    changeCategory = (category) => {
        this.setState({
            categoryYangDipilih: category,
            showCategories: true
        }, () => {
            this.fetchMenus();
        });
    };

    masukKeranjang = (value) => {
        axios
            .get(API_URL + '/keranjangs?product.id=' + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    };
                    axios
                        .post(API_URL + '/keranjangs', keranjang)
                        .then((res) => {
                            swal({
                                title: 'Masuk Ke Keranjang',
                                text: keranjang.product.nama + ' telah dipesan',
                                icon: 'success',
                                button: false,
                                timer: 1500
                            });
                            this.fetchKeranjangs();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res
                            .data[0]
                            .jumlah + 1,
                        total_harga: res
                            .data[0]
                            .total_harga + value.harga,
                        product: value
                    };

                    axios
                        .put(API_URL + '/keranjangs/' + res.data[0].id, keranjang)
                        .then((res) => {
                            swal({
                                title: 'Masuk Ke Keranjang!',
                                text: keranjang.product.nama + ' telah dipesan',
                                icon: 'success',
                                button: false,
                                timer: 1500
                            });
                            this.fetchKeranjangs();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchKeranjangs = () => {
        axios
            .get(API_URL + '/keranjangs')
            .then((res) => {
                const keranjangs = res.data;
                this.setState({keranjangs});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleSearchChange = (value) => {
        this.setState({searchTerm: value});

        this.fetchMenus();
    };


    render() {
        const {menus, categoryYangDipilih, hasilPencarian, showCategories, keranjangs} = this.state;

        const displayedMenus = hasilPencarian.length > 0
            ? hasilPencarian
            : menus;
            
        return (
            <div>
                <Container fluid={true} className='home-page'>
                    <Row>
                        {
                            showCategories && (
                                <ListCategories
                                    changeCategory={this.changeCategory}
                                    categoryYangDipilih={categoryYangDipilih}
                                    showCategories={showCategories}/>
                            )
                        }
                        <Col>
                            <h4 className='fw-bold mt-3'>Daftar Menu</h4>
                            <hr/>
                            <Form className='button-search'>
                                <Row>
                                    <Col xs='auto'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Search'
                                            className='mr-sm-2'
                                            value={this.state.searchTerm}
                                            onChange={(e) => this.handleSearchChange(e.target.value)}/>
                                    </Col>
                                    <Col xs='auto'>
                                        <Button variant='primary' onClick={this.handleSearch}>
                                            Cari
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className='home'>
                                {
                                    displayedMenus.map((menu, index) => (
                                        <Menus key={menu.id + index} menu={menu} masukKeranjang={this.masukKeranjang}/>
                                    ))
                                }
                            </Row>
                        </Col>
                        <Hasil keranjangs={keranjangs} handleUpdateKeranjangs={this.fetchKeranjangs}/>
                    </Row>
                </Container>
            </div>
        )
    }
}
