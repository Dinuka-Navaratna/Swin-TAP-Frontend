import React, { useState } from "react";

const UserSearch = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Handler for name search
  const handleNameSearch = () => {
    // Implement search logic here
    props.getUsers(1, "clear", "", name);
  };

  // Handler for email search
  const handleEmailSearch = () => {
    // Implement search logic here
    props.getUsers(1, "clear", email, "");
  };

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">Custom Search</div>
      <div className="card-body">
        {/* Name Search Section */}
        <div className="row pt-3">
          <div className="col-12">
            <label className="fw-bold">Search by Name</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleNameSearch}>
                Search Name
              </button>
            </div>
          </div>
        </div>

        {/* Email Search Section */}
        <div className="row pt-3">
          <div className="col-12">
            <label className="fw-bold">Search by Email</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleEmailSearch}>
                Search Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
