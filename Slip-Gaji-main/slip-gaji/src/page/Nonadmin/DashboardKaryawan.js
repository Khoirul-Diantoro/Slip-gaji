import React from "react";

import Iconhome from "../../assets/img/icon-title.png";

import Run from "../../assets/img/Run.png";
import Graph2 from "../../chart/chart2";
import Graph1 from "../../chart/chart1";
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
                    <h1>{nama}</h1>
                    <h2>{jumlah}</h2>
                </div>
                <div className="graph-icon">

                    <img src={Iconhome} alt="graph-icon" />
                </div>

            </div>


        </div>

    );
}


class DashboardKaryawan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switch: true,
            project: '',
            mutation_date: ''


        }

        this.onSwitchNav = this.onSwitchNav.bind(this);
    }

    onSwitchNav() {
        this.setState((toggle) => ({ switch: !toggle.switch }))
    }
    componentDidMount() {
        const data =localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
        console.log('data :', data);
        axios.get(`http://localhost:8000/api/chart/dashboardnon/${data.id}`)
            .then(res => {
                console.log(res);
                this.setState({
                    project: res.data.data.project_name,
                    mutation_date: res.data.data.mutation_date

                })

            })
    }



    render() {
        const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));

        console.log('state ',this.state);

        return (

            <div className="content-wrapper">
                <div className="content-fixed">
                    <h1>SELAMAT DATANG! {profile.employee_data.name.toUpperCase()}</h1>
                    <div className="graph-data">
                        <Content jumlah={this.state.project} nama="Project :" graph={<Graph1 />} style={{ background: '#BD3913', color: 'white' }} />
                        <Content jumlah={this.state.mutation_date} nama="Mutation Date :" graph={<Graph2 />} style={{ background: '#9FBEAE', color: 'black' }} />
                    </div>
                    {/* style={{margin-top: "10%", height: "-100px", width: "-50px"}} */}
                    <div clasName="container-foto" container="photos">
                        <img className="foto" src={Run} alt="Run" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardKaryawan;