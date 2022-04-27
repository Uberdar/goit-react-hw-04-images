import { Component } from 'react';

export default class Button extends Component {
  //   state = {
  //     page: 1,
  //   };
  //   componentDidUpdate(x, y) {
  //     if (y.page !== this.state.page) {
  //       this.props.newPages(this.state.page);
  //     }
  //   }
  addAndLoadMore = () => {
    // this.setState({ page: this.state.page + 1 });
    // this.props.newPages(this.state.page);
  };
  render() {
    // console.log(this.state.page);
    return (
      <button className="Button" onClick={this.props.newPages}>
        Load More
      </button>
    );
  }
}
