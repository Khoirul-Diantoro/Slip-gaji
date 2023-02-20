import React, { Component, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";

import Edit from "../../assets/img/action/Icon.png";
import Mutasi from "../../assets/img/action/mutasipegawai.png";
import slipgaji from "../../assets/img/action/slip-gaji.png";
import Hapus from "../../assets/img/action/hapus.png";
import axios from 'axios';
import sorting from "../../assets/img/sorting.png";


function Table(props) {
    const rawusers = props.user;
    let { idpegawai } = useParams();
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
          
            else if (val.project.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || val.mutation_date.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || val.status.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;

            }

        }
    )
    console.log('data mutasi:',users);
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
        .map((user) => {
            return (

                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.project.name}</td>
                    <td>{user.mutation_date}</td>
                    <td>{user.status}</td>
                    <td>
                        <div className='action'>
                        <Link className='edit' to={`/mutasiproject/${props.param.idpegawai}/${props.param.namepegawai}/edit/${user.id}`}><img src={Edit} alt="edit" /></Link>
                            <Link className='hapus' to={`/mutasiproject/${props.param.idpegawai}/${props.param.namepegawai}/delete/${user.id}`}><img src={Hapus} alt="hapus" /></Link>
                            {/* <Link className='edit' to={`mutasiproject/${props.param.idpegawai}/${props.param.namepegawai}/edit/${user.id}`}><img src={Edit} alt="edit" /></Link>
                            <Link className='hapus' to={`mutasiproject/${props.param.idpegawai}/${props.param.namepegawai}/delete/${user.id}`}><img src={Hapus} alt="hapus" /></Link> */}
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
                    <th>PROJECT NAME <img onClick={() => changeSort('project', !order)} src={sorting} /></th>
                    <th>MUTATION DATE <img onClick={() => changeSort('mutation_date', !order)} src={sorting} /></th>
                    <th>STATUS <img onClick={() => changeSort('status', !order)} src={sorting} /></th>
                    <th>ACTION</th>
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

function Mutasiproject(){
    let param = useParams();
    console.log(param);
    return (
        <><Mutasiproject2 param={param}/></>
    );
}

class Mutasiproject2 extends Component {
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
        axios.get(`http://localhost:8000/api/mutations/`+this.props.param.idpegawai)
            .then(res => {
                console.log('data: ',res.data.data);


                const usersdata = res.data.data;
                this.setState({ users: usersdata });

            })
           
    }
   

    render() {

        const users = this.state.users;
        console.log('state:',this.state.users);
        const searchTerm = this.state.search;
        return (
            <div className='content1-wrapper'>
                <h1>Project Mutation History - {this.props.param.namepegawai}</h1>

                <div className='table-section'>
                    <div className='header'>
                        <Link to={`/mutasiproject/${this.props.param.idpegawai}/${this.props.param.namepegawai}/add`}>Tambah</Link>

                     
                        <label>
                            Search :
                            <input type="text" onChange={this.setsearchTerm} value={this.state.search} />
                        </label>
                    </div>
                </div>

                <Table user={users} search={searchTerm} param={this.props.param}/>

                <Outlet />

            </div>
        )
    }


}



export default Mutasiproject;