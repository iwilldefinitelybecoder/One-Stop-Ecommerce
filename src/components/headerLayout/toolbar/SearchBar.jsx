import React, { createRef, useEffect, useState } from "react";
import { searchIcon } from "../../../assets/icons/png/toolbar1/data";
import "./toolbar.css";
import { downArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
function SearchBar() {
  const [focued, setFocued] = useState(false);
  const [categorybtn, setCategorybtn] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  const [spanIndex, setSpanIndex] = useState(0);
  const [matchingText, setMatchingText] = useState({title:searchValue,description:"Search"});
  const inputRef = createRef();

  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      title: "abhi",
      description: "he is a hero",
    },
    {
      id: 1,
      title: "ayush",
      description: "he is a lowda",
    },
    {
      id: 2,
      title: "adddy",
      description: "he is a gandu",
    },
    {
      id: 2,
      title: "aaddy",
      description: "he is a gandu",
    },
    {
      id: 2,
      title: "adddya",
      description: "he is a gandu",
    },
  ]);

  const spanRefs = searchResults.map(() => createRef());

  const [categoryList, setCategoryList] = useState([
    {
      name: "All Categories",
    },
    {
      name: "Cloths",
    },
    {
      name: "Electronics",
    },
    {
      name: "Home & Garden",
    },
    {
      name: "Health & Beauty",
    },
    {
      name: "Groceries",
    },
    {
      name: "Automotive",
    },
  ]);

  const handelFocused = (e) => {
    setFocued(true);
  };

  const handelBlured = (e) => {
    setFocued(false);
  };

  const handelCategory = (e) => {
    setCategorybtn(!categorybtn);
  };

  const handelResultClick = (e, result, index) => {
    e.preventDefault();
    setSearchValue(result.title, result.description);
    spanRefs[index].current.focus();
  };

  const handelKeyDown = (e,index,result) => {
   
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        handelArrowUp(e,index,result);
        break;

      
      case "ArrowDown":
        e.preventDefault();
        handelArrowDown(e,index,result);
        break;

      
      case "Enter": 
        e.preventDefault();
        handelEnter(e,index,result)
        break;
      
      default:
        handelFocusBack(e,index,result);
    }

    
  };

  const handelEnter = (e,index,result) => {
    setSearchValue(result.title, result.description);
    setMatchingText(result);
    inputRef.current.focus();
  }

  const handelFocusBack = (e,index,result) => {
    inputRef.current.focus();
  }

  const handelArrowUp = (e,index,results) => {
 
    if (index >= 0) {
      spanRefs[index].current.focus();
      handelResultClick(e,results,index)
      if (index === 0) {
        setSpanIndex(spanRefs.length - 1);
        return;
      }
      const nextIndex = index - 1;
      setSpanIndex(nextIndex);
    }
  }

  const handelArrowDown = (e,index,results) => {
    if (index < spanRefs.length) {
      spanRefs[index].current.focus();
      handelResultClick(e,results,index)
      if (index === spanRefs.length - 1) {
        setSpanIndex(0);
        return;
      }
      const nextIndex = index + 1;
      setSpanIndex(nextIndex);
    }
  }

  return (

      <div
        className="search-content-holder ring-1 ring-slate-300 flex rounded-3xl space-x-4 px-4 py-2  mt-1 shadow-md "
        style={{
          border: focued ? "1px solid  #e94560" : "1px solid #e9456000",
        }}
      >
        <div className="search-icon mt-0.5">
          <img src={searchIcon} alt="" className="search-icon" />
        </div>
        <div className="input-holder">
          <input

            type="text"
            placeholder="Search and hit enter..."
            onFocus={handelFocused}
            onBlur={handelBlured}
            onChange={(e) =>{ setSearchValue(e.target.value);setMatchingText({title:e.target.value,description:"search"})}}
            className="search-input"
            onKeyDown={(e) => {handelKeyDown(e,0,matchingText)}}
            value={searchValue}
            name="search"
            ref={inputRef}
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
        
        
        <div
          className="category-holder flex justify-center text-sm text-slate-500 cursor-pointer border-l-2 pl-5 py-1 relative w-40 "
          onClick={handelCategory}
          
        >
          <div className="category-button">
            <button>{categoryValue}</button>
          </div>
          <div className="country-icon">
            <img src={downArrowIcon} className={`downarrow-icon-search ${categorybtn?' rotate-180':' rotate-0'} transition-all`} />
          </div>
          {categorybtn && !focued && (
            <div className="category-list-holder shadow-lg" >
              <div className="category-list">
                {categoryList.map((category,index) => (
                  <div
                    className="category-list-item"
                    key={index}
                    onClick={(e) => {
                      setCategoryValue(category.name);
                      handelCategory(e);
                    }}
                    
                  >

                    <button>{category.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {searchResults.length > 0 && searchValue !== "" && 
          <div className="search-results shadow-xl">
            {searchResults &&
              searchResults?.map((result, index) => {
                return(
                index === 0
                 ? searchValue !==""&&(
                  <div
                    className="result-list"
                    key={index}
                    onClick={(e) => {
                      handelResultClick(e, matchingText, index);
                    }}
                    onKeyDown={(e) => {
                      handelKeyDown(e, spanIndex, matchingText);
                    }}
                    tabIndex={index}
                    ref={spanRefs[index]}
                  >
                    <a href="" className=" flex">
                      <div className="search-icon mt-3 ml-3">
                        <img src={searchIcon} alt="" className="search-icon" />
                      </div>
                      <span className="search-contents">
                        <span>{matchingText.title}</span>
                        <span className="match-text"></span>
                        <span>&nbsp;-&nbsp;</span>
                        <span className=" text-slate-600">{matchingText.description}</span>
                      </span>
                    </a>
                  </div>
                ) : (
                  <div
                    className="result-list"
                    key={index}
                    onClick={(e) => {
                      handelResultClick(e, result, index);
                    }}
                    onKeyDown={(e) => {
                      handelKeyDown(e, spanIndex, result);
                    }}
                    tabIndex={index}
                    ref={spanRefs[index]}
          
                  >
                    <a href="" className=" flex">
                      <div className="search-icon mt-3 ml-3">
                        <img src={searchIcon} alt="" className="search-icon" />
                      </div>
                      <span className="search-contents">
                        <span>{result.title}</span>
                        <span className="match-text">hello</span>
                      </span>
                      <span className="seperator">&nbsp;&nbsp;</span>
                      <span className="content-description">
                        <span>{result.description}</span>
                      </span>
                    </a>
                  </div>
                )
              )
              })}
          </div>
        
        }
      
      </div>
    
  );
}

export default SearchBar;
