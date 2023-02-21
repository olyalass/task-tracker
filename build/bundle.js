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

/***/ "./src/components/list/styles.scss":
/*!*****************************************!*\
  !*** ./src/components/list/styles.scss ***!
  \*****************************************/
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

/***/ "./src/components/warning/styles.scss":
/*!********************************************!*\
  !*** ./src/components/warning/styles.scss ***!
  \********************************************/
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
const add_board_1 = __webpack_require__(/*! ./components/add-board */ "./src/components/add-board/index.ts");
const list_1 = __webpack_require__(/*! ./components/list */ "./src/components/list/index.ts");
const appRoot = document.querySelector(".app");
const appTitle = document.createElement("h1");
appTitle.classList.add("app__title");
const container = document.createElement("div");
container.classList.add("app__container");
appRoot.append(appTitle, container);
appTitle.textContent = "To-do List";
const Navigation = new nav_1.Nav();
const list = new list_1.List();
const Board = new add_board_1.AddBoard(list.notesArr);
container.append(Navigation.container, list.container, Board.container);


/***/ }),

/***/ "./src/components/add-board/index.ts":
/*!*******************************************!*\
  !*** ./src/components/add-board/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddBoard = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/add-board/styles.scss");
const warning_1 = __webpack_require__(/*! ../warning */ "./src/components/warning/index.ts");
class AddBoard {
    constructor(dataArray) {
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
        const warningAlert = new warning_1.Warning(this.buttonAdd);
        this.container.append(input, counter, lengthWarning, this.buttonAdd, warningAlert.container);
        input.addEventListener("input", () => this.countAndUpgradeInput(input, counter, lengthWarning));
        this.buttonAdd.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.checkNoteDuples(dataArray, warningAlert.container) === false) {
            }
        });
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
    checkNoteDuples(dataArray, warnAlertElem) {
        let noteStatus = dataArray.find(dataArray => dataArray.note === this.noteText).status;
        if (noteStatus === "Active") {
            warnAlertElem.classList.add("warning_visible");
            this.buttonAdd.setAttribute("disabled", "true");
            return true;
        }
        else
            return false;
    }
}
exports.AddBoard = AddBoard;


/***/ }),

/***/ "./src/components/list/index.ts":
/*!**************************************!*\
  !*** ./src/components/list/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.List = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/list/styles.scss");
const note_1 = __webpack_require__(/*! ../note */ "./src/components/note/index.ts");
class List {
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("list");
        const date1 = new Date;
        date1.setMonth(0, 1);
        const date2 = new Date;
        date2.setMonth(0, 10);
        this.notesArr = [
            {
                note: "Create new tasks",
                status: "Active",
                date: date2
            },
            {
                note: "Create to-do list app",
                status: "Done",
                date: date1
            },
            {
                note: "Relax",
                status: "Active",
                date: date1
            }
        ];
        // this.notesArr.sort
        this.renderNotes();
    }
    renderNotes() {
        this.notesArr.forEach(e => {
            const note = new note_1.Note(e.note, e.date, e.status);
            this.container.appendChild(note.container);
            console.log("note done");
        });
    }
}
exports.List = List;


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
        this.noteText = text;
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


/***/ }),

/***/ "./src/components/warning/index.ts":
/*!*****************************************!*\
  !*** ./src/components/warning/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Warning = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/warning/styles.scss");
class Warning {
    constructor(addButton) {
        this.container = document.createElement("div");
        this.container.classList.add("warning");
        this.button = document.createElement("button");
        this.button.classList.add("warning__button");
        this.button.addEventListener("click", () => {
            this.container.classList.remove("warning_visible");
            addButton.removeAttribute("disabled");
        });
        const warningText1 = document.createElement("p");
        warningText1.classList.add("warning__text");
        warningText1.textContent = "Sorry, you already have this task!";
        const warningText2 = document.createElement("p");
        warningText2.classList.add("warning__text");
        warningText2.textContent = "You can't create it agian until it isn't done/deleted :(";
        this.container.append(this.button, warningText1, warningText2);
    }
}
exports.Warning = Warning;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsb0NBQW9DLENBQUM7UUFDaEUsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsV0FBVyxHQUFHLDBEQUEwRCxDQUFDO1FBRXRGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FFRjtBQXpCRCwwQkF5QkM7Ozs7Ozs7VUMzQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkEsaURBQWU7QUFDZiw4REFBdUI7QUFDdkIsb0VBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9hZGQtYm9hcmQvc3R5bGVzLnNjc3M/Mjg3MyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2xpc3Qvc3R5bGVzLnNjc3M/MTc2MSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25hdi9zdHlsZXMuc2Nzcz82ZjExIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbm90ZS9zdHlsZXMuc2Nzcz85NWNhIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvd2FybmluZy9zdHlsZXMuc2Nzcz8xODY0Iiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL25vcm1hbGl6ZS5zY3NzP2MzYmEiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvc3R5bGVzLnNjc3M/MDI5YSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9hZGQtYm9hcmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9saXN0L2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbmF2L2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbm90ZS9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL3dhcm5pbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBOYXYgfSBmcm9tIFwiLi9jb21wb25lbnRzL25hdlwiO1xuaW1wb3J0IHsgTm90ZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvbm90ZVwiO1xuaW1wb3J0IHsgQWRkQm9hcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2FkZC1ib2FyZFwiO1xuaW1wb3J0IHsgV2FybmluZyB9IGZyb20gXCIuL2NvbXBvbmVudHMvd2FybmluZ1wiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbGlzdFwiO1xuXG5jb25zdCBhcHBSb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcHBcIik7XG5jb25zdCBhcHBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbmFwcFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJhcHBfX3RpdGxlXCIpO1xuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYXBwX19jb250YWluZXJcIik7XG5hcHBSb290LmFwcGVuZChhcHBUaXRsZSwgY29udGFpbmVyKTtcbmFwcFRpdGxlLnRleHRDb250ZW50ID0gXCJUby1kbyBMaXN0XCI7XG5jb25zdCBOYXZpZ2F0aW9uID0gbmV3IE5hdigpO1xuY29uc3QgbGlzdCA9IG5ldyBMaXN0KCk7XG5jb25zdCBCb2FyZCA9IG5ldyBBZGRCb2FyZChsaXN0Lm5vdGVzQXJyKTtcblxuY29udGFpbmVyLmFwcGVuZChOYXZpZ2F0aW9uLmNvbnRhaW5lciwgbGlzdC5jb250YWluZXIsIEJvYXJkLmNvbnRhaW5lcik7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBEYXRhQXJyYXkgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFdhcm5pbmcgfSBmcm9tIFwiLi4vd2FybmluZ1wiO1xuXG5leHBvcnQgY2xhc3MgQWRkQm9hcmQge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25BZGQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICBub3RlVGV4dDogc3RyaW5nO1xuICBjb3VudGVyVmFsdWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkYXRhQXJyYXk6IEFycmF5PERhdGFBcnJheT4pIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0YXJlYVwiKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2lucHV0XCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2J1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkLnRleHRDb250ZW50ID0gXCJBZGRcIjtcbiAgICBjb25zdCBjb3VudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY291bnRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5jb3VudGVyVmFsdWUgPSAwO1xuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSBgJHt0aGlzLmNvdW50ZXJWYWx1ZX0vNTVgO1xuICAgIGNvbnN0IGxlbmd0aFdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsZW5ndGhXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlcl9lcnJvclwiLCBcImJvYXJkX193YXJuaW5nXCIpO1xuICAgIGxlbmd0aFdhcm5pbmcudGV4dENvbnRlbnQgPSBcIk5vdGUgc2hvdWxkIGNvbnRhaW4gZnJvbSA2IHRvIDU1IHN5bWJvbHNcIjtcbiAgICBjb25zdCB3YXJuaW5nQWxlcnQgPSBuZXcgV2FybmluZyh0aGlzLmJ1dHRvbkFkZCk7XG4gICAgXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGlucHV0LCBjb3VudGVyLCBsZW5ndGhXYXJuaW5nLCB0aGlzLmJ1dHRvbkFkZCwgd2FybmluZ0FsZXJ0LmNvbnRhaW5lcik7XG5cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gdGhpcy5jb3VudEFuZFVwZ3JhZGVJbnB1dChpbnB1dCwgY291bnRlciwgbGVuZ3RoV2FybmluZykpO1xuICAgIHRoaXMuYnV0dG9uQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHRoaXMuY2hlY2tOb3RlRHVwbGVzKGRhdGFBcnJheSwgd2FybmluZ0FsZXJ0LmNvbnRhaW5lcik9PT1mYWxzZSkge1xuXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY291bnRBbmRVcGdyYWRlSW5wdXQoaW5wdXRFbGVtOkhUTUxJbnB1dEVsZW1lbnQsIHdhcm5FbGVtMTogSFRNTFBhcmFncmFwaEVsZW1lbnQsIHdhcm1FbGVtMjpIVE1MUGFyYWdyYXBoRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChpbnB1dEVsZW0udmFsdWU9PT1cIlwiKSB7XG4gICAgICB0aGlzLmNvdW50ZXJWYWx1ZSA9IDA7XG4gICAgICB0aGlzLm5vdGVUZXh0ID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3VudGVyVmFsdWUgPSBpbnB1dEVsZW0udmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKHRoaXMuY291bnRlclZhbHVlID49IDU1KSBpbnB1dEVsZW0udmFsdWUgPSB0aGlzLm5vdGVUZXh0O1xuICAgICAgdGhpcy5ub3RlVGV4dCA9IGlucHV0RWxlbS52YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgaW5wdXRFbGVtLnZhbHVlLnNsaWNlKDEpO1xuICAgICAgaW5wdXRFbGVtLnZhbHVlID0gdGhpcy5ub3RlVGV4dDtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXJWYWx1ZSA8IDYpIHtcbiAgICAgICAgd2FybkVsZW0xLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fd2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybkVsZW0xLmNsYXNzTGlzdC5yZW1vdmUoXCJib2FyZF9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5yZW1vdmUoXCJib2FyZF9fd2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHdhcm5FbGVtMS50ZXh0Q29udGVudCA9IGAke3RoaXMuY291bnRlclZhbHVlfS81NWA7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrTm90ZUR1cGxlcyhkYXRhQXJyYXk6IEFycmF5PERhdGFBcnJheT4sIHdhcm5BbGVydEVsZW06IEhUTUxEaXZFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgbGV0IG5vdGVTdGF0dXMgPSBkYXRhQXJyYXkuZmluZChkYXRhQXJyYXkgPT4gZGF0YUFycmF5Lm5vdGUgPT09IHRoaXMubm90ZVRleHQpLnN0YXR1cztcbiAgICBpZiAobm90ZVN0YXR1cyA9PT0gXCJBY3RpdmVcIikge1xuICAgICAgd2FybkFsZXJ0RWxlbS5jbGFzc0xpc3QuYWRkKFwid2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgdGhpcy5idXR0b25BZGQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4vLyAgIHByaXZhdGUgYWRkTmV3Tm90ZShkYXRhQXJyYXk6IEFycmF5PERhdGFBcnJheT4sIClcbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBOYXYgfSBmcm9tIFwiLi4vbmF2XCI7XG5pbXBvcnQgeyBOb3RlIH0gZnJvbSBcIi4uL25vdGVcIjtcbmltcG9ydCB7IERhdGFBcnJheSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdCB7XG4gIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIG5vdGVzQXJyOiBBcnJheTxEYXRhQXJyYXk+O1xuICBub3RlOiBOb3RlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcblxuICAgIGNvbnN0IGRhdGUxID0gbmV3IERhdGU7XG4gICAgZGF0ZTEuc2V0TW9udGgoMCwgMSk7XG5cbiAgICBjb25zdCBkYXRlMiA9IG5ldyBEYXRlO1xuICAgIGRhdGUyLnNldE1vbnRoKDAsIDEwKTtcblxuICAgIHRoaXMubm90ZXNBcnIgPSBbXG4gICAgICB7XG4gICAgICAgIG5vdGU6IFwiQ3JlYXRlIG5ldyB0YXNrc1wiLFxuICAgICAgICBzdGF0dXM6XCJBY3RpdmVcIiwgXG4gICAgICAgIGRhdGU6IGRhdGUyXG4gICAgICB9LCBcblxuICAgICAge1xuICAgICAgICBub3RlOiBcIkNyZWF0ZSB0by1kbyBsaXN0IGFwcFwiLFxuICAgICAgICBzdGF0dXM6IFwiRG9uZVwiLFxuICAgICAgICBkYXRlOiBkYXRlMVxuICAgICAgfSwgXG5cbiAgICAgIHtcbiAgICAgICAgbm90ZTogXCJSZWxheFwiLFxuICAgICAgICBzdGF0dXM6IFwiQWN0aXZlXCIsXG4gICAgICAgIGRhdGU6IGRhdGUxXG4gICAgICB9XG4gICAgXTtcblxuICAgIC8vIHRoaXMubm90ZXNBcnIuc29ydFxuXG4gICAgdGhpcy5yZW5kZXJOb3RlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJOb3RlcygpIHtcbiAgICB0aGlzLm5vdGVzQXJyLmZvckVhY2goZSA9PiB7XG4gICAgICBjb25zdCBub3RlID0gbmV3IE5vdGUoZS5ub3RlLCBlLmRhdGUsIGUuc3RhdHVzKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGUuY29udGFpbmVyKTtcbiAgICAgIGNvbnNvbGUubG9nKFwibm90ZSBkb25lXCIpXG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGNsYXNzIE5hdiB7XG4gIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIGJ1dHRvbnNDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25BbGw6IEhUTUxCdXR0b25FbGVtZW50O1xuICBidXR0b25Ub0RvOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGJ1dHRvblJldmVydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmF2Jyk7XG4gICAgdGhpcy5idXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5idXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25hdl9fY29udGFpbmVyJyk7XG4gICAgdGhpcy5idXR0b25SZXZlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvblJldmVydC5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLmJ1dHRvbnNDb250YWluZXIsIHRoaXMuYnV0dG9uUmV2ZXJ0KTtcblxuICAgIGNvbnN0IGJ1dHRvbkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbkltZy5jbGFzc0xpc3QuYWRkKCduYXZfX3JldmVydCcpO1xuICAgIHRoaXMuYnV0dG9uUmV2ZXJ0LmFwcGVuZENoaWxkKGJ1dHRvbkltZyk7XG4gICAgXG5cbiAgICB0aGlzLmJ1dHRvbkFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uQWxsLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25BbGwudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIHRoaXMuYnV0dG9uVG9EbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uVG9Eby5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uVG9Eby50ZXh0Q29udGVudCA9IFwiVG8tZG9cIjtcbiAgICB0aGlzLmJ1dHRvbkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUuY2xhc3NMaXN0LmFkZCgnbmF2X19idXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUudGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcbiAgICB0aGlzLmJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uQWxsLCB0aGlzLmJ1dHRvblRvRG8sIHRoaXMuYnV0dG9uRG9uZSk7XG4gIH1cbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5cbmV4cG9ydCBjbGFzcyBOb3RlIHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uRGVsZXRlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIG5vdGVUZXh0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBkYXRlOiBEYXRlLCBzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm90ZVwiKTtcbiAgICBjb25zdCBsZWZ0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgY29uc3QgcmlnaHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJpZ2h0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGxlZnRDb250YWluZXIsIHJpZ2h0Q29udGFpbmVyKTtcblxuICAgIGNvbnN0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbm90ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fdGV4dFwiKTtcbiAgICBub3RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB0aGlzLm5vdGVUZXh0ID0gdGV4dDtcbiAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfYnV0dG9uc1wiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmFwcGVuZChub3RlLCBidXR0b25zQ29udGFpbmVyKTtcblxuICAgIHRoaXMuYnV0dG9uRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkRlbGV0ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRGVsZXRlLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICB0aGlzLmJ1dHRvbkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xuICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uRG9uZSwgdGhpcy5idXR0b25EZWxldGUpO1xuXG4gICAgY29uc3Qgc3RhdHVzRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c1wiKTtcbiAgICBzdGF0dXNFbGVtLnRleHRDb250ZW50ID0gc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgPT09IFwiQWN0aXZlXCIpIHtcbiAgICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19hY3RpdmVcIilcbiAgICB9ICBlbHNlIHtcbiAgICAgIHN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19kb25lXCIpO1xuICAgICAgdGhpcy5idXR0b25Eb25lLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgIHRoaXMuYnV0dG9uRGVsZXRlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0ZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBkYXRlRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fZGF0ZVwiKTtcbiAgICBkYXRlRWxlbS50ZXh0Q29udGVudCA9IGdldFByZXR0eURhdGUoZGF0ZSk7XG5cbiAgICByaWdodENvbnRhaW5lci5hcHBlbmQoc3RhdHVzRWxlbSwgZGF0ZUVsZW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFByZXR0eURhdGUgKGRhdGU6IERhdGUpIHtcbiAgY29uc3QgZGF5c0FyciA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlblwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXTtcbiAgY29uc3QgbW9udGhzQXJyID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xuICBjb25zdCBkYXk6IHN0cmluZyA9IGRheXNBcnJbZGF0ZS5nZXREYXkoKV07XG4gIGNvbnN0IGRhdGVOdW06IG51bWJlciA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aDogc3RyaW5nID0gbW9udGhzQXJyW2RhdGUuZ2V0TW9udGgoKV07XG4gIGNvbnN0IHllYXI6IG51bWJlciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gIGxldCBtaW5zID0gZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcbiAgaWYgKG1pbnNbMV0gPT09IFwidW5kZWZpbmVkXCIpIG1pbnMgPSBcIjBcIiArIG1pbnM7XG4gIHJldHVybiBgJHtkYXl9ICAgJHtkYXRlTnVtfSAke21vbnRofSAke3llYXJ9ICAgJHtob3Vyc306JHttaW5zfWA7XG5cbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5cbmV4cG9ydCBjbGFzcyBXYXJuaW5nIHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihhZGRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3YXJuaW5nXCIpO1xuXG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJ3YXJuaW5nX19idXR0b25cIik7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YXJuaW5nX3Zpc2libGVcIik7XG4gICAgICBhZGRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfSk7XG5cbiAgICBjb25zdCB3YXJuaW5nVGV4dDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB3YXJuaW5nVGV4dDEuY2xhc3NMaXN0LmFkZChcIndhcm5pbmdfX3RleHRcIik7XG4gICAgd2FybmluZ1RleHQxLnRleHRDb250ZW50ID0gXCJTb3JyeSwgeW91IGFscmVhZHkgaGF2ZSB0aGlzIHRhc2shXCI7XG4gICAgY29uc3Qgd2FybmluZ1RleHQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgd2FybmluZ1RleHQyLmNsYXNzTGlzdC5hZGQoXCJ3YXJuaW5nX190ZXh0XCIpO1xuICAgIHdhcm5pbmdUZXh0Mi50ZXh0Q29udGVudCA9IFwiWW91IGNhbid0IGNyZWF0ZSBpdCBhZ2lhbiB1bnRpbCBpdCBpc24ndCBkb25lL2RlbGV0ZWQgOihcIjtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLmJ1dHRvbiwgd2FybmluZ1RleHQxLCB3YXJuaW5nVGV4dDIpO1xuICB9XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2FwcCc7XG5pbXBvcnQgJy4vc3R5bGVzLnNjc3MnO1xuaW1wb3J0ICcuL25vcm1hbGl6ZS5zY3NzJzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=