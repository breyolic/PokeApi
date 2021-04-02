import axios from "axios";

const getPokemons = async (name = "") => {
  try {
    const { data } = await axios.get(`/pokemon/${name}`);
    return data;
  } catch (error) {
    console.log("Pokemons are not available");
  }
};

export default {
  getPokemons,
};
