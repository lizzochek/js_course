import View from "./View.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found! Please try again";
  message = "";

  _generateHTML() {
    return this._data.map(this._generatePreview).join("");
  }

  _generatePreview(result) {
    return `
      <li class="preview">
          <a class="preview__link " href="#${result.id}">
              <figure class="preview__fig">
                  <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview___data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
      </li>
    `;
  }
}

export default new ResultsView();
