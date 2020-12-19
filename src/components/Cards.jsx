import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./Search-Box";
import "./card-style.css";
import "./Card-list.css";

export default function Cards() {
  const [alldata, setAllData] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    console.log("value");
    axios
      .get("https://www.hatchways.io/api/assessment/students")
      .then(function (response) {
        console.log(response);
        let arr = response.data.students;
        if (arr.length > 0) {
          for (let index = 0; index < arr.length; index++) {
            arr[index]["isShow"] = false;
            arr[index]["tags"] = [];
          }
        }
        setdata(response.data.students);
        setAllData(response.data.students);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  //

  const filterdata = (value) => {
    console.log(value);
    if (value) {
      setdata(
        data.filter((data) =>
        data.firstName.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setdata(alldata);
    }
  };
  const filterdataByTag = (value) => {
    console.log(value);
    if (value) {
      let dataContainer = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
        
        let ele = element.tags.filter((data) =>data.toLowerCase().includes(value.toLowerCase()))

        if(ele.length > 0){

          dataContainer.push(element)
        }

    }
      setdata(dataContainer);
    }else{
      setdata(alldata);
    }
    
  };
  const showDetail = (index) => {
    data[index]["isShow"] = !data[index]["isShow"];

    setdata([...data]);
  };
  const saveTag = (name , index) => {
    data[index]["tags"].push(name);
    setdata([...data]);
  };

  const _handleKeyDown = (e , index) => {
    if (e.key === 'Enter' && e.target.value) {
      saveTag(e.target.value , index)
      e.target.value = '';
    }
  } 

  return (
    <>
      <SearchBox
        placeHolder="Search by name"
        handleChange={(e) => {
          filterdata(e.target.value);
        }}
      />
      <SearchBox
        placeHolder="Search by tag"
        handleChange={(e) => {
          filterdataByTag(e.target.value);
        }}
      />
      <div className={"CardList"}>
        {data.map((item, key) => (
          <div key={key} className={"card-container student"}>
            <div className="buttonHolder">
              <button onClick={() => showDetail(key)}>
                {item.isShow ? "-" : "+"}
              </button>
            </div>
            <div>
              <img className="avatar" alt="Monster" src={item.pic} />
            </div>
            <h3>
              {item.firstName} {item.lastName}
            </h3>
            <span> Company: {item.company}</span>
            <span> City: {item.city}</span>
            <span>Email: {item.email}</span>

            <span>Skill: {item.skill}</span>

            <span>
              Average:{" "}
              {item.grades.reduce((a, b) => +a + +b, 0) / item.grades.length}%
            </span>

            {item["isShow"]
              ? <div>

                {item.grades.map((x, i) => (
                  <div>
                    <div key={i}>
                      Test {i}: {x} %
                    </div>
                  </div>
                  ))}

                  {item["tags"].map((tag, i) => (
                  <div>
                    <p className="tag"  key={i}>{tag}</p>
                   
                  </div>

                  ))}

                  <input type="text" className="add-tag" placeholder="Add a Tag"  onKeyDown={(e)=> _handleKeyDown(e , key)}/>

              </div> 

                : ""}
          </div>
        ))}
      </div>
    </>
  );
}
