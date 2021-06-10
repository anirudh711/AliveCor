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
  const [firstName, setFirstName] = useState({
    value: "",
    isValid: true,
    message: "Please check your First Name for special characters",
  });
  const [lastName, setLastName] = useState({
    value: "",
    isValid: true,
    message: "Please check your Last Name for special characters",
  });
  const [phone, setPhone] = useState({
    value: "",
    isValid: true,
    message: "Please check your Phone Number.It must be 10 digits",
  });
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [street, setStreet] = useState("");
  const [pinCode, setPinCode] = useState("");


  //if data is existing in props
  const populateData = (data) => {
    setFirstName({ ...firstName, value: data.firstName });
    setLastName({ ...lastName, value: data.lastName });
    setPhone({ ...phone, value: data.phone });
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
  const validatePhoneNumber = (value) => {
    value.replace(/[^0-9]/g, "").length < 10 ||
    value.replace(/[^0-9]/g, "").length > 10
      ? setPhone({ ...phone, value: value, isValid: false })
      : setPhone({ ...phone, value: value, isValid: true });
  };
  //validating name
  const validateName = (string, name) => {
    var regex = /[^A-Z a-z0-9]/g;
    if (name == "first") {
      regex.test(string)
        ? (setFirstName({ ...firstName, isValid: false }) )
        : setFirstName({ ...firstName, value: string, isValid: true });
    } else {
      regex.test(string)
        ? setLastName({ ...lastName, isValid: false })
        : setLastName({ ...lastName, value: string, isValid: true });
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
    
      const dataToSave = {
        firstName:firstName.value,
        lastName:lastName.value,
        email,
        phone: phone.value,
        country,
        street,
        pinCode,
      };
      dispatch(editPatient(dataToSave, patientId));
      history.push("/patients");
    
  };
  console.log(phone);
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
            <h3 className={styles.title}>{firstName.value}'s Details</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={submitHandler} className={styles.formContainer}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>
                  First Name
                  {!firstName.isValid && (
                  <span className={styles.alert}>* {firstName.message}</span>
                )}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  maxLength="20"
                  value={firstName.value}
                  onChange={(e) =>
                    setFirstName({ ...firstName, value: e.target.value })
                  }
                  onBlur={(e) => validateName(e.target.value, "first")}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name
                {!lastName.isValid && (
                  <span className={styles.alert}>* {lastName.message}</span>
                )}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  maxLength="20"
                  value={lastName.value}
                  onChange={(e) =>
                    setLastName({ ...lastName, value: e.target.value })
                  }
                  onBlur={(e) => validateName(e.target.value, "last")}
                  required
                />
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter Pincode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <label htmlFor="basic-url">Phone Number
              {!phone.isValid && (
                <span className={styles.alert}>* {phone.message}</span>
              )}</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend style={{marginTop:'5px'}}>
                  {country && (
                    <InputGroup.Text id="basic-addon1">
                      +{country.code}
                    </InputGroup.Text>
                  )}
                </InputGroup.Prepend>
                <FormControl
                style={{marginTop:'5px'}}
                  type="number"
                  placeholder="Enter Phone Number"
                  maxLength="10"
                  value={phone.value}
                  // onChange={(e)=>setPhone({...phone,isValid:true})
                  onChange={(e) => validatePhoneNumber(e.target.value)}
                  required
                />
              </InputGroup>
             
              <Form.Group>
                <div className={styles.buttonGroup}>
                  <CustomButton type="submit" disabled={!firstName.isValid || !lastName.isValid || !phone.isValid}>{"Save Changes"}</CustomButton>
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
