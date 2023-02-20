import React, { Component, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import ReactPaginate from "react-paginate";

import download from "../../assets/img/action/download.png";
import axios from 'axios';
import Edit from "../../assets/img/action/Icon.png";
import Hapus from "../../assets/img/action/hapus.png";
import sorting from "../../assets/img/sorting.png";
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
                    <td>{user.employee.name}</td>
                    <td >
                        <div className='action'>

                            <a className='slipgaji' href={`http://localhost:8000/api/downloadpdf/${user.file_path}`}  ><img src={download} alt="detail" /></a>
                        </div>
                    </td>
                    <td>
                        <div className='action'>
                            <Link className='edit' to={`/slipgaji/${props.param.projectname}/${props.param.month}/${props.param.year}/${props.param.idproject}/edit/` + user.id}><img src={Edit} alt="edit" /></Link>
                            <Link className='hapus' to={`/slipgaji/${props.param.projectname}/${props.param.month}/${props.param.year}/${props.param.idproject}/delete/` + user.id} ><img src={Hapus} alt="hapus" /></Link>

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
                    <th>EMPLOYEE NAME <img onClick={() => changeSort('employee', !order)} src={sorting} alt="employee" /></th>
                    <th>FILE</th>
                    <th>Action</th>
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
                        /></td>
                </tr>

            </tfoot>
        </table>

    );
}
function Detailslipgaji(props) {
    let param = useParams();


    return (
        <Detailslipgaji1 param={param} />
    )
}

class Detailslipgaji1 extends Component {
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
        axios.get(`http://localhost:8000/api/salaryslips/getbyProject/` + this.props.param.idproject)
            .then(res => {



                const usersdata = res.data.data;
                console.log(usersdata);
                this.setState({ users: usersdata });

            });



    }
    render() {


        const users = this.state.users;
        const searchTerm = this.state.search;
        const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return (
            <div className='content1-wrapper'>
                <h1>{this.props.param.projectname}- {bulan[this.props.param.month - 1]} - {this.props.param.year}</h1>

                <div className='table-section'>
                    <div className='header'>
                        <Link to='/slipgaji/add'>Tambah</Link>

                        <label>
                            Search :
                            <input type="text" onChange={this.setsearchTerm} />
                        </label>
                    </div>
                </div>

                <Table user={users} search={searchTerm} param={this.props.param} />

                <Outlet />

            </div>
        )
    }


}

export default Detailslipgaji