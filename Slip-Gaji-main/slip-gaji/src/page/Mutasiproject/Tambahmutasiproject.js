
import React, { Component } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';


function Tambahmutasiproject(props) {
    let param = useParams();
    console.log(param);
    return (
        <><Tambahmutasiproject1 param={param}/></>
    )
}
class Tambahmutasiproject1
    extends Component {
    constructor(props) {
        super(props);

        this.state = {


            project_id: '',
            mutation_date: '',
            status: 'ACTIVE',
            project: []
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    componentDidMount(){
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {
       
                console.log('project list :',res.data);
                const project = res.data.data;
                this.setState({ project: project });

            })
            console.log('idpegawai:',this.props.idpegawai);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value



        });

    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            employee_id: this.props.param.idpegawai,
            project_id: this.state.project_id,
            mutation_date: this.state.mutation_date,
            status: this.state.status
        }

        console.log('data yang dikirim',data);
        axios.post(`http://localhost:8000/api/mutations`, data).then(res => {
            console.log('ini param :',this.props.param);
            window.location = `/mutasiproject/${this.props.param.idpegawai}/${this.props.param.namepegawai}`;
        });



    }
    render() {
        const param = this.props.params;
        console.log(this.state);
        const project = this.state.project;

        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>TAMBAH MUTASI PROJECT TALITHA</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className='form1'>
                            <div className='input-border'>
                                <label>
                                    PROJECT
                                    <select name='project_id' onChange={this.handleInputChange} value={this.state.project_id}  >
                                        <option value="" disabled selected>Pilih Project</option>
                                        {
                                            project.map((project) => (
                                                <option value={project.id} >{project.name}</option>

                                            ))

                                        }
                                    </select>
                                </label>
                                <label>
                                    MUTATION DATE
                                    <input type="date" placeholder='DD/MM/YY' name='mutation_date' onChange={this.handleInputChange} value={this.state.mutation_date}  />
                                </label>


                            </div>
                        </div>
                        <div className='submit-btn'>
                            <input type="submit" className='kirim' value="Submit" />

                            <Link to={`/mutasiproject/${this.props.param.idpegawai}/${this.props.param.namepegawai}`} className='batal'>Batal</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Tambahmutasiproject
    ;
