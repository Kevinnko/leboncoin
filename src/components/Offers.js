import React from "react";
import { Link } from "react-router-dom";

class Offers extends React.Component {
  render() {
    const offers = this.props.offers;
    console.log("offers", offers);

    return (
      <>
        <div className="container p-2 offers">
          {offers.map(elem => {
            return (
              <Link key={elem._id} to={"/offer/" + elem._id}>
                <div className="offer-wrapper">
                  <div className="offer-img">
                    <div className="product-img">Image</div>
                  </div>
                  <div className="offer-info">
                    <p>{elem.title}</p>
                    <p>{elem.price} €</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

export default Offers;
