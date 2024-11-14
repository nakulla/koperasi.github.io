import React, {useState} from 'react';
import {Nav, Navbar, Container, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = ({toggleCategories}) => {
    const history = useHistory();
    const [showCategories, setShowCategories] = useState(false);

    const handleButtonClick = () => {
        history.push("/Pesanan");
    };

    const toggleCategoriesHandler = () => {
        setShowCategories(!showCategories);
    };

    return (
        <div>
            <Navbar expand="lg" className="nav-nav">
                <Container className=''>
                    <Navbar.Brand href="#">KOPERASI</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleCategoriesHandler}>
                        <FontAwesomeIcon icon={faBars}/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className={`mx-auto text-center ${showCategories
                                ? 'daftar-kategori'
                                : ''}`}
                            style={{
                                maxHeight: '100px'
                            }}
                            navbarScroll="navbarScroll"></Nav>
                    </Navbar.Collapse>
                    <Button variant='primary' onClick={handleButtonClick}>
                        Lihat Pesanan
                    </Button>
                </Container>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
