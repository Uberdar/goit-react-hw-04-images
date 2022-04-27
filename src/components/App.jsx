import { Component } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
// import SearchForm from './SearchForm/SearchForm';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import ImageGallery from './ImageGallery/ImageGallery';
// import LoadMore from './Button/Button';
import HooksButton from './Button/HooksButton';
// import Modal from './Modal/Modal';
import HooksSearchFrom from './SearchForm/HooksSearchForm';
import HooksModal from './Modal/HooksModal';
import { useState } from 'react';
import HooksImageGallery from './ImageGallery/HooksImageGallery';

export default function App() {
  const [obj, setObj] = useState(null);
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [showmodal, setShowmodal] = useState(false);
  const [src, setSrc] = useState('');

  const toggleModal = e => {
    let x = e['target'].dataset.test;
    setShowmodal(!showmodal);
    setSrc(x);
  };
  const toggleModalCL = () => {
    setShowmodal(!showmodal);
  };
  const handleFormSubmit = pictureName => {
    // console.log('pictureName: ', pictureName);
    setPictureName(pictureName);
    setPage(1);
  };
  const addNewPages = () => {
    setPage(page + 1);
  };
  const handleWholeObj = wholeObj => {
    setObj(wholeObj);
  };

  return (
    <div>
      <HooksSearchFrom whenSubmit={handleFormSubmit} />
      <HooksImageGallery
        pictureName={pictureName}
        page={page}
        toggleModal={toggleModal}
        wholeObj={handleWholeObj}
      />

      {obj !== null && obj?.hits?.length < obj?.totalHits ? (
        <HooksButton newPages={addNewPages} />
      ) : null}
      {showmodal ? <HooksModal imgSrc={src} onClose={toggleModalCL} /> : null}
      <ToastContainer autoClose={3000} theme={'colored'} transition={Flip} />
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
class OldApp extends Component {
  state = {
    obj: null,
    pictureName: '',
    page: 1,
    showmodal: false,
    src: '',
  };
  toggleModal = e => {
    // console.log('e: ', e['target'].dataset.test);
    let x = e['target'].dataset.test;
    this.setState({
      showmodal: !this.state.showmodal,
      src: x,
    });
  };
  toggleModalCL = () => {
    this.setState({
      showmodal: !this.state.showmodal,
    });
  };
  handleFormSubmit = pictureName => {
    // console.log('pictureName: ', pictureName);
    this.setState({
      pictureName,
      page: 1,
    });
  };
  addNewPages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleWholeObj = wholeObj => {
    this.setState({ obj: wholeObj });
  };
  render() {
    // console.log('this.state.obj:', this.state.obj);
    return (
      <div>
        <HooksSearchFrom whenSubmit={this.handleFormSubmit} />
        <HooksImageGallery
          pictureName={this.state.pictureName}
          page={this.state.page}
          toggleModal={this.toggleModal}
          wholeObj={this.handleWholeObj}
        />

        {this.state.obj !== null &&
        this.state.obj?.hits?.length < this.state.obj?.totalHits ? (
          <HooksButton newPages={this.addNewPages} />
        ) : null}
        {this.state.showmodal ? (
          <HooksModal imgSrc={this.state.src} onClose={this.toggleModalCL} />
        ) : null}
        <ToastContainer autoClose={3000} theme={'colored'} transition={Flip} />
      </div>
    );
  }
}
