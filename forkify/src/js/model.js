import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmarked = state.bookmarks.some(
      (bookmark) => bookmark.id === id
    )
      ? true
      : false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * 10;
  return state.search.results.slice(start, end);
};

export const updateServings = (newServing) => {
  state.recipe.ingredients.forEach((ing) => {
    //Quantity before * serving we need / servings we had before
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

const saveBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  saveBookmarks();
};

export const removeBookmark = (id) => {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  saveBookmarks();
};

const init = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async (newRecipe) => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ings = ing[1].replaceAll(" ", "").split(",");

        if (ings.length !== 3)
          throw new Error(
            "Wrong ingredient format, use: quantity,unit,description "
          );

        const [quantity, unit, description] = ings;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
  } catch (err) {
    throw err;
  }
};
