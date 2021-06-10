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
import { editPatient, addPatient } from "../../actions/patientActions";
import styles from "./editPatient.module.css";
import { modalConstants } from "../../constants/modalConstants";

import CustomButton from "../Button/CustomButton";
const EditPatient = (props) => {
  const dispatch = useDispatch();
  const { type, data: existingPatientData } = props;
  //states to handle inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [street, setStreet] = useState("");
  const [pinCode, setPinCode] = useState("");
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

  useEffect(() => {
    countryList.length === 0 && fetchCountries();
    if (type === modalConstants.EDIT) {
      populateData(existingPatientData);
    }
  }, [existingPatientData]);
  const validatePhoneNumber = (phone) => {
    phone = phone.replace(/[^0-9]/g, "");
    if (phone.length > 10) {
      alert("Phone number cannot be more than ten digits");
    } else {
      setPhone(phone);
    }
  };
  //global submit handler
  const submitHandler = (e) => {
    //stopping event propogation to reload the page
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      phone,
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
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                maxLength="20"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
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
                value={phone}
                onChange={(e) => validatePhoneNumber(e.target.value)}
                maxLength="10"
                required
              />
            </InputGroup>
            <CustomButton
              type="submit"
              disabled={phone && phone.replace(/[^0-9]/g, "").length !== 10}
            >
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
