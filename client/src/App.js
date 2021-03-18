import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import AutoComplete from './Components/getAutocomplete'
import FinancialDataService from './Services/financialdata.service'
import Axios from "axios";
import Cookies from 'js-cookie';
var dict = require('./test.json');





const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    // const pokemon = [];
    // const promises = new Array(20)
    //   .fill()
    //   .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    // Promise.all(promises).then(pokemonArr => {
    //   return pokemonArr.map(value =>
    //     value
    //       .json()
    //       .then(({ name, sprites: { front_default: sprite } }) =>
    //         pokemon.push({ name, sprite })
    //       )
    //   );
    // });

    // console.log(pokemon);
    
    setOptions(dict);
  }, []);

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

  const postCompany = () => {
    const csrftoken = Cookies.get('csrftoken');
    console.log(csrftoken);
    // Axios.post(`http://127.0.0.1:8000/financialdata/`, {
    //         'companyName': 'something'
    //     },
    //     {
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': csrftoken
    //         },
    //         withCredentials: true,
    //     }
    // )
    // .then(res => console.log(res))
    // .catch(error => console.error(error))

    FinancialDataService.create({'companyName': search})
    .then(res => console.log(res))
    .catch(error => console.error(error))


    // axios({
    //   method: "post",
    //   url: "http://endpointurl",
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRF-TOKEN': localStorage.getItem('xsrftoken'),
    //     'csrftoken': localStorage.getItem('csrftoken')
    //     // 'XSRF-TOKEN': localStorage.getItem('userToken')
    //   },
    //   data: {
    //     name: this.state.name,
    //   }
    // }).then(res => {
    //       console.log(res);
    //       console.log(res.data);
    // })
    
    // fetch('http://127.0.0.1:8000/financialdata/', {
    //   credentials: 'include',
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': csrftoken
    //   },
    //   body: {'companyName': "example"}
    //  })
    }
  


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
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value["Company Name"])}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span className="company">{value["Company Name"]}</span>
                  <span className="symbol">{value["ACT Symbol"]}</span>
                </div>
              );
            })}
        </div>
      )}
      <input className="button"
      type="submit" 
      value="Generate Report" 
      onClick={() => {postCompany()}}
      />
    </div>
    
  );
};

function App() {
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

export default App;