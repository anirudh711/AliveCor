import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import { modalConstants } from "../../constants/modalConstants";
import EditPatient from "../../components/EditPatientModal/EditPatient";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar";
const PatientLisingScreen = (props) => {
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [filteredData, setFilteredtData] = useState([]);
  let { data } = useSelector((state) => state.patientData);
  console.log(data);
  const editPatientModalHandler = (patientData) => {
    setSelectedPatient(patientData);
    setModalShow(true);
  };
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

  useEffect(() => {
    console.log('data')
    searchText===""?setFilteredtData(data):setFilteredtData(filterHandler(searchText));
  }, [searchText, data]);
  console.log(filteredData);
  return (
    <>
      <CustomNavbar history={props.history} />
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
        />
      </Container>
    </>
  );
};

export default PatientLisingScreen;
