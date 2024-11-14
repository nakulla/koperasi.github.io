import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NavbarNav from './component/NavbarNav'
import Pesanan from './Pages/Pesanan';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCategories: false, 
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Login}/>
                    <Route path="/Home" component={NavbarNav}/>
                </Switch>
                <main>
                    <Switch>
                        <Route path="/Home" exact={true} component={Home}/>
                        <Route path="/Pesanan" exact={true} component={Pesanan}/>
                    </Switch>
                </main>
            </BrowserRouter>
        );
    }
}