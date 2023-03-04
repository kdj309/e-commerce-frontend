import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isSignin } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { ColumnChart } from "./ColumnChart";
import {
  getAllusers,
  getDayname,
  getOrders,
  initialMonthlyproducts,
  piechartsampledata,
  weeklyusersdata,
} from "./helper/adminapicall";
import PieChart from "./PieChart";
import styles from "../css/AdminDashBoard.module.css";
function Last7Days() {
  return "0123456".split("").map(function (n) {
    var d = new Date();
    d.setDate(d.getDate() - n);

    return (function (day, month, year) {
      return day;
    })(d.getDay());
  });
}

const AdminDashBoard = () => {
  const authtoken = localStorage.getItem("token");
  const [orderstatus, setorderstatusdata] = useState(piechartsampledata);
  const [monthlySpending, setMonthlySpending] = useState(
    initialMonthlyproducts
  );
  const [weeklyusers, setweeklyusers] = useState(weeklyusersdata);
  const { firstname, email, lastname, id } = isSignin();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/users" className="nav-link text-success">
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success mr-2">Name:</span>{" "}
            <small>{` ${firstname} ${lastname}`}</small>
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger mr-2">Email:</span>
            <small>{` ${email}`}</small>
          </li>
          <li className="list-group-item">
            <span className="badge bg-primary">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  const preload = () => {
    getOrders(id, authtoken).then((data) => {
      if (data.errormsg) {
        console.log(data.errormsg);
      } else {
        const timestamps = data.map((item) =>
          new Date(item.createdAt).getMonth()
        );
        let obj = {
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        };
        timestamps.forEach((item) => {
          if (item === 0) {
            obj.Jan += 1;
          } else if (item === 1) {
            obj.Feb += 1;
          } else if (item === 2) {
            obj.Mar += 1;
          } else if (item === 3) {
            obj.Apr += 1;
          } else if (item === 4) {
            obj.May += 1;
          } else if (item === 5) {
            obj.Jun += 1;
          } else if (item === 6) {
            obj.Jul += 1;
          } else if (item === 7) {
            obj.Aug += 1;
          } else if (item === 8) {
            obj.Sep += 1;
          } else if (item === 9) {
            obj.Oct += 1;
          } else if (item === 10) {
            obj.Nov += 1;
          } else if (item === 11) {
            obj.Dec += 1;
          }
        });
        setMonthlySpending([
          { name: "Jan", y: obj.Jan },
          { name: "Feb", y: obj.Feb },
          { name: "Mar", y: obj.Mar },
          { name: "Apr", y: obj.Apr },
          { name: "May", y: obj.May },
          { name: "Jun", y: obj.Jun },
          { name: "Jul", y: obj.Jul },
          { name: "Aug", y: obj.Aug },
          { name: "Sep", y: obj.Sep },
          { name: "Oct", y: obj.Oct },
          { name: "Nov", y: obj.Nov },
          { name: "Dec", y: obj.Dec },
        ]);
      }
      let obj = {
        Received: 0,
        Canceled: 0,
      };
      let statusdata = data.map((item) => item.Status);
      statusdata.forEach((item) => {
        if (item === "Received") {
          obj.Received += 1;
        } else {
          obj.Canceled += 1;
        }
      });
      setorderstatusdata([
        {
          name: "Received",
          y: obj.Received,
        },
        {
          name: "Canceled",
          y: obj.Canceled,
        },
      ]);
    });
    getAllusers(id, authtoken)
      .then((data) => {
        let newusersarry = [];
        data.forEach((item) => {
          if (item.role === 0) {
            newusersarry.push(item);
          }
        });
        let lastsevendays = Last7Days();
        let newdates = [];
        for (let index = 0; index < lastsevendays.length; index++) {
          const element = lastsevendays[index];
          newdates.push(getDayname(element));
        }
        let weeklydata = [];
        newdates.forEach((data) => {
          weeklydata.push({
            name: data,
            y: 0,
          });
        });
        newusersarry.forEach((item) => {
          if (getDayname(new Date(item.createdAt).getDay()) === "Sun") {
            let week = weeklydata.findIndex((data) => data.name === "Sun");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else if (getDayname(new Date(item.createdAt).getDay()) === "Mon") {
            let week = weeklydata.findIndex((data) => data.name === "Mon");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else if (getDayname(new Date(item.createdAt).getDay()) === "Tue") {
            let week = weeklydata.findIndex((data) => data.name === "Tue");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else if (getDayname(new Date(item.createdAt).getDay()) === "Wed") {
            let week = weeklydata.findIndex((data) => data.name === "Wed");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else if (getDayname(new Date(item.createdAt).getDay()) === "Tur") {
            let week = weeklydata.findIndex((data) => data.name === "Tur");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else if (getDayname(new Date(item.createdAt).getDay()) === "Fri") {
            let week = weeklydata.findIndex((data) => data.name === "Fri");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          } else {
            let week = weeklydata.findIndex((data) => data.name === "Sat");
            weeklydata[week] = {
              ...weeklydata[week],
              y: weeklydata[week].y + 1,
            };
          }
        });
        setweeklyusers(weeklydata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

  const adminChartSide = () => {
    return (
      <div className="chart mt-3 border border-light-subtle">
        <ColumnChart
          xaxistitle="Per Month"
          title="Number of Orders"
          yaxistitle="No of Orders"
          data={monthlySpending}
        />
      </div>
    );
  };
  const adminUserChart = () => {
    return (
      <div className="chart mt-3 border border-light-subtle">
        <ColumnChart
          xaxistitle="Per Day"
          title="Users Activity"
          yaxistitle="New User"
          data={weeklyusers}
        />
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className={`container ${styles.paddingcls}`}
    >
      <div className={`${styles.dashboardWrapper}`}>
        <div className={`${styles.linkswrapper}`}>{adminLeftSide()}</div>
        <div className={`${styles.profilewrapper}`}>
          {adminRightSide()}
          {adminChartSide()}
          {adminUserChart()}
          <PieChart data={orderstatus} />
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
