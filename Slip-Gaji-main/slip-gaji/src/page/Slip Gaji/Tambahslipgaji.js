import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';
import './Tambahslipgaji.css';

class Tambahslipgaji extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employee_id: '',
            project_id: '',
            month_year: '',
            trx_date: "",
            file_path: "",


            project: [],
            pegawai: []
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {
                console.log('coba :', res.data.data);


                const project = res.data.data;
                this.setState({ project: project });

            });
        axios.get(`http://localhost:8000/api/employees`)
            .then(res => {


                const pegawai = res.data.data;
                this.setState({ pegawai: pegawai });

            })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value



        });

    }
    handleFileChange(event) {
        const target = event.target.files[0];
        let formData = new FormData();
   
        formData.append('file_upload', target, target.name)
        axios.post(`http://localhost:8000/api/upload/uploadPdf`, formData).then(res => {

         

            this.setState({
                file_path: res.data.filename,
           
            });

        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let date = new Date();

        const slipgaji = {
            employee_id: this.state.employee_id,
            project_id: this.state.project_id,
            month: new Date(this.state.month_year).getMonth() + 1,
            year: new Date(this.state.month_year).getFullYear(),
            trx_date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            file_path: this.state.file_path
        }



        axios.post(`http://localhost:8000/api/salaryslips`, slipgaji).then(res => {
            console.log(res.request.responseText);
            window.location = "/slipgaji";
        });



    }
    render() {
        console.log('Hello :',this.state.baseurl);
        const param = this.props.params;
        const month = new Date(this.state.month_year);

        const project = this.state.project;
        const pegawai = this.state.pegawai;


        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>TAMBAH SLIP GAJI</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className='form1'>
                            <div className='input-border'>
                                <label>
                                    PROJECT
                                    <select name='project_id' onChange={this.handleInputChange} value={this.state.project_id} >
                                        <option value="" disabled selected >Pilih Project</option>
                                        {
                                            project.map((project) => (
                                                <option value={project.id} >{project.name}</option>

                                            ))

                                        }
                                    </select>
                                </label>
                                <label>
                                    EMPLOYEE NAME
                                    <select name="employee_id" onChange={this.handleInputChange} value={this.state.employee_id}>
                                        <option value="" disabled >Pilih Project</option>
                                        {
                                            pegawai.map((pegawai1) => (
                                                <option value={pegawai1.id} >{pegawai1.name}</option>

                                            ))

                                        }
                                    </select>
                                </label>
                                <label>
                                    MONTH/YEAR
                                    <input type="month" placeholder='MM/YY' name="month_year" onChange={this.handleInputChange} value={this.state.month_year} />
                                </label>
                                <label>
                                    FILE PDF
                                    <div className='file-upload1'>
                                      
                                        <div className='uploadfile-inside'>
                                            <div className='uploadfile-section'>
                                                <div className='file-inputs'>
                                                <input type="file" name='file_path' onChange={this.handleFileChange}  accept=".pdf"/>
                                                    <button><img src={uploadicon} alt="uploadicon" />PILIH FILE</button>

                                                </div>
                                                <div>Maximum upload file size: 2 MB
                                                    </div>


                                            </div>
                                          


                                        </div>



                                    </div>
                                </label>


                            </div>
                        </div>
                        <div className='submit-btn'>
                            <input type="submit" className='kirim' value="Submit" />

                            <Link to="/slipgaji" className='batal'>Batal</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Tambahslipgaji;
