import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {numberWithCommas} from '../utils/Utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandle,
    handleSubmit,
    totalHarga,
    hapusPesanan,
}) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose} className='modal-keranjang'>
                <Modal.Header closeButton="closeButton">
                    <Modal.Title>
                        {keranjangDetail.product.nama}{' '}
                        <strong>(Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="totalHarga">
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>Rp. {numberWithCommas(totalHarga)}</strong>
                            </p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="jumlah">
                            <Form.Label>Jumlah</Form.Label>
                            <br/>
                            <Button variant="primary" size="sm" className="me-2" onClick={kurang}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button variant="primary" size="sm" className="ms-2" onClick={tambah}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="keterangan">
                            <Form.Label>Tambahkan Keterangan :</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh : Pedes, Nasinya Setengah"
                                value={keterangan}
                                onChange={(event) => changeHandle(event)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} className="me-1"/>
                        Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton="closeButton">
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default ModalKeranjang;