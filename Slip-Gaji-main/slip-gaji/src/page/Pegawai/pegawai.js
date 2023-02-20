import React, { Component, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './pegawai.css';


import ReactPaginate from "react-paginate";

import Edit from "../../assets/img/action/Icon.png";
import Mutasi from "../../assets/img/action/mutasipegawai.png";
import slipgaji from "../../assets/img/action/slip-gaji.png";
import Hapus from "../../assets/img/action/hapus.png";
import sorting from "../../assets/img/sorting.png";
import axios from 'axios';
// import Delete from '../../uielement/Delete';


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
            else if (val.project[0].name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
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
      
    }).map((user, i) => {
        return (

            <tr key={i+1}>
                <td>{i+1}</td>
                <td className='profilepict'>{user.user[0].image  ? <img src={`http://localhost:8000/api/fileupload/showImage/${user.user[0].image}`}  width="25px" height="25px" style={{borderRadius: '50%'}} /> : <div className='profilepicture'>{Array.from(user.name)[0]}</div>}</td>
                <td>
                    <ul className='name-identity'>
                        <li>{user.name}</li>
                        <li>{user.identity}</li>
                    </ul>
                </td>
                <td>{user.phone}</td>
                <td>
                    {Object.keys(user.project).length === 0 ? 'Belum ada project' : user.project.map(
                        (project) => (<>{project.name}</>)
                    )}
                </td>
                <td>
                    <div className='action'>
                        <Link className='edit' to={"/pegawai/edit/" + user.id}><img src={Edit} alt="edit"  /></Link>
                        <Link to={`/mutasiproject/${user.id}/${user.name}`} className='mutasi'><img src={Mutasi} alt="mutasi" /></Link>
                        <Link to={`/pegawai/slipgaji/${user.id}/${user.name}`} className='slipgaji'><img src={slipgaji} alt="slipgaji" /></Link>
                        <Link to={"/pegawai/delete/" + user.id} className='hapus'><img src={Hapus} alt="hapus" /></Link>
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
                    <th >No</th>
                    <th>Profile</th>
                    <th >Name <img onClick={() => changeSort('name', !order)} src={sorting} /></th>
                    <th>Phone</th>
                    <th >Current Project <img onClick={() => changeSort(`project`, !order)} src={sorting} /></th>
                    <th>Action</th>
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


class Pegawai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: '',
            base_url: []

        }
        this.setsearchTerm = this.setsearchTerm.bind(this);
    }
    setsearchTerm(e) {
        this.setState({ search: e.target.value });

    }
    
    componentDidMount() {
        axios.get(`http://localhost:8000/api/employees`)
            .then(res => {
                


                
              
                const usersdata = res.data.data;
                
                for (let index = 0; index < usersdata.length; index++) {
                    if (usersdata[index].project.length === 0) {
                        usersdata[index].project = [
                            {
                                'name': "Belum ada project"
                            }
                        ];
                    }

                    
                };
                console.log(usersdata);

                
                this.setState({ users: usersdata });

            });
        
    }


    render() {

        const users = this.state.users;

        const searchTerm = this.state.search;
        const listproject = [...new Set(users.map(
            (val) => val.project[0].name





        ))];
        return (
            <div className='content1-wrapper'>
                <h1>Managemen Akun Pegawai</h1>

                <div className='table-section'>
                    <div className='header'>
                        <Link to='/pegawai/add'>Tambah</Link>

                        <select onChange={this.setsearchTerm} value={this.state.search}>
                            <option value="">Pilih project </option>
                            {listproject.map(
                                (val, i) => (
                                    <option key={i} value={val}>{val}</option>
                                )





                            )}

                        </select>
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

export default Pegawai