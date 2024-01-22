import React, { useEffect } from "react";
import { connect } from "react-redux";
import action from "../store/action";
import api from "../api";


const test = function test(props) {
    
    return <div className="test">
        test
    </div>
};

export default connect(
    state => state.base,
    null
)(test);