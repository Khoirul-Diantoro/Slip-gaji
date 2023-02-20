import React, { Component, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import ReactPaginate from "react-paginate";
import sorting from "../../assets/img/sorting.png";
import download from "../../assets/img/action/download.png";
import axios from 'axios';
import Edit from "../../assets/img/action/Icon.png";
import Hapus from "../../assets/img/action/hapus.png";



function Slipgajipegawai(props) {
    let param = useParams();

    return (
        <Slipgajipegawai1 param={param} />
    )
}
function Table(props) {
    const rawusers = props.user;

    const [pageNumber, setPageNumber] = useState(0);
    const [order, setOrder] = useState(true);
    // true : asc, false : desc
    const [col, setCol] = useState('id');
    const search = props.search;
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const users = rawusers.filter(
        (val) => {
            console.log(val.month);

            if (search === "") {
                return val;
            }
            else if (val.month.toString().toLocaleLowerCase().includes(search.toString().toLocaleLowerCase()) || val.year.toString().toLocaleLowerCase().includes(search.toString().toLocaleLowerCase())) {
                return val;
            }

        }
    );
    const changeSort = (col, order) => {

        setCol(col);
        setOrder(order);
  

    }

    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).sort(function (a, b) {
        if (col === 'project') {
            if (order === true) {
                if (a.project[0].name < b.project[0].name) {
                    return -1

                } else if (a.project[0].name > b.project[0].name) {
                    return 1;
                }




                return 0;

            }
            else if (order === false) {
                if (a.project[0].name > b.project[0].name) {
                    return -1

                } else if (a.project[0].name < b.project[0].name) {
                    return 1;
                }

                return 0;

            }
        }
        else {
            if (order === true) {
                if (a[col] < b[col]) {
                    return -1

                } else if (a[col] > b[col]) {
                    return 1;
                }




                return 0;

            }
            else if (order === false) {
                if (a[col] > b[col]) {
                    return -1

                } else if (a[col] < b[col]) {
                    return 1;
                }

                return 0;

            }
        }
      
    })
        .map((user, i) => {

            return (

                <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td>{user.month}</td>
                    <td>{user.year}</td>
                    <td >
                        <div className='action'>
                            {user.trx_date}
                        </div>
                    </td>
                    <td>
                        <div className='action'>

                            <a className='slipgaji' href={`http://localhost:8000/api/downloadpdf/${user.file_path}`}  ><img src={download} alt="detail" /></a>
                        </div>

                    </td>
                </tr>




            );
        });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <table>
            <thead align="center">
                <tr>
                    <th>No</th>
                    <th>MONTH <img onClick={() => changeSort('month', !order)} src={sorting} /></th>
                    <th>YEAR <img onClick={() => changeSort('year', !order)} src={sorting} /></th>
                    <th>UPLOAD DATE <img onClick={() => changeSort('trx_date', !order)} src={sorting} /></th>
                    <th>FILE</th>
                </tr>

            </thead>
            <tbody>
                {displayUsers}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total Slip Gaji : {users.length}</td>
                    <td>Rows per page: {usersPerPage}</td>
                    <td colSpan={2}>

                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}

                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationContainer"}
                            previousLinkClassName={"previousBtn"}
                            nextLinkClassName={"nextBtn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}


                            pageRangeDisplayed={0}
                            marginPagesDisplayed={0}
                        />
                    </td>
                </tr>

            </tfoot>
        </table>

    );
}


class Slipgajipegawai1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: ''

        }
        this.setsearchTerm = this.setsearchTerm.bind(this);
    }
    setsearchTerm(e) {
        this.setState({ search: e.target.value });

    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/salaryslipsbyemployee/` + this.props.param.id)
            .then(res => {
                console.log('test', res);


                const usersdata = res.data.data;
                console.log(usersdata);
                this.setState({ users: usersdata });

            })

    }
    render() {

        const users = this.state.users;
        const searchTerm = this.state.search;

        const bulan = [...new Set(users.map(
            (val) => val.month





        ))];
        const tahun = [...new Set(users.map(
            (val) => val.year





        ))];
        return (
            <div className='content1-wrapper'>
                <h1>Salary History - {this.props.param.namapegawai}</h1>

                <div className='table-section'>
                    <div className='header'>
                        <Link to='/slipgaji/add'>Tambah</Link>

                        <select onChange={this.setsearchTerm} value={this.state.search}>
                            <option value="">Pilih Bulan </option>
                            {


                                bulan.map(
                                    (val, i) => (
                                        <option key={i} value={val}>{val}</option>
                                    )





                                )}

                        </select>
                        <select onChange={this.setsearchTerm} value={this.state.search}>
                            <option value="">Pilih Tahun </option>
                            {
                                tahun.map(
                                    (val, i) => (
                                        <option key={i} value={val}>{val}</option>
                                    )





                                )}

                        </select>
                    </div>
                </div>

                <Table user={users} search={searchTerm} />

                <Outlet />

            </div>
        )
    }


}

export default Slipgajipegawai;