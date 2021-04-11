import React from "react";
import { buildLink } from "../utils/helper";
import { Link } from "gatsby";


const PlaceOrderWidget = () => {
    return (
      <div className="OrderBox">
          Contact us to learn more about our products and services or to place an order.
          <Link
          className='OrderBox__Link button-primary'
          to={buildLink('contact')}
          alt="Place an order"
        >
          Place an order
        </Link>
      </div>

    );
};


export default PlaceOrderWidget;
