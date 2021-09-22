import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalConstants } from "../../constants/modalConstants";
import EditPatient from "../EditPatientModal/EditPatient";
import styles from "./navbar.module.css";

import { userLogout } from "../../actions/userActions";
const CustomNavbar = (props) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/></svg>
        </Navbar.Text>
      </Navbar.Collapse>
      <EditPatient
        type={modalConstants.CREATE}
        show={modalShow}
        onHide={() => setModalShow(false)}
        addPatient={props.addPatient}
      />
    </Navbar>
  );
};

export default CustomNavbar;
