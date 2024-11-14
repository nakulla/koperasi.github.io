import React, {Component} from 'react';
import {Col, Button, Card} from 'react-bootstrap';
import DetailMenu from './DetailMenu';
import {numberWithCommas} from '../utils/Utils';

export default class Menus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetail: false,
            selectedMenu: null
        };
    }

    showMenuDetail = (menu) => {
        this.setState({selectedMenu: menu, showDetail: true});
    };

    closeMenuDetail = () => {
        this.setState({selectedMenu: null, showDetail: false});
    };

    render() {
        const {menu, masukKeranjang} = this.props;
        const {showDetail, selectedMenu} = this.state;

        return (
            <Col md={4} xs={6} className='card mb-4'>
                <Card className='card-menu shadow'>
                    <Card.Img
                        variant='top'
                        src={`assets/images/${menu
                            .category
                            .nama
                            .toLowerCase()}/${menu
                            .gambar}`}
                        onClick={() => this.showMenuDetail(menu)}/>
                    <Card.Body className='text-center' onClick={() => masukKeranjang(menu)}>
                        <Card.Title>{menu.nama}</Card.Title>
                        <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
                        <Button variant='primary'>
                            Pesan
                        </Button>
                    </Card.Body>
                </Card>
                {
                    showDetail
                        ? (
                            <DetailMenu
                                selectedMenu={selectedMenu}
                                show={showDetail}
                                close={this.closeMenuDetail}
                                masukKeranjang={masukKeranjang}/>
                        )
                        : null
                }
            </Col>
        );
    }
}
