import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";

let displayUnit = "";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "6",
    category: "general",
    heading: "Top Headlines",
    setProgress: 0,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("This is a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.heading} - NewsiFy`;
  }

  async updateNews() {
    try {
      this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(50);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    displayUnit= <div className="row">
    {this.state.articles.map((element) => {
      return (
        <div className="col-md-4" key={element.url}>
          <NewsItem
            title={element.title}
            description={element.description}
            imageUrl={element.urlToImage}
            newsUrl={element.url}
            author={element.author}
            date={element.publishedAt}
            source={element.source.name}
          ></NewsItem>
        </div>
      );
    })}
  </div>
    this.props.setProgress(100);
    }
    catch(err) {
      console.log(err);
      this.setState({loading:false})
      displayUnit = <div>
        <h1 className="text-center">Something went wrong!</h1>
        <h3 className="text-center">Unable to fetch data</h3>
      </div>
      this.props.setProgress(100);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

//   prevClickHandler = async () => {
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   };

//   nextClickHandler = async () => {
//     if (
//       this.state.page + 1 >
//       Math.ceil(this.state.totalResults / this.state.pageSize)
//     ) {
//     } else {
//       this.setState({ page: this.state.page + 1 });
//       this.updateNews();
//     }
//   };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  //   ${this.props.apiKey}

  render() {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "25px", fontSize: "40px" }}>
          <b>NewsiFy - {this.props.heading}</b>
        </h2>
        <hr />
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container">
            {displayUnit}
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
