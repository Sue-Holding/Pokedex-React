export interface PokemonList {
    count: number;
    next: string;
    previous: string | null;
    results: { name: string, url: string } [];
}

export const getPokemonList = async (url: string): Promise<PokemonList> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch Pokemons!");
    }
    return res.json();
};