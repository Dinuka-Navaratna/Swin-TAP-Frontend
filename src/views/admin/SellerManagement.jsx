import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSession } from "../../actions/session";
import Breadcrumb from "../../components/Breadcrumb";
import MechanicStatusFilter from "./MechanicStatusFilter";
import UserSearch from "./UserSearch";
import CardGrid from "./CardGrid";
import CardList from "./CardList";
import Paging from "../../components/Paging";

const SellerManagement = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [view, setView] = useState("grid");
  const [selectedVerification, setSelectedVerification] = useState("");
  const [loading, setLoading] = useState(false);
  const session = getSession();

  const getUsers = useCallback(
    async (page, verification, email, name) => {
      if (loading) return; // Prevent a new request if already loading
      setLoading(true);
      const finalVerification =
        verification === "clear" ? "" : verification || selectedVerification;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/users?role=seller&&offset=${
          page !== null ? (page - 1) * 9 : ""
        }&limit=9&name=${name ? name : ""}&email=${email ? email : ""}`,
        headers: {
          Authorization: `Token ${session ? session.token : ""}`, //`Token ${session ? session.token : ""}`,
        },
      };

      try {
        const response = await axios.request(config);
        const users = response.data.data.value;
        const totalItems = response.data.data.count;
        const totalPages = Math.ceil(totalItems / 9);
        setCurrentUsers(users);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
        setCurrentPage(page);
      } catch (error) {
        setCurrentUsers([]);
        setTotalItems(0);
      } finally {
        setLoading(false); // Ensure loading is set to false when request is complete
      }
    },
    [selectedVerification, session]
  );

  // Ensure getUsers is called once when the component mounts, and when the filters change
  useEffect(() => {
    if (!loading) {
      // Only fetch if currentPage is not null and not already loading
      getUsers(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (session?.role !== "admin") {
      window.location.href = "/";
    }
  }, []);

  const onPageChanged = (page) => {
    if (!loading && totalItems > 9) {
      setCurrentPage(page.currentPage);
    }
  };

  return (
    <React.Fragment>
      <header className="headerStyle">
        <div className="container">
          <h1 className="headerTitleStyle">AutoAssure</h1>
          <h2 className="headerSubtitleStyle">Seller Management Section</h2>
        </div>
      </header>

      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
            <UserSearch getUsers={getUsers} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end">
                <div className="btn-group ms-3" role="group" id="viewChanger">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => setView("grid")}
                    className={`btn ${
                      view === "grid" ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    <i className="bi bi-grid" />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => setView("list")}
                    className={`btn ${
                      view === "list" ? "btn-primary" : "btn-outline-primary"
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
                  <b>Total Users: </b>
                  {totalItems}
                </p>
              </div>
            </div>
            <div className="d-block d-md-none">
              <MechanicStatusFilter
                getUsers={getUsers}
                selectedVerification={selectedVerification}
              />
            </div>
            <hr />
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-3">
                {currentUsers.length === 0 ? (
                  <div className="col-12">
                    <p>No results found</p>
                  </div>
                ) : (
                  <>
                    {view === "grid" &&
                      currentUsers.map((user, idx) => (
                        <div key={idx} className="col-md-4">
                          <CardGrid
                            data={user}
                            role={session ? session.role : ""}
                            getUsers={getUsers}
                            currentPage={currentPage}
                            mechanic={false}
                          />
                        </div>
                      ))}
                    {view === "list" &&
                      currentUsers.map((user, idx) => (
                        <div key={idx} className="col-md-12">
                          <CardList
                            data={user}
                            role={session ? session.role : ""}
                            getUsers={getUsers}
                            currentPage={currentPage}
                            mechanic={false}
                          />
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}
            <hr />
            <Paging
              totalRecords={totalItems}
              pageLimit={9}
              pageNeighbours={3}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
              sizing=""
              alignment="justify-content-center"
            />
            <div className="d-block d-md-none">
              <UserSearch />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SellerManagement;
