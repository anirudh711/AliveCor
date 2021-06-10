import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalConstants } from "../../constants/modalConstants";
import EditPatient from "../EditPatientModal/EditPatient";
import styles from "./navbar.module.css";

import { userLogout } from "../../actions/userActions";
const CustomNavbar = () => {
  //dispatch actions to reducer
  const dispatch = useDispatch();
  //using history navigate between pages
  let history = useHistory();
  //state to handle modal visibility
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar className={styles.container}>
      <Navbar.Brand className={styles.logo} onClick={() => history.push("/")}>
        <h4>AliveCor</h4>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className={styles.buttonGroup}>
        <Form></Form>
        <Navbar.Text
          onClick={() => setModalShow(true)}
          className={styles.addButton}
        >
          <h6>Add Patient</h6>
        </Navbar.Text>
        <Navbar.Text onClick={() => dispatch(userLogout(history))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
          </svg>
        </Navbar.Text>
      </Navbar.Collapse>
      <EditPatient
        type={modalConstants.CREATE}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Navbar>
  );
};

export default CustomNavbar;
