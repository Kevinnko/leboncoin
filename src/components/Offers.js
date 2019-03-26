import React from "react";
import { Link } from "react-router-dom";

class Offers extends React.Component {
  render() {
    const offers = this.props.offers;
    console.log("offers ", offers);
    return (
      <>
        <div className="container p-2 offers">
          {offers.map(elem => {
            return (
              <Link
                key={elem._id}
                to={"/offer/" + elem._id}
                style={{ textDecoration: "none" }}
              >
                <div className="offer-wrapper">
                  <div className="offer-img">
                    <img
                      style={{ objectFit: "cover", height: "inherit" }}
                      alt=""
                      src={elem.pictures[0].secure_url}
                    />
                  </div>
                  <div className="offer-info">
                    <p className="offer-title">{elem.title}</p>
                    <p className="offer-price">{elem.price} €</p>
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
