import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Title ,Tooltip, Legend);




function Graph1(props) {
    console.log('chart 1',props.pegawaiproject);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Jumlah Pegawai berdasarkan project'
            }
        }
    }

    const data = {
            // labels: ['Red', 'Blue', 'Yellow', 'Green'],
            labels: props.pegawaiproject.map((data)=> data.label),
            datasets: [
                {
                    label: '# of Votes',
                    data: props.pegawaiproject.map((data)=> data.value),
                    backgroundColor: [
                        'rgba(159, 190, 174, 1)',
                        'rgba(50, 110, 98, 1)',
                        'rgba(189, 57, 19, 1)',
                        'rgba(241, 210, 196, 1)',
                    ],
                    borderColor: [
                        'rgba(159, 190, 174, 1)',
                        'rgba(50, 110, 98, 1)',
                        'rgba(189, 57, 19, 1)',
                        'rgba(241, 210, 196, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    return( <Pie options={options} data={data} />
        

    );
}

export default Graph1;