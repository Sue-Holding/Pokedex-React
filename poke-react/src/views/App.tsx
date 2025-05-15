import { useEffect, useState } from 'react'
import '../styles/App.css'
import { getPokemonList, getPokemonByName } from '../services/pokemonService';
import type { PokemonList, PokemonDetail } from '../services/pokemonService';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=10');
  const [error, setError] = useState<string | null>(null);

  // search const values
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonDetail | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // this loads the page 10 pokemons at a time
  useEffect(() => {
    if (!isSearching) {
      getPokemonList(url)
        .then(data => {
          setPokemonList(data);
          setError(null);
          setSearchedPokemon(null);
        })
        .catch((error) => setError(error.message));
    }
}, [url, isSearching]);

  // search code by name
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setError(null);
    setSearchedPokemon(null);

    try {
      const result = await getPokemonByName(searchTerm.toLowerCase());
      setSearchedPokemon(result);
    } catch (err: any) {
      setError(err.message || 'Pokémon not found');
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchTerm('');
    setSearchedPokemon(null);
    setError(null);
    setUrl('https://pokeapi.co/api/v2/pokemon?limit=10');
  };

return (
  <div>
    <h1 className="main-title">Pokémon</h1>
    <h2 className="second-title">Gotta catch them all! 🎯</h2>

    {/* form to search for specific pokemon by name */}
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Pokémon by name here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>

    {/* clear search button */}
    {isSearching && (
      <button type="button" onClick={clearSearch}>
        Clear
      </button>
    )}
    </form>

    {/* search results */}
    {searchedPokemon ? (
      <div>
        <h2>
          {searchedPokemon.name.charAt(0).toUpperCase() + searchedPokemon.name.slice(1)}
        </h2>
        <img
          src={searchedPokemon.sprites.front_default}
          alt={searchedPokemon.name}
          width={120}
          height={120}
        />
        <p>Height: {searchedPokemon.height}</p>
        <p>Weight: {searchedPokemon.weight}</p>
        <p>
          Types:{' '}
          {searchedPokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
        </p>
      </div>
    ) : (
      <>
        {/* List of pokemon 10 at a time with previous and next */}
        {pokemonList ? (
          <>
            <ul>
              {pokemonList.results.map((pokemon) => (
                <li key={pokemon.name}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </li>
              ))}
            </ul>
            <div>
              <button
                onClick={() => {
                  if (pokemonList.previous) setUrl(pokemonList.previous);
                }}
                disabled={!pokemonList.previous}
              >
                Previous
              </button>

              <button
                onClick={() => {
                  if (pokemonList.next) setUrl(pokemonList.next);
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
      </>
    )}
  </div>
);

}

export default App