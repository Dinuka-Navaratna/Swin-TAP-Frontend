import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSession } from "../../actions/session";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import "./admin.css";

const Analytics = () => {
  const COLORS = ["#63A72D", "#11294E", "#085ED6", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [userDataBar, setUserDataBar] = useState([
    {
      name: "Admin Count",
      uv: 0,
    },
    {
      name: "Mechanic Count",
      uv: 0,
    },
    {
      name: "seller Count",
      uv: 0,
    },
  ]);
  const [vehicleData, setVehicleData] = useState([
    { name: "Inspection Not Requested", value: 0 },
    { name: "Inspection Requested", value: 0 },
    { name: "Inspection Accepted", value: 0 },
    { name: "Inspection Completed", value: 0 },
  ]);

  const [inspectionComparison, setInspectionComparison] = useState([
    { name: "Ads with inspections", value: 0 },
    { name: "Ads without inspections", value: 0 },
  ]);

  const [userLoading, setUserLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const session = getSession();

  const getUsers = useCallback(async () => {
    if (userLoading) return; // Prevent a new request if already loading
    setUserLoading(true);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/users/count`,
      headers: {
        Authorization: `Token ${session ? session.token : ""}`,
      },
    };

    try {
      const response = await axios.request(config);
      const users = response.data.data;

      setUserDataBar([
        {
          name: "Admin Count",
          uv: users.admin,
        },
        {
          name: "Mechanic Count",
          uv: users.mechanic,
        },
        {
          name: "seller Count",
          uv: users.seller,
        },
      ]);
    } catch (error) {
      setUserDataBar([
        {
          name: "Admin Count",
          uv: 0,
        },
        {
          name: "Mechanic Count",
          uv: 0,
        },
        {
          name: "seller Count",
          uv: 0,
        },
      ]);
    } finally {
      setUserLoading(false);
    }
  }, [session]);

  const getVehicles = useCallback(async () => {
    if (vehicleLoading) return;
    setVehicleLoading(true);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/vehicle/count`,
      headers: {
        Authorization: `Token ${session ? session.token : ""}`,
      },
    };

    try {
      const response = await axios.request(config);
      const vehicles = response.data.data;
      setVehicleData([
        { name: "Inspection Not Requested", value: vehicles.not_requested },
        { name: "Inspection Requested", value: vehicles.requested },
        { name: "Inspection Accepted", value: vehicles.accepted },
        { name: "Inspection Completed", value: vehicles.completed },
      ]);

      setInspectionComparison([
        {
          name: "Ads with inspections",
          value: vehicles.requested + vehicles.accepted + vehicles.completed,
        },
        { name: "Ads without inspections", value: vehicles.not_requested },
      ]);
    } catch (error) {
      setVehicleData([
        { name: "Inspection Not Requested", value: 0 },
        { name: "Inspection Requested", value: 0 },
        { name: "Inspection Accepted", value: 0 },
        { name: "Inspection Completed", value: 0 },
      ]);

      setInspectionComparison([
        { name: "Ads with inspections", value: 0 },
        { name: "Ads without inspections", value: 0 },
      ]);
    } finally {
      setVehicleLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!userLoading) {
      getUsers();
    }
    if (!vehicleLoading) {
      getVehicles();
    }
  }, []);

  return (
    <div className="analytics-row">
      {/* Pie charts stacked one below the other */}
      <div className="pie-charts-container">
        <div className="card-header fw-bold text-uppercase text-center">
          Vehicle Ads Analytics
        </div>
        <PieChart width={400} height={200}>
          <Pie
            data={vehicleData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {vehicleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className="card-header fw-bold text-uppercase text-center mt-3">
          Inspection Data Analytics
        </div>
        <PieChart width={400} height={200}>
          <Pie
            data={inspectionComparison}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {inspectionComparison.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {window.innerWidth > 1000 && (
        <div className="pie-charts-container">
          <div className="card-header fw-bold text-uppercase text-center mt-3">
            User Data Analytics
          </div>
          <BarChart
            width={500}
            height={500}
            data={userDataBar}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill="#8884d8" label={{ position: "top" }}>
              {userDataBar.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Analytics;
