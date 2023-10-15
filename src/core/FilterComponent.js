import React from "react";
import styles from "../css/Filters.module.css";
export default function FilterComponent({
  gender = [],
  categories = [],
  brands = [],
  price = [],
  sizes=[],
  categoriesfilterHandler,
  brandsfilterHandler,
  pricefilterHandler,
  sizefilterHandler,
  genderfilterHandler
}){
  return (
    <div className={`${styles["filters-section"]}`}>
      <div>
        {gender.length ?(
          gender?.map((g, index) => {
            return (
              <div className="form-check" key={`${g}${index}`}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id={g}
                  value={g}
                  onChange={(e)=>{genderfilterHandler(e.target.value)}}
                />
                <label htmlFor={g}>{g}</label>
                
              </div>
            );
          })):<div></div>}
      </div>
      {categories.length ? (
        <div>
          <h3>Categories</h3>
          <div>
            {categories.length &&
              categories?.map((c, index) => {
                return (
                  <div className="mb-3 form-check" key={`${c}${index}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name=""
                      id={c._id}
                      onChange={(e)=>{
                        categoriesfilterHandler(c.name,e.target.checked)
                      }}
                    />
                    <label className="form-check-label" htmlFor={c}>
                      {c.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      ):<div></div>}
      {brands.length? (
        <div>
          <h3>Brands</h3>
          <div>
            {brands.length &&
              brands?.map((b, index) => {
                return (
                  <div className="mb-3 form-check" key={`${b}${index}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name=""
                      id={b}
                      onChange={(e)=>{
                        brandsfilterHandler(b,e.target.checked)
                      }}
                    />
                    <label className="form-check-label" htmlFor={b}>
                      {b}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      ):<div></div>}
      {price.length ? (
        <div>
          <h3>Price</h3>
          <div>
            {price.length &&
              price?.map((p, index) => {
                return (
                  <div className="mb-3 form-check" key={`${p}${index}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name=""
                      id={p}
                      onChange={(e)=>{
                        pricefilterHandler(p.value,e.target.checked);
                      }}
                    />
                    <label
                      id={p.value}
                      className="form-check-label"
                      htmlFor={p}
                    >
                      {p.label}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      ):<div></div>}
      {
        sizes.length ?(
          <div>
            <h3>Size</h3>
            <div>
              {
                sizes.length && sizes.map((s,index)=>{
               return   <div className="mb-3 form-check" key={`${s.name}${index}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name=""
                    id={s._id}
                    onChange={(e)=>{
                      sizefilterHandler(s.name,e.target.checked)
                    }}
                  />
                  <label
                    id={s._id}
                    className="form-check-label"
                    htmlFor={s._id}
                  >
                    {s.name}
                  </label>
                </div>
                })
              }
            </div>
          </div>
        ):<div></div>
      }
    </div>
  );
}
