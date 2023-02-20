import { Component } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';
function Edit() {

    const { id } = useParams();

    return (
        <>
            <EditPgawai param={id} />
        </>
    );
}

class EditPgawai extends Component {
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
    handleImageShow = (img) => {
     

        axios.get(`http://localhost:8000/api/fileupload/getImage/${img}`)
        .then(res => {

           this.setState({baseurl: res.data.base_url});
           

        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            identity: this.state.identity,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            jenis_kelamin: this.state.jenis_kelamin,
            remember_token: this.state.remember_token,
            images: this.state.images,
            username: this.state.username,
            password: this.state.password,
            project_id: this.state.project_id,
            mutation_date: this.state.mutation_date,
            status: this.state.status,
        };



        axios.put(`http://localhost:8000/api/fullprofile/` + this.props.param, data).then(res => {
            window.location = "/pegawai";
        });



    }
    componentDidMount() {
        const param = this.props.param;
        
        axios.get(`http://localhost:8000/api/fullprofile/` + this.props.param)
            .then(res => {
                console.log('data full profile: ',res);
                const project = res.data.project;
                console.log('check null', project);
                const data = {
                    identity: res.data.data.identity,
                    name: res.data.data.name,
                    phone: res.data.data.phone,
                    email: res.data.data.email,
                    users_id: res.data.akun.users_id,
                    username: res.data.akun.username,
                    password: res.data.akun.password,
                    remember_token: res.data.akun.remember_token,
                    images: res.data.akun.image,
                    mutation_id: res.data.akun.mutation_id,
                    project_id:   project === null ? "" : project.project_id ,
                    mutation_date: project === null ? "" : project.mutation_date,
                    jenis_kelamin: res.data.data.jenis_kelamin,
                    status: project === null ? "" : project.status
                };
                this.handleImageShow(res.data.akun.image);
               
                

                for (const [key, value] of Object.entries(data)) {
                    this.setState({ [key]: value });
                }
               




            });
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {

                const project = res.data.data;
                this.setState({ project: project });

            });
      

      
    }


    render() {
        let imguri = this.state.baseurl
        
        const project = this.state.project;
        console.log("state : ", this.state);

        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>Update Akun Pegawai</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className='form'>
                            <div className='input-border'>
                                <label>
                                    IDENTITY
                                    <input name='identity' type="text" placeholder='Input NIK Pegawai' onChange={this.handleInputChange} value={this.state.identity} autocomplete="off" />
                                </label>
                                <label>
                                    NAME
                                    <input name='name' type="text" placeholder='Input Nama Pegawai' onChange={this.handleInputChange} value={this.state.name} autocomplete="off" />
                                </label>
                                <label>
                                    PHONE
                                    <input  name='phone' type="number" placeholder='08xxxxxxxxxxxx' onChange={this.handleInputChange} value={this.state.phone} autocomplete="off" />
                                </label>
                                <label>
                                    EMAIL
                                    <input name='email' type="email" placeholder='email@email.com' onChange={this.handleInputChange} value={this.state.email} autocomplete="off" />
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

export default Edit;