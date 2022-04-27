import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    picture: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.pictureName !== this.props.pictureName ||
      this.props.page !== prevProps.page
    ) {
      // console.log('prevProps.page: ', prevProps.page);
      // console.log('this.props.page: ', this.props.page);
      //   console.log('изменилось поисковое имя картинки');
      //   console.log('prevProps.pictureName: ', prevProps.pictureName);
      //   console.log('this.props.pictureName: ', this.props.pictureName);
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${this.props.pictureName}&per_page=3&page=${this.props.page}`
      )
        .then(res => res.json())
        .then(picture => {
          this.setState({
            picture:
              this.props.page > 1
                ? {
                    ...picture,
                    hits: [...this.state.picture.hits, ...picture.hits],
                  }
                : picture,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(this.props.wholeObj(this.state.picture));
    }
    if (prevState.picture?.hits?.length !== this.state.picture?.hits?.length) {
      this.state.picture && this.props.wholeObj(this.state.picture);
    }
  }
  //   toggleModal = () => {
  //     this.setState({ showmodal: !this.showmodal });
  //   };
  makeMarkup = () => {
    return this.state.picture.hits.map(elem => {
      return (
        <li className="ImageGalleryItem" key={elem.id}>
          <img
            data-source={elem.largeImageURL}
            data-test={elem.largeImageURL}
            className="ImageGalleryItem-image"
            src={elem.previewURL}
            alt={elem.tags}
            onClick={this.props.toggleModal}
          />
        </li>
      );
    });
  };

  render() {
    // console.log(this.state.picture?.toString()); //
    // console.log('toggleModal: ', this.state.showmodal);
    // console.log('obj in pictures', this.state.picture);

    // console.log(this.state.page);

    const { loading, picture, status } = this.state;
    if (status === 'idle') {
      return <div>Enter Search Word</div>;
    }
    if (status === 'pending') {
      return (
        <div>
          Loading...
          <Audio height="100" width="100" color="grey" ariaLabel="loading" />
        </div>
      );
    }
    if (status === 'rejected') {
      return <div>Error happened!</div>;
    }
    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {loading && <div>Loading...</div>}
          {!this.props.pictureName && <div>Enter Search Word</div>}
          {picture ? this.makeMarkup() : ''}
        </ul>
      );
    }
  }
}
