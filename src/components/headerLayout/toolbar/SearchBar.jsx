import React, { createRef, useEffect, useRef, useState } from "react";
import { searchIcon } from "../../../assets/icons/png/toolbar1/data";
import "./toolbar.css";
import { downArrowIcon } from "../../../assets/icons/png/toolbar-icons/data";
import { searchProducts } from "../../../service/ProductServices";
import { CircularProgress } from "@mui/material";
import { Link, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { truncateString } from "../../../utils/DisplayFormatters";
function SearchBar() {
  const [focued, setFocued] = useState(false);

  const [categorybtn, setCategorybtn] = useState(false);
  const [categoryValue, setCategoryValue] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  // const [spanIndex, setSpanIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [matchingText, setMatchingText] = useState("");
  const inputRef = createRef();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState(false);
  const [query] = useDebounce(searchValue, 500);

  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const page = useMatch("/search");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
  }, [searchValue]);

  useEffect(() => {
    async function handelSearch() {
      setLoading(true);
      const category = categoryValue === "All Categories"?null:categoryValue;
      const results = await searchProducts(query,category);

      if (results?.length > 0) {
        const arr = [undefined, ...results];
        setSearchResults(arr);
        setLoading(false);
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    }
    handelSearch();
  }, [query]);

  useEffect(() => {
    if (page === null && !focued) {
      setSearchValue("");
    }
  }, [page, focued]);

  useEffect(() => {
    if (page?.pathname?.includes("search") && searchParams?.has("q")) {
      setSearchValue(removePlusSigns(searchParams.get("q")));
    }
  }, [page, searchParams]);

  const removePlusSigns = (searchValue) => {
    const formattedSearchValue = searchValue.replace(/\+/g, " ").trim();
    return formattedSearchValue;
  };

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
      name: "home & Gardening",
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
    {

      name:"Apparel & Accessories"
    }
  ]);

  const handelFocused = (e) => {
    setSuggestions(true);
    setFocued(true);
  };

  const handelBlured = (e) => {
    setFocued(false);
    inputRef.current.blur();
  };

  const handelCategory = (e) => {
    setCategorybtn(!categorybtn);
  };

  function existingCharToBold(inputString, sequence) {
    let result = "";
    let currentIndex = 0;

    for (let i = 0; i < inputString.length; i++) {
      if (inputString[i] === sequence[currentIndex]) {
        
        result += `<strong className=" tex-semibold tracking-wide">${inputString[i]}</strong>`;
        currentIndex++;

        if (currentIndex === sequence.length) {
          currentIndex = 0;
        }
      } else {
        result += inputString[i];
        currentIndex = 0;
      }
    }

    return result;
  }

  const generateModifiedSearchTerm = (value) => {
    const words = value.split(" ").filter(Boolean);

    const modifiedSearchTerm = words
      .map((word, index) => (index === words.length - 1 ? word : word + "+"))
      .join("");

    return modifiedSearchTerm;
  };

  const handleKeyDownn = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (focusedIndex === searchResults.length - 1) {
        setFocusedIndex(0);
        return;
      }
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (focusedIndex === 0) {
        setFocusedIndex(searchResults.length - 1);
        return;
      }
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (focusedIndex === -1) {
        if(matchingText === "") return;
        searchResultSelectHandler(matchingText);
      }
      if (focusedIndex === 0) {
        searchResultSelectHandler(matchingText);
      } else {
        searchResultSelectHandler(searchResults[focusedIndex]);
      }
    }
  };

  const handleSuggestionClick = (index) => {
    if (index === 0) {
      searchResultSelectHandler(matchingText);
    } else {
      searchResultSelectHandler(searchResults[index]);
    }
  };

  const searchResultSelectHandler = (value) => {
    setSearchValue(value);
    handelBlured();
    setFocusedIndex(-1);
    setSuggestions(false);
    navigate(`/search?q=${generateModifiedSearchTerm(value)}`);
  };

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
          placeholder="Type and hit enter..."
          onFocus={handelFocused}
          onBlur={handelBlured}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setMatchingText(e.target.value);
          }}
          className="search-input"
          onKeyDown={(e) => {
            // handelKeyDown(e, 0, matchingText);
            handleKeyDownn(e);
          }}
          value={searchValue}
          name="search"
          ref={inputRef}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          aria-autocomplete="off"
        />
      </div>

      <div
        className="category-holder flex justify-center text-sm text-slate-500 cursor-pointer border-l-2 pl-5 py-1 relative w-40 "
        onClick={handelCategory}
      >
        <div className="category-button">
          <button>{truncateString(categoryValue,15)}</button>
        </div>
        <div className="country-icon">
          <img
            src={downArrowIcon}
            className={`downarrow-icon-search ${
              categorybtn ? " rotate-180" : " rotate-0"
            } transition-all`}
          />
        </div>
        {categorybtn && !focued && (
          <div className="category-list-holder shadow-lg">
            <div className="category-list">
              {categoryList.map((category, index) => (
                <div
                  className="category-list-item"
                  key={index}
                  onClick={(e) => {
                    setCategoryValue(category.name);
                    handelCategory(e);
                    handleSuggestionClick(index);
                  }}
                >
                  <button>{category.name}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {suggestions && searchValue !== "" && (
        <div className="search-results shadow-xl">
          {loading ? (
            <div className="  bg-white top-20 flex py-4 w-full justify-center">
              <CircularProgress />
            </div>
          ) : searchResults.length > 0 ? (
            searchResults?.map((result, index) => {
              return index === 0 ? (
                searchValue !== "" && (
                  <div
                    className={`result-list ${
                      index === focusedIndex &&
                      "focused-suggestion cursor-pointer"
                    }`}
                    key={index}
                    onClick={(e) => {
                      handleSuggestionClick(index);
                    }}
                  >
                    <Link to={`/search`} className="flex">
                      <div className="search-icon mt-3 ml-3">
                        <img src={searchIcon} alt="" className="search-icon" />
                      </div>
                      <span className="search-contents">
                        <span>{matchingText}</span>
                        <span className="match-text"></span>
                        <span>&nbsp;-&nbsp;</span>
                        <span className=" text-slate-600">search</span>
                      </span>
                    </Link>
                  </div>
                )
              ) : (
                <div
                  className={`result-list ${
                    index === focusedIndex && "focused-suggestion"
                  }`}
                  key={index}
                  onClick={(e) => {
                    handleSuggestionClick(index);
                  }}
                >
                  {
                    <Link to={`/search`} className=" flex">
                      <div className="search-icon mt-3 ml-3">
                        <img src={searchIcon} alt="" className="search-icon" />
                      </div>
                      <span className="search-contents">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: existingCharToBold(result, searchValue),
                          }}
                        />
                      </span>
                      <span className="seperator">&nbsp;&nbsp;</span>
                      <span className="content-description">
                        <span></span>
                      </span>
                    </Link>
                  }
                </div>
              );
            })
          ) : (
            <div className=" flex w-full justify-center items-center py-8">
              <span className="search-contents">
                <span className=" italic font-semibold text-lg text-slate-400">
                  No Results
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
