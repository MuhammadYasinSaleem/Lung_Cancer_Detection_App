// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import persistor from '../main.jsx'
// import { setLogout } from "../../state/index.js";

// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const dispatch = useDispatch()

//   const handleLogout = async () => {
//     await axios
//       .get("http://localhost:4000/api/v1/user/patient/logout", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         dispatch(setLogout())
//         await persistor.purge()
//         toast.success(res.data.message);
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   };

//   const navigateTo = useNavigate();

//   const goToLogin = () => {
//     navigateTo("/login");
//   };

//   return (
//     <>
//       <nav className={"container"}>
//         <div className="logo">
//           <img src="/logo.png" alt="logo" className="logo-img" />
//         </div>
//         <div className={show ? "navLinks showmenu" : "navLinks"}>
//           <div className="links">
//             <Link to={"/"} onClick={() => setShow(!show)}>
//               Home
//             </Link>
//             <Link to={"/appointment"} onClick={() => setShow(!show)}>
//               Appointment
//             </Link>
//             <Link to={"/about"} onClick={() => setShow(!show)}>
//               About Us
//             </Link>
//           </div>
//           {isLoggedIn ? (
//             <button className="logoutBtn btn" onClick={handleLogout}>
//               LOGOUT
//             </button>
//           ) : (
//             <button className="loginBtn btn" onClick={goToLogin}>
//               LOGIN
//             </button>
//           )}
//         </div>
//         <div className="hamburger" onClick={() => setShow(!show)}>
//           <GiHamburgerMenu />
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import persistor from "../main.jsx"; // ✅ FIXED: Ensure named export if using destructuring
import { setLogout } from "../../state/index.js";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        { withCredentials: true }
      );

      dispatch(setLogout()); // ✅ Correct usage of Redux logout action
      await persistor.purge(); // ✅ Await outside `.then()` - this was a syntax error
      toast.success(res.data.message); // ✅ Show logout success
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(false)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(false)}>
              About Us
            </Link>
          </div>
          {isLoggedIn ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
