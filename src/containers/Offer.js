import React from "react";
import Axios from "axios";

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
                <img
                  src="https://res.cloudinary.com/kevin-reacteur/image/upload/v1550767037/images/leboncoin/ZXURu3DiOWjevSuP.jpg"
                  className="card-img-top"
                  alt="sombrero"
                />
                <div className="card-body">
                  <p>{this.state.offer.title}</p>
                  <p>{this.state.offer.price}</p>
                </div>
              </div>
              <h3>Description</h3>
              <p>{this.state.offer.description}</p>
            </div>
            <div className="offer-sidebar">
              <div className="creator-wrapper">
                <p>{this.state.offer.creator.account.username}</p>
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
        "https://leboncoin-api.herokuapp.com/api/offer/" +
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
