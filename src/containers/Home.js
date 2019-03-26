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
    console.log("this.state.totalPages", this.state.totalPages);
    let newTab = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      newTab.push(i + 1);
    }
    console.log("newTab ", newTab);
    this.setState({
      pagesTab: newTab
    });
  };

  componentDidMount = async () => {
    const url = "http://localhost:3100/api/offer/with-count?skip=0&limit=25";
    const response = await axios.get(url);
    const offers = response.data.offers;
    const count = response.data.count;
    console.log("response.data ", response.data);
    this.setState(
      {
        currentPageOffers: offers,
        count: count,
        totalPages: Math.ceil(response.data.count / limit)
      },
      () => {
        this.updatePagesNum();
        // console.log("ici", this.state.currentPageOffers);
      }
    );
  };

  getPage = async index => {
    const num = (index - 1) * limit;

    const current = await axios.get(
      "http://localhost:3100/api/offer/with-count?skip=" +
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
    console.log("currentPageOffers : ", this.state.currentPageOffers);
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
