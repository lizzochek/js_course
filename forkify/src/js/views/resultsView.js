import View from "./View.js";
import preview from "./preview.js";
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found! Please try again";
  message = "";

  _generateHTML() {
    return this._data.map((result) => preview.render(result, false)).join("");
  }
}

export default new ResultsView();
