import { Component } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';
function EditProject() {

    const { id } = useParams();

    return (
        <>
            <Editprjct param={id} />
        </>
    );
}

class Editprjct extends Component {
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
        axios.put(`http://localhost:8000/api/projects/` + this.props.param, data).then(res => {
            window.location = "/project";
        });



    }
    componentDidMount() {
        const param = this.props.param;
   
        axios.get(`http://localhost:8000/api/projects/` + param)
            .then(res => {
                
                const users = res.data.data;
                for (const [key, value] of Object.entries(users)) {
                    this.setState({ [key]: value });
                }


            })
    }
    render() {
        const param = this.props.params;
        console.log(param);

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

export default EditProject;