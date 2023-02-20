import React, { Component, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import ReactPaginate from "react-paginate";
import detail from "../../assets/img/action/details.png";
import axios from 'axios';
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
    console.log('isi raw users :',rawusers);
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
        if (col === 'project') {
            if (order === true) {
                if (a.project.name < b.project.name) {
                    return -1

                } else if (a.project.name > b.project.name) {
                    return 1;
                }




                return 0;

            }
            else if (order === false) {
                if (a.project.name > b.project.name) {
                    return -1

                } else if (a.project.name < b.project.name) {
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
            console.log('meong :',user);
            return (

                <tr key={user.id}>
                    <td>{i+1}</td>
                    <td>{user.month}</td>
                    <td>{user.year}</td>
                    <td>{user.project.name}</td>
                    <td className='action'>

                        <Link className='edit' to={`/slipgaji/${user.project.name}/${user.month}/${user.year}/`+ user.project.id} ><img src={detail} alt="detail" /></Link></td>
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
                    <th>MONTH <img onClick={() => changeSort('month', !order)} src={sorting} alt="month_sort" /></th>
                    <th>YEAR <img onClick={() => changeSort('year', !order)} src={sorting} alt="year_sort"/></th>
                    <th>PROJECT <img onClick={() => changeSort('project', !order)} src={sorting} alt="project_sort"/></th>
                    <th>Action</th>
                </tr>

            </thead>
            <tbody>
                {displayUsers}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Total Slip Gaji : {users.length}</td>
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


class Slipgaji extends Component {
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
        axios.get(`http://localhost:8000/api/salaryslips`)
            .then(res => {


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
                <h1>Salari History</h1>

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

export default Slipgaji