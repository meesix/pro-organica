import React from "react";
import { buildLink } from "../utils/helper";


const PlaceOrderWidget = () => {
    return (
      <div class="PlaceOrderWidget">
      <hr/>
      <p>Contact us to learn more about our products <br/> and services or to place an order</p>
      <a href={buildLink('contact#form')} className="PlaceOrder max-width"><h1>Place an Order</h1></a>
      </div>
    );
};


export default PlaceOrderWidget;

