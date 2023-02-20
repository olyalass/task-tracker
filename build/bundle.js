/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/add-board/styles.scss":
/*!**********************************************!*\
  !*** ./src/components/add-board/styles.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/nav/styles.scss":
/*!****************************************!*\
  !*** ./src/components/nav/styles.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/note/styles.scss":
/*!*****************************************!*\
  !*** ./src/components/note/styles.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/normalize.scss":
/*!****************************!*\
  !*** ./src/normalize.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
const nav_1 = __webpack_require__(/*! ./components/nav */ "./src/components/nav/index.ts");
const note_1 = __webpack_require__(/*! ./components/note */ "./src/components/note/index.ts");
const add_board_1 = __webpack_require__(/*! ./components/add-board */ "./src/components/add-board/index.ts");
const appRoot = document.querySelector(".app");
const appTitle = document.createElement("h1");
appTitle.classList.add("app__title");
const container = document.createElement("div");
container.classList.add("app__container");
appRoot.append(appTitle, container);
appTitle.textContent = "To-do List";
const Navigation = new nav_1.Nav();
const Board = new add_board_1.AddBoard();
const now = new Date;
const note = new note_1.Note("Create new tasks", now, "Active");
const note2 = new note_1.Note("Create to-do list app", now, "Done");
const warning = document.createElement("div");
warning.classList.add("warning");
const warningButton = document.createElement("button");
warningButton.classList.add("warning__button");
warning.appendChild(warningButton);
container.append(Navigation.container, note.container, note2.container, Board.container, warning);


/***/ }),

/***/ "./src/components/add-board/index.ts":
/*!*******************************************!*\
  !*** ./src/components/add-board/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddBoard = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/add-board/styles.scss");
class AddBoard {
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("board");
        const input = document.createElement("input");
        input.setAttribute("type", "textarea");
        input.classList.add("board__input");
        this.buttonAdd = document.createElement("button");
        this.buttonAdd.classList.add("board__button");
        this.buttonAdd.setAttribute("type", "submit");
        this.buttonAdd.textContent = "Add";
        const counter = document.createElement("p");
        counter.classList.add("board__counter");
        this.counterValue = 0;
        counter.textContent = `${this.counterValue}/55`;
        const lengthWarning = document.createElement("p");
        lengthWarning.classList.add("board__counter_error", "board__warning");
        lengthWarning.textContent = "Note should contain from 6 to 55 symbols";
        this.container.append(input, counter, lengthWarning, this.buttonAdd);
        input.addEventListener("input", () => this.countAndUpgradeInput(input, counter, lengthWarning));
    }
    countAndUpgradeInput(inputElem, warnElem1, warmElem2) {
        if (inputElem.value === "") {
            this.counterValue = 0;
            this.noteText = "";
        }
        else {
            this.counterValue = inputElem.value.length;
            if (this.counterValue >= 55)
                inputElem.value = this.noteText;
            this.noteText = inputElem.value[0].toUpperCase() + inputElem.value.slice(1);
            inputElem.value = this.noteText;
            if (this.counterValue < 6) {
                warnElem1.classList.add("board__counter_error");
                warmElem2.classList.add("board__warning_visible");
            }
            else {
                warnElem1.classList.remove("board__counter_error");
                warmElem2.classList.remove("board__warning_visible");
            }
            ;
        }
        ;
        warnElem1.textContent = `${this.counterValue}/55`;
    }
    checkNoteDuples(dataArray) {
        let noteStatus = dataArray.find(dataArray => dataArray.note === this.noteText).status;
        if (noteStatus === "Active") {
        }
    }
}
exports.AddBoard = AddBoard;


/***/ }),

/***/ "./src/components/nav/index.ts":
/*!*************************************!*\
  !*** ./src/components/nav/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nav = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/nav/styles.scss");
class Nav {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('nav');
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('nav__container');
        this.buttonRevert = document.createElement('button');
        this.buttonRevert.classList.add('nav__button');
        this.container.append(this.buttonsContainer, this.buttonRevert);
        const buttonImg = document.createElement('div');
        buttonImg.classList.add('nav__revert');
        this.buttonRevert.appendChild(buttonImg);
        this.buttonAll = document.createElement('button');
        this.buttonAll.classList.add('nav__button');
        this.buttonAll.textContent = "All";
        this.buttonToDo = document.createElement('button');
        this.buttonToDo.classList.add('nav__button');
        this.buttonToDo.textContent = "To-do";
        this.buttonDone = document.createElement('button');
        this.buttonDone.classList.add('nav__button');
        this.buttonDone.textContent = "Done";
        this.buttonsContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
    }
}
exports.Nav = Nav;


/***/ }),

/***/ "./src/components/note/index.ts":
/*!**************************************!*\
  !*** ./src/components/note/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Note = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/note/styles.scss");
class Note {
    constructor(text, date, status) {
        this.container = document.createElement("div");
        this.container.classList.add("note");
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("note__container_inner");
        const rightContainer = document.createElement("div");
        rightContainer.classList.add("note__container_inner");
        this.container.append(leftContainer, rightContainer);
        const note = document.createElement("h2");
        note.classList.add("note__text");
        note.textContent = text;
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("note__container_buttons");
        leftContainer.append(note, buttonsContainer);
        this.buttonDelete = document.createElement("button");
        this.buttonDelete.classList.add("note__button");
        this.buttonDelete.textContent = "Delete";
        this.buttonDone = document.createElement("button");
        this.buttonDone.classList.add("note__button");
        this.buttonDone.textContent = "Done";
        buttonsContainer.append(this.buttonDone, this.buttonDelete);
        const statusElem = document.createElement("p");
        statusElem.classList.add("note__status");
        statusElem.textContent = status;
        if (status === "Active") {
            statusElem.classList.add("note__status_active");
        }
        else {
            statusElem.classList.add("note__status_done");
            this.buttonDone.setAttribute("disabled", "true");
            this.buttonDelete.setAttribute("disabled", "true");
        }
        ;
        const dateElem = document.createElement("p");
        dateElem.classList.add("note__date");
        dateElem.textContent = getPrettyDate(date);
        rightContainer.append(statusElem, dateElem);
    }
}
exports.Note = Note;
function getPrettyDate(date) {
    const daysArr = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = daysArr[date.getDay()];
    const dateNum = date.getDate();
    const month = monthsArr[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let mins = date.getMinutes().toString();
    if (mins[1] === "undefined")
        mins = "0" + mins;
    return `${day}   ${dateNum} ${month} ${year}   ${hours}:${mins}`;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./app */ "./src/app.ts");
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
__webpack_require__(/*! ./normalize.scss */ "./src/normalize.scss");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLEdBQUcsTUFBTSxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7QUFFbkUsQ0FBQzs7Ozs7OztVQzlERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQSxpREFBZTtBQUNmLDhEQUF1QjtBQUN2QixvRUFBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2FkZC1ib2FyZC9zdHlsZXMuc2Nzcz8yODczIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbmF2L3N0eWxlcy5zY3NzPzZmMTEiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9ub3RlL3N0eWxlcy5zY3NzPzk1Y2EiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvbm9ybWFsaXplLnNjc3M/YzNiYSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9zdHlsZXMuc2Nzcz8wMjlhIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2FkZC1ib2FyZC9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25hdi9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25vdGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBOYXYgfSBmcm9tIFwiLi9jb21wb25lbnRzL25hdlwiO1xuaW1wb3J0IHsgTm90ZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvbm90ZVwiO1xuaW1wb3J0IHsgQWRkQm9hcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2FkZC1ib2FyZFwiO1xuXG5jb25zdCBhcHBSb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcHBcIik7XG5jb25zdCBhcHBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbmFwcFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJhcHBfX3RpdGxlXCIpO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYXBwX19jb250YWluZXJcIik7XG5hcHBSb290LmFwcGVuZChhcHBUaXRsZSwgY29udGFpbmVyKTtcbmFwcFRpdGxlLnRleHRDb250ZW50ID0gXCJUby1kbyBMaXN0XCI7XG5jb25zdCBOYXZpZ2F0aW9uID0gbmV3IE5hdigpO1xuY29uc3QgQm9hcmQgPSBuZXcgQWRkQm9hcmQoKTtcblxuY29uc3Qgbm93ID0gbmV3IERhdGU7XG5jb25zdCBub3RlID0gbmV3IE5vdGUoXCJDcmVhdGUgbmV3IHRhc2tzXCIsIG5vdywgXCJBY3RpdmVcIik7XG5jb25zdCBub3RlMiA9IG5ldyBOb3RlKFwiQ3JlYXRlIHRvLWRvIGxpc3QgYXBwXCIsIG5vdywgXCJEb25lXCIpO1xuXG5jb25zdCB3YXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbndhcm5pbmcuY2xhc3NMaXN0LmFkZChcIndhcm5pbmdcIik7XG5jb25zdCB3YXJuaW5nQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbndhcm5pbmdCdXR0b24uY2xhc3NMaXN0LmFkZChcIndhcm5pbmdfX2J1dHRvblwiKTtcbndhcm5pbmcuYXBwZW5kQ2hpbGQod2FybmluZ0J1dHRvbik7XG5cbmNvbnRhaW5lci5hcHBlbmQoTmF2aWdhdGlvbi5jb250YWluZXIsIG5vdGUuY29udGFpbmVyLCBub3RlMi5jb250YWluZXIsIEJvYXJkLmNvbnRhaW5lciwgd2FybmluZyk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBEYXRhQXJyYXkgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIlxuXG5leHBvcnQgY2xhc3MgQWRkQm9hcmQge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25BZGQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICBub3RlVGV4dDogc3RyaW5nO1xuICBjb3VudGVyVmFsdWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0YXJlYVwiKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2lucHV0XCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2J1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkLnRleHRDb250ZW50ID0gXCJBZGRcIjtcbiAgICBjb25zdCBjb3VudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY291bnRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5jb3VudGVyVmFsdWUgPSAwO1xuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSBgJHt0aGlzLmNvdW50ZXJWYWx1ZX0vNTVgO1xuICAgIGNvbnN0IGxlbmd0aFdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZW5ndGhXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlcl9lcnJvclwiLCBcImJvYXJkX193YXJuaW5nXCIpO1xuICAgIGxlbmd0aFdhcm5pbmcudGV4dENvbnRlbnQgPSBcIk5vdGUgc2hvdWxkIGNvbnRhaW4gZnJvbSA2IHRvIDU1IHN5bWJvbHNcIjtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoaW5wdXQsIGNvdW50ZXIsIGxlbmd0aFdhcm5pbmcsIHRoaXMuYnV0dG9uQWRkKTtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB0aGlzLmNvdW50QW5kVXBncmFkZUlucHV0KGlucHV0LCBjb3VudGVyLCBsZW5ndGhXYXJuaW5nKSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY291bnRBbmRVcGdyYWRlSW5wdXQoaW5wdXRFbGVtOkhUTUxJbnB1dEVsZW1lbnQsIHdhcm5FbGVtMTogSFRNTFBhcmFncmFwaEVsZW1lbnQsIHdhcm1FbGVtMjpIVE1MUGFyYWdyYXBoRWxlbWVudCkge1xuICAgIGlmIChpbnB1dEVsZW0udmFsdWU9PT1cIlwiKSB7XG4gICAgICB0aGlzLmNvdW50ZXJWYWx1ZSA9IDA7XG4gICAgICB0aGlzLm5vdGVUZXh0ID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3VudGVyVmFsdWUgPSBpbnB1dEVsZW0udmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKHRoaXMuY291bnRlclZhbHVlID49IDU1KSBpbnB1dEVsZW0udmFsdWUgPSB0aGlzLm5vdGVUZXh0O1xuICAgICAgdGhpcy5ub3RlVGV4dCA9IGlucHV0RWxlbS52YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgaW5wdXRFbGVtLnZhbHVlLnNsaWNlKDEpO1xuICAgICAgaW5wdXRFbGVtLnZhbHVlID0gdGhpcy5ub3RlVGV4dDtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXJWYWx1ZSA8IDYpIHtcbiAgICAgICAgd2FybkVsZW0xLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fd2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybkVsZW0xLmNsYXNzTGlzdC5yZW1vdmUoXCJib2FyZF9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5yZW1vdmUoXCJib2FyZF9fd2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHdhcm5FbGVtMS50ZXh0Q29udGVudCA9IGAke3RoaXMuY291bnRlclZhbHVlfS81NWA7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrTm90ZUR1cGxlcyhkYXRhQXJyYXk6IERhdGFBcnJheSkge1xuICAgIGxldCBub3RlU3RhdHVzID0gZGF0YUFycmF5LmZpbmQoZGF0YUFycmF5ID0+IGRhdGFBcnJheS5ub3RlID09PSB0aGlzLm5vdGVUZXh0KS5zdGF0dXM7XG4gICAgaWYgKG5vdGVTdGF0dXMgPT09IFwiQWN0aXZlXCIpIHtcblxuICAgIH1cbiAgfVxufSIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGNsYXNzIE5hdiB7XG4gIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIGJ1dHRvbnNDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25BbGw6IEhUTUxCdXR0b25FbGVtZW50O1xuICBidXR0b25Ub0RvOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGJ1dHRvblJldmVydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmF2Jyk7XG4gICAgdGhpcy5idXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5idXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25hdl9fY29udGFpbmVyJyk7XG4gICAgdGhpcy5idXR0b25SZXZlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvblJldmVydC5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLmJ1dHRvbnNDb250YWluZXIsIHRoaXMuYnV0dG9uUmV2ZXJ0KTtcblxuICAgIGNvbnN0IGJ1dHRvbkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbkltZy5jbGFzc0xpc3QuYWRkKCduYXZfX3JldmVydCcpO1xuICAgIHRoaXMuYnV0dG9uUmV2ZXJ0LmFwcGVuZENoaWxkKGJ1dHRvbkltZyk7XG4gICAgXG5cbiAgICB0aGlzLmJ1dHRvbkFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uQWxsLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25BbGwudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIHRoaXMuYnV0dG9uVG9EbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uVG9Eby5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uVG9Eby50ZXh0Q29udGVudCA9IFwiVG8tZG9cIjtcbiAgICB0aGlzLmJ1dHRvbkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUuY2xhc3NMaXN0LmFkZCgnbmF2X19idXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUudGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcbiAgICB0aGlzLmJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uQWxsLCB0aGlzLmJ1dHRvblRvRG8sIHRoaXMuYnV0dG9uRG9uZSk7XG4gIH1cbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5cbmV4cG9ydCBjbGFzcyBOb3RlIHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uRGVsZXRlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBkYXRlOiBEYXRlLCBzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm90ZVwiKTtcbiAgICBjb25zdCBsZWZ0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgY29uc3QgcmlnaHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJpZ2h0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGxlZnRDb250YWluZXIsIHJpZ2h0Q29udGFpbmVyKTtcblxuICAgIGNvbnN0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbm90ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fdGV4dFwiKTtcbiAgICBub3RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfYnV0dG9uc1wiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmFwcGVuZChub3RlLCBidXR0b25zQ29udGFpbmVyKTtcblxuICAgIHRoaXMuYnV0dG9uRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkRlbGV0ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRGVsZXRlLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICB0aGlzLmJ1dHRvbkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xuICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uRG9uZSwgdGhpcy5idXR0b25EZWxldGUpO1xuXG4gICAgY29uc3Qgc3RhdHVzRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c1wiKTtcbiAgICBzdGF0dXNFbGVtLnRleHRDb250ZW50ID0gc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgPT09IFwiQWN0aXZlXCIpIHtcbiAgICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19hY3RpdmVcIilcbiAgICB9ICBlbHNlIHtcbiAgICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19kb25lXCIpO1xuICAgICAgdGhpcy5idXR0b25Eb25lLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgIHRoaXMuYnV0dG9uRGVsZXRlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBkYXRlRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fZGF0ZVwiKTtcbiAgICBkYXRlRWxlbS50ZXh0Q29udGVudCA9IGdldFByZXR0eURhdGUoZGF0ZSk7XG5cbiAgICByaWdodENvbnRhaW5lci5hcHBlbmQoc3RhdHVzRWxlbSwgZGF0ZUVsZW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFByZXR0eURhdGUgKGRhdGU6IERhdGUpIHtcbiAgY29uc3QgZGF5c0FyciA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlblwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXTtcbiAgY29uc3QgbW9udGhzQXJyID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xuICBjb25zdCBkYXk6IHN0cmluZyA9IGRheXNBcnJbZGF0ZS5nZXREYXkoKV07XG4gIGNvbnN0IGRhdGVOdW06IG51bWJlciA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aDogc3RyaW5nID0gbW9udGhzQXJyW2RhdGUuZ2V0TW9udGgoKV07XG4gIGNvbnN0IHllYXI6IG51bWJlciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gIGxldCBtaW5zID0gZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcbiAgaWYgKG1pbnNbMV0gPT09IFwidW5kZWZpbmVkXCIpIG1pbnMgPSBcIjBcIiArIG1pbnM7XG4gIHJldHVybiBgJHtkYXl9ICAgJHtkYXRlTnVtfSAke21vbnRofSAke3llYXJ9ICAgJHtob3Vyc306JHttaW5zfWA7XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2FwcCc7XG5pbXBvcnQgJy4vc3R5bGVzLnNjc3MnO1xuaW1wb3J0ICcuL25vcm1hbGl6ZS5zY3NzJzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=