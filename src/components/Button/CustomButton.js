import { Button } from "react-bootstrap";
import React from "react";
import styles from "./customButton.module.css";
const CustomButton = (props) => {
  return (
    <Button style={{...props.style}} className={styles.button} {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
