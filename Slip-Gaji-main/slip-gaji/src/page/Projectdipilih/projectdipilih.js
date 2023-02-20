import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './projectsdipilih.css';

function Projectdipilih() {
    return (
        <div className='content-wrapper'>
            <h1>SATPAM BRI</h1>
            <div className='table-section'>
                <div className='header'>
                    <Link to='/dashboard/pegawai/add'>Tambah</Link>
                    
                    <label>
                        Search :
                        <input type="text" />
                    </label>
                </div>
            </div>

                <table>
                    <thead>
                        <th  align="center">NO</th>
                        <th>EMPLOYEE</th>
                        <th>MUTATION DATE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </thead>
                    <tr>
                        <td align="center">1</td>
                        <td>Talitha Amalia</td>
                        <td>21/10/2021</td>
                        <td>Tidak Aktif</td>
                        <td className='action'><button className='btn-reset'><Link to='/dashboard/pegawai/add'>Ubah</Link></button>
                        <button className='btn-hapus'><Link to='/dashboard/pegawai/add'>Hapus</Link></button></td>
                    </tr>
                    <tr>
                    <td align="center">2</td>
                    <td>Nurul Khairunnisa</td>
                        <td>21/09/2021</td>
                        <td>Tidak Aktif</td>
                        <td className='action'><button className='btn-reset'><Link to='/dashboard/pegawai/add'>Ubah</Link></button>
                        <button className='btn-hapus'><Link to='/dashboard/pegawai/add'>Hapus</Link></button></td>
                        </tr>
                    <tr>
                    <td align="center">3</td>
                    <td>Joko Arwanto</td>
                        <td>21/08/2021</td>
                        <td>Aktif</td>
                        <td className='action'><button className='btn-reset'><Link to='/dashboard/pegawai/add'>Ubah</Link></button>
                        <button className='btn-hapus'><Link to='/dashboard/pegawai/add'>Hapus</Link></button></td>
                    </tr>
                    <tr>
                    <td align="center">4</td>
                    <td>Lia Setiawati</td>
                        <td>21/07/2021</td>
                        <td>Aktif</td>
                        <td className='action'><button className='btn-reset'><Link to='/dashboard/pegawai/add'>Ubah</Link></button>
                        <button className='btn-hapus'><Link to='/dashboard/pegawai/add'>Hapus</Link></button></td>
                    </tr>
                    <tr>
                    <td align="center">5</td>
                    <td>Zahra Nur Azizah</td>
                        <td>21/06/2021</td>
                        <td>Tidak Aktif</td>
                        <td className='action'><button className='btn-reset'><Link to='/dashboard/pegawai/add'>Ubah</Link></button>
                        <button className='btn-hapus'><Link to='/dashboard/pegawai/add'>Hapus</Link></button></td>
                    </tr>

                    <tr  class="pagination">
                    <td></td>
                    <td><a>Total Pegawai : 31</a></td>
                    <td></td>
                    <td><a>Row per page : 5</a></td>
                    <td>
                        <li><a href="#">Previous</a></li>
                        <li><a href="#" class="active">1</a></li>
                        <li><a href="#">Next</a></li></td>
                    </tr>
                <tfoot>
                    <div></div>
                </tfoot>

                </table>

        </div>
    )
}

export default Projectdipilih