import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import LoadingBar from "react-top-loading-bar";

import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    let pageSize = 6;
    return (
      <div>
        <Navbar />
        <LoadingBar color="#f11946" progress={this.state.progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                heading="Top Headlines"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
                heading="Business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
                heading="Entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
                heading="Health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
                heading="Science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
                heading="Sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
                heading="Technology"
              />
            }
          />
        </Routes>
      </div>
    );
  }
}
