import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
//ES5 compatibility
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async () => {
  try {
    searchView.clearInput();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults();
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
