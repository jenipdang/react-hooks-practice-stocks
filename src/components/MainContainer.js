import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks") 
    .then ((r) => r.json())
    .then ((data) => {
      setStocks(data)
    }) .catch((err) => {
      alert(err)
    })
  }, [])

  const handleAdd = (stock) => {
    setPortfolio(currentStocks => [...currentStocks, stock])
  }

  const handleRemove = (stockObj) => {
    setPortfolio((portfolio) => portfolio.filter((stock) => stock.id !== stockObj.id))
  }

  const sortStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name) //localeCompare return a # indicating whether a reference string comes before, after or same as the given string
    } else {
      return stock1.price - stock2.price
    }
  })

  const filterStocks = sortStocks.filter(
    (stock) => stock.type === filterBy
  )

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
        />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks} handleAdd={handleAdd} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} handleRemove={handleRemove}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
