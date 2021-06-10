import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import {
  Form,
  Modal,
  Col,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import styles from "./editPatient.module.css";
import { editPatient, addPatient } from "../../actions/patientActions";
import { modalConstants } from "../../constants/modalConstants";
import CustomButton from "../Button/CustomButton";

const EditPatient = (props) => {
  const dispatch = useDispatch();
  //destructuring props
  const { type, data: existingPatientData } = props;
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
    message: "Please check your Phone Number. It must be 10 digits",
  });
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [street, setStreet] = useState("");
  const [pinCode, setPinCode] = useState("");

  //cleanup function
  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setCountry("");
    setStreet("");
    setPinCode("");
    setCountry("");
  };

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

  //global submit handler
  const submitHandler = (e) => {
    //stopping event propogation to reload the page
    e.preventDefault();
  
      const data = {
        firstName:firstName.value,
        lastName:lastName.value,
        email,
        phone: phone.value,
        country,
        street,
        pinCode,
      };
      type === modalConstants.EDIT
        ? dispatch(editPatient(data, existingPatientData.id))
        : dispatch(addPatient(data));
      //cleanup
      clearInputs();
      props.onHide();
    
  };
  useEffect(() => {
    countryList.length === 0 && fetchCountries();
    if (type === modalConstants.EDIT) {
      populateData(existingPatientData);
    }
  }, [existingPatientData]);

  return (
    <>
      <Modal
        className={styles.mainContainer}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={styles.title}
          >
            {type === modalConstants.EDIT ? "Edit" : "Create"} Patient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name  {!firstName.isValid && (
                  <span className={styles.alert}>* {firstName.message}</span>
                )}</Form.Label>
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
              <Form.Label>Last Name {!lastName.isValid && (
                  <span className={styles.alert}>* {lastName.message}</span>
                )}</Form.Label>
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
                    required
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
            <label htmlFor="basic-url">Phone Number   {!phone.isValid && (
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
                value={phone.value}
                onChange={(e) => validatePhoneNumber(e.target.value)}
                maxLength="10"
                required
              />
            </InputGroup>
            <CustomButton type="submit"  disabled={!country || !firstName.isValid || !lastName.isValid || !phone.isValid}>
              {type === modalConstants.EDIT ? "Save Changes" : "Submit"}
            </CustomButton>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={props.onHide}>Close</CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPatient;
