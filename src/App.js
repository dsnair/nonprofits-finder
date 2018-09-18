import React from "react";
import isEmpty from "lodash/isEmpty";

import "./App.css";
import MyMap from "./MyMap";
import Form from "./Form";

const CITY = "Oakland";
const STATE = "CA";
const PAGE_SIZE = 10;

const CN_API_KEY = "d79dd1ad7b20120353f5874ed6cd13d2";
const APP_ID = "38f9f556";
const CN_URL = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${APP_ID}&app_key=${CN_API_KEY}&state=${STATE}&city=${CITY}&pageSize=${PAGE_SIZE}`;

class App extends React.Component {
  state = {
    response: {},
    coords: [
      {
        ein: "010570536",
        lat: 37.8043637,
        lng: -122.2711137
      },
      {
        ein: "010579792",
        lat: 37.8343129,
        lng: -122.2362901
      }
    ],
    error: false
  };

  // componentDidMount() {
  //   const readFile = async file => {
  //     const request = await fetch(file);
  //     const fileContents = await request.text();
  //     this.setState({ coords: fileContents });
  //     console.log("STATE", this.state.coords);
  //   };
  //   readFile("geocode.txt");
  // }

  handleClick = async event => {
    event.preventDefault();
    try {
      const request = await fetch(CN_URL);
      const response = await request.json();
      this.setState({
        response,
        error: false
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form onClick={this.handleClick} />
        {!isEmpty(this.state.response) && <MyMap coords={this.state.coords} />}
      </React.Fragment>
    );
  }
}

export default App;
