import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import Logo from "../components/Logo";
import { factory, getAccount } from "../contracts";
import JSONTree from "react-json-tree";

const Main = ({ contracts, homeTransactions }) => {
  const [home, setHome] = useState({});
  const [objects, setObjects] = useState("");
  const [price, setPrice] = useState(null);

  const createContract = async () => {
    const from = await getAccount();
    factory.methods.create(home.address, home.zip, home.city).send({ from });
  };

  useEffect(() => {
    if (!homeTransactions) {
      return;
    }
    (async () => {
      setObjects(
        await Promise.all(
          homeTransactions.map(homeTransaction => "TODO: replace me!")
        )
      );
    })();
  }, [homeTransactions]);

  return (
    <div className="Main">
      <Logo />
      <h1 className="Main-title">Contracts</h1>{" "}
      <div>
        <p>Enter the home details for the contract</p>
        <div class="Contract-form">
          <input
            className="Contract-formInput"
            placeholder="Address"
            onChange={e => setHome({ address: e.target.value })}
            value={home.address}
          />
          <input
            className="Contract-formInput"
            placeholder="Zip"
            onChange={e => setHome({ zip: e.target.value })}
            value={home.zip}
          />
          <input
            className="Contract-formInput"
            placeholder="City"
            onChange={e => setHome({ city: e.target.value })}
            value={home.city}
          />
          <input
            className="Contract-formInput"
            placeholder="Price"
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <p>{home.address}</p>
        <button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </button>
      </div>
      <div className="Contracts">
        {homeTransactions &&
          homeTransactions.map((homeTransaction, i) => (
            <Link to={`/${i}`} key={i}>
              <div className="Contract">
                <div className="Contract-content">
                  <div className="Contract-contentTitle">Contract {i}</div>
                  <span className="Contract-contentObject">{objects[i]}</span>
                </div>
                <span className="Contract-addr">
                  {homeTransaction.options.address}
                  <JSONTree data={homeTransaction} />
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Main;
