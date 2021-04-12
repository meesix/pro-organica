import React from "react";
import { buildLink } from "../utils/helper";
import { Link } from "gatsby";


const PlaceOrderWidget = () => {
    return (
      <div class="PlaceOrderWidget">
      <hr/>
      <a href={buildLink('contact')} className="PlaceOrder max-width">
          <h1>Place an Order</h1>
      </a>
      </div>
    );
};


export default PlaceOrderWidget;
