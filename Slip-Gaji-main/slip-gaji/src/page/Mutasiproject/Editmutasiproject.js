import { Component } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import img from '../../assets/img/image 1.png';
import uploadicon from '../../assets/img/File upload.png';
function Editmutasiproject() {

    // const { idpegawai,id } = useParams();
    const param = useParams();

    return (
        <>
            <EditMutasi param={param} />
        </>
    );
}

class EditMutasi extends Component {
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

   
        axios.put(`http://localhost:8000/api/mutations/` + this.props.param.id, data).then(res => {
        console.log(this.props.param);    
        window.location = `/mutasiproject/${this.props.param.idpegawai}/${this.props.param.namepegawai}`;
        });



    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/projects`)
        .then(res => {
            
       


            const project = res.data.data;
            this.setState({ project: project });

        })
        

        axios.get(`http://localhost:8000/api/mutationbyid/`+this.props.param.id)
        .then(res => {
          
            const users = res.data.data;
          
             
                for (const [key, value] of Object.entries(users)) {
                    this.setState({ [key]: value });
                }


      
        })
    }
    render() {
        const param = this.props.params;
      
        const project = this.state.project;

        return (
            <div className='modal-form'>

                <div className='form-wrapper'>
                    <h1>EDIT MUTASI PROJECT TALITHA</h1>
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

                            <Link to={`/mutasiproject/${this.props.param.idpegawai}/${this.props.param.namepegawai}` } className='batal'>Batal</Link>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Editmutasiproject;