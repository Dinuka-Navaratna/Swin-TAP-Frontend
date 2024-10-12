import React, { lazy, Component } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { data } from "../../data";


const Support = lazy(() => import("../../components/Support"));
const Banner = lazy(() => import("../../components/carousel/Banner"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../../components/card/CardIcon"));
const CardImage = lazy(() => import("../../components/card/CardImage"));
const OurAssurance = lazy(() => import("../pages/OurAssurance"));
const CardDealsOfTheDay = lazy(() =>
  import("../../components/card/CardDealsOfTheDay")
);

class HomeView extends Component {


  render() {
    const iconProducts = data.iconProducts;
    const rows = [...Array(Math.ceil(iconProducts.length / 4))];
    // chunk the products into the array of rows
    const productRows = rows.map((row, idx) =>
      iconProducts.slice(idx * 4, idx * 4 + 4)
    );
    // map the rows as div.row
    const carouselContent = productRows.map((row, idx) => (
      <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
        <div className="row g-3">
          {row.map((product, idx) => {
            return (
              <div key={idx} className="col-md-3">
                <CardIcon
                  title={product.title}
                  text={product.text}
                  tips={product.tips}
                  to={product.to}
                >
                  <img src={product.img} className="logo-size" />
                </CardIcon>
              </div>
            );
          })}
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <Banner className="mb-3" id="carouselHomeBanner" data={data.banner}  interval={1000}/>
       
        <div className="container-fluid bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <CardDealsOfTheDay
                title="Popular Brands"
                to="/listing/"
              >
                <Carousel id="elect-product-category1">
                  {carouselContent}
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div>

       <OurAssurance/>
      </React.Fragment>
    );
  }
}

export default HomeView;
