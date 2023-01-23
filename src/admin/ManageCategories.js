import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { BsArrowLeft } from "react-icons/bs";
import { DeleteCategory, getCategories } from "./helper/adminapicall";
import { isSignin } from "../auth/helper";
import Alert from "../user/Alert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ManageCategories() {
  const { id, authtoken } = isSignin();
  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  const [categories, setcategories] = useState([]);
  const [values, setvalues] = useState({
    error: false,
    success: false,
    errormsg: "",
    deletedcategory: "",
  });
  const { success, error, errormsg, deletedcategory } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.errors || data.errormsg) {
        console.log(data.errormsg);
      } else {
        setcategories(data);
      }
    });
  };
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
            return category._id != categoryid;
          });
        });
        console.log("something wrong");
      }
    });
  }
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      className="container p-4 bg-info"
      title="Manage categories"
      description="You can Handle the categories operations"
    >
      <div className="row">
        <div className="col-md-8  bg-white text-dark p-4">
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
                    <div>
                      <button
                        onClick={() => deleteHandler(category._id)}
                        className="btn btn-danger m-2"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin/category/updateCategory/${category._id}`}
                        className="btn btn-primary m-2"
                      >
                        Update
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
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
