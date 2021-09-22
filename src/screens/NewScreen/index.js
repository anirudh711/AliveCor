import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import classes from "./index.module.css";
import { withInjectReducer } from "../../injectReducer";
import { reducer } from "./reducer";
import { Link } from "react-router-dom";
import { exampleAction } from "./actions";

const NewScreen = (props) => {
  useEffect(()=>{
    props.injectReducer({ NewScreen: reducer });
    props.exampleAction();
  },[])
  return <div className={classes.Root}><Link to="/">Go to home</Link></div>;
};

const mapStateToProps=null

const mapDispatchToProps={
  exampleAction:exampleAction
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withInjectReducer
)(NewScreen);