import { lazy, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import "./style.css";
import { warningDialog, errorDialog } from "../../../helpers/alerts.js";
import axios from "axios";
import { getSession } from "../../../actions/session";

const Exterior = lazy(() => import("./Exterior"));
const Interior = lazy(() => import("./Interior"));
const Mechanical = lazy(() => import("./Mechanical"));
const UnderTheHood = lazy(() => import("./UnderTheHood"));
const TestDrive = lazy(() => import("./TestDrive"));
const Documentation = lazy(() => import("./Documentation"));
const AdvancedChecks = lazy(() => import("./AdvancedChecks"));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const CheckListView = () => {
  const session = getSession();
  if (!session || session.role !== "mechanic") {
    warningDialog("Sign in using mechanic account to proceed!").then(() => {
      window.location.href = "/account/signin";
    });
  }

  const query = useQuery();
  const vehicle = query.get('vehicle');
  const seller = query.get('seller');
  const sid = query.get('sid');
  const vid = query.get('vid');
  if (sid === null || vid === null || vehicle === null || seller === null) {
    warningDialog("Inspection details not found!").then(() => {
      window.location.href = "/account/inspections";
    });
  }

  const exteriorRef = useRef();
  const interiorRef = useRef();
  const mechanicalRef = useRef();
  const underTheHoodRef = useRef();
  const testDriveRef = useRef();
  const documentationRef = useRef();
  const advancedChecksRef = useRef();
  const [exteriorCount, setExteriorCount] = useState();
  const [interiorCount, setInteriorCount] = useState();
  const [mechanicalCount, setMechanicalCount] = useState();
  const [underTheHoodCount, setUnderTheHoodCount] = useState();
  const [testDriveCount, setTestDriveCount] = useState();
  const [documentationCount, setDocumentationCount] = useState();
  const [advancedChecksCount, setAdvancedChecksCount] = useState();

  const handleSubmit = () => {
    const getSectionData = (sectionRef) => {
      const sectionElements = sectionRef.current.querySelectorAll('.checkItem');
      const sectionTotalChecks = sectionElements.length;
      let sectionCompletedChecks = 0;
      const sectionChecks = {};

      Array.from(sectionElements).map(item => {
        const id = item.querySelector('p').textContent.split('.')[0];
        const description = item.querySelector('p').textContent.split('. ')[1];
        const passChecked = item.querySelector('.pass-check').checked;
        const failChecked = item.querySelector('.fail-check').checked;
        const notes = item.querySelector('textarea').value;

        if (passChecked || failChecked) {
          sectionCompletedChecks += 1;
        }
        sectionChecks[`${id}. ${description}`] = `${passChecked ? 'Passed' : failChecked ? 'Failed' : 'N/A'}${notes ? ` [${notes}]` : ''}`;
      });

      return { sectionChecks, sectionCompletedChecks, sectionTotalChecks };
    };

    const exteriorData = getSectionData(exteriorRef);
    const interiorData = getSectionData(interiorRef);
    const mechanicalData = getSectionData(mechanicalRef);
    const underTheHoodData = getSectionData(underTheHoodRef);
    const testDriveData = getSectionData(testDriveRef);
    const documentationData = getSectionData(documentationRef);
    const advancedChecksData = getSectionData(advancedChecksRef);

    const sectionsData = [exteriorData, interiorData, mechanicalData, underTheHoodData, testDriveData, documentationData, advancedChecksData];
    const totalCompletedChecks = sectionsData.reduce((acc, data) => acc + data.sectionCompletedChecks, 0);
    const totalChecks = sectionsData.reduce((acc, data) => acc + data.sectionTotalChecks, 0);

    if (totalCompletedChecks === totalChecks) {
      warningDialog(`Following checks needs to be fully completed!<br>
        <small>
        <br>Exterior checks: ${exteriorCount}
        <br>Interior checks: ${interiorCount}
        <br>Mechanical checks: ${mechanicalCount}
        <br>Under the Hood checks: ${underTheHoodCount}
        <br>Test Drive checks: ${testDriveCount}
        <br>Documentation checks: ${documentationCount}
        </small>`);
    } else {
      const checklist = {
        ...exteriorData.sectionChecks,
        ...interiorData.sectionChecks,
        ...mechanicalData.sectionChecks,
        ...underTheHoodData.sectionChecks,
        ...testDriveData.sectionChecks,
        ...documentationData.sectionChecks,
        ...advancedChecksData.sectionChecks
      };

      createReport(checklist);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const createReport = (checklist) => {
    let data = JSON.stringify({
      "mechanic": session.user_id,
      "vehicle": vid,
      "seller": sid,
      "inspection_time": getCurrentTime(),
      "additional_note": "",
      "images": [],
      "status": "completed",
      // "vehicle_rego":"1VR2UD",
      // "postal_code":"3171",
      "checklist": checklist
    });
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/inspection-report/`,
      headers: {
        'Authorization': `Token ${session.token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.data.status === false) {
          errorDialog(response.data.msg);
        } else {
          if (response.data.data._id) {
            alert(response.data.data._id);
          }
        }
      })
      .catch((error) => {
        errorDialog("An error occurred while fetching the vehicle data.");
        console.log(error);
      });
  }

  return (
    <div>
      <div className="loading"></div>
      <div className="bg-dark bg-gradient p-5 text-white text-center">
        <div className="display-5 mb-4">Inspection Checklist</div>
        <p>for {vehicle} owned by {seller}</p>
      </div>
      <div className="bg-secondary py-4">
        <div className="container">
          <div className="row gx-5">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  className="nav-link active"
                  id="exterior-tab"
                  data-bs-toggle="tab"
                  href="#exterior"
                  role="tab"
                  aria-controls="exterior"
                  aria-selected="true"
                >
                  Exterior ({exteriorCount})
                </a>
                <a
                  className="nav-link"
                  id="interior-tab"
                  data-bs-toggle="tab"
                  href="#interior"
                  role="tab"
                  aria-controls="interior"
                  aria-selected="false"
                >
                  Interior ({interiorCount})
                </a>
                <a
                  className="nav-link"
                  id="mechanical-tab"
                  data-bs-toggle="tab"
                  href="#mechanical"
                  role="tab"
                  aria-controls="mechanical"
                  aria-selected="true"
                >
                  Mechanical ({mechanicalCount})
                </a>
                <a
                  className="nav-link"
                  id="under-the-hood-tab"
                  data-bs-toggle="tab"
                  href="#under-the-hood"
                  role="tab"
                  aria-controls="under-the-hood"
                  aria-selected="false"
                >
                  Under the Hood ({underTheHoodCount})
                </a>
                <a
                  className="nav-link"
                  id="test-drive-tab"
                  data-bs-toggle="tab"
                  href="#test-drive"
                  role="tab"
                  aria-controls="test-drive"
                  aria-selected="true"
                >
                  Test Drive ({testDriveCount})
                </a>
                <a
                  className="nav-link"
                  id="documentation-tab"
                  data-bs-toggle="tab"
                  href="#documentation"
                  role="tab"
                  aria-controls="documentation"
                  aria-selected="false"
                >
                  Documentation ({documentationCount})
                </a>
                <a
                  className="nav-link"
                  id="advanced-checks-tab"
                  data-bs-toggle="tab"
                  href="#advanced-checks"
                  role="tab"
                  aria-controls="advanced-checks"
                  aria-selected="false"
                >
                  Advanced Checks ({advancedChecksCount})
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container pt-3 mb-3">
        <div className="container">
          <div className="row gx-3">
            <div className="tab-content p-3 small" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="exterior"
                role="tabpanel"
                aria-labelledby="exterior-tab"
                ref={exteriorRef}
              >
                <Exterior exteriorCount={exteriorCount} setExteriorCount={setExteriorCount} />
              </div>
              <div
                className="tab-pane fade"
                id="interior"
                role="tabpanel"
                aria-labelledby="interior-tab"
                ref={interiorRef}
              >
                <Interior interiorCount={interiorCount} setInteriorCount={setInteriorCount} />
              </div>
              <div
                className="tab-pane fade"
                id="mechanical"
                role="tabpanel"
                aria-labelledby="mechanical-tab"
                ref={mechanicalRef}
              >
                <Mechanical mechanicalCount={mechanicalCount} setMechanicalCount={setMechanicalCount} />
              </div>
              <div
                className="tab-pane fade"
                id="under-the-hood"
                role="tabpanel"
                aria-labelledby="under-the-hood"
                ref={underTheHoodRef}
              >
                <UnderTheHood underTheHoodCount={underTheHoodCount} setUnderTheHoodCount={setUnderTheHoodCount} />
              </div>
              <div
                className="tab-pane fade"
                id="test-drive"
                role="tabpanel"
                aria-labelledby="test-drive-tab"
                ref={testDriveRef}
              >
                <TestDrive testDriveCount={testDriveCount} setTestDriveCount={setTestDriveCount} />
              </div>
              <div
                className="tab-pane fade"
                id="documentation"
                role="tabpanel"
                aria-labelledby="documentation-tab"
                ref={documentationRef}
              >
                <Documentation documentationCount={documentationCount} setDocumentationCount={setDocumentationCount} />
              </div>
              <div
                className="tab-pane fade"
                id="advanced-checks"
                role="tabpanel"
                aria-labelledby="advanced-checks-tab"
                ref={advancedChecksRef}
              >
                <AdvancedChecks advancedChecksCount={advancedChecksCount} setAdvancedChecksCount={setAdvancedChecksCount} />
              </div>
            </div>
            {/* <div className="col-md-3">
              <div className="border pt-3">
                <div className="text-center py-2">
                  <IconPersonSquare
                    className="i-va display-6 text-info"
                    width={40}
                    height={40}
                  />
                  <div className="fw-bold py-2">My Account</div>
                </div>
                <div className="list-group list-group-flush">
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Cras justo odio
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Dapibus ac facilisis in
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Morbi leo risus
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Porta ac consectetur ac
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Vestibulum at eros
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border pt-3">
                <div className="text-center py-2">
                  <IconReceiptCutoff
                    className="i-va display-6 text-warning"
                    width={40}
                    height={40}
                  />
                  <div className="fw-bold py-2">Charges & Refunds</div>
                </div>
                <div className="list-group list-group-flush">
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Cras justo odio
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Dapibus ac facilisis in
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Morbi leo risus
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Porta ac consectetur ac
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Vestibulum at eros
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border pt-3">
                <div className="text-center py-2">
                  <IconCalculator
                    className="i-va display-6 text-danger"
                    width={40}
                    height={40}
                  />
                  <div className="fw-bold py-2">Accounting & Textes</div>
                </div>
                <div className="list-group list-group-flush">
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Cras justo odio
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Dapibus ac facilisis in
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Morbi leo risus
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Porta ac consectetur ac
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Vestibulum at eros
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border pt-3">
                <div className="text-center py-2">
                  <IconCart3
                    className="i-va display-6 text-success"
                    width={40}
                    height={40}
                  />
                  <div className="fw-bold py-2">Cart</div>
                </div>
                <div className="list-group list-group-flush">
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Cras justo odio
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Dapibus ac facilisis in
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Morbi leo risus
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Porta ac consectetur ac
                  </Link>
                  <Link
                    to="/"
                    className="list-group-item list-group-item-action"
                  >
                    Vestibulum at eros
                  </Link>
                </div>
              </div>
            </div> */}

            <div className="col-md-5 col-12 mt-3" style={{ marginRight: "auto", marginLeft: "auto" }}>
              <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckListView;
