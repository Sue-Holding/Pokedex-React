import { useEffect, useState } from 'react'
import '../styles/App.css'
import { getPokemonList } from '../services/pokemonService';
import type { PokemonList } from '../services/pokemonService';

function App() {
  // const [count, setCount] = useState(0)
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=10');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getPokemonList(url)
    .then(setPokemonList)
    .catch((error) => setError(error.message));
}, [url]);

  // search code
  const filteredResults = pokemonList?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  if (error) return <p>Error: {error}</p>;

  return (
   <div>
      <h1 className="main-title">Pokémon</h1>
      <h2 className="second-title">Gotta catch them all! 🎯</h2>

      {/* form to search for specific pokemon by name */}
      <input
        type="text"
        placeholder="Search by name here..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)}
      />

      {/* List of pokemon 10 at a time with previous and next */}
      {/* {pokemonList ? (
        <>
        <ul>
          {pokemonList.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul> */}

        {pokemonList ? (
        <>
          <ul>
            {filteredResults && filteredResults.length > 0 ? (
              filteredResults.map((pokemon) => (
                <li key={pokemon.name}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </li>
              ))
            ) : (
              <li>No Pokémon found.</li>
            )}
          </ul>
          
          <div>
            <button
              onClick={() => {pokemonList.previous && setUrl(pokemonList.previous);
              }}
              disabled={!pokemonList.previous}
            >
              Previous
            </button>

            <button
              onClick={() => {pokemonList.next && setUrl(pokemonList.next);
              }}
              disabled={!pokemonList.next}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App