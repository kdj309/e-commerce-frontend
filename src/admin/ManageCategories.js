import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { BsArrowLeft } from "react-icons/bs";
import {
  DeleteCategory,
  getCategories,
  getOrderedCategories,
} from "./helper/adminapicall";
import { isSignin } from "../auth/helper";
import Alert from "../user/Alert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "../css/ManageCategories.module.css";

export default function ManageCategories() {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();

  const [categories, setcategories] = useState([]);
  const [categoriesdatapoints, setcategoriesdatapoints] = useState([]);
  const [values, setvalues] = useState({
    error: false,
    success: false,
    errormsg: "",
    deletedcategory: "",
  });
  const { success, error, errormsg, deletedcategory } = values;

  function deleteHandler(categoryid) {
    DeleteCategory(categoryid, id, authtoken).then((data) => {
      if (data.errormsg) {
        setvalues({
          ...values,
          error: true,
          errormsg: data.errormsg,
        });
      } else {
        setvalues({
          ...values,
          success: true,
          deletedcategory: data.name,
        });
        setcategories((previous) => {
          return previous.filter((category) => {
            return category._id !== categoryid;
          });
        });
        console.log("something wrong");
      }
    });
  }
  useEffect(() => {
    const preload = () => {
      getCategories().then((data) => {
        if (data.errors || data.errormsg) {
          console.log(data.errormsg);
        } else {
          setcategories(data);
        }
      });
      getOrderedCategories(id, authtoken)
        .then((data) => {
          let map = {};
          let categoriestem = data.map((item) => {
            return item.categories;
          });
          categoriestem.forEach((item) => {
            if (map[item]) {
              map[item] += 1;
            } else {
              map[item] = 1;
            }
          });
          let maindatapoints = [];
          categories.forEach((category, index) => {
            if (Object.keys(map).includes(category.name)) {
              maindatapoints[index] = [category.name, map[category.name]];
            } else {
              maindatapoints[index] = [category.name, 0];
            }
          });
          setcategoriesdatapoints(maindatapoints);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    preload();
  }, []);
  const options = {
    title: {
      text: "Categories data",
    },
    yAxis: {
      title: {
        text: "Categories",
      },
    },

    xAxis: {
      title: "No of orders",
    },
    series: [
      {
        data: categoriesdatapoints,
      },
    ],
  };
  return (
    <Base
      className={`container ${styles.paddingcls}`}
      title="Manage categories"
      description="You can Handle the categories operations"
    >
      <div className={`${styles.categoriesDashboard}`}>
        <div className={`bg-white text-dark ${styles.categoriestable}`}>
          <Link
            to="/admin/dashboard"
            className="btn btn-outline-info rounded-2 m-2"
          >
            <BsArrowLeft />
          </Link>
          {success ? (
            <Alert
              alerttype="success"
              msg={`Product ${deletedcategory} deleted successfully`}
            />
          ) : error ? (
            <Alert alerttype="danger" msg={errormsg} />
          ) : null}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">operations</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    <div className={`${styles.categoriesbtn}`}>
                      <button
                        onClick={() => deleteHandler(category._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <MdDeleteOutline />
                      </button>
                      <Link
                        to={`/admin/category/updateCategory/${category._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <AiOutlineEdit />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.categorieschart}`}>
          <HighchartsReact
            allowChartUpdate={true}
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
    </Base>
  );
}
