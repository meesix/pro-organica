import React from "react";
import { Layout, Section, Grid, Links, Image, SEO } from "../components";
import PlaceOrderWidget from "../components/PlaceOrderWidget";

const Harvest = ({ pageContext = {} }) => {
  if (!pageContext) return;

  const postData = pageContext.data[0].metadata;

  return (
    <Layout>
      <SEO
        title={postData.header}
        description={postData.content}
      />
      
      <div class="PlaceOrderWidget">
      <h1>New Harvest 2022</h1>
      <h2>ORGANIC RAW MATERIALS</h2>
      <table>
        <thead>
            <tr>
                <th><strong>Name</strong></th>
                <th><strong>Quantity</strong></th>
                <th><strong>Package</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Grains</strong></td>
                <td><strong>&nbsp;</strong></td>
                <td><strong>&nbsp;</strong></td>
            </tr>
            <tr>
                <td>Spelt Unhulled</td>
                <td>1100 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Winter Wheat</td>
                <td>900 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Oats Unhulled</td>
                <td>500 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Millet Unhulled</td>
                <td>450 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Buckwheat Unhulled</td>
                <td>240 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Corn</td>
                <td>500 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td><strong>Seeds</strong></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>Rape Seeds</td>
                <td>500 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Sunflower seeds (high oleic)&nbsp;</td>
                <td>2100 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td>Golden flaxseeds</td>
                <td>80 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td><strong>Pulses</strong></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>Soy beans</td>
                <td>2500 mt</td>
                <td>1 MT BB</td>
            </tr>
        </tbody>
      </table>
      </div>

      <div class="PlaceOrderWidget">
      <h2>ORGANIC PRODUCTS</h2>
      <table>
        <thead>
            <tr>
            <th><strong>Name</strong></th>
            <th><strong>Quantity</strong></th>
            <th><strong>Package</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Grains</strong></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Spelt hulled</td>
                <td>200 mt</td>
                <td>25 kg paper bag/ 1 MT BB</td>
            </tr>
            <tr>
                <td>Winter Wheat (cleaned)&nbsp;</td>
                <td>200 mt</td>
                <td>25 kg paper bag/ 1 MT BB</td>
            </tr>
            <tr>
                <td><strong>Cereals</strong></td>
            </tr>
            <tr>
                <td>Buckwheat groats raw</td>
                <td>110 mt</td>
                <td>25 kg paper bag</td>
            </tr>
            <tr>
                <td>Jumbo oats</td>
                <td>110 mt</td>
                <td>20 kg paper bag</td>
            </tr>
            <tr>
                <td><strong>Seeds</strong></td>
            </tr>
            <tr>
                <td>Golden flaxseeds (cleaned)</td>
                <td>44 mt</td>
                <td>25 kg paper bag</td>
            </tr>
            <tr>
                <td><strong>Pulses</strong></td>
            </tr>
            <tr>
                <td>Whole yellow peas</td>
                <td>37 mt</td>
                <td>1 MT BB</td>
            </tr>
            <tr>
                <td><strong>Nuts</strong></td>
            </tr>
            <tr>
                <td>Walnut light halves 1/2&nbsp;</td>
                <td>44 mt</td>
                <td>10 kg vacuum bag</td>
            </tr>
            <tr>
                <td>Walnut light quarters 1/4&nbsp;</td>
                <td>44 mt</td>
                <td>10 kg vacuum bag</td>
            </tr>
        </tbody>
      </table>
      </div>

      <PlaceOrderWidget></PlaceOrderWidget>
    </Layout>
  );
};

export default Harvest;
