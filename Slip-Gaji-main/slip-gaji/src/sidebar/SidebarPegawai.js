import React from "react";

import Iconhome from "../assets/img/icon-title.png";
import burgerMenu from "../assets/img/Burger-menu.png";
import pp from "../assets/img/PP.png";
import { Link, Outlet, NavLink } from "react-router-dom";
import axios from "axios";


function HamburgerMenu(props) {
    return (
        <div className="burger" onClick={props.onClick}>
            <img src={burgerMenu} alt="burger-icon " />
        </div>
    );
}

class SidebarPegawai extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
            menuprofile: false
        }
        this.onMenunav = this.onMenunav.bind(this);

        this.onSwitchNav = this.onSwitchNav.bind(this);
        this.logoutButton = this.logoutButton.bind(this);
    }

    logoutButton() {
        if (localStorage.getItem('important') !== null) {
            localStorage.removeItem('important');
            localStorage.removeItem('token');
            window.location.reload();
        } else {
            sessionStorage.removeItem('important');
            sessionStorage.removeItem('token');
            window.location.reload();
        }


    }
    onMenunav() {
        this.setState((toggle) => ({ menuprofile: !toggle.menuprofile }))
    }
    onSwitchNav() {
        this.setState((toggle) => ({ switch: !toggle.switch }))
    }

    handleImageShow = (img) => {


        axios.get(`http://localhost:8000/api/fileupload/getImage/${img}`)
            .then(res => {

                this.setState({ baseurl: res.data.base_url });


            });
    }
    componentDidMount() {
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
        this.handleImageShow(profile.image);
    }



    render() {
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
        console.log(this.state.switch);
        // const toggle = this.state.switch;


        return (
            <div className="wrapper-dashboard">

                <nav>

                    <div className={this.state.switch ? 'navbar-brand active' : 'navbar-brand'}>
                        <img src={Iconhome} alt="icon-home" />
                        <h1>Payslip</h1>
                    </div>
                    <div className="profile-section">
                        <HamburgerMenu onClick={this.onSwitchNav} />
                        <div className="profile" onClick={this.onMenunav}>
                            <h2>
                                {profile.employee_data.name}
                            </h2>
                            <img src={this.state.baseurl === '' ? pp : this.state.baseurl} alt="profile-img" style={{ borderRadius: '20px' }} width="40px" height="40px" />
                        </div>
                        <div className={this.state.menuprofile ? 'profile-dropdown' : 'profile-dropdown active'}>
                            <ul>
                                <li><Link to='/edit'><img src={Iconhome} alt="profilesection" />Edit Profile</Link></li>
                                <li><a onClick={this.logoutButton} ><img src={Iconhome} alt="profilesection" />Logout</a></li>
                            </ul>
                        </div>
                    </div>

                </nav>



                <aside className={this.state.switch ? 'sidebar-menu active' : 'sidebar-menu'}>


                    <div className='sidebar'>
                        <div className="sidebar-item">

                            <NavLink to='/dashboard'><img src={Iconhome} alt="sidebar1" /><h2>Dashboard</h2></NavLink>

                        </div>

                        <div className="sidebar-item">

                            <NavLink to='/slipgaji'><img src={Iconhome} alt="sidebar1" /><h2>Slip Gaji</h2></NavLink>
                        </div>

                    </div>
                    <div className="content">

                        <Outlet />





                    </div>

                </aside>

            </div>

        );
    }
}

export default SidebarPegawai;