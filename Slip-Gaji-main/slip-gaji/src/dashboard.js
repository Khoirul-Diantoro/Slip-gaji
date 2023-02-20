import React from "react";
import './dashboard.css';
import Iconhome from "./assets/img/icon-title.png";


import Graph2 from "./chart/chart2";
import Graph1 from "./chart/chart1";
import { faker } from '@faker-js/faker';
import axios from "axios";



function Content(props) {
    const jumlah = props.jumlah;
    const nama = props.nama;
    const graph = props.graph;
    return (
        <div className="graph-project">
            <div className="graph-header" style={props.style}>
                <div className="graph-count">
                    <h1>{jumlah}</h1>
                    <h2>{nama}</h2>
                </div>
                <div className="graph-icon">

                    <img src={Iconhome} alt="graph-icon" />
                </div>

            </div>
            <div className="graph-content">


                {graph}


            </div>

        </div>

    );
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: true,
            total_karyawan: '',
            total_project: '',
            karyawan_by_project: [],
            slipgaji_by_karyawan: []

        }

        this.onSwitchNav = this.onSwitchNav.bind(this);
    }

    onSwitchNav() {
        this.setState((toggle) => ({ switch: !toggle.switch }))
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/chart/dashboardadmin`)
            .then(res => {
                



               
                this.setState({
                    total_karyawan: res.data.total_karyawan,
                    total_project: res.data.total_project,
                    karyawan_by_project: res.data.karyawan_by_project,
                    slipgaji_by_karyawan: res.data.slipgaji_by_karyawan
                });

            })

    }



    render() {
        console.log('state :',this.state);
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));


        console.log("profile", profile);

        return (

            <div className="content-wrapper">
                <div className="content-fixed">
                    <h1>SELAMAT DATANG! {profile.employee_data.name.toUpperCase()} </h1>
                    <div className="graph-data">
                        <Content jumlah={this.state.total_project} nama="Project" graph={<Graph1 pegawaiproject={this.state.karyawan_by_project} />} style={{ background: '#BD3913', color: 'white' }} />
                        <Content jumlah={this.state.total_karyawan} nama="Pegawai" graph={<Graph2 slipgajipegawai={this.state.slipgaji_by_karyawan} />} style={{ background: '#9FBEAE', color: 'black' }} />


                    </div>
                </div>


            </div>

        );
    }
}

export default Dashboard;