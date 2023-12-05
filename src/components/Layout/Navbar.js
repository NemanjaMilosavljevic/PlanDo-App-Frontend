import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartLine,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./Navbar.module.css";
import NavbarCard from "../UI/NavbarCard";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { logoutHandler } from "../../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navbar = useSelector((state) => state.navbar);
  const { isShown, showAccountBar } = navbar;

  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const accountRef = useRef();

  const changeAccountHandler = () => {
    dispatch(logoutHandler());
    navigate({ pathname: "/sign-in" });
  };

  const signOut = () => {
    dispatch(logoutHandler());
  };

  const setNewPasswordHandler = (event) => {
    event.stopPropagation();
    dispatch(navbarActions.hideAccountSettings());
    navigate({ pathname: "/update-password" });
  };

  const onMouseEnterHandler = () => {
    dispatch(navbarActions.showNavbar());
  };
  const onMouseLeaveHandler = () => {
    dispatch(navbarActions.hideNavbar());
  };

  const showAccountHandler = () => {
    dispatch(navbarActions.showAccountSettings());
  };

  useEffect(() => {
    const onCloseOutsideClickHandler = (event) => {
      if (!accountRef.current?.contains(event.target)) {
        dispatch(navbarActions.hideAccountSettings());
      }
    };

    document.addEventListener("click", onCloseOutsideClickHandler, true);
  }, [dispatch]);

  return (
    <>
      <NavbarCard
        className={styles["nav-wrapper"]}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <Link to="/create-task" className={styles.link}>
          <div className={styles.flexcont}>
            <FontAwesomeIcon icon={faClipboard} style={{ color: "#000" }} />
            {isShown && <span>Create New Task</span>}
          </div>
        </Link>

        <Link to="/kanban" className={styles.link}>
          <div className={styles.flexcont}>
            <FontAwesomeIcon icon={faTableColumns} style={{ color: "#000 " }} />
            {isShown && (
              <span className={styles["span-text"]}>Kanban Board</span>
            )}
          </div>
        </Link>
        <Link to="/analitics" className={styles.link}>
          <div className={styles.flexcont}>
            <FontAwesomeIcon
              icon={faChartLine}
              style={{
                color: "#000",
              }}
            />
            {isShown && <span className={styles["span-text"]}>Analitycs</span>}
          </div>
        </Link>

        <div className={styles.flexcont} onClick={showAccountHandler}>
          <FontAwesomeIcon icon={faCircleUser} style={{ color: "#000" }} />
          {isShown && <span className={styles["span-text"]}>Account</span>}

          <div
            className={`${styles.container} ${
              showAccountBar ? styles.visible : ""
            }`}
            id="proba"
            ref={accountRef}
          >
            <ul className={styles.list}>
              <li>
                <p className={styles["no-padding"]}>Account</p>
                <p className={`${styles["no-padding"]} ${styles["bold"]}`}>
                  {userEmail}
                </p>
              </li>
              <li onClick={setNewPasswordHandler}>Change password</li>
              <li onClick={changeAccountHandler}>Change account</li>
            </ul>
          </div>
        </div>

        <Link to="/sign-in" className={styles.link} onClick={signOut}>
          <div className={styles.flexcont}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ color: "#000" }}
            />
            {isShown && <span className={styles["span-text"]}>Sign out</span>}
          </div>
        </Link>
      </NavbarCard>
    </>
  );
};

export default Navbar;