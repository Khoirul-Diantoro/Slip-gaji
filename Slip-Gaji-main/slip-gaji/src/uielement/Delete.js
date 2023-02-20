import React, { useState } from 'react';
import './Delete.css';
import warning from '../assets/img/warning.png';
function Delete(props) {
    const [Deleteconfirm, setDeleteconfirm] = useState(0);
    const [Data, setData ] = useState([
        {}
    ])
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
                            <p><b>TIDAK DAPAT MENGHAPUS PROJECT</b> karena masih terdapat status “Aktif”</p>
                            <div className='button-confirmation'>
                                <button className='ok' onClick={() => setDeleteconfirm(0)}>Kembali</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (Deleteconfirm === 2){
        return (
            <div className='modal-form'>
                <div className='deleteButton'>
                    <div className='header-delete'>
                        <h1>SUKSES</h1>
                    </div>

                    <div className='deleteComponent'>
                        <div className='icon'><img src={warning} alt='icon warning' /></div>
                        <div className='confirmation'>
                            <p className='berhasil'>BERHASIL MENGHAPUS PROJECT!</p>
                            <div className='button-confirmation'>
                                <button className='back' onClick={() => setDeleteconfirm(0)}>Kembali</button>
                                
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
                            <p>Apakah Anda yakin ingin <b>MENGHAPUS</b> akun?</p>
                            <div className='button-confirmation'>
                                <button className='ok' onClick={() => setDeleteconfirm(1)}>Ya</button>
                                <button className='back'>TIDAK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}



export default Delete;
