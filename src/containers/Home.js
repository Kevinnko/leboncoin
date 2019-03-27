import React from "react";
import Offers from "../components/Offers";
import Pagination from "../components/Pagination";
// import { Link } from "react-router-dom";
import axios from "axios";

const limit = 25;

class Home extends React.Component {
  state = {
    currentPageOffers: [],
    count: 0,
    page: 1,
    totalPages: 0,
    pagesTab: []
  };

  updatePagesNum = () => {
    let newTab = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      newTab.push(i + 1);
    }
    this.setState({
      pagesTab: newTab
    });
  };

  componentDidMount = async () => {
    const url =
      "https://api-leboncoin.herokuapp.com/api/offer/with-count?skip=0&limit=25";
    const response = await axios.get(url);
    const offers = response.data.offers;
    const count = response.data.count;
    this.setState(
      {
        currentPageOffers: offers,
        count: count,
        totalPages: Math.ceil(response.data.count / limit)
      },
      () => {
        this.updatePagesNum();
      }
    );
  };

  getPage = async index => {
    const num = (index - 1) * limit;

    const current = await axios.get(
      "https://api-leboncoin.herokuapp.com/api/offer/with-count?skip=" +
        num +
        "&limit=" +
        limit
    );
    this.setState({
      currentPageOffers: current.data.offers,
      page: index,
      count: current.data.count,
      totalPages: Math.ceil(current.data.count / limit)
    });
  };

  render() {
    return (
      <>
        <Offers offers={this.state.currentPageOffers} />
        <Pagination
          pagesTab={this.state.pagesTab}
          currentPage={this.state.page}
          totalPages={this.state.totalPages}
          moveToPage={index => {
            this.getPage(index);
          }}
        />
      </>
    );
  }
}

export default Home;
