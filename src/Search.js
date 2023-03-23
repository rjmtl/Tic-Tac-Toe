//libs
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

//styles
import "./search.css";

//helpers
import { AUTH_TOKEN, SORT_BY_OPTIONS, truncate } from "./utils";

//assets
import Loader from "./assets/circle-loader.gif";
import Star from "./assets/stars.png";

function SearchField() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortby, setSortBy] = useState([SORT_BY_OPTIONS[0]]);

  useEffect(() => {
    //debouncing

    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getFilters=()=>{
    if(sortby.length===0) return "text-match";
    if(sortby.length===1) return sortby[0].value;
    let strings=sortby.map((value)=>value.value);
    return strings?.join("AND");
  }

  const handleOptionChange=(option)=>{
    setSortBy(option);
  }

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=${getFilters(sortby)}`,
        { Authorization: `Bearer${AUTH_TOKEN}` }
      );
      if(response.status===200){
        setSearchResults(response.data.items);
      }
    } catch (error) {
      alert(error.response.message)
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [sortby])

  return (
    <div className="main_container">
      <div className="content">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search public repositories"
          className="search-field"
        />
        <div>
          <div className="select-container">
            <Select placeholder="Sort By" options={SORT_BY_OPTIONS} onChange={(e) => handleOptionChange(e)} value={sortby} isMulti />
          </div>
        </div>
      </div>

      <div className="cards-container">
        {loading ? (
          <div>
            <img src={Loader} className="loader" alt="loading" />
          </div>
        ) : (
          <div className="results">
            {searchResults.map((result) => (
              <div key={result.id} className="card" onClick={()=>window.open(result.svn_url, '_blank')}>
                <img src={result.owner.avatar_url} alt="Avatar" className="avatar" />
                <div className="card-details">
                  <h3>{result.name}</h3>
                  <div className="star-container">
                    <img src={Star} className="star" alt="Stars"/>
                    <div>{result.stargazers_count}</div>
                  </div>
                  <div className="desc">
                    <div>{truncate(result.description, 50)}</div>
                  </div>
                </div>
                {result?.language ? <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${result?.language?.toLowerCase()}/${result?.language?.toLowerCase()}-original.svg`} className="logo" alt={result?.language} onerror="this.src='fallback-img.jpg'" /> : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchField;
