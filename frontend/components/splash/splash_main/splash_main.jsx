import React from "react";
import { Link } from "react-router-dom";

const SplashMain = function (props) {

  // Change splash image every 10 seconds (1 -> 2 -> 3 ... -> 1)
  const [splashImg, setSplashImg] = React.useState(1);

  // Holding off on this until we can preload images more smoothly
  // React.useEffect(() => {
  //   const changeSplash = setInterval( () => {
  //     setSplashImg((splashImg % 3) + 1);
  //   }, 10000);

  //   return () => {
  //     clearInterval(changeSplash);
  //   }
  // })
  //

  return (
    <main id="splash-main">
      <section id="splash-top">
        <div id="splash-top-left">
          <div id="splash-top-left-content">
            <p> Work on <span className="highlight">big ideas</span>, without the busywork.</p>
            <div className="separator"></div>
            <p>Streamline your project workflow, track deadlines, and bring it all together <span className="highlight">with</span> <span className="highlight">Azena.</span></p>
            <div>
              <Link to="/signup"><button id="splash-signup-btn" type="button"> Try for free </button></Link>
            </div>
          </div>

        </div>
        <div id="splash-top-right">
          <div id="splash-top-img" className={`splash-img-${splashImg}`}></div>
          {/* <img id="splash-top-img" src={window.splashImage} alt="employees working but fun" /> */}
          <span></span>
        </div>
      </section>
    </main>
  )
}

export default SplashMain;