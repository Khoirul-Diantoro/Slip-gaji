import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import warning from '../../assets/img/warning.png';
import { Link } from 'react-router-dom';
function DeletePegawai(props) {
    const [Deleteconfirm, setDeleteconfirm] = useState(0);
    const param = useParams();

    function HandleDelete() {
        axios.delete(`http://localhost:8000/api/fullprofile/` + param.id)
            .catch(function (error) {
                setDeleteconfirm(1);
                console.log('test');
            })
            .then(res => {
                console.log(res.data);
                setDeleteconfirm(2);

            })

    };
    if (Deleteconfirm === 1) {
        return (
            <div className='modal-form'>
                <div className='deleteButton'>
                    <div className='header-delete'>
                        <h1>PERINGATAN</h1>
                    </div>

                    <div className='deleteComponent'>
                        <div className='icon'><img src={warning} alt='icon warning' /></div>
                        <div className='confirmation'>
                            <p><b>TIDAK DAPAT MENGHAPUS PEGAWAI</b></p>
                            <div className='button-confirmation'>
                                <Link className='back' to={'/pegawai'}>Kembali</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (Deleteconfirm === 2) {
        return (
            <div className='modal-form'>
                <div className='deleteButton'>
                    <div className='header-delete'>
                        <h1>SUKSES</h1>
                    </div>

                    <div className='deleteComponent'>
                        <div className='icon'><img src={warning} alt='icon warning' /></div>
                        <div className='confirmation'>
                            <p className='berhasil'>BERHASIL MENGHAPUS PEGAWAI!</p>
                            <div className='button-confirmation'>
                                <Link className='back' to={'/pegawai'}>Kembali</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='modal-form'>
                <div className='deleteButton'>
                    <div className='header-delete'>
                        <h1>KONFIRMASI</h1>
                    </div>

                    <div className='deleteComponent'>
                        <div className='icon'><img src={warning} alt='icon warning' /></div>
                        <div className='confirmation'>
                            <p>Apakah Anda yakin ingin <b>MENGHAPUS</b> pegawai?</p>
                            <div className='button-confirmation'>
                                <button className='ok' onClick={HandleDelete}>Ya</button>
                                <Link className='back' to={'/pegawai'}>Kembali</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}



export default DeletePegawai;
