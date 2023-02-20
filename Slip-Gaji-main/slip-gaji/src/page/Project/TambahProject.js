
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';



class Tambahproject
 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            dir_name: ""
        }
        
       
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
            
            name: this.state.name,
            dir_name: this.state.dir_name
        }

        console.log(data);
        axios.post(`http://localhost:8000/api/projects`, data).then(res => {
            window.location = "/project";
        });

   

    }
    render() {
        
        console.log(this.state);

        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>TAMBAH MUTASI PROJECT TALITHA</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className='form1'>
                            <div className='input-border'>
                                <label>
                                    PROJECT NAME
                                    <input type="text" name='name' onChange={this.handleInputChange} value={this.state.name}  />
                                </label>
                                <label>
                                    DIR NAME
                                    <input type="text" name='dir_name' onChange={this.handleInputChange} value={this.state.dir_name}  />
                                </label>


                            </div>
                        </div>
                        <div className='submit-btn'>
                            <input type="submit" className='kirim' value="Submit" />

                            <Link to={'/project'} className='batal'>Batal</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Tambahproject;
;
