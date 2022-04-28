import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

export default function HooksImageGallery({
  pictureName,
  page,
  toggleModal,
  wholeObj,
}) {
  const [picture, setPicture] = useState(null);

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (pictureName !== '') {
      setStatus('pending');
      fetch(
        `https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${pictureName}&per_page=3&page=${page}`
      )
        .then(res => res.json())
        .then(result => {
          setPicture(prevState =>
            page > 1
              ? {
                  ...prevState,
                  hits: [...prevState.hits, ...result.hits],
                }
              : result
          );
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [pictureName, page]);

  useEffect(() => {
    wholeObj(picture);
  }, [picture, wholeObj]);

  const makeMarkup = () => {
    return picture.hits.map(elem => {
      return (
        <li className="ImageGalleryItem" key={elem.id}>
          <img
            data-source={elem.largeImageURL}
            data-test={elem.largeImageURL}
            className="ImageGalleryItem-image"
            src={elem.previewURL}
            alt={elem.tags}
            onClick={toggleModal}
          />
        </li>
      );
    });
  };

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
        {/* {loading && <div>Loading...</div>} */}
        {!pictureName && <div>Enter Search Word</div>}
        {picture ? makeMarkup() : ''}
      </ul>
    );
  }
}
