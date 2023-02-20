import React from "react";
import { Link, Navigate } from "react-router-dom";
import './Editprofile.css';
import SelectofImg from '../../assets/img/Select.png';
import uploadImg from '../../assets/img/File upload.png';
import avatarImg from '../../assets/img/image 1.png';
import axios from "axios";


class Editprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            konfpass: "",
            role: false,
            jenis_kelamin: false,
            baseurl: '',
            image: '',
            notmatch: false

        }

        this.onChangeform = this.onChangeform.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

    }


    onChangeform(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(name + ' : ' + value);
        this.setState({ [name]: value });

    }
    handleSubmit(event) {
        
        event.preventDefault();
        if (this.state.password !== this.state.konfpass) {
            this.setState({notmatch:  true});
            return 0;
        }
        this.setState({notmatch: false});
        const data = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));

        let role = this.state.role === true ? 1 : 2;
        const user = {
            username: this.state.username,
            password: this.state.password,
            role_id: role,
            employee_id: this.state.employee_id,
            image: this.state.image,
            id_user: this.state.id,
            jenis_kelamin: this.state.jenis_kelamin ? "WANITA" : "PRIA",
            nama_lengkap: this.state.name


        };
        axios.put(`http://localhost:8000/api/users/${data.id}`, user).then(res => {
            console.log(res);
            window.location = "/";




        })


    }


    handleFileChange(event) {
        const target = event.target.files[0];
        let formData = new FormData();
        console.log('test', target.name);
        formData.append('file_upload', target, target.name)
        axios.post(`http://localhost:8000/api/upload/uploadImage`, formData).then(res => {


            console.log("file:", res);
            this.setState({
                image: res.data.filename,
                baseurl: res.data.base_url

            });

        });
    }
    handleImageShow = (img) => {


        axios.get(`http://localhost:8000/api/fileupload/getImage/${img}`)
            .then(res => {

                this.setState({ baseurl: res.data.base_url });


            });
    }
    componentDidMount() {
        const data = localStorage.getItem('important') === null ? JSON.parse(sessionStorage.getItem('important')) : JSON.parse(localStorage.getItem('important'));
        console.log('data: ', data);

        axios.get(`http://localhost:8000/api/users/${data.id}`)
            .then(res => {
                console.log('res :', res);
                let role = res.data.data.role_id === 1 ? true : false;
                this.handleImageShow(res.data.data.image);
                this.setState({

                    name: res.data.data.employee.name,
                    username: res.data.data.username,
                    password: res.data.data.password,
                    role: role,
                    employee_id: res.data.data.employee_id,
                    image: res.data.data.image,
                    jenis_kelamin: res.data.data.employee.jenis_kelamin === "WANITA" ? true : false,

                    
                });


            })
    }
    handlematchpassword(notmatch) {
        this.setState({notmatch: !notmatch})
    }
    render() {
        console.log(this.state);

        return (
            <div className="editprofile-wrapper">
                <h1>MY PROFILE</h1>
                {this.state.notmatch === true && <h1 onClick={()=> this.handlematchpassword(this.state.notmatch)}>Password tidak sama dengan konfirmasi</h1>}

                <form className="form-wrapper1" onSubmit={this.handleSubmit}>
                    <div className="input2">

                        <label editprofile="yes"><h2>NAMA LENGKAP</h2> <input type='text' name="name" value={this.state.name} onChange={this.onChangeform} /></label>
                        <label editprofile="yes"><h2>USERNAME</h2> <input type='text' name="username" value={this.state.username} onChange={this.onChangeform} /></label>
                        <label editprofile="yes"><h2>PASSWORD</h2> <input type='password' name="password" value={this.state.password} onChange={this.onChangeform} /></label>
                        <label editprofile="yes"><h2>KONFIRMASI PASSWORD</h2> <input type='password' name="konfpass" value={this.state.konfpass} onChange={this.onChangeform} /></label>
                        <label editprofile="yes">
                            <h2>ROLE</h2>
                            <div className="checkmark-info">
                                <div className={this.state.role ? 'checkmark active' : 'checkmark'}>
                                    <img src={SelectofImg} alt='role' />
                                </div>
                                <input type='checkbox' name="role" checked={this.state.role} onChange={this.onChangeform} alt="role" />ADMIN</div></label>
                        <label editprofile="yes">
                            <h2>JENIS KELAMIN</h2>
                            <div className="checkmark-info">
                                <div className={this.state.jenis_kelamin ? 'checkmark active' : 'checkmark'}>
                                    <img src={SelectofImg} alt="jenis-kelamin" />

                                </div>
                                <input type='checkbox' checked={this.state.jenis_kelamin} onChange={this.onChangeform} name="jenis_kelamin" />PEREMPUAN</div>
                        </label>
                    </div>
                    <div className="file-input">
                        <div className="file-upload">
                            <img src={this.state.baseurl === '' ? avatarImg : this.state.baseurl} alt="avatarimg" width="150px" height="160px" />
                            <h2>gambar-profil.jpeg</h2>
                            <div className="file-upload-section">
                                <input type='file' onChange={this.handleFileChange} />
                                <div className="file-upload-logo"><img src={uploadImg} alt="icon-upload" />PILIH FILE</div>
                            </div>



                        </div>

                    </div>


                    <div className="submit">
                        <button type="submit">Simpan</button>
                        <Link to='/dashboard'>Batal</Link>
                    </div>
                </form>

            </div>

        );
    }
}
export default Editprofile;