import React, {Component} from "react";
import Header from "./Header"
import Footer from "./Footer";
import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <>
                <Header/>
                <NavBar/>
                <div>
                    <Outlet/>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Layout