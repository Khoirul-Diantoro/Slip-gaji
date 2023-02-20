import React, { Component, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import ReactPaginate from "react-paginate";
import detail from "../../assets/img/action/details.png";
import axios from 'axios';
import download from "../../assets/img/action/download.png";
import sorting from "../../assets/img/sorting.png";

function SlipgajiKaryawan(props) {
    
    const profile = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
    console.log('profie id', profile.id);
    return (
        <Slipgajikaryawan1 param={profile.id} />
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
    )
    const changeSort = (col, order) => {

        setCol(col);
        setOrder(order);


    }
    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).sort(function (a, b) {
        if (col === 'employee') {
            if (order === true) {
                if (a.employee.name < b.employee.name) {
                    return -1

                } else if (a.employee.name > b.employee.name) {
                    return 1;
                }




                return 0;

            }
            else if (order === false) {
                if (a.employee.name > b.employee.name) {
                    return -1

                } else if (a.employee.name < b.employee.name) {
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
                    <th>MONTH <img onClick={() => changeSort('month', !order)} src={sorting} alt="month" /></th>
                    <th>YEAR <img onClick={() => changeSort('year', !order)} src={sorting} alt="year" /></th>
                    <th>UPLOAD DATE <img onClick={() => changeSort('trx_date', !order)} src={sorting} alt="upload date" /></th>
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


class Slipgajikaryawan1 extends Component {
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
        axios.get(`http://localhost:8000/api/salaryslipsbyemployee/` + this.props.param)
            .then(res => {
                console.log('test',res);


                const usersdata = res.data.data;
                console.log(usersdata);
                this.setState({ users: usersdata });

            })
        // this.setState({
        //     users: [{
        //         "id": 1,
        //         "month": 4,
        //         "year": 2009,
        //         "upload_date": "9/17/2022"
        //     }, {
        //         "id": 2,
        //         "month": 10,
        //         "year": 2010,
        //         "upload_date": "6/1/2022"
        //     }, {
        //         "id": 3,
        //         "month": 5,
        //         "year": 2020,
        //         "upload_date": "8/16/2022"
        //     }, {
        //         "id": 4,
        //         "month": 7,
        //         "year": 2012,
        //         "upload_date": "2/4/2022"
        //     }, {
        //         "id": 5,
        //         "month": 4,
        //         "year": 2018,
        //         "upload_date": "10/12/2022"
        //     }, {
        //         "id": 6,
        //         "month": 8,
        //         "year": 2008,
        //         "upload_date": "9/7/2022"
        //     }, {
        //         "id": 7,
        //         "month": 10,
        //         "year": 2002,
        //         "upload_date": "7/7/2022"
        //     }, {
        //         "id": 8,
        //         "month": 12,
        //         "year": 2016,
        //         "upload_date": "1/25/2022"
        //     }, {
        //         "id": 9,
        //         "month": 5,
        //         "year": 2007,
        //         "upload_date": "5/6/2022"
        //     }, {
        //         "id": 10,
        //         "month": 3,
        //         "year": 2020,
        //         "upload_date": "6/8/2022"
        //     }]
        // });
    }
    render() {

        const users = this.state.users;
        const searchTerm = this.state.search;
        return (
            <div className='content1-wrapper'>
                <h1>Salary History - Talitha</h1>

                <div className='table-section'>
                    <div className='header' style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        {/* <Link to='/slipgaji/add'>Tambah</Link> */}

                        <label>
                            Search :
                            <input type="text" onChange={this.setsearchTerm} />
                        </label>
                    </div>
                </div>

                <Table user={users} search={searchTerm} />

                <Outlet />

            </div>
        )
    }


}

export default SlipgajiKaryawan