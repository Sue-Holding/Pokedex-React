import axios from 'axios';

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_defult: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface PokemonList {
    count: number;
    next: string;
    previous: string | null;
    results: { name: string, url: string } [];
}

export const getPokemonByName = async (name: string): Promise<PokemonDetail> => {
    try {
    const res = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return res.data;
    } catch (error: any) {
        throw new Error(error.response?.status === 404 ? 'Pokémon not found' : 'Failed to fetch Pokémon');
    }
};

export const getPokemonList = async (url: string): Promise<PokemonList> => {
    try {
    const res = await axios.get<PokemonList>(url);
    return res.data;
    } catch (error: any) {
        throw new Error("Failed to fetch Pokémons!");
    }
};