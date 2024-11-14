import React from 'react';
import {Modal, Button, Card} from 'react-bootstrap';
import {numberWithCommas} from '../utils/Utils';

const DetailMenu = ({selectedMenu, show, close, masukKeranjang}) => {
    const tambahPesanan = () => {
        masukKeranjang({menu: selectedMenu, jumlah: jumlahPesanan, keterangan});
        close();
    };

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton="closeButton">
                <Modal.Title>{selectedMenu.nama}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='text-center fw-bold'>Deskripsi menu</h5>
                <Card.Img
                    variant='top'
                    src={'assets/images/' + selectedMenu
                        .category
                        .nama
                        .toLowerCase() + '/' + selectedMenu
                        .gambar}/>
                <h5 className='fw-bold text-center mt-3'>{selectedMenu.nama}</h5>
                <p className='fw-bold mt-3 text-center'>Rp. {numberWithCommas(selectedMenu.harga)}</p>
                <p className='text-center mt-3'>{selectedMenu.deskripsi}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailMenu;