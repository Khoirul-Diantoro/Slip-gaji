import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, redirect } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar/sidebar";
import Editprofile from "./page/Editprofile/Editprofile";
import Pegawai from "./page/Pegawai/pegawai";
import AddPegawai from "./page/Pegawai/tambahpegawai";
import Edit from "./page/Pegawai/Editpegawai";
import Slipgaji from './page/Slip Gaji/Slipgaji';
import Editslipgaji from './page/Slip Gaji/Editslipgaji';
import Tambahslipgaji from './page/Slip Gaji/Tambahslipgaji';
import Detailslipgaji from "./page/Slip Gaji/Detailslipgaji";
import Slipgajipegawai from "./page/Pegawai/Slipgajipegawai";
import Mutasiproject from "./page/Mutasiproject/Mutasiproject";
import Tambahmutasiproject from "./page/Mutasiproject/Tambahmutasiproject";
import Editmutasiproject from "./page/Mutasiproject/Editmutasiproject";

import ListProject from "./page/Project/ListProject";
import Tambahproject from "./page/Project/TambahProject";
import EditProject from "./page/Project/EditProject";
import Delete from "./uielement/Delete";
import DeletePegawai from "./page/Pegawai/DeletePegawai";
import DeleteProject from "./page/Project/DeleteProject";
import DeleteMutasi from "./page/Mutasiproject/DeleteMutasi";
import DashboardKaryawan from "./page/Nonadmin/DashboardKaryawan";
import SidebarPegawai from "./sidebar/SidebarPegawai";
import SlipgajiKaryawan from "./page/Nonadmin/SlipgajiKaryawan";
import EditprofilePegawai from "./page/Nonadmin/EditProfilePegawai";
import Coba from "./uielement/Coba";
import Deleteslipgaji from "./page/Slip Gaji/Deleteslipgaji";
import useData from "./useData";





function App() {

    const [token, setToken] = useData('token');
    const [data, setData] = useData('important');
    // const [token, setToken] = useState('');
    // const [data, setData] = useState('');

    // const [rememberMe, setRememberMe] = useLocal('remember');



    if (!token) {

        // return <Login setToken={setToken} setData={setData} rememberMe={setRememberMe} />;
        // return <Login setToken={setToken} setData={setData} />;
        return <Login />;

    }
    else {

        const role = data.role_id;
        if (role === 1) {
            return (
                <Router>
                    <Routes>




                        <Route path="/" element={<Sidebar />}>

                            <Route path="" element={<Dashboard />} />

                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="editprofile" element={<Editprofile />} />
                            {/* Pegawai */}
                            <Route path="pegawai" element={<Pegawai />}>
                                <Route path="add" element={<AddPegawai />} />
                                <Route path="edit/:id" element={<Edit />} />

                                <Route path="mutasi/:id" element={<Edit />} />
                                <Route path="delete/:id" element={<DeletePegawai />} />



                            </Route>

                            <Route path="pegawai/slipgaji/:id/:namapegawai" element={<Slipgajipegawai />} />
                            {/* Slip Gaji */}
                            <Route path="slipgaji" element={<Slipgaji />}>
                                <Route path="add" element={<Tambahslipgaji />} />
                            </Route>
                            <Route path="slipgaji/:projectname/:month/:year/:idproject" element={<Detailslipgaji />} >
                                <Route path="edit/:id" element={<Editslipgaji />} />
                                <Route path="delete/:id" element={<Deleteslipgaji />} />
                            </Route>
                            {/* Mutasiproject */}
                            <Route path="mutasiproject/:idpegawai/:namepegawai" element={<Mutasiproject />}>
                                <Route path="add" element={<Tambahmutasiproject />} />
                                <Route path="edit/:id" element={<Editmutasiproject />} />
                                <Route path="delete/:id" element={<DeleteMutasi />} />


                            </Route>
                            {/* Project */}
                            <Route path="project" element={<ListProject />}>
                                <Route path="add" element={<Tambahproject />} />
                                <Route path="edit/:id" element={<EditProject />} />
                                <Route path="delete/:id" element={<DeleteProject />} />


                            </Route>







                        </Route>




                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />

                    </Routes>
                </Router>


            );
        }
        else if (role === 2) {
            return (
                <Router>
                    <Routes>


                        {/* Akses  Dashboard karyawan salin localhost:3000/karyawan/dashboard */}
                        <Route path="/" element={<SidebarPegawai />}>

                            <Route path="" element={<DashboardKaryawan />} />
                            <Route path="dashboard" element={<DashboardKaryawan />} />
                            {/* Akses  Slip Gaji karyawan localhost:3000/karyawan/slipgaji */}
                            <Route path="slipgaji" element={<SlipgajiKaryawan />} />
                            <Route path="edit" element={<EditprofilePegawai />} />




                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />

                    </Routes>
                </Router>


            );
        }
    }








}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
