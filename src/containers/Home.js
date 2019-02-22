import React from "react";
import Offers from "../components/Offers";
import Pagination from "../components/Pagination";
// import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  state = {
    currentPageOffers: [],
    count: 0
  };

  componentDidMount = async () => {
    const url =
      "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=0&limit=25";
    const response = await axios.get(url);
    const offers = response.data.offers;
    const count = response.data.count;

    this.setState(
      {
        currentPageOffers: offers,
        count: count
      },
      () => {
        // console.log("ici", this.state.currentPageOffers);
      }
    );
  };

  getPage = async index => {
    const num = (index - 1) * 25;
    console.log("num", num);

    const current = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" +
        num +
        "&limit=25"
    );
    console.log("current", current.data.offers);
    this.setState({
      currentPageOffers: current.data.offers
    });
  };

  render() {
    return (
      <>
        <Offers offers={this.state.currentPageOffers} />
        <Pagination
          moveToPage={index => {
            this.getPage(index);
          }}
        />
      </>
    );
  }
}

export default Home;
