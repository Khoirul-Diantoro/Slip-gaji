import { Link } from "react-router-dom";
import './login.css';
import logo from "./assets/img/Blob.png";
import logo_title from "./assets/img/icon-title.png";
import mark from "./assets/img/checked.png";
import React, { useState, useEffect, Component } from "react";
import axios from "axios";


function useLocal(key) {
    const getDatafromSess = (key) => {
        const data = JSON.parse(localStorage.getItem(key));
        console.log('data', data);
        if (data) {
            return data;
        }
        return false;
    }
    const [data, setData] = useState(() => getDatafromSess(key));
    const setDatatosess = (key, data) => {
        console.log('useEffect : ', data);
        const dataInsert = JSON.stringify(data);
        localStorage.setItem(key, dataInsert);
    }
    useEffect(() => {
        console.log('ini telah dirender');
        setDatatosess(key, data);

    }, [data]);

    return [
        data, setData
    ]

}
function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useLocal('remember');
    const [message, setMessage] = useState('');
   
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handlesubmit');
        const data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:8000/api/auth/login', data).catch(function (error) {
            console.log("error :", error);
            setMessage(error.response.data.message);
        }).then(function (res) {
            console.log("res", res);
           
        
            // props.setToken(res.data.token);
            // props.setData(res.data.data);
            rememberMe === false ? sessionStorage.setItem('token', JSON.stringify(res.data.token)) : localStorage.setItem('token', JSON.stringify(res.data.token));
            rememberMe === false ? sessionStorage.setItem('important', JSON.stringify(res.data.data)) : localStorage.setItem('important', JSON.stringify(res.data.data));
            window.location.reload();
           
           
           
        })
       

    }
    return (
        <div className="wrapper">
            <form className="login-box" onSubmit={handleSubmit}>
                <div className="login-title">
                    <img src={logo_title} alt="logo sign in" />
                    <h1>Sign In</h1>
                </div>
                <div className="login-input">
                    {message !== null &&


                        <div className

                            ="input-text">
                            <h3>{message}</h3>
                          
                        </div>}
                    <div className

                        ="input-text">
                        <h3>Email</h3>
                        <input type="text" className="form-control" placeholder="Masukkan Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-text">
                        <h3>Password</h3>
                        <input type="password" className="form-control" placeholder="masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <label className='rmbr-me'>
                        <input type="checkbox" className="form-control" name="check" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                        <div className={rememberMe ? 'checkmark active' : 'checkmark'}><img src={mark} alt="mark" className={rememberMe ? 'active' : ''} />

                        </div>
                        <h3 className={rememberMe ? 'active' : ''}>Remember me</h3>

                    </label>


                </div>
                <div className="login-btn">
                    <button style={{cursor: 'pointer'}}>Log in</button>


                </div>


            </form>
            <div className="logo-box">
                <img src={logo} alt="logo" />

            </div>


        </div>

    );
}
// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             rememberMe: false
//         }
//         console.log(this.state);

//         this.handleStatusChange = this.handleStatusChange.bind(this);

//     }
//     handleStatusChange() {
//         this.setState((status) => ({
//             rememberMe: !status.rememberMe
//         }));

//     }
//     render() {
//         return (
//             <div className="wrapper">
//                 <div className="login-box">
//                     <div className="login-title">
//                         <img src={logo_title} alt="logo sign in" />
//                         <h1>Sign In</h1>
//                     </div>
//                     <div className="login-input">
//                         <div className

//                             ="input-text">
//                             <h3>Email</h3>
//                             <input type="text" className="form-control" placeholder="Masukkan Email" />
//                         </div>
//                         <div className="input-text">
//                             <h3>Password</h3>
//                             <input type="password" className="form-control" placeholder="masukkan password" />
//                         </div>
//                         <label className='rmbr-me'>
//                             <input type="checkbox" className="form-control" name="check" checked={this.state.rememberMe} onChange={this.handleStatusChange} />
//                             <div className={this.state.rememberMe ? 'checkmark active' : 'checkmark'}><img src={mark} alt="mark" className={this.state.rememberMe ? 'active' : ''} />

//                             </div>
//                             <h3 className={this.state.rememberMe ? 'active' : ''}>Remember me</h3>

//                         </label>


//                     </div>
//                     <div className="login-btn">

//                         <Link to="/dashboard">Log in</Link>
//                     </div>


//                 </div>
//                 <div className="logo-box">
//                     <img src={logo} alt="logo" />

//                 </div>


//             </div>

//         );
//     }
// }

export default Login;
