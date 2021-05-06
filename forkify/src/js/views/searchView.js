import View from "./View.js";
import icons from "url:../../img/icons.svg";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  getQuery() {
    return this._parentElement.querySelector(".search__field").value;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
