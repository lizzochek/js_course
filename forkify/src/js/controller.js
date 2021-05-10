import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import pagesView from "./views/pagesView.js";
import addRecipeView from "./views/addRecipeView.js";

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

    resultsView.update(model.getSearchResults());
    bookmarksView.update(model.state.bookmarks);

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
  recipeView.update(model.state.recipe);
};

const controlBookmark = () => {
  !model.state.recipe.bookmarked
    ? model.addBookmark(model.state.recipe)
    : model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async (recipe) => {
  try {
    await model.uploadRecipe(recipe);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  bookmarksView.render(model.state.bookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  pagesView.addHandlerClick(controlPages);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
