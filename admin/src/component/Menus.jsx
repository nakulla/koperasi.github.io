import React, {Component} from 'react';
import {Col, Button, Card, Modal, Form} from 'react-bootstrap';
import {numberWithCommas} from '../utils/Utils';
import swal from 'sweetalert';
import axios from 'axios';
import {API_URL} from '../utils/Constants';

export default class Menus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditModal: false,
            editedMenu: {
                id: props.menu.id,
                kode: props.menu.kode,
                nama: props.menu.nama,
                harga: props.menu.harga,
                is_ready: props.menu.is_ready,
                gambar: props.menu.gambar,
                deskripsi: props.menu.deskripsi,
                category: {
                    id: props.menu.category.id,
                    nama: props.menu.category.nama
                }
            }
        };
    }

    toggleEditModal = () => {
        this.setState((prevState) => ({
            showEditModal: !prevState.showEditModal
        }));
    };

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            editedMenu: {
                ...prevState.editedMenu,
                [name]: value
            }
        }));
    };

    handleEditMenu = () => {
        const {editedMenu} = this.state;

        axios
            .put(API_URL + `/products/${editedMenu.id}`, editedMenu)
            .then((response) => {
                this.setState({showEditModal: false});
                swal(
                    {title: 'Sukses', text: 'Produk berhasil diedit!', icon: 'success', timer: 1500}
                )
            })
            .catch((error) => {
                console.error('Gagal mengedit menu:', error);
            });
    };

    handleDeleteMenu = () => {
        const {editedMenu} = this.state;

        swal({
            title: "Anda yakin?",
            text: "Anda tidak akan dapat mengembalikan menu ini!",
            icon: "warning",
            buttons: [
                "Batal", "Hapus"
            ],
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(API_URL + `/products/${editedMenu.id}`)
                    .then(() => {
                        swal(
                            {title: 'Sukses', text: 'Produk berhasil dihapus!', icon: 'success', button: false, timer: 1500}
                        ).then((result) => {
                            if (result.isConfirmed) {
                                this.setState({showEditModal: false});
                            }
                        });
                    })
                    .catch((error) => {
                        console.error('Gagal menghapus menu:', error);
                    });
            }
        });
    };

    render() {
        return (
            <Col md={3} xs={6} className="card mb-4">
                <Card className="card-menu shadow">
                    <Card.Img
                        variant="top"
                        onClick={() => this.handleShowDetail(menu)}
                        src={`assets/images/${this
                            .props
                            .menu
                            .category
                            .nama
                            .toLowerCase()}/${this
                            .props
                            .menu
                            .gambar}`}/>
                    <Card.Body className="text-center">
                        <Card.Title>{this.state.editedMenu.nama}</Card.Title>
                        <Card.Text>Rp. {numberWithCommas(this.state.editedMenu.harga)}</Card.Text>
                        <div className='d-flex btn-edit-hapus'>
                            <Button
                                variant="primary"
                                onClick={this.toggleEditModal}
                                className='text-center mb-2'>
                                Edit Menu
                            </Button>
                            <Button
                                className="text-center mb-2"
                                variant="danger"
                                onClick={this.handleDeleteMenu}>
                                Hapus Menu
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Modal show={this.state.showEditModal} onHide={this.toggleEditModal}>
                    <Modal.Header closeButton="closeButton">
                        <Modal.Title>Edit Menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicKode">
                                <Form.Label>Kode</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="kode"
                                    value={this.state.editedMenu.kode}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicNama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama"
                                    value={this.state.editedMenu.nama}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicHarga">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="harga"
                                    value={this.state.editedMenu.harga}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicIsReady">
                                <Form.Check
                                    type="checkbox"
                                    name="is_ready"
                                    label="Is Ready"
                                    checked={this.state.editedMenu.is_ready}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicGambar">
                                <Form.Label>Gambar</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="gambar"
                                    value={this.state.editedMenu.gambar}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDeskripsi">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="deskripsi"
                                    value={this.state.editedMenu.deskripsi}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={this.state.editedMenu.category.nama}
                                    onChange={this.handleInputChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleEditModal}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={this.handleEditMenu}>
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        );
    }
}
