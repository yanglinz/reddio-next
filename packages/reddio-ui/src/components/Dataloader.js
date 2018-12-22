import React from "react";

import * as reddit from "../reddit";

const INITALIZED = "INITIALIZED";
const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

class ListingDataloader extends React.Component {
  state = {
    status: INITALIZED,
    data: null
  };

  loadData = () => {
    this.setState({ status: LOADING });
    reddit
      .fetchListing()
      .then(data => this.setState({ status: SUCCESS, data }))
      .catch(() => this.setState({ status: FAILED }));
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default ListingDataloader;
