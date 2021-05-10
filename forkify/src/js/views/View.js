import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(_data, render = true) {
    if (!_data || (Array.isArray(_data) && _data.length === 0))
      return this.renderError();

    this._data = _data;
    const markup = this._generateHTML();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateHTML();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElem = Array.from(newDOM.querySelectorAll("*"));
    const curElem = Array.from(this._parentElement.querySelectorAll("*"));

    newElem.forEach((newEl, i) => {
      const curEl = curElem[i];

      //Text change
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Attributes change
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
              <svg>
                  <use href="${icons}#icon-loader"></use>
              </svg>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this.message) {
    const markup = `<div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      </div>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
