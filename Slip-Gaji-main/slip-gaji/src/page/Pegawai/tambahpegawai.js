import './tambahpegawai.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';



class Tambahpegawai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            identity: '',
            name: '',
            phone: '',
            email: '',
           
            username: "",
            password: "",
            project_id: "",
            mutation_date: "",
            status: "",
            baseurl: '',
            jenis_kelamin: "",
    






            project: []
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

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
        console.log('test', target.name);
        formData.append('file_upload', target, target.name)
        axios.post(`http://localhost:8000/api/upload/uploadImage`, formData).then(res => {

         
            console.log(res);
            this.setState({
                images: res.data.filename,
                baseurl: res.data.base_url
             
            });

        });
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {
                const project = res.data.data;

                this.setState({ project: project });

            })
    }


    handleSubmit(event) {
        event.preventDefault();

        const data = {
            identity: this.state.identity,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            jenis_kelamin: this.state.jenis_kelamin,
            images: this.state.images,
            username: this.state.username,
            password: this.state.password,
            project_id: this.state.project_id,
            mutation_date: this.state.mutation_date,
            status: this.state.status,
        };
        let formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(`${key}`, `${value}`);
        }


        console.log('array :', Array.of(formData));
        axios.post(`http://localhost:8000/api/fullprofile`, formData).catch((error) => {
            console.log(error);
        }).then(res => {
            
            window.location = "/pegawai";
        });



    }
    render() {
 
        let imguri = this.state.baseurl

        const project = this.state.project;
        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>Tambah Akun Pegawai</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className='form'>
                            <div className='input-border'>
                                <label>
                                    IDENTITY
                                    <input name='identity' type="text" placeholder='Input NIK Pegawai' onChange={this.handleInputChange} value={this.state.identity} autoComplete="off" />
                                </label>
                                <label>
                                    NAME
                                    <input name='name' type="text" placeholder='Input Nama Pegawai' onChange={this.handleInputChange} value={this.state.name} autoComplete="off" />
                                </label>
                                <label>
                                    PHONE
                                    <input  name='phone' type="number" placeholder='08xxxxxxxxxxxx' onChange={this.handleInputChange} value={this.state.phone} autoComplete="off" />
                                </label>
                                <label>
                                    EMAIL
                                    <input name='email' type="email" placeholder='email@email.com' onChange={this.handleInputChange} value={this.state.email} autoComplete="off" />
                                </label>
                                <label>
                                    JENIS KELAMIN
                                    <select name='jenis_kelamin' onChange={this.handleInputChange} value={this.state.jenis_kelamin} >
                                        <option value="" disabled >Pilih Kelamin</option>
                                        <option value="PRIA">Pria</option>
                                        <option value="WANITA">Wanita</option>

                                    </select>
                                </label>
                                <label className='file-upload1'>
                                    PROFILE PICTURE
                                    <div className='uploadfile-inside'>
                                        <div className='uploadfile-section'>
                                            <div className='file-inputs'>
                                                <input type="file" name='image' onChange={this.handleFileChange}  accept="image/*"/>
                                                <button><img src={uploadicon} alt="uploadicon" />PILIH FILE</button>

                                            </div>
                                            <div>Maximum upload file size: 2 MB
                                                File format type: png/jpg</div>


                                        </div>
                                        <img src={imguri === "" ? img : imguri } alt='profilepict'  />


                                    </div>



                                </label>
                              
                            </div>
                            <div className='input-border'>
                                <label>
                                    USERNAME
                                    <input type="text" placeholder='Input Username' name='username' onChange={this.handleInputChange} value={this.state.username} />
                                </label>
                                <label>
                                    PASSWORD
                                    <input type="password" placeholder='Input Password' name='password' onChange={this.handleInputChange} value={this.state.password} />
                                </label>

                            </div>
                            <div className='input-border'>
                                <label>
                                    PROJECT
                                    <select name='project_id' onChange={this.handleInputChange} value={this.state.project_id} defaultValue={""} >
                                        <option value="" disabled  >Pilih Project</option>
                                        {
                                            project.map((project) => (
                                                <option value={project.id} >{project.name}</option>

                                            ))

                                        }
                                    </select>
                                </label>
                                <label>
                                    MUTATION DATE
                                    <input type="date" placeholder='DD/MM/YY' name='mutation_date' onChange={this.handleInputChange} value={this.state.mutation_date} />
                                </label>
                                <label>
                                    STATUS
                                    <select name='status' onChange={this.handleInputChange} value={this.state.status} >
                                        <option value="" disabled selected>Pilih Status</option>
                                        <option value="ACTIVE" >AKTIF</option>
                                        <option value="INACTIVE">TIDAK AKTIF</option>
                                    </select>
                                </label>


                            </div>
                        </div>
                        <div className='submit-btn'>
                            <input type="submit" className='kirim' value="Submit" />

                            <Link to="/pegawai" className='batal'>Batal</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Tambahpegawai;
