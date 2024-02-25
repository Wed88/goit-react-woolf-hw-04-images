import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import api from 'services/pixabayApi';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

export default class App extends Component {
  state = {
    imageName: '',
    images: {},
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const newName = this.state.imageName;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevName !== newName || prevPage !== newPage) {
      this.setState({ isLoading: true });

      try {
        const data = await api.fetchImageNameWithQuery(newName, newPage);

        if (data.hits.length === 0) {
          toast.error(
            'Ops, there are no images matching your search query. Please try again.'
          );

          return;
        }
        if (newPage * 12 >= data.totalHits) {
          toast.warn(
            'We are sorry, but you  reached the end of search results.'
          );
        }

        newPage === 1
          ? this.setState({ images: data.hits })
          : this.setState(prevState => {
              return { images: [...prevState.images, ...data.hits] };
            });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  handleSearchbarSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleIncrementPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL } = this.state;
    const { handleSearchbarSubmit, toggleModal, handleIncrementPage } = this;

    return (
      <div className="App">
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={toggleModal} />
        )}
        {images.length > 0 && images.length % 12 === 0 && (
          <Button onClick={handleIncrementPage} />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}
