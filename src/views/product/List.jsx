import React, { lazy, Component } from "react";
import axios from "axios";
import { suburbs } from '../../data/suburbs';
import SuburbAutocomplete from '../../components/others/LocationFilter';
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "grid",
    selectedSuburb: '',
    selectedBrand: '',
    selectedType: '',
    selectedColor: '',
    loading: false
  };

  onPageChanged = async (page) => {
    const { currentPage, totalPages } = page;
    console.log("Page changed:", page); // Add logging
    let products = await this.getProducts(currentPage, '');
    if (!products) {
      products = [];
    }
    this.setState({ currentPage, currentProducts: products, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  getProducts = async (page, brand, type, color, suburb) => {
    this.setState({
      selectedBrand: brand === "clear" ? "" : (brand !== "" ? brand : this.state.selectedBrand),
      selectedType: type !== "" ? type : this.state.selectedType,
      selectedColor: color !== "" ? color : this.state.selectedColor,
      selectedSuburb: suburb === "clear" ? "" : (suburb !== "" ? suburb : this.state.selectedSuburb),
      loading: true
    }, async () => {
      const { selectedBrand, selectedType, selectedColor, selectedSuburb } = this.state;

      const finalBrand = brand === "clear" ? "" : (brand || selectedBrand);
      const finalType = type || selectedType;
      const finalColor = color || selectedColor;
      const finalSuburb = suburb === "clear" ? "" : (suburb && suburb.postcode ? suburb.postcode : (selectedSuburb && selectedSuburb.postcode ? selectedSuburb.postcode : ""));

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/vehicle?&postalCode=${finalSuburb !== null ? finalSuburb : ''}&page=${page !== null ? page : ''}&limit=15&brand=${finalBrand !== null ? finalBrand : ''}`
      };

      try {
        const response = await axios.request(config);
        const ads = response.data.data;
        const totalItems = ads.length; // Assuming the total number of items is returned by the backend
        console.log("Total items:", totalItems); // Add logging
        this.setState({ currentProducts: ads, totalItems, loading: false });
        return ads;
      } catch (error) {
        console.log(error);
        this.setState({ currentProducts: [], totalItems: 0, loading: false });
      }
    });
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
            <div className="col-md-3 d-none d-md-block">
              {/* <FilterPrice /> */}
              <FilterTag getProducts={this.getProducts} selectedBrand={this.state.selectedBrand} />
              {/* <FilterCategory getProducts={this.getProducts} selectedType={this.state.selectedType} />
              <FilterColor getProducts={this.getProducts} selectedColor={this.state.selectedColor} /> */}
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-6">
                  <SuburbAutocomplete suburbs={suburbs} getProducts={this.getProducts} selectedSuburb={this.state.selectedSuburb || ''} />
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Latest</option>
                    <option value={2}>Oldest</option>
                    <option value={3}>AutoAssured</option>
                    <option value={4}>Price low - high</option>
                    <option value={5}>Price high - low</option>
                  </select>
                  <div className="btn-group ms-3" role="group" id="viewChanger">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${this.state.view === "grid"
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
                      className={`btn ${this.state.view === "list"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <div className="d-block d-md-none">
                <FilterTag getProducts={this.getProducts} selectedBrand={this.state.selectedBrand} />
              </div>
              <hr />
              {this.state.loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  {this.state.currentProducts.length === 0 ? (
                    <div className="col-12">
                      <p>No results found</p>
                    </div>
                  ) : (
                    <>
                      {this.state.view === "grid" &&
                        this.state.currentProducts.map((product, idx) => (
                          <div key={idx} className="col-md-4">
                            <CardProductGrid data={product} />
                          </div>
                        ))}
                      {this.state.view === "list" &&
                        this.state.currentProducts.map((product, idx) => (
                          <div key={idx} className="col-md-12">
                            <CardProductList data={product} />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
              <div className="d-block d-md-none">
                <CardServices />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
