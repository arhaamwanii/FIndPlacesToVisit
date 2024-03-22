import { useRef, useState, useEffect ,useCallback } from 'react';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc';

function App() {
  const [modalIsOpen , setModalIsOpen ] = useState(false)
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(() => {
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    return storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id));
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some(place => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find(place => place.id === id);
      const updatedPlaces = [place, ...prevPickedPlaces];
      const storedIds = updatedPlaces.map(place => place.id);
      localStorage.setItem('selectedPlaces', JSON.stringify(storedIds));
      return updatedPlaces;
    });
  }
  const handleRemovePlace = useCallback (  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => {
      const updatedPlaces = prevPickedPlaces.filter(place => place.id !== selectedPlace.current);
      const storedIds = updatedPlaces.map(place => place.id);
      localStorage.setItem('selectedPlaces', JSON.stringify(storedIds));
      setModalIsOpen(false)
      return updatedPlaces;
    });
  } , [])


  return (
    <>
      <Modal open={modalIsOpen}>
      <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;