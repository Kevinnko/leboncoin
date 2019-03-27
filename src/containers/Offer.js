import React from "react";
import Axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Offer extends React.Component {
  state = {
    offer: {},
    isLoading: true
  };
  render() {
    if (this.state.isLoading === true) {
      return <p>Page en cours de chargement</p>;
    } else {
      return (
        <>
          <div className="container d-flex">
            <div className="offer-body">
              <div className="card">
                <Carousel showThumbs={false}>
                  {this.state.offer.pictures.map(pic => {
                    return (
                      <img
                        key={pic.public_id}
                        src={pic.secure_url}
                        className="offer-pic"
                        style={{ objectFit: "contain" }}
                        alt="annonce"
                      />
                    );
                  })}
                </Carousel>

                <div className="card-body">
                  <p className="offer-page-title">{this.state.offer.title}</p>
                  <p className="offer-page-price">
                    {this.state.offer.price + " €"}
                  </p>
                </div>
              </div>
              <h3 className="offer-desc-title">Description</h3>
              <p>{this.state.offer.description}</p>
            </div>
            <div className="offer-sidebar">
              <div className="creator-wrapper">
                <i className="fas fa-user" />
                <span style={{ fontWeight: "bold" }}>
                  {this.state.offer.creator.account.username}
                </span>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  async componentDidMount() {
    try {
      const response = await Axios.get(
        "https://api-leboncoin.herokuapp.com/api/offer/" +
          this.props.match.params.offerId
      );
      this.setState({
        offer: response.data,
        isLoading: false
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Offer;
