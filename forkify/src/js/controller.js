import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import pagesView from "./views/pagesView.js";

//ES5 compatibility
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

if (module.hot) module.hot.accept();

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
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;
    searchView.clearInput();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResults());
    pagesView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPages = (pageToGo) => {
  resultsView.render(model.getSearchResults(pageToGo));
  pagesView.render(model.state.search);
};

const controlServings = (newServing) => {
  model.updateServings(newServing);
  recipeView.render(model.state.recipe);
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addServingsHandler(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  pagesView.addHandlerClick(controlPages);
};
init();
