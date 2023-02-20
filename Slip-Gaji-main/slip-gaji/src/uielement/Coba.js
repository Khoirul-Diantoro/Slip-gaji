import './coba.css';
import img from '../assets/img/image 1.png';
import uploadicon from '../assets/img/File upload.png';
import React, { Component } from 'react';

export default class Coba extends Component {
    render() {
        return (
            <div className='file-upload1'>
                <h1>PROFILE PICTURE</h1>
                <div className='uploadfile-inside'>
                    <div className='uploadfile-section'>
                        <div className='file-inputs'>
                            <input type="file" />
                            <button><img src={uploadicon} alt="uploadicon" />PILIH FILE</button>

                        </div>
                        <div>Maximum upload file size: 2 MB
                            File format type: png/jpg</div>


                    </div>
                    <img src={img} alt='profilepict' width="20px" height="20px" />


                </div>



            </div>
        )
    }
}
