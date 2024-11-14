import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import NavbarNav from './component/NavbarNav'
import Home from './Pages/Home';
import Sukses from './Pages/Sukses';

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
                <NavbarNav />
                <main>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home/>
                        </Route>
                        <Route path="/Sukses" exact={true} component={Sukses}/>
                    </Switch>
                </main>
            </BrowserRouter>
        );
    }
}