import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const test_result = {
  1: 1,
  2: 2,
  3: 2,
  4: [0, 1],
  5: 0,
  6: 0,
  7: [0],
  8: 1,
  9: 0,
  10: 1,
};

const Graphs = () => {
  const pieChartRef = useRef(null);
  const barChartHairRef = useRef(null);
  const radarChartRef = useRef(null);
  const barChartWeightRef = useRef(null);

  const options = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF', // Set legend text color to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', // Set x-axis text color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Optional: Set x-axis gridline color
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF', // Set y-axis text color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Optional: Set y-axis gridline color
        },
      },
    },
  }
  useEffect(() => {
    // Menstrual Flow Pie Chart
    const pieChart = new Chart(pieChartRef.current, {
      type: 'pie',
      data: {
        labels: ['Light to Moderate', 'Very Heavy', 'Spotting or Very Light'],
        datasets: [
          {
            label: 'Menstrual Flow',
            data: [30, 50, 20],
            backgroundColor: ['rgb(79 70 229)', 'rgb(204 36 111)', 'rgb(37 99 235)'],
          },
        ],
      },
      options : {
        plugins: {
            legend: {
              labels: {
                color: '#FFFFFF', // Set legend text color to white
              },
            },
          },
      }
    });

    // Hair Growth Symptoms Bar Chart
    const barChartHair = new Chart(barChartHairRef.current, {
      type: 'bar',
      data: {
        labels: ['Facial Hair', 'Body Hair', 'Thinning Scalp Hair'],
        datasets: [
          {
            label: 'Percentage of Users',
            data: [60, 45, 35],
            backgroundColor: ['rgb(79 70 229)', 'rgb(204 36 111)', 'rgb(34 211 238)'],
          },
        ],
      },
      options : {
        plugins: {
            legend: {
              labels: {
                color: '#FFFFFF', // Set legend text color to white
              },
            },
          },
      }
    });

    // Fatigue & Mood Analysis Radar Chart
    const radarChart = new Chart(radarChartRef.current, {
      type: 'radar',
      data: {
        labels: ['Fatigue Frequency', 'Mood Swings', 'Energy Levels'],
        datasets: [
          {
            label: 'Fatigue & Mood Analysis',
            data: [3, 5, 2],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: '#6366F1',
            color: '#6366F1',
          },
        ],
      },
      options : {
        plugins: {
            legend: {
              labels: {
                color: '#FFFFFF', // Set legend text color to white
              },
            },
          },
      }
      
    });

    // Weight Gain Patterns Bar Chart
    const barChartWeight = new Chart(barChartWeightRef.current, {
        type: 'bar',
        data: {
          labels: ['Significant Gain', 'Mild Gain', 'No Change'],
          datasets: [
            {
              label: 'Percentage of Users',
              data: [40, 35, 25],
              backgroundColor: ['#F87171', '#FCD34D', '#34D399'],
            },
        ],
    },
    options : {
        plugins: {
            legend: {
              labels: {
                color: '#FFFFFF', // Set legend text color to white
              },
            },
          },
      }
      });
      

    // Cleanup on component unmount
    return () => {
      pieChart.destroy();
      barChartHair.destroy();
      radarChart.destroy();
      barChartWeight.destroy();
    };
  }, []);

  const interpretResults = () => {
    let interpretations = [];

    if (test_result[1] === 1) {
      interpretations.push('Your menstrual cycles are irregular, which is a common symptom of PCOD.');
    }
    if (test_result[2] === 2) {
      interpretations.push('Your period duration is longer than usual, which may indicate hormonal imbalance.');
    }
    if (test_result[3] === 2) {
      interpretations.push('You reported very heavy menstrual flow, a possible sign of PCOD or uterine health issues.');
    }
    if (test_result[4].includes(0) || test_result[4].includes(1)) {
      interpretations.push(
        'Symptoms like excess facial or body hair are linked to high androgen levels, often seen in PCOD.'
      );
    }
    if (test_result[5] === 0) {
      interpretations.push('Frequent acne breakouts suggest hormonal fluctuations.');
    }
    if (test_result[6] === 0) {
      interpretations.push('Significant weight gain, particularly around the abdomen, is common in PCOD.');
    }
    if (test_result[7].length > 0) {
      interpretations.push('Darkened skin patches could indicate insulin resistance, often associated with PCOD.');
    }
    if (test_result[8] === 1) {
      interpretations.push('Difficulty conceiving might be related to ovulation issues caused by PCOD.');
    }
    if (test_result[9] === 0) {
      interpretations.push('Frequent fatigue and mood swings may stem from hormonal imbalances.');
    }
    if (test_result[10] === 1) {
      interpretations.push('Family history of hormonal disorders increases your likelihood of PCOD.');
    }

    return interpretations;
  };

  return (
    <div className=" relative top-5 text-white rounded-3xl  space-y-8 ">
      <h1 className="text-2xl font-semibold text-white mb-4">Self-Assessment Results</h1>
<div className='grid grid-cols-2 gap-14 '>


      <div className='p-8 bg-dark-600  text-white rounded-3xl'>
        <h2 className="text-xl font-semibold text-white mb-4">Menstrual Flow Analysis</h2>
        <canvas ref={pieChartRef} className='p-6'></canvas>
      </div>

      <div className='p-8 bg-dark-600 text-white rounded-3xl'>
        <h2 className="text-xl font-semibold text-white mb-4">Hair Growth Symptoms</h2>
        <canvas ref={barChartHairRef}></canvas>
      </div>

      <div className='p-8 bg-dark-600 text-white rounded-3xl'>
        <h2 className="text-xl font-semibold text-white mb-4">Fatigue & Mood Analysis</h2>
        <canvas ref={radarChartRef}></canvas>
      </div>

      <div className='p-8 bg-dark-600 text-white rounded-3xl'>
        <h2 className="text-xl font-semibold text-white mb-4">Weight Gain Patterns</h2>
        <div className=''>
        <canvas ref={barChartWeightRef} />
        </div>
    
      </div>
      </div>
      <div className="mt-8 bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-lg font-semibold bg-primary_hard p-3 mb-5 rounded-2xl text-white-400 text-center ">Test Result Interpretation</h2>
        <ul className="list-disc ml-6 space-y-2">
          {interpretResults().map((interpretation, index) => (
            <li key={index}>{interpretation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Graphs;
