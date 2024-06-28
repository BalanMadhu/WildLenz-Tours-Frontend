import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'reactstrap';

export function TouristPlaces() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(''); // State for selected location filter
  const [randomPrices, setRandomPrices] = useState({}); // State for storing random prices
  const apiKey = '5ae2e3f221c38a28845f05b64b25a3ea2be0b1ab7eb8bb01d7f14942'; // Replace with your actual API key

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=37.618423&lat=55.751244&apikey=${apiKey}`);
        const fetchedPlaces = response.data.features;
        setPlaces(fetchedPlaces);
        setFilteredPlaces(fetchedPlaces); // Initialize filteredPlaces with all places
        
        // Generate random prices for each place
        const randomPricesObject = {};
        fetchedPlaces.forEach(place => {
          const randomPrice = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
          const roundedPrice = Math.round(randomPrice / 1000) * 10 + 'k'; // Round and format as '10k', '20k', etc.
          randomPricesObject[place.properties.xid] = roundedPrice;
        });
        setRandomPrices(randomPricesObject);
      } catch (error) {
        console.error('Error fetching the tourist places:', error);
      }
    };

    fetchPlaces();
  }, [apiKey]);

  // Filter places based on search term and selected location
  useEffect(() => {
    const filtered = places.filter(place =>
      place.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === '' || place.properties.name.toLowerCase().includes(selectedLocation.toLowerCase()))
    );
    setFilteredPlaces(filtered);
  }, [searchTerm, selectedLocation, places]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand">WildLens Tours</p>
        <div className="collapse navbar-collapse d-flex justify-content-between w-100 px-4 mx-auto align-items-center">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <p className="nav-link">Home <span className="sr-only mt-0">(current)</span></p>
            </li>
            <li className="nav-item">
              <p className="nav-link">About</p>
            </li>

          </ul>
          <form className="form-inline my-2 my-lg-0 d-flex gap-4">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search places..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="form-control mr-sm-2"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              <option value="new york">New York</option>
              <option value="paris">Paris</option>
              <option value="tokyo">Tokyo</option>
              {/* Add more options based on your needs */}
            </select>
          </form>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {filteredPlaces.map((place, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                {place.properties.preview && place.properties.preview.source ? (
                  <img src={place.properties.preview.source} className="card-img-top" alt={place.properties.name} />
                ) : (
                  <img src="https://images.pexels.com/photos/1615766/pexels-photo-1615766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="Placeholder" />
                )}
                <div className="card-body">
                  <h5 className="card-title">{place.properties.name}</h5>
                  <p className="card-text">{place.properties.kinds}</p>
                  <Badge color="primary">
                  {randomPrices[place.properties.xid]}
                </Badge>
                  {/* Adjust the currency symbol and formatting as needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
