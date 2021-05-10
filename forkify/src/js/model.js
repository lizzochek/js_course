import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";

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

const createRecipe = (data) => {
  let { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    key: recipe.key ? recipe.key : "",
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    state.recipe = createRecipe(data);

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
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipe(data);
    addBookmark(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
