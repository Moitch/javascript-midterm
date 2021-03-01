import React from 'react';
import Header from '../shared/Header';
import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';




const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';
  const [data, setData] = useState([]);
  const dataSet = useMemo(() => data, [data]);

  const [filteredData, setFilteredData] = useState([]);
  const filteredDataSet = useMemo(() => filteredData, [filteredData]);

  useEffect(() => {
    axios.get(APILINK)
    .then(resp => {
      setData(resp.data);
      setFilteredData(resp.data)
    });
  }, []);

  const filter = event => {
    event.persist();
    const value = event.target.value;

    if (value.length === 0) {
      setFilteredData([...dataSet]);
    } else if (isNaN(value)) {
      const regex = new RegExp(value);
      setFilteredData([...dataSet.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
    } else {
      const num = Number(value);
      setFilteredData([...dataSet.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
    }
  };

  // const sort = event => {
  //   event.persist();
  //   const { name, type } = event.target.dataset;
    
  //   let sorted;
  //   if (type === "int")
  //     sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
  //   else
  //     sorted = data.sort((a, b) => {
  //       if (a[name].toLowerCase() < b[name].toLowerCase()) return -1;
  //       if (a[name].toLowerCase() > b[name].toLowerCase()) return 1;
  //       return 0;
  //     });

    // if (order) {
    //   sorted = sorted.reverse();
    //   setOrder(false);
    // } else {
    //   setOrder(true);
    // }

  //   setData([...sorted]);
  // };


  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>

      <div className="container">
        <h2>Data Table</h2>
        <hr/>
        
        <div className="row my-3 align-items-center justify-content-end">


          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            
            <input type="text" name="filter" className="form-control" onChange={filter}/>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>      
          </thead>

          <tbody>
          {filteredDataSet.map((data, i) => (
                <tr  key={i}>
                  <td>{data.userId}</td>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.body}</td>
                </tr>
       ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
 
export default Data;