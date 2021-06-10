import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar";
import styles from "./patientDetail.module.css";
import CustomButton from "../../components/Button/CustomButton";
import { deletePatient, editPatient } from "../../actions/patientActions";
const PatientDetailScreen = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  //destructuring props
  const { id: patientId } = props.match.params;
  //cherry-picking state data to populate page
  let { data: patientsData } = useSelector((state) => state.patientData);

  //states to handle inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [street, setStreet] = useState("");
  const [pinCode, setPinCode] = useState("");

  //if data is existing in props
  const populateData = (data) => {
    console.log("populate data");
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phone);
    setEmail(data.email);
    setStreet(data.street);
    setPinCode(data.pinCode);
    setCountry(data.country);
  };
  //fetching countries
  const fetchCountries = async () => {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
    let countryData = data.map((d) => {
      return { name: d.name, callingCode: d.callingCodes[0] };
    });
    setCountryList(countryData);
  };
  //validating phone number
  const validatePhoneNumber = (phone) => {
    phone = phone.replace(/[^0-9]/g, "");
    if (phone.length > 10) {
      alert("Phone number cannot be more than ten digits");
    } else {
      setPhone(phone);
    }
  };
  //populating patient data after fetching from state
  useEffect(() => {
    countryList.length === 0 && fetchCountries();
    let index = patientsData.findIndex((d) => d.id === patientId);
    if (index < 0) {
      return history.push("/patients");
    }

    index > -1 && populateData(patientsData[index]);
  }, [patientsData, history, patientId, countryList.length]);

  //global submit handler
  const submitHandler = (e) => {
    //stopping event propogation to reload the page
    e.preventDefault();
    if (phone.replace(/[^0-9]/g, "").length === 10) {
      const dataToSave = {
        firstName,
        lastName,
        email,
        phone,
        country,
        street,
        pinCode,
      };
      dispatch(editPatient(dataToSave, patientId));
      history.push("/patients");
    } else {
      alert("Please check your phone number");
    }
  };
  return (
    <>
      <CustomNavbar history={props.history} />
      <Container className={styles.container}>
        <Row>
          <div
            className={styles.backContainer}
            onClick={() => history.push("/patients")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#2D9F86"
              viewBox="0 0 24 24"
            >
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </svg>
            <span className={styles.backText}>Back</span>
          </div>
        </Row>
        <Row className={styles.header}>
          <Col>
            <h3 className={styles.title}>{firstName}'s Details</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={submitHandler} className={styles.formContainer}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  maxLength="20"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  maxLength="20"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Address">
                <Form.Label>Address</Form.Label>
                <Row>
                  <Col>
                    <Select
                      placeholder="Select Country"
                      value={country}
                      onChange={(option) => setCountry(option)}
                      options={countryList.map((c) => {
                        return {
                          value: c.name,
                          label: c.name,
                          code: c.callingCode,
                        };
                      })}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter Street Name"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter Pincode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <label htmlFor="basic-url">Phone Number</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  {country && (
                    <InputGroup.Text id="basic-addon1">
                      +{country.code}
                    </InputGroup.Text>
                  )}
                </InputGroup.Prepend>
                <FormControl
                  type="number"
                  placeholder="Enter Phone Number"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => validatePhoneNumber(e.target.value)}
                />
              </InputGroup>
              <Form.Group>
                <div className={styles.buttonGroup}>
                  <CustomButton type="submit">{"Save Changes"}</CustomButton>
                  <CustomButton
                    style={{ backgroundColor: "#CB4C4E", border: "none" }}
                    onClick={() => {
                      dispatch(deletePatient(patientId));
                      history.push("/patients");
                    }}
                  >
                    {"Delete Patient"}
                  </CustomButton>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PatientDetailScreen;
