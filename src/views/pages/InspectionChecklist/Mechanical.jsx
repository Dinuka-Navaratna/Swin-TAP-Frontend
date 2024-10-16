import React, { useEffect, useState } from 'react';
import { ChecklistData } from '../../../data/Checklist';

const Mechanical = ({ mechanicalCount, setMechanicalCount }) => {
    const [descriptions, setDescriptions] = useState({});

    useEffect(() => {
        setDescriptions(ChecklistData.Mechanical);
        setMechanicalCount(0 + "/" + Object.keys(ChecklistData.Mechanical).length);
    }, []);

    if (!descriptions) {
        return <div>No data available</div>;
    }

    const checkListUpdate = (event) => {
        const id = event.target.id;
        const checkboxType = id.slice(-1); // P for pass, F for fail
        const baseId = id.slice(0, -1); // E1, E2, etc.

        // Toggle the corresponding checkbox based on current checkbox type
        const passCheckbox = document.getElementById(`${baseId}P`);
        const failCheckbox = document.getElementById(`${baseId}F`);

        let count = parseInt(mechanicalCount.split('/')[0]);

        if (passCheckbox.checked !== failCheckbox.checked) {
            count += 1;
        }

        if (checkboxType === 'P') {
            if (passCheckbox.checked) {
                failCheckbox.checked = false;
            }
        } else if (checkboxType === 'F') {
            if (failCheckbox.checked) {
                passCheckbox.checked = false;
            }
        }

        if (!(passCheckbox.checked || failCheckbox.checked)) {
            count -= 1;
        }

        setMechanicalCount(count + "/" + Object.keys(descriptions).length);
    };

    return (
        <div className="col-md-5 sublists">
            <div className="border pt-3">
                <div className="text-center py-2">
                    <h2 className="py-2">Mechanical Checklist</h2>
                    Check Passed <i className="bi bi-check-circle" style={{color: "green"}}></i> || Check Failed <i className="bi bi-x-circle" style={{color: "red"}}></i>
                </div>
                <div className="list-group list-group-flush">
                    <div className="list-group-item"></div>
                    {Object.keys(descriptions).map(key => (
                        <div className="list-group-item checkItem" key={key}>
                            <div className="row">
                                <div className="col-md-9 col-8">
                                    <p>{key + ". " + descriptions[key]}</p>
                                </div>
                                <div className="col-md-1 col-2">
                                    <label className="checkbox-container">
                                        <input id={`${key}P`} type="checkbox" className="pass-check" onClick={checkListUpdate} />
                                        <span className="checkmark">
                                            <i className="bi bi-check-circle"></i>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-1 col-2">
                                    <label className="checkbox-container">
                                        <input id={`${key}F`} type="checkbox" className="fail-check" onClick={checkListUpdate} />
                                        <span className="checkmark">
                                            <i className="bi bi-x-circle"></i>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-12 col-12">
                                    <textarea id={`${key}Notes`} aria-label="Notes" placeholder="Additional notes about the above check"></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mechanical;
