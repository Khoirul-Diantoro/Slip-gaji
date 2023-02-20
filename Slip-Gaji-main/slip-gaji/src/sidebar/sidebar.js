import React from "react";
import './sidebar.css';
import Iconhome from "../assets/img/icon-title.png";
import burgerMenu from "../assets/img/Burger-menu.png";
import pp from "../assets/img/PP.png";
import { Link, Outlet, NavLink, redirect } from "react-router-dom";
import axios from "axios";



function HamburgerMenu(props) {
    return (
        <div className="burger" onClick={props.onClick}>
            <img src={burgerMenu} alt="burger-icon " />
        </div>
    );
}

// function NavigationBar() {
//     return (
//         <div className="sidebar-item">


//             <NavLink style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//             } to='/dashboard'><img src={Iconhome} alt="sidebar1" /><h2>Dashboard</h2></NavLink>

//         </div>
//     );
// }


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: false,
            menuprofile: false,
      
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
    componentDidMount(){
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
        
    }



    render() {
     
     
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
      


        // const toggle = this.state.switch;

        let activeStyle = {
            textDecoration: "underline",
        };

        let activeClassName = "underline";
        return (
            <div className="wrapper-dashboard">

                <nav>

                    <div className={this.state.switch ? 'navbar-brand active' : 'navbar-brand'}>
                        <img src={Iconhome} alt="icon-home" />
                        <h1>Payslip</h1>
                    </div>
                    <div className="profile-section">
                        <HamburgerMenu onClibck={this.onSwitchNav} />
                        <div className="profile" onClick={this.onMenunav}>
                            <h2>
                                {profile.employee_data.name.toUpperCase()}
                            </h2>
                            <img src={profile.image === '' ? pp : `http://localhost:8000/api/fileupload/showImage/${profile.image}`} alt="profile-img" style={{borderRadius: '20px'}} width="40px" height="40px" />
                        </div>
                        <div className={this.state.menuprofile ? 'profile-dropdown' : 'profile-dropdown active'}>
                            <ul>
                                <li><Link to='/editprofile' onClick={() => {this.setState({menuprofile: !this.state.menuprofile})}} ><img src={Iconhome} alt="profilesection" />Edit Profile</Link></li>
                                <li><a onClick={this.logoutButton} ><img src={Iconhome} alt="profilesection" />Logout</a></li>

                                {/* <li><a onClick={this.logoutButton} ><img src={Iconhome} alt="profilesection" />Logout</a></li> */}
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
                            <NavLink to='/pegawai'> <img src={Iconhome} alt="sidebar2" /><h2>Pegawai</h2></NavLink>
                        </div>

                        <div className="sidebar-item">

                            <NavLink to='/project'><img src={Iconhome} alt="sidebar3" /><h2>Project</h2></NavLink>
                        </div>
                        <div className="sidebar-item">
                            <NavLink to='/slipgaji'> <img src={Iconhome} alt="sidebar4" /><h2>Slip Gaji</h2></NavLink>
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

export default Sidebar;