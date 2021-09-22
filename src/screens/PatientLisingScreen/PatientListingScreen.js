import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./patientListing.module.css";
import { modalConstants } from "../../constants/modalConstants";
import EditPatient from "../../components/EditPatientModal/EditPatient";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar";

import { editPatient, addPatient } from "../../actions/patientActions";
const PatientLisingScreen = (props) => {
  //usage of history to navigate between pages
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [filteredData, setFilteredtData] = useState([]);

  //cherry-picking from glbal state (redux)
  let { data } = useSelector((state) => state.patientData);

  //this opens up a modal on click of a table row
  const editPatientModalHandler = (patientData) => {
    setSelectedPatient(patientData);
    setModalShow(true);
  };
  //global filter handler
  const filterHandler = (searchInput) => {
    let filteredData = data.filter(
      (value) =>
        value.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.country.value.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.street.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.pinCode.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredData;
  };
  //checking if there is any change in searchText to filter data
  useEffect(() => {
    searchText === ""
      ? setFilteredtData(data)
      : setFilteredtData(filterHandler(searchText));
  }, [searchText, data]);
  return (
    <>
      <CustomNavbar history={props.history}  addPatient={addPatient} />
      <Container className={styles.container}>
        <Row className={styles.header}>
          <Col>
            <h3 className={styles.title}>Patient List</h3>
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  placeholder="Search Patient..."
                  maxLength="20"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Table striped hover>
            <thead>
              <tr sytle={{ borderColor: "blue" }}>
                <th>S.NO</th>
                <th>First Name</th>
                <th>Last Name</th>

                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pin Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 &&
                filteredData.map((d, index) => (
                  <tr
                    className={styles.tableRow}
                    onClick={() => history.push(`/patients/${d.id}`)}
                    onDoubleClick={() => editPatientModalHandler(d)}
                  >
                    <td>{index + 1}</td>
                    <td>{d.firstName}</td>
                    <td>{d.lastName}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td>
                      {d.street}, {d.country.value}
                    </td>
                    <td>{d.pinCode}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {filteredData.length === 0 && (
            <div className={styles.noData}>
              <h4>No data found</h4>
            </div>
          )}
        </Row>
        <EditPatient
          type={modalConstants.EDIT}
          data={selectedPatient}
          show={modalShow}
          onHide={() => setModalShow(false)}
          editPatient={editPatient}
          addPatient={addPatient}
        />
      </Container>
    </>
  );
};

export default PatientLisingScreen;
