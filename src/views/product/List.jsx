import React, { lazy, Component } from "react";
import axios from "axios";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
// const FilterSize = lazy(() => import("../../components/filter/Size"));
// const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
// const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "grid",
  };

  UNSAFE_componentWillMount() {
    const totalItems = this.getProducts().length;
    this.setState({ totalItems });
  }

  onPageChanged = (page) => {
    const { currentPage, totalPages, pageLimit } = page;
    let products = this.getProducts(currentPage, '');
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  getProducts = (page, brand) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/vehicle?page=${page}&limit=9&brand=${brand}`
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    // return products;
    return [
      {
        id: 1,
        sku: "FAS-01",
        link: "/listing/v4r",
        name: "Advertisement Title",
        img: "../../images/products/vehicle.jpg",
        price: 1800,
        originPrice: 0,
        discountPrice: 0,
        discountPercentage: 0,
        isNew: true,
        isHot: false,
        star: 1,
        isFreeShipping: false,
        description:
          "Ad Description. Ad Description. Ad Description. Ad Description. Ad Description. Ad Description.",
      },
      {
        id: 2,
        sku: "FAS-02",
        link: "/listing/3vf34",
        name: "Advertisement Title",
        img: "../../images/products/vehicle.jpg",
        price: 4750,
        originPrice: 0,
        discountPrice: 0,
        discountPercentage: 0,
        isNew: false,
        isHot: true,
        star: 1,
        isFreeShipping: false,
        description:
          "Ad Description. Ad Description. Ad Description. Ad Description. Ad Description. Ad Description.",
      },
      {
        id: 3,
        sku: "FAS-03",
        link: "/listing/3vqf4",
        name: "Advertisement Title",
        img: "../../images/products/vehicle.jpg",
        price: 1900,
        originPrice: 0,
        discountPrice: 0,
        discountPercentage: 0,
        isNew: true,
        isHot: true,
        star: 1,
        isFreeShipping: false,
        description:
          "Ad Description. Ad Description. Ad Description. Ad Description. Ad Description. Ad Description.",
      },
      {
        id: 4,
        sku: "FAS-04",
        link: "/listing/243t34qts",
        name: "Advertisement Title",
        img: "../../images/products/vehicle.jpg",
        price: 5000,
        originPrice: 0,
        discountPrice: 0,
        discountPercentage: 0,
        isNew: false,
        isHot: false,
        star: 1,
        isFreeShipping: false,
        description:
          "Ad Description. Ad Description. Ad Description. Ad Description. Ad Description. Ad Description.",
      },
    ]
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/Banner_listing.png)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              Find Your Dream Vehicle
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice />
              {/* <FilterSize /> */}
              {/* <FilterStar /> */}
              <FilterColor />
              {/* <FilterClear /> */}
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">"testing"</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
