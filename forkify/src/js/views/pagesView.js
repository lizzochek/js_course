import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PagesView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const pageToGo = +btn.dataset.goto;
      handler(pageToGo);
    });
  }
  _generateHTML() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const buttonPrev = `<button data-goto=${
      curPage - 1
    } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
           </svg>
          <span>Page ${curPage - 1}</span>
        `;
    const buttonNext = `<button data-goto=${
      curPage + 1
    } class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;

    //First page
    if (curPage === 1 && numPages > 1) {
      return buttonNext;
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return buttonPrev;
    }

    if (curPage < numPages) {
      return `${buttonPrev} ${buttonNext}`;
    }

    return "";
  }
}

export default new PagesView();
