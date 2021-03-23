import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import AutoComplete from './getAutocomplete'
import CompanyAnalysis from './CompanyAnalysis'
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";




var dict = require('../nyse-listed_json.json');


const Auto = () => {
  let history = useHistory();
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    setOptions(dict);
  }, []);

  useEffect(() => {
    if (symbol !== "") {
        history.push("/about", symbol);
    }
  }, [symbol]);



  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

//   const postCompany = () => {
//         const csrftoken = Cookies.get('csrftoken');
//         console.log(csrftoken);
//         // Axios.post(`http://127.0.0.1:8000/financialdata/`, {
//         //         'companyName': 'something'
//         //     },
//         //     {
//         //         headers: {
//         //         'Content-Type': 'application/json',
//         //         'X-CSRFToken': csrftoken
//         //         },
//         //         withCredentials: true,
//         //     }
//         // )
//         // .then(res => <CompanyAnalysis companyData=res />)
//         // .catch(error => console.error(error))

//         FinancialDataService.create({'Symbol': search})
//         .then(res => setSymbol(res));
//     }


  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        placeholder="Type to search"
        value={search}
        onChange={event => {
          if(AutoComplete.get(event.target.value).length > 0){
            setDisplay(true);
          }
          else{
            setDisplay(false);
          }
          setSearch(event.target.value);
          setOptions(AutoComplete.get(event.target.value))
        }}
        autoComplete="off"
      />
      {display && (
        <div className="autoContainer">
          <div className="labelbox"
          tabIndex="0">
            <span className="label">Name</span>
            <span className="label">Symbol</span>
          </div>
          {options
            .slice(0,5)
            .filter(value => {
              return value["Symbol"].indexOf("$") === -1
            })
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value["Symbol"])}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span className="company">{value["Company Name"]}</span>
                  <span className="symbol">{value["Symbol"]}</span>
                </div>
              );
            })
            }
        </div>
      )}
      <input className="button"
      type="submit" 
      value="Generate Report" 
      onClick={() => {setSymbol(search)}}
      />
    </div>
    
  );
};

export default function SearchPage(props) {
    return (
        <div className="App">
            <h1>Search Company</h1>
            <div className="logo"></div>
            <div className="auto-container">
                <Auto />
            </div>
        </div>
    );
  }