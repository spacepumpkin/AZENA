import React from "react";
import { Link } from "react-router-dom";

export default function SplashNavItem(props) {
  console.log(props)
  const { paths, type, children } = props;
  const title = props.title.replace(/\s+/g, '').toLowerCase();
  let dropdown = false;
  function toggleDropDown(evt) {
    // document.getElementsByClassName("dropdown-content")[0].classList.toggle("hide")
    evt.currentTarget.nextSibling.classList.toggle("hide")
  }

  return (
    <>
      {
        (type === "dropdown") ? (
          <>
            <button onClick={toggleDropDown} type="button">{title}</button>
            <div className="dropdown-content">
              {
                paths.map((path, linkIdx) => {
                  return (
                    <Link key={`${title}-${linkIdx}`} to={path}>{children[linkIdx]}</Link>
                  )
                })
              }
            </div>
          </>
        ) : (
          <Link to={paths}>{title}</Link>
        )
      }
    </>
  );
};

