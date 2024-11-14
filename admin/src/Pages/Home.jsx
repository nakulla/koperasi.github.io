import React, {Component} from 'react'
import {Row, Col, Container, Form, Button} from 'react-bootstrap';
import ListCategories from '../component/ListCategories';
import Menus from '../component/Menus';
import TambahMenu from '../component/TambahMenu';
import axios from 'axios';
import {API_URL} from '../utils/Constants';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            categoryYangDipilih: 'Makanan',
            showCategories: [],
            showAddMenu: false
        };
    }

    componentDidMount() {
        this.fetchMenus();
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


    handleSearchChange = (value) => {
        this.setState({searchTerm: value});
        this.fetchMenus();
    };


    render() {
        const { categoryYangDipilih, showCategories } = this.state;
            
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
                                    <Col xs="auto">
                                            <TambahMenu
                                                show={this.state.showAddMenu}
                                                onHide={() => this.setState({showAddMenu: false})}/>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="home-menu">
                                {
                                    this
                                        .state
                                        .menus
                                        .map(
                                            (menu, index) => (<Menus key={menu.id + index} menu={menu} close={this.toggleCloseModal}/>)
                                        )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
