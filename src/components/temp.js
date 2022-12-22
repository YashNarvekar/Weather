import React, {useState, useEffect}from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {

    const [serachValue, setserachValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});


    const getWeatherInfo = async () =>{
        try{
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${serachValue}&units=metric&appid=dc3b48f2ab2f5c605b1d15785e0b8ae6`;

            let res = await fetch(url);
            let data = await res.json();

            // console.log(data);
            // const {temp} = data.main;
            // console.log(temp);

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;


            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
              };
        
              setTempInfo(myNewWeatherInfo);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
     }, [])
    
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search...' autoFocus id="search" className='searchTerm' value={serachValue} onChange={(e)=> setserachValue(e.target.value)}/>

            <button className="searchButton" type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      
      
    </div>


    {/* our temp card */}

    <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp