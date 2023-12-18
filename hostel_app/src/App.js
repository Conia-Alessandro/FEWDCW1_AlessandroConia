import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoPage from './components/NoPage';
import Placeholder from './components/Placeholder';
import Navigation from './components/Navigation';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Placeholder />} />
            <Route path="/search" element={<Placeholder />} />
            <Route path="/filter" element={<Placeholder />} />
            <Route path="/reviews/:hostelId" element={<Placeholder />} />
            <Route path="/itinerary" element={<Placeholder />} />
            <Route path="/user-itinerary" element={<Placeholder />} />
            <Route path="/view-itinerary/:itineraryId" element={<Placeholder />} />
            <Route path="/add-review/:hostelId" element={<Placeholder />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
