import {useEffect, useState} from "react";
function useData(key) {
    const getDatafromSess = (key) => {
       
        const data = localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key))  : JSON.parse(sessionStorage.getItem(key));
        
        if (data) {
            return data;
        }
        return null;
    }
    const [data, setData] = useState(() => getDatafromSess(key));
    // const setDatatosess = (key, data) => {
    //     console.log('useEffect : ', data);
    //     const dataInsert = JSON.stringify(data);
    //     localStorage.getItem('remember') ? localStorage.setItem(key, dataInsert) : sessionStorage.setItem(key, dataInsert);
        
    // }
    // useEffect(() => {
    //     console.log('ini telah dirender');
    //     setDatatosess(key, data);

    // }, [data]);

    return [
        data
    ]

}
export default useData;