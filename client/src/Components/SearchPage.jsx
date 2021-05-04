import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import AutoComplete from './getAutocomplete'
import { Redirect } from "react-router-dom";

var dict = require('../wilshire5000.json');

export default function SearchPage() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
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

  const updateSearchBar = symbol => {
    setSearch(symbol);
    setDisplay(false);
  };

  if(symbol){
    var url = "/about/" + String(symbol);
    return <Redirect push to={url}/>
  }

  return (
    <div className="App">
    <h1>Search Company</h1>
    <div className="auto-container"></div>
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        placeholder="Type to search"
        value={search}
        onChange={event => {
          if(AutoComplete.findMatches(event.target.value).length > 0){
            setDisplay(true);
          }
          else{
            setDisplay(false);
          }
          setSearch(event.target.value);
          setOptions(AutoComplete.findMatches(event.target.value))
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
                  onClick={() => updateSearchBar(value["Symbol"])}
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
    </div>);

  }