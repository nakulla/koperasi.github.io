import React, {Component} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import {API_URL} from '../utils/Constants';

class TambahMenu extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false, 
            product: {
                kode: '',
                nama: '',
                harga: 0,
                is_ready: true,
                gambar: '',
                deskripsi: '',
                category: {
                    id: 1,
                    nama: 'Makanan'
                }
            },
            categories: []
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + '/categories')
            .then((response) => {
                this.setState({categories: response.data});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                [name]: value
            }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(API_URL + '/products', this.state.product)
            .then((response) => {
                console.log(response.data);
                swal({
                    title: 'Sukses',
                    text: 'Produk berhasil ditambahkan!',
                    icon: 'success',
                    button: false,
                    timer: 1500,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.handleCloseModal(); 
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                swal({
                    title: 'Error',
                    text: 'Produk gagal ditambahkan!',
                    icon: 'error',
                    button: false,
                    timer: 1500,
                })
            });
    };

    handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                category: {
                    id: categoryId,
                    nama: this.getCategoryNameById(categoryId)
                }
            }
        }));
    };

    getCategoryNameById = (categoryId) => {
        const category = this
            .state
            .categories
            .find(cat => cat.id === parseInt(categoryId, 10));
        return category
            ? category.nama
            : '';
    };

    handleShowModal = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShowModal}>
                    Tambah Menu
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton="closeButton">
                        <Modal.Title>Tambah Menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="kode">
                                <Form.Label>Kode</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="kode"
                                    value={this.state.product.kode}
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama"
                                    value={this.state.product.nama}
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="harga">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="harga"
                                    value={this.state.product.harga}
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="gambar">
                                <Form.Label>Gambar</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="gambar"
                                    value={this.state.product.gambar}
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="deskripsi">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="deskripsi"
                                    value={this.state.product.deskripsi}
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category" onChange={this.handleCategoryChange}>
                                    {
                                        this
                                            .state
                                            .categories
                                            .map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.nama}
                                                </option>
                                            ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button variant="secondary"  className='mt-3' onClick={this.handleCloseModal}>
                                Batal
                            </Button>
                            <Button variant="primary" type="submit" className='ms-2 mt-3' onClick={this.handleCloseModal}>
                                Tambah Produk
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default TambahMenu;