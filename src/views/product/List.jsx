import React, { lazy, Component } from "react";
import axios from "axios";
import { getSession } from "../../actions/session";
import { suburbs } from "../../data/suburbs";
import SuburbAutocomplete from "../../components/others/LocationFilter";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
// const FilterCategory = lazy(() => import("../../components/filter/Category"));
// const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
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
    selectedSuburb: "",
    selectedBrand: "",
    selectedType: "",
    selectedColor: "",
    sortDate: "",
    sortPrice: "",
    sortInspection: "",
    loading: false,
    inspectionRequestedAds: false,
    session: getSession(),
  };

  handleSortChange = (event) => {
    var sortDate = "";
    var sortPrice = "";
    var sortInspection = "";
    const selectedSort = event.target.value;
    if (selectedSort === "1") {
      sortDate = "-1";
    } else if (selectedSort === "2") {
      sortDate = "1";
    } else if (selectedSort === "3") {
      sortInspection = "true";
    } else if (selectedSort === "4") {
      sortPrice = "1";
    } else if (selectedSort === "5") {
      sortPrice = "-1";
    }
    this.setState(
      { sortDate, sortPrice, sortInspection, currentPage: 1 },
      () => {
        this.getProducts(1, "", "", "", "");
      }
    );
  };

  handleInspectionRequestedAds = () => {
    var inspectionRequestedAds = this.state.inspectionRequestedAds;
    this.setState({ inspectionRequestedAds: !inspectionRequestedAds }, () => {
      this.getProducts(1, "", "", "", "");
    });
  };

  onPageChanged = async (page) => {
    const { currentPage, totalPages } = page;
    if (currentPage !== this.state.currentPage) {
      let products = await this.getProducts(currentPage, "", "", "", "");
      if (!products) {
        products = [];
      }
      this.setState({ currentPage, currentProducts: products, totalPages });
    }
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  getProducts = async (page, brand, type, color, suburb) => {
    this.setState(
      {
        selectedBrand:
          brand === "clear"
            ? ""
            : brand !== ""
            ? brand
            : this.state.selectedBrand,
        // selectedType: type !== "" ? type : this.state.selectedType,
        // selectedColor: color !== "" ? color : this.state.selectedColor,
        selectedSuburb:
          suburb === "clear"
            ? ""
            : suburb !== ""
            ? suburb
            : this.state.selectedSuburb,
        loading: true,
      },
      async () => {
        const { selectedBrand, selectedSuburb } = this.state;

        const finalBrand = brand === "clear" ? "" : brand || selectedBrand;
        // const finalType = type || selectedType;
        // const finalColor = color || selectedColor;
        const finalSuburb =
          suburb === "clear"
            ? ""
            : suburb && suburb.postcode
            ? suburb.postcode
            : selectedSuburb && selectedSuburb.postcode
            ? selectedSuburb.postcode
            : "";

        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/api/vehicle${
            this.state.inspectionRequestedAds ? "/inspections" : ""
          }?&postalCode=${finalSuburb !== null ? finalSuburb : ""}&page=${
            page !== null ? page : ""
          }&limit=9&brand=${finalBrand !== null ? finalBrand : ""}&sortDate=${
            this.state.sortDate
          }&sortPrice=${this.state.sortPrice}&inspection=${
            this.state.sortInspection
          }`,
          headers: {
            Authorization: `Token ${
              this.state.session ? this.state.session.token : ""
            }`,
          },
        };

        try {
          const response = await axios.request(config);
          const ads = response.data.data.data;
          const totalItems = response.data.data.totalCount;
          const totalPages = Math.ceil(totalItems / 9);
          this.setState({
            currentProducts: ads,
            totalItems,
            totalPages,
            loading: false,
          });

          if (page === 1) {
            this.setState({ currentPage: 1 });
          }

          return ads;
        } catch (error) {
          console.log(error);
          this.setState({ currentProducts: [], totalItems: 0, loading: false });
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <header className="headerStyle">
          <div className="container">
            <h1 className="headerTitleStyle">AutoAssure</h1>
            <h2 className="headerSubtitleStyle">
              Revolutionizing Vehicle Inspection Partner
            </h2>
            <p>
              At AutoAssure, we enhance the vehicle selling and buying process
              through trusted inspections.
            </p>
          </div>
        </header>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3 d-none d-md-block">
              {/* <FilterPrice /> */}
              <FilterTag
                getProducts={this.getProducts}
                selectedBrand={this.state.selectedBrand}
              />
              {/* <FilterCategory getProducts={this.getProducts} selectedType={this.state.selectedType} />
              <FilterColor getProducts={this.getProducts} selectedColor={this.state.selectedColor} /> */}
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-6">
                  <SuburbAutocomplete
                    suburbs={suburbs}
                    getProducts={this.getProducts}
                    selectedSuburb={this.state.selectedSuburb || ""}
                  />
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                    onChange={this.handleSortChange}
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
              <br></br>
              <div className="row">
                <div className="col-4">
                  <p>
                    <b>Total Ads: </b>
                    {this.state.totalItems}
                  </p>
                </div>
                {this.state.session &&
                  this.state.session.role === "mechanic" && (
                    <>
                      <div className="col-8 d-flex justify-content-end">
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              onChange={this.handleInspectionRequestedAds}
                              style={{ marginRight: "10px" }}
                            />
                            Inspection Requested Ads
                          </label>
                        </div>
                      </div>
                    </>
                  )}
              </div>
              <div className="d-block d-md-none">
                <FilterTag
                  getProducts={this.getProducts}
                  selectedBrand={this.state.selectedBrand}
                />
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
                            <CardProductGrid
                              data={product}
                              role={
                                this.state.session
                                  ? this.state.session.role
                                  : ""
                              }
                            />
                          </div>
                        ))}
                      {this.state.view === "list" &&
                        this.state.currentProducts.map((product, idx) => (
                          <div key={idx} className="col-md-12">
                            <CardProductList
                              data={product}
                              role={
                                this.state.session
                                  ? this.state.session.role
                                  : ""
                              }
                            />
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
                currentPage={this.state.currentPage}
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
