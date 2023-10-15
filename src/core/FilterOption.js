import React from "react";

export default function FilterOption({
  selectedoptions,
  selectedtype,
  onChangeHandler,
  className,
}) {
  return (
    <div className={className}>
      {selectedoptions?.map((c, index) => {
        return (
          <div
            className="mb-3 py-2 form-check border-bottom border-light-subtle"
            key={`${index}`}
          >
            {selectedtype === "gender" ? (
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id={c}
                value={c}
                onChange={(e) => onChangeHandler(e)}
              />
            ) : (
              <input
                className="form-check-input"
                type="checkbox"
                name=""
                id={
                  selectedtype==="size"
                    ? c.name
                    : selectedtype==="categories"
                    ? c.name
                    : selectedtype==="brands"
                    ? c
                    : selectedtype==="price"
                    ? c.label
                    : selectedtype==="gender"
                    ? c
                    : ""
                }
                onChange={(e) => {
                  onChangeHandler(e, c);
                }}
              />
            )}

            <label
              className="form-check-label"
              htmlFor={
                selectedtype==="size"
                  ? c.name
                  : selectedtype==="categories"
                  ? c.name
                  : selectedtype==="brands"
                  ? c
                  : selectedtype==="price"
                  ? c.label
                  : selectedtype==="gender"
                  ? c
                  : ""
              }
            >
              {selectedtype==="size"
                ? c.name
                : selectedtype==="categories"
                ? c.name
                : selectedtype==="brands"
                ? c
                : selectedtype==="price"
                ? c.label
                : selectedtype==="gender"
                ? c
                : ""}
              {/* {JSON.stringify(c)} */}
            </label>
          </div>
        );
      })}
    </div>
  );
}
