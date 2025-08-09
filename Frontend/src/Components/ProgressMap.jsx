import React, { useEffect, useState } from 'react'
import Dashboard_component_frames from './Dashboard_component_frames'
import { Bar } from 'react-chartjs-2';
import { useClockStore } from '../store/Clock';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getWeekdayIndex = () => {
  const date = new Date();
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // convert Sunday (0) to index 6
}
const ProgressMap = () => {
  const { fetchWeeklySessions } = useClockStore();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(Array(7).fill(0));
  useEffect(() => {
    setCurrentDayIndex(getWeekdayIndex());
    const load = async () => {
      const data = await fetchWeeklySessions();
      setWeeklyHours(data);
    };
    load();
  }, []);

  const filteredData = weeklyHours.map((val, index) => {
    if (index > currentDayIndex || val === 0) return null;
    return parseFloat(val.toFixed(2)); // round to 2 decimal places
  });
  const barColors = weekdays.map((_, index) => {
    if (index > currentDayIndex || filteredData[index] === null) return 'transparent';
    if (index === currentDayIndex) return '#FACC15'; // today - yellow
    return '#292416FF'; // past - dark gray/black
  });
  const data = {
    labels: weekdays,
    datasets: [
      {
        label: 'Working Hours',
        data: filteredData,
        backgroundColor: barColors,
        borderRadius: 50,
        barPercentage: 0.5,
        categoryPercentage: 0.6,
        borderSkipped: false,
      },
    ],
  };

  const formatToHoursMinutes = (decimalHours) => {
    if (!decimalHours || isNaN(decimalHours)) return '0h 0m';
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
  return (
  <>
    {hours}<sub className='ml-1 mr-2'>h</sub > {minutes}<sub className='ml-1'>m</sub>
  </>
);

  };

  return (
    <>
      <Dashboard_component_frames>
        <div className='w-full h-auto flex flex-col  xl:px-8 lg:px-6 px-4   gap-2'>
          <h2 className='font-bold  lg:text-2xl   md:text-2xl text-xl ml-2  '>Progress</h2>
          <div className='flex items-center justify-between w-full '>
            <div className='flex items-center  justify-start w-full font-semibold  gap-2 '>
              {/* no. of taks complted today  */}
              <h2 className=' px-2 py-1 flex items-center justify-center xl:text-xl lg:text-lg md:text-lg sm:text-lg text-lg rounded-full bg-[#FACC15]'>
                {formatToHoursMinutes(filteredData[currentDayIndex])}
              </h2>

              <p className=' xl:text-2xl lg:text-xl  md:text-xl sm:text-xl text-lg lg:font-bold font-semibold  '>Working Time</p>
            </div>


          </div>

          {/*  */}
          <div className=" rounded-xl w-full mt-4 lg:h-auto h-full">
            <div className="w-full relative lg:h-50 md:h-45  h-60 ">
              <Bar
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.raw ?? 0} hrs`,
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                        precision: 0,
                      },
                      grid: {
                        display: true,
                      },
                    },
                    x: {
                      grid: {
                        display: true,

                      },
                    },
                  },
                }}
              />
            </div>
          </div>



        </div>
      </Dashboard_component_frames>
    </>
  )
}

export default ProgressMap
