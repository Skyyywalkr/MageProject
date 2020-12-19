import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import SearchBox from './Search-Box'
import './card-style.css'
import './Card-list.css'






export default function Cards() {

    const [data, setdata] = useState([]);
    const [ searchField, setsearchField] = useState('');
    

  useEffect( ()=> {

    axios.get('https://www.hatchways.io/api/assessment/students')
    .then(function (response) {
        console.log(response);
      setdata(response.data.students)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  }
  );

//

const filterdata = data.filter(
    data => data.city.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
        <>
        <SearchBox  
        placeHolder='Search Monster'  
        handleChange ={e => setdata({searchField : e.target.value})}/>
        <div className={'CardList'}>
           
           
            {
                data.map(data1 => (
                    <div className={'card-container'}>
                   <div><img alt='Monster' src={data1.pic}/></div>
                    <div>{data1.city}</div>
                      </div> 
                    )
                )
            }
            
        </div>
</>
    )
}