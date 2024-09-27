import React, { lazy, Component } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { data } from "../../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";

const Support = lazy(() => import("../../components/Support"));
const Banner = lazy(() => import("../../components/carousel/Banner"));
const Carousel = lazy(() => import("../../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../../components/card/CardIcon"));
// const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../../components/card/CardImage"));
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
                endDate={Date.now() + 1000 * 60 * 60 * 14}
                title="Deals of the Day"
                to="/"
              >
                <Carousel id="elect-product-category1">
                  {carouselContent}
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div>

        <div className="bg-info bg-gradient p-3 text-center mb-3">
          <h4 className="m-0">Our Brand Partners</h4>
        </div>
        <div className="container py-3">
          <div className="row">
            <div className="col-md-2  mx-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/carsales.jpg"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center mt-2">CarSales.com.au</div>
              </Link>
            </div>
            <div className="col-md-2  mx-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/carsales2.jpg"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center mt-2">Autocars</div>
              </Link>
            </div>
            <div className="col-md-2  mx-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/carsales3.jpg"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center mt-2">UsedCars.com</div>
              </Link>
            </div>
            <div className="col-md-2  mx-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/carsales4.jpg"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center mt-2">Gumtree</div>
              </Link>
            </div>
            <div className="col-md-2  mx-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/carsales5.jpg"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center mt-2">Michels Cars</div>
              </Link>
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeView;
