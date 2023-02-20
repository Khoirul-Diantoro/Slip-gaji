import React, { Component, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ReactPaginate from "react-paginate";

import Edit from "../../assets/img/action/Icon.png";
import Mutasi from "../../assets/img/action/mutasipegawai.png";
import slipgaji from "../../assets/img/action/slip-gaji.png";
import Hapus from "../../assets/img/action/hapus.png";
import axios from 'axios';
import sorting from "../../assets/img/sorting.png";

function Table(props) {
    const rawusers = props.user;
    const [order, setOrder] = useState(true);
    // true : asc, false : desc
    const [col, setCol] = useState('id');
    const [pageNumber, setPageNumber] = useState(0);
    const search = props.search;
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const users = rawusers.filter(
        (val) => {
            if (search === "") {
                return val;
            }
            // else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || val.current_project.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            //     return val;

            // }
            else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;

            }

        }
    );
    const changeSort = (col, order) => {

        setCol(col);
        setOrder(order);
  

    };
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
        .map((user) => {

            return (

                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.dir_name}</td>
                    <td>{user.mutation_count}</td>
                    <td>
                        <div className='action'>
                            <Link className='edit' to={"/project/edit/" + user.id}><img src={Edit} alt="edit" /></Link>
                            <Link className='hapus' to={"/project/delete/" + user.id}><img src={Hapus} alt="hapus" /></Link>
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
            <thead>
                <tr>
                    <th align="center">NO</th>
                    <th>PROJECT NAME <img onClick={() => changeSort('name', !order)} src={sorting} /></th>
                    <th>DIREKTORI</th>
                    <th>COUNT EMPLOYEE</th>
                    <th align='center'>Action</th>
                </tr>
              
            </thead>
            <tbody>
                {displayUsers}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Total Pegawai : {users.length}</td>
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


class ListProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            search: ''

        }
        this.setsearchTerm = this.setsearchTerm.bind(this);
    }
    setsearchTerm(e) {
        this.setState({ search: e.target.value });

    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {


                const usersdata = res.data.data;
                console.log("list Project : ",usersdata);

                this.setState({ project: usersdata });

            })
    }

    render() {

        const project = this.state.project;
        const searchTerm = this.state.search;
        return (
            <div className='content1-wrapper'>
                <h1>List Projects</h1>

                <div className='table-section'>
                    <div className='header'>
                        <Link to='/project/add'>Tambah</Link>

                        <label>
                            Search :
                            <input type="text" onChange={this.setsearchTerm} />
                        </label>
                    </div>
                </div>

                <Table user={project} search={searchTerm} />

                <Outlet />

            </div>
        )
    }


}

export default ListProject;