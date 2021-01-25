import React from "react";
import { Link } from "react-router-dom";

const SplashMain = function (props) {

  // Change splash image every 10 seconds
  const [splashImg, setSplashImg] = React.useState('main');

  React.useEffect(() => {
    const changeSplash = setInterval( () => {
      splashImg === 'main' ? setSplashImg('alt') : setSplashImg('main');
    }, 10000);

    return () => {
      clearInterval(changeSplash);
    }
  })
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
          <div id="splash-top-img" className={splashImg === 'main' ? `splash-img-main` : `splash-img-alt`}></div>
          {/* <img id="splash-top-img" src={window.splashImage} alt="employees working but fun" /> */}
          <span></span>
        </div>
      </section>
    </main>
  )
}

export default SplashMain;