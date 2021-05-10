import View from "./View.js";
import preview from "./preview.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Please bookmark the one you like :)";
  message = "";

  _generateHTML() {
    return this._data.map((result) => preview.render(result, false)).join("");
  }
}

export default new BookmarksView();
