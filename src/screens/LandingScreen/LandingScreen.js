import React, { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/Button/CustomButton";
import styles from "./landingScreen.module.css";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../actions/userActions";
const LandingScreen = () => {
  //to dispatch actions to reducers
  const dispatch = useDispatch();
  //using history to navigate between pages
  let history = useHistory();

  //page states
  const [userName, setUserName] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  //submit handler for login
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("User", JSON.stringify({ userName }));
    history.push("/patients");
  };
  //generic logout handler
  const logoutHandler = () => {
    dispatch(userLogout(history));
    setLoggedUser("");
  };
  //checking if user is already logged in
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("User"));
    if (userData) {
      setLoggedUser(userData.userName);
    }
  }, [setLoggedUser]);
  return (
    <Container className={styles.container}>
      <Row>
        <div className={styles.innerContainer}>
          <Row>
            <div className={styles.imageContainer}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/AliveCor_Logo_PNG.png"
                alt="logo"
              />
            </div>
          </Row>
          <Row className={styles.formContainer}>
            <Form onSubmit={submitHandler}>
              {!loggedUser ? (
                <>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control
                      type="text"
                      placeholder="Enter your Name to Continue"
                      maxLength="20"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <CustomButton type="submit" disabled={userName === ""}>
                    Continue
                  </CustomButton>
                  <CustomButton onClick={() => history.push("/ex")}>
                    Feature
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton onClick={() => history.push("/patients")}>
                    Continue as {loggedUser}
                  </CustomButton>
                  <p
                    className={styles.mutedText}
                    onClick={() => logoutHandler()}
                  >
                    Logout, Start afresh?
                  </p>
                 
                </>
              )}
            </Form>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default LandingScreen;
