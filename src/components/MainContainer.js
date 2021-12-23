import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])

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
    // setPortfolio(portfolio => )
    setPortfolio((portfolio) => portfolio.filter((stock) => stock.id !== stockObj.id))
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleAdd={handleAdd} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} handleRemove={handleRemove}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
