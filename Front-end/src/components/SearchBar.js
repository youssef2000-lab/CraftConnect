import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, placeholder = "Quel service recherchez-vous ?" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { id: "", name: "Tous les services" },
    { id: "plomberie", name: "Plomberie" },
    { id: "electricite", name: "Électricité" },
    { id: "menuiserie", name: "Menuiserie" },
    { id: "peinture", name: "Peinture" },
    { id: "jardinage", name: "Jardinage" },
    { id: "nettoyage", name: "Nettoyage" },
    { id: "maconnerie", name: "Maçonnerie" },
    { id: "chauffage", name: "Chauffage" },
    { id: "climatisation", name: "Climatisation" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ searchTerm, location, category });
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setLocation("");
    setCategory("");
    if (onSearch) {
      onSearch({ searchTerm: "", location: "", category: "" });
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">

        <div className="search-input-group">

          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="location-input-wrapper">
            <svg className="location-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>

            <input
              type="text"
              placeholder="Ville ou code postal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-input"
            />
          </div>

          <div className="category-select-wrapper">
            <svg className="category-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="search-actions">
          <button type="submit" className="search-btn">
            Rechercher
          </button>

          {(searchTerm || location || category) && (
            <button type="button" onClick={handleClear} className="clear-btn">
              Effacer
            </button>
          )}
        </div>

      </form>

      <div className="search-suggestions">
        <span className="suggestions-label">Populaires:</span>

        <button
          onClick={() => setSearchTerm("Plomberie")}
          className="suggestion-tag"
        >
          Plomberie
        </button>

        <button
          onClick={() => setSearchTerm("Électricité")}
          className="suggestion-tag"
        >
          Électricité
        </button>

        <button
          onClick={() => setSearchTerm("Peinture")}
          className="suggestion-tag"
        >
          Peinture
        </button>

        <button
          onClick={() => setSearchTerm("Jardinage")}
          className="suggestion-tag"
        >
          Jardinage
        </button>
      </div>

    </div>
  );
};

export default SearchBar;