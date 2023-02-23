/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/form/styles.scss":
/*!*****************************************!*\
  !*** ./src/components/form/styles.scss ***!
  \*****************************************/
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
exports.App = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
const nav_1 = __webpack_require__(/*! ./components/nav */ "./src/components/nav/index.ts");
const note_1 = __webpack_require__(/*! ./components/note */ "./src/components/note/index.ts");
const form_1 = __webpack_require__(/*! ./components/form */ "./src/components/form/index.ts");
const list_1 = __webpack_require__(/*! ./components/list */ "./src/components/list/index.ts");
class App {
    constructor() {
        this.appRoot = document.createElement("div");
        this.appRoot.classList.add("app");
        const appTitle = document.createElement("h1");
        appTitle.classList.add("app__title");
        const container = document.createElement("div");
        container.classList.add("app__container");
        this.appRoot.append(appTitle, container);
        appTitle.textContent = "To-do List";
        const date1 = new Date();
        date1.setMonth(0, 1);
        date1.setHours(11, 20);
        const date2 = new Date();
        date2.setMonth(0, 10);
        date2.setHours(15, 5);
        const notesArr = [
            {
                note: "Create new tasks",
                status: "Active",
                date: date2
            },
            {
                note: "Create to-do list app",
                status: "Done",
                date: date1
            }
        ];
        if (localStorage.getItem("notes") == undefined) {
            const notesJson = JSON.stringify(notesArr);
            localStorage.setItem("notes", notesJson);
        }
        const navigation = new nav_1.Nav();
        this.list = new list_1.List();
        const form = new form_1.Form();
        const bindedMethod = this.handleNoteSubmit.bind(this);
        form.onFormSubmit(bindedMethod);
        navigation.onFilterChange(this.handleFilterChange.bind(this));
        container.append(navigation.container, this.list.container, form.container);
    }
    handleNoteSubmit(noteData) {
        const newNote = new note_1.Note(noteData.note, noteData.date, noteData.status);
        this.list.addNote(newNote);
    }
    handleFilterChange(statusFilter, isReversed) {
        this.list.renderNotes(statusFilter, isReversed);
        this.list.isReversed = isReversed;
    }
}
exports.App = App;


/***/ }),

/***/ "./src/components/form/index.ts":
/*!**************************************!*\
  !*** ./src/components/form/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
__webpack_require__(/*! ./styles.scss */ "./src/components/form/styles.scss");
const warning_1 = __webpack_require__(/*! ../warning */ "./src/components/warning/index.ts");
class Form {
    constructor() {
        this.handler = null;
        this.container = document.createElement("div");
        this.container.classList.add("board");
        const input = document.createElement("input");
        input.setAttribute("type", "textarea");
        input.setAttribute("required", "true");
        input.classList.add("board__input");
        this.buttonAdd = document.createElement("button");
        this.buttonAdd.classList.add("board__button");
        this.buttonAdd.setAttribute("type", "submit");
        this.buttonAdd.textContent = "Add";
        this.buttonAdd.setAttribute("disabled", "true");
        const counter = document.createElement("p");
        counter.classList.add("board__counter");
        this.counterValue = 0;
        counter.textContent = `${this.counterValue}/55`;
        const lengthWarning = document.createElement("p");
        lengthWarning.classList.add("board__counter_error", "board__warning");
        lengthWarning.textContent = "Note should contain from 5 to 55 symbols";
        const warningAlert = new warning_1.Warning(this.buttonAdd);
        this.container.append(input, counter, lengthWarning, this.buttonAdd, warningAlert.container);
        input.addEventListener("input", () => this.countAndUpgradeInput(input, counter, lengthWarning));
        this.buttonAdd.addEventListener("click", (e) => {
            e.preventDefault();
            const dataArray = JSON.parse(localStorage.getItem("notes"));
            if (this.checkNoteDuples(dataArray, warningAlert.container) === false) {
                const newNote = this.createNewNote(dataArray);
                if (this.handler) {
                    this.handler(newNote);
                }
                input.value = "";
                this.counterValue = 0;
                this.noteText = "";
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
            if (this.counterValue < 5) {
                warnElem1.classList.add("board__counter_error");
                warmElem2.classList.add("board__warning_visible");
                this.buttonAdd.setAttribute("disabled", "true");
            }
            else {
                warnElem1.classList.remove("board__counter_error");
                warmElem2.classList.remove("board__warning_visible");
                this.buttonAdd.removeAttribute("disabled");
            }
            ;
        }
        ;
        warnElem1.textContent = `${this.counterValue}/55`;
    }
    checkNoteDuples(dataArray, warnAlertElem) {
        let existingNote = dataArray.find(dataArray => dataArray.note === this.noteText);
        if (existingNote !== undefined) {
            if (existingNote.status === "Active") {
                warnAlertElem.classList.add("warning_visible");
                this.buttonAdd.setAttribute("disabled", "true");
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
    createNewNote(dataArray) {
        const noteObj = {
            note: this.noteText,
            status: "Active",
            date: new Date()
        };
        dataArray.push(noteObj);
        localStorage.setItem("notes", JSON.stringify(dataArray));
        return noteObj;
    }
    onFormSubmit(handler) {
        this.handler = handler;
    }
}
exports.Form = Form;


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
        this.isReversed = false;
        this.container = document.createElement("div");
        this.container.classList.add("list");
        this.renderNotes("All", false);
    }
    getFromLocalStorage() {
        this.notesArr = JSON.parse(localStorage.getItem("notes")).map((obj) => (Object.assign(Object.assign({}, obj), { date: new Date(obj.date) })));
    }
    renderNotes(statusFilter, isReversed) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.getFromLocalStorage();
        if (statusFilter === "Active") {
            this.notesArr = this.notesArr.filter(e => e.status === "Active");
        }
        else if (statusFilter === "Done") {
            this.notesArr = this.notesArr.filter(e => e.status === "Done");
        }
        ;
        if (isReversed) {
            this.notesArr.sort((note1, note2) => note1.date > note2.date ? 1 : -1);
        }
        else {
            this.notesArr.sort((note1, note2) => note1.date < note2.date ? 1 : -1);
        }
        this.notesArr.forEach(e => {
            const note = new note_1.Note(e.note, e.date, e.status);
            this.container.appendChild(note.container);
        });
    }
    addNote(note) {
        this.isReversed === true ? this.container.appendChild(note.container) : this.container.prepend(note.container);
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
        this.filter = "All";
        this.isReversed = false;
        this.handler = null;
        this.container = document.createElement('div');
        this.container.classList.add('nav');
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('nav__container');
        this.buttonReverse = document.createElement('button');
        this.buttonReverse.classList.add('nav__button');
        this.container.append(this.buttonsContainer, this.buttonReverse);
        const buttonImg = document.createElement('div');
        buttonImg.classList.add('nav__reverse');
        this.buttonReverse.appendChild(buttonImg);
        this.buttonReverse.addEventListener("click", () => {
            this.isReversed === false ? this.isReversed = true : this.isReversed = false;
            this.handler(this.filter, this.isReversed);
        });
        this.buttonAll = document.createElement('button');
        this.buttonAll.classList.add('nav__button', 'nav__button_selected');
        this.selectedButton = this.buttonAll;
        this.buttonAll.textContent = "All";
        this.setFilterOnClick(this.buttonAll, "All");
        this.buttonToDo = document.createElement('button');
        this.buttonToDo.classList.add('nav__button');
        this.buttonToDo.textContent = "Active";
        this.setFilterOnClick(this.buttonToDo, "Active");
        this.buttonDone = document.createElement('button');
        this.buttonDone.classList.add('nav__button');
        this.buttonDone.textContent = "Done";
        this.setFilterOnClick(this.buttonDone, "Done");
        this.buttonsContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
    }
    onFilterChange(handler) {
        this.handler = handler;
    }
    setFilterOnClick(button, name) {
        button.addEventListener("click", () => {
            this.selectedButton.classList.remove("nav__button_selected");
            this.filter = name;
            this.selectedButton = button;
            button.classList.add("nav__button_selected");
            this.handler(this.filter, this.isReversed);
        });
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
        this.filter = "All";
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
        this.buttonDelete.addEventListener("click", () => this.deleteNote());
        this.buttonDone = document.createElement("button");
        this.buttonDone.classList.add("note__button");
        this.buttonDone.textContent = "Done";
        this.buttonDone.addEventListener("click", () => this.markNoteAsDone());
        buttonsContainer.append(this.buttonDone, this.buttonDelete);
        this.statusElem = document.createElement("p");
        this.statusElem.classList.add("note__status");
        this.statusElem.textContent = status;
        if (status === "Active") {
            this.statusElem.classList.add("note__status_active");
        }
        else {
            this.statusElem.classList.add("note__status_done");
            this.buttonDone.setAttribute("disabled", "true");
            this.buttonDelete.setAttribute("disabled", "true");
        }
        ;
        const dateElem = document.createElement("p");
        dateElem.classList.add("note__date");
        dateElem.textContent = getPrettyDate(date);
        rightContainer.append(this.statusElem, dateElem);
    }
    deleteNote() {
        const notesArr = JSON.parse(localStorage.getItem("notes"));
        const noteIndex = notesArr.findIndex(e => e.note === this.noteText);
        notesArr.splice(noteIndex, 1);
        const JsonArr = JSON.stringify(notesArr);
        localStorage.setItem("notes", JsonArr);
        this.container.remove();
    }
    markNoteAsDone() {
        const notesArr = JSON.parse(localStorage.getItem("notes"));
        notesArr.find(e => e.note === this.noteText).status = "Done";
        this.statusElem.classList.remove("note__status_active");
        this.statusElem.classList.add("note__status_done");
        this.buttonDone.setAttribute("disabled", "true");
        this.buttonDelete.setAttribute("disabled", "true");
        this.statusElem.textContent = "Done";
        const JsonArr = JSON.stringify(notesArr);
        localStorage.setItem("notes", JsonArr);
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
    if (mins.length < 2)
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
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
__webpack_require__(/*! ./normalize.scss */ "./src/normalize.scss");
const body = document.querySelector("body");
const app = new app_1.App();
body.appendChild(app.appRoot);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLFdBQVcsR0FBRywwREFBMEQsQ0FBQztRQUV0RixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBRUY7QUF6QkQsMEJBeUJDOzs7Ozs7O1VDM0JEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BLCtEQUE0QjtBQUM1Qiw4REFBdUI7QUFDdkIsb0VBQTBCO0FBRTFCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvZm9ybS9zdHlsZXMuc2Nzcz80NTZhIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9zdHlsZXMuc2Nzcz8xNzYxIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbmF2L3N0eWxlcy5zY3NzPzZmMTEiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9ub3RlL3N0eWxlcy5zY3NzPzk1Y2EiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy93YXJuaW5nL3N0eWxlcy5zY3NzPzE4NjQiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvbm9ybWFsaXplLnNjc3M/YzNiYSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9zdHlsZXMuc2Nzcz8wMjlhIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2Zvcm0vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9saXN0L2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbmF2L2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbm90ZS9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL3dhcm5pbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2x5YWxhc3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBOYXYgfSBmcm9tIFwiLi9jb21wb25lbnRzL25hdlwiO1xuaW1wb3J0IHsgTm90ZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvbm90ZVwiO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZm9ybVwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbGlzdFwiO1xuaW1wb3J0IHsgRGF0YU9iaiwgRmlsdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIGFwcFJvb3Q6IEhUTUxEaXZFbGVtZW50O1xuICBsaXN0OiBMaXN0O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXBwUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5hcHBSb290LmNsYXNzTGlzdC5hZGQoXCJhcHBcIik7XG5cbiAgICBjb25zdCBhcHBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBhcHBUaXRsZS5jbGFzc0xpc3QuYWRkKFwiYXBwX190aXRsZVwiKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYXBwX19jb250YWluZXJcIik7XG5cbiAgICB0aGlzLmFwcFJvb3QuYXBwZW5kKGFwcFRpdGxlLCBjb250YWluZXIpO1xuICAgIGFwcFRpdGxlLnRleHRDb250ZW50ID0gXCJUby1kbyBMaXN0XCI7XG5cbiAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZTEuc2V0TW9udGgoMCwgMSk7XG4gICAgZGF0ZTEuc2V0SG91cnMoMTEsIDIwKTtcblxuICAgIGNvbnN0IGRhdGUyID0gbmV3IERhdGUoKTtcbiAgICBkYXRlMi5zZXRNb250aCgwLCAxMCk7XG4gICAgZGF0ZTIuc2V0SG91cnMoMTUsIDUpO1xuXG4gICAgY29uc3Qgbm90ZXNBcnI6IEFycmF5PERhdGFPYmo+ID0gW1xuICAgICAge1xuICAgICAgICBub3RlOiBcIkNyZWF0ZSBuZXcgdGFza3NcIixcbiAgICAgICAgc3RhdHVzOlwiQWN0aXZlXCIsIFxuICAgICAgICBkYXRlOiBkYXRlMlxuICAgICAgfSwgXG5cbiAgICAgIHtcbiAgICAgICAgbm90ZTogXCJDcmVhdGUgdG8tZG8gbGlzdCBhcHBcIixcbiAgICAgICAgc3RhdHVzOiBcIkRvbmVcIixcbiAgICAgICAgZGF0ZTogZGF0ZTFcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibm90ZXNcIikgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBub3Rlc0pzb24gPSBKU09OLnN0cmluZ2lmeShub3Rlc0Fycik7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm5vdGVzXCIsIG5vdGVzSnNvbik7XG4gICAgfVxuXG4gICAgY29uc3QgbmF2aWdhdGlvbiA9IG5ldyBOYXYoKTtcbiAgICB0aGlzLmxpc3QgPSBuZXcgTGlzdCgpO1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybSgpO1xuICAgIGNvbnN0IGJpbmRlZE1ldGhvZCA9IHRoaXMuaGFuZGxlTm90ZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIGZvcm0ub25Gb3JtU3VibWl0KGJpbmRlZE1ldGhvZCk7XG4gICAgbmF2aWdhdGlvbi5vbkZpbHRlckNoYW5nZSh0aGlzLmhhbmRsZUZpbHRlckNoYW5nZS5iaW5kKHRoaXMpKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmQobmF2aWdhdGlvbi5jb250YWluZXIsIHRoaXMubGlzdC5jb250YWluZXIsIGZvcm0uY29udGFpbmVyKTtcblxuICB9XG5cbiAgaGFuZGxlTm90ZVN1Ym1pdChub3RlRGF0YTogRGF0YU9iaikge1xuICAgIGNvbnN0IG5ld05vdGUgPSBuZXcgTm90ZShub3RlRGF0YS5ub3RlLCBub3RlRGF0YS5kYXRlLCBub3RlRGF0YS5zdGF0dXMpO1xuICAgIHRoaXMubGlzdC5hZGROb3RlKG5ld05vdGUpO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyQ2hhbmdlKHN0YXR1c0ZpbHRlcjogRmlsdGVyLCBpc1JldmVyc2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5saXN0LnJlbmRlck5vdGVzKHN0YXR1c0ZpbHRlciwgaXNSZXZlcnNlZCk7XG4gICAgdGhpcy5saXN0LmlzUmV2ZXJzZWQgPSBpc1JldmVyc2VkO1xuICB9XG59XG5cbiIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IERhdGFPYmosIFN1Ym1pdEhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFdhcm5pbmcgfSBmcm9tIFwiLi4vd2FybmluZ1wiO1xuXG5cblxuZXhwb3J0IGNsYXNzIEZvcm0ge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwcml2YXRlIGJ1dHRvbkFkZDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgbm90ZVRleHQ6IHN0cmluZztcbiAgcHJpdmF0ZSBjb3VudGVyVmFsdWU6IG51bWJlcjtcbiAgaGFuZGxlcjogU3VibWl0SGFuZGxlciB8IG51bGwgPSBudWxsXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0YXJlYVwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcInRydWVcIik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImJvYXJkX19pbnB1dFwiKTtcblxuICAgIHRoaXMuYnV0dG9uQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2J1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkLnRleHRDb250ZW50ID0gXCJBZGRcIjtcbiAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgXG4gICAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvdW50ZXIuY2xhc3NMaXN0LmFkZChcImJvYXJkX19jb3VudGVyXCIpO1xuICAgIHRoaXMuY291bnRlclZhbHVlID0gMDtcbiAgICBjb3VudGVyLnRleHRDb250ZW50ID0gYCR7dGhpcy5jb3VudGVyVmFsdWV9LzU1YDtcbiAgICBjb25zdCBsZW5ndGhXYXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbGVuZ3RoV2FybmluZy5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2NvdW50ZXJfZXJyb3JcIiwgXCJib2FyZF9fd2FybmluZ1wiKTtcbiAgICBsZW5ndGhXYXJuaW5nLnRleHRDb250ZW50ID0gXCJOb3RlIHNob3VsZCBjb250YWluIGZyb20gNSB0byA1NSBzeW1ib2xzXCI7XG4gICAgY29uc3Qgd2FybmluZ0FsZXJ0ID0gbmV3IFdhcm5pbmcodGhpcy5idXR0b25BZGQpO1xuICAgIFxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZChpbnB1dCwgY291bnRlciwgbGVuZ3RoV2FybmluZywgdGhpcy5idXR0b25BZGQsIHdhcm5pbmdBbGVydC5jb250YWluZXIpO1xuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHRoaXMuY291bnRBbmRVcGdyYWRlSW5wdXQoaW5wdXQsIGNvdW50ZXIsIGxlbmd0aFdhcm5pbmcpKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGRhdGFBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJub3Rlc1wiKSk7XG4gICAgICBpZiAodGhpcy5jaGVja05vdGVEdXBsZXMoZGF0YUFycmF5LCB3YXJuaW5nQWxlcnQuY29udGFpbmVyKT09PWZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG5ld05vdGUgPSB0aGlzLmNyZWF0ZU5ld05vdGUoZGF0YUFycmF5KTtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICAgIHRoaXMuaGFuZGxlcihuZXdOb3RlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuY291bnRlclZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5ub3RlVGV4dCA9IFwiXCI7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY291bnRBbmRVcGdyYWRlSW5wdXQoaW5wdXRFbGVtOkhUTUxJbnB1dEVsZW1lbnQsIHdhcm5FbGVtMTogSFRNTFBhcmFncmFwaEVsZW1lbnQsIHdhcm1FbGVtMjpIVE1MUGFyYWdyYXBoRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChpbnB1dEVsZW0udmFsdWU9PT1cIlwiKSB7XG4gICAgICB0aGlzLmNvdW50ZXJWYWx1ZSA9IDA7XG4gICAgICB0aGlzLm5vdGVUZXh0ID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3VudGVyVmFsdWUgPSBpbnB1dEVsZW0udmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKHRoaXMuY291bnRlclZhbHVlID49IDU1KSBpbnB1dEVsZW0udmFsdWUgPSB0aGlzLm5vdGVUZXh0O1xuICAgICAgdGhpcy5ub3RlVGV4dCA9IGlucHV0RWxlbS52YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgaW5wdXRFbGVtLnZhbHVlLnNsaWNlKDEpO1xuICAgICAgaW5wdXRFbGVtLnZhbHVlID0gdGhpcy5ub3RlVGV4dDtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXJWYWx1ZSA8IDUpIHtcbiAgICAgICAgd2FybkVsZW0xLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fd2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5FbGVtMS5jbGFzc0xpc3QucmVtb3ZlKFwiYm9hcmRfX2NvdW50ZXJfZXJyb3JcIik7XG4gICAgICAgIHdhcm1FbGVtMi5jbGFzc0xpc3QucmVtb3ZlKFwiYm9hcmRfX3dhcm5pbmdfdmlzaWJsZVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25BZGQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9O1xuICAgIH07XG4gICAgd2FybkVsZW0xLnRleHRDb250ZW50ID0gYCR7dGhpcy5jb3VudGVyVmFsdWV9LzU1YDtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tOb3RlRHVwbGVzKGRhdGFBcnJheTogQXJyYXk8RGF0YU9iaj4sIHdhcm5BbGVydEVsZW06IEhUTUxEaXZFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgbGV0IGV4aXN0aW5nTm90ZSA9IGRhdGFBcnJheS5maW5kKGRhdGFBcnJheSA9PiBkYXRhQXJyYXkubm90ZSA9PT0gdGhpcy5ub3RlVGV4dCk7XG4gICAgaWYgKGV4aXN0aW5nTm90ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZXhpc3RpbmdOb3RlLnN0YXR1cyA9PT0gXCJBY3RpdmVcIikge1xuICAgICAgICB3YXJuQWxlcnRFbGVtLmNsYXNzTGlzdC5hZGQoXCJ3YXJuaW5nX3Zpc2libGVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uQWRkLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAgcHJpdmF0ZSBjcmVhdGVOZXdOb3RlKGRhdGFBcnJheTogQXJyYXk8RGF0YU9iaj4pIHtcbiAgICBjb25zdCBub3RlT2JqID0ge1xuICAgICAgbm90ZTogdGhpcy5ub3RlVGV4dCxcbiAgICAgIHN0YXR1czogXCJBY3RpdmVcIixcbiAgICAgIGRhdGU6IG5ldyBEYXRlKClcbiAgICB9XG4gICAgZGF0YUFycmF5LnB1c2gobm90ZU9iaik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJub3Rlc1wiLCBKU09OLnN0cmluZ2lmeShkYXRhQXJyYXkpKTtcbiAgICByZXR1cm4gbm90ZU9ialxuICAgfVxuXG4gICBvbkZvcm1TdWJtaXQoaGFuZGxlcjogU3VibWl0SGFuZGxlcikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXJcbiAgIH1cbn0iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBOb3RlIH0gZnJvbSBcIi4uL25vdGVcIjtcbmltcG9ydCB7IERhdGFPYmogfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBub3Rlc0FycjogQXJyYXk8RGF0YU9iaj47XG4gIGlzUmV2ZXJzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImxpc3RcIik7XG5cbiAgICB0aGlzLnJlbmRlck5vdGVzKFwiQWxsXCIsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICB0aGlzLm5vdGVzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5vdGVzXCIpKS5tYXAoKG9iajogRGF0YU9iaikgPT4gKHsuLi5vYmosIGRhdGU6IG5ldyBEYXRlKG9iai5kYXRlKX0pKTtcbiAgfVxuXG4gIHJlbmRlck5vdGVzKHN0YXR1c0ZpbHRlcjogc3RyaW5nLCBpc1JldmVyc2VkOiBib29sZWFuKSB7XG4gICAgd2hpbGUgKHRoaXMuY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoKTtcblxuICAgIGlmIChzdGF0dXNGaWx0ZXIgPT09IFwiQWN0aXZlXCIpIHtcbiAgICAgIHRoaXMubm90ZXNBcnIgPSB0aGlzLm5vdGVzQXJyLmZpbHRlciggZSA9PiBlLnN0YXR1cyA9PT0gXCJBY3RpdmVcIik7XG4gICAgfSBlbHNlIGlmIChzdGF0dXNGaWx0ZXIgPT09IFwiRG9uZVwiKSB7XG4gICAgICB0aGlzLm5vdGVzQXJyID0gdGhpcy5ub3Rlc0Fyci5maWx0ZXIoIGUgPT4gZS5zdGF0dXMgPT09IFwiRG9uZVwiKTtcbiAgICB9O1xuXG4gICAgaWYgKGlzUmV2ZXJzZWQpIHtcbiAgICAgIHRoaXMubm90ZXNBcnIuc29ydCgobm90ZTEsIG5vdGUyKSA9PiBub3RlMS5kYXRlID4gbm90ZTIuZGF0ZSA/IDEgOiAtMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90ZXNBcnIuc29ydCgobm90ZTEsIG5vdGUyKSA9PiBub3RlMS5kYXRlIDwgbm90ZTIuZGF0ZSA/IDEgOiAtMSk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3Rlc0Fyci5mb3JFYWNoKGUgPT4ge1xuICAgICAgY29uc3Qgbm90ZTogTm90ZSA9IG5ldyBOb3RlKGUubm90ZSwgZS5kYXRlLCBlLnN0YXR1cyk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RlLmNvbnRhaW5lcik7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlKG5vdGU6IE5vdGUpIHtcbiAgICB0aGlzLmlzUmV2ZXJzZWQgPT09IHRydWUgPyB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RlLmNvbnRhaW5lcikgOiB0aGlzLmNvbnRhaW5lci5wcmVwZW5kKG5vdGUuY29udGFpbmVyKTtcbiAgfVxuXG59IiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgRmlsdGVyQ2hhbmdlSGFuZGxlciwgRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBOYXYge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25zQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uQWxsOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uVG9EbzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGJ1dHRvbkRvbmU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBidXR0b25SZXZlcnNlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgZmlsdGVyOiBGaWx0ZXIgPSBcIkFsbFwiO1xuICBpc1JldmVyc2VkOiBib29sZWFuID0gZmFsc2U7XG4gIGhhbmRsZXI6IEZpbHRlckNoYW5nZUhhbmRsZXIgfCBudWxsID0gbnVsbDtcbiAgc2VsZWN0ZWRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25hdicpO1xuICAgIHRoaXMuYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYnV0dG9uc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCduYXZfX2NvbnRhaW5lcicpO1xuICAgIHRoaXMuYnV0dG9uUmV2ZXJzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uUmV2ZXJzZS5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh0aGlzLmJ1dHRvbnNDb250YWluZXIsIHRoaXMuYnV0dG9uUmV2ZXJzZSk7XG5cbiAgICBjb25zdCBidXR0b25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25JbWcuY2xhc3NMaXN0LmFkZCgnbmF2X19yZXZlcnNlJyk7XG4gICAgdGhpcy5idXR0b25SZXZlcnNlLmFwcGVuZENoaWxkKGJ1dHRvbkltZyk7XG4gICAgdGhpcy5idXR0b25SZXZlcnNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzUmV2ZXJzZWQgPT09IGZhbHNlID8gdGhpcy5pc1JldmVyc2VkID0gdHJ1ZSA6IHRoaXMuaXNSZXZlcnNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5oYW5kbGVyKHRoaXMuZmlsdGVyLCB0aGlzLmlzUmV2ZXJzZWQpO1xuICAgIH0pXG4gICAgXG5cbiAgICB0aGlzLmJ1dHRvbkFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uQWxsLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJywgJ25hdl9fYnV0dG9uX3NlbGVjdGVkJyk7XG4gICAgdGhpcy5zZWxlY3RlZEJ1dHRvbiA9IHRoaXMuYnV0dG9uQWxsO1xuICAgIHRoaXMuYnV0dG9uQWxsLnRleHRDb250ZW50ID0gXCJBbGxcIjtcbiAgICB0aGlzLnNldEZpbHRlck9uQ2xpY2sodGhpcy5idXR0b25BbGwsIFwiQWxsXCIpO1xuXG4gICAgdGhpcy5idXR0b25Ub0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25Ub0RvLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25Ub0RvLnRleHRDb250ZW50ID0gXCJBY3RpdmVcIjtcbiAgICB0aGlzLnNldEZpbHRlck9uQ2xpY2sodGhpcy5idXR0b25Ub0RvLCBcIkFjdGl2ZVwiKTtcblxuICAgIHRoaXMuYnV0dG9uRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xuICAgIHRoaXMuc2V0RmlsdGVyT25DbGljayh0aGlzLmJ1dHRvbkRvbmUsIFwiRG9uZVwiKTtcblxuICAgIHRoaXMuYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQodGhpcy5idXR0b25BbGwsIHRoaXMuYnV0dG9uVG9EbywgdGhpcy5idXR0b25Eb25lKTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2hhbmdlKGhhbmRsZXI6IEZpbHRlckNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG5cbiAgc2V0RmlsdGVyT25DbGljayhidXR0b246IEhUTUxCdXR0b25FbGVtZW50LCBuYW1lOiBGaWx0ZXIpIHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fYnV0dG9uX3NlbGVjdGVkXCIpXG4gICAgICB0aGlzLmZpbHRlciA9IG5hbWU7XG4gICAgICB0aGlzLnNlbGVjdGVkQnV0dG9uID0gYnV0dG9uO1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJuYXZfX2J1dHRvbl9zZWxlY3RlZFwiKTtcbiAgICAgIHRoaXMuaGFuZGxlcih0aGlzLmZpbHRlciwgdGhpcy5pc1JldmVyc2VkKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgRGF0YU9iaiwgRmlsdGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBOb3RlIHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uRGVsZXRlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIG5vdGVUZXh0OiBzdHJpbmc7XG4gIHN0YXR1c0VsZW06IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICBmaWx0ZXI6IEZpbHRlciA9IFwiQWxsXCI7XG5cbiAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBkYXRlOiBEYXRlLCBzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm90ZVwiKTtcbiAgICBjb25zdCBsZWZ0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgY29uc3QgcmlnaHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJpZ2h0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfaW5uZXJcIik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGxlZnRDb250YWluZXIsIHJpZ2h0Q29udGFpbmVyKTtcblxuICAgIGNvbnN0IG5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbm90ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fdGV4dFwiKTtcbiAgICBub3RlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB0aGlzLm5vdGVUZXh0ID0gdGV4dDtcbiAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlX19jb250YWluZXJfYnV0dG9uc1wiKTtcbiAgICBsZWZ0Q29udGFpbmVyLmFwcGVuZChub3RlLCBidXR0b25zQ29udGFpbmVyKTtcblxuICAgIHRoaXMuYnV0dG9uRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkRlbGV0ZS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRGVsZXRlLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICB0aGlzLmJ1dHRvbkRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5kZWxldGVOb3RlKCkpO1xuXG4gICAgdGhpcy5idXR0b25Eb25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUuY2xhc3NMaXN0LmFkZChcIm5vdGVfX2J1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUudGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcbiAgICB0aGlzLmJ1dHRvbkRvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMubWFya05vdGVBc0RvbmUoKSk7XG5cbiAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZCh0aGlzLmJ1dHRvbkRvbmUsIHRoaXMuYnV0dG9uRGVsZXRlKTtcblxuICAgIHRoaXMuc3RhdHVzRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRoaXMuc3RhdHVzRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fc3RhdHVzXCIpO1xuICAgIHRoaXMuc3RhdHVzRWxlbS50ZXh0Q29udGVudCA9IHN0YXR1cztcbiAgICBpZiAoc3RhdHVzID09PSBcIkFjdGl2ZVwiKSB7XG4gICAgICB0aGlzLnN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19hY3RpdmVcIilcbiAgICB9ICBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdHVzRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fc3RhdHVzX2RvbmVcIik7XG4gICAgICB0aGlzLmJ1dHRvbkRvbmUuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgdGhpcy5idXR0b25EZWxldGUuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH07XG5cbiAgICBjb25zdCBkYXRlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGRhdGVFbGVtLmNsYXNzTGlzdC5hZGQoXCJub3RlX19kYXRlXCIpO1xuICAgIGRhdGVFbGVtLnRleHRDb250ZW50ID0gZ2V0UHJldHR5RGF0ZShkYXRlKTtcblxuICAgIHJpZ2h0Q29udGFpbmVyLmFwcGVuZCh0aGlzLnN0YXR1c0VsZW0sIGRhdGVFbGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVsZXRlTm90ZSgpIHtcbiAgICBjb25zdCBub3Rlc0FycjogQXJyYXk8RGF0YU9iaj4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibm90ZXNcIikpO1xuICAgIGNvbnN0IG5vdGVJbmRleCA9IG5vdGVzQXJyLmZpbmRJbmRleChlID0+IGUubm90ZSA9PT0gdGhpcy5ub3RlVGV4dCk7XG4gICAgbm90ZXNBcnIuc3BsaWNlKG5vdGVJbmRleCwgMSk7XG4gICAgY29uc3QgSnNvbkFyciA9IEpTT04uc3RyaW5naWZ5KG5vdGVzQXJyKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm5vdGVzXCIsIEpzb25BcnIpO1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXJrTm90ZUFzRG9uZSgpIHtcbiAgICBjb25zdCBub3Rlc0FycjogQXJyYXk8RGF0YU9iaj4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibm90ZXNcIikpO1xuICAgIG5vdGVzQXJyLmZpbmQoZSA9PiBlLm5vdGUgPT09IHRoaXMubm90ZVRleHQpLnN0YXR1cyA9IFwiRG9uZVwiO1xuICAgIHRoaXMuc3RhdHVzRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwibm90ZV9fc3RhdHVzX2FjdGl2ZVwiKTtcbiAgICB0aGlzLnN0YXR1c0VsZW0uY2xhc3NMaXN0LmFkZChcIm5vdGVfX3N0YXR1c19kb25lXCIpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgdGhpcy5idXR0b25EZWxldGUuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIHRoaXMuc3RhdHVzRWxlbS50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xuICAgIGNvbnN0IEpzb25BcnIgPSBKU09OLnN0cmluZ2lmeShub3Rlc0Fycik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJub3Rlc1wiLCBKc29uQXJyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcmV0dHlEYXRlIChkYXRlOiBEYXRlKSB7XG4gIGNvbnN0IGRheXNBcnIgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZW5cIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XG4gIGNvbnN0IG1vbnRoc0FyciA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXTtcbiAgY29uc3QgZGF5OiBzdHJpbmcgPSBkYXlzQXJyW2RhdGUuZ2V0RGF5KCldO1xuICBjb25zdCBkYXRlTnVtOiBudW1iZXIgPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgbW9udGg6IHN0cmluZyA9IG1vbnRoc0FycltkYXRlLmdldE1vbnRoKCldO1xuICBjb25zdCB5ZWFyOiBudW1iZXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICBsZXQgbWlucyA9IGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XG4gIGlmIChtaW5zLmxlbmd0aDwyKSBtaW5zID0gXCIwXCIgKyBtaW5zO1xuICByZXR1cm4gYCR7ZGF5fSAgICR7ZGF0ZU51bX0gJHttb250aH0gJHt5ZWFyfSAgICR7aG91cnN9OiR7bWluc31gO1xuXG59IiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuXG5leHBvcnQgY2xhc3MgV2FybmluZyB7XG4gIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoYWRkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2FybmluZ1wiKTtcblxuICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwid2FybmluZ19fYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwid2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgYWRkQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd2FybmluZ1RleHQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgd2FybmluZ1RleHQxLmNsYXNzTGlzdC5hZGQoXCJ3YXJuaW5nX190ZXh0XCIpO1xuICAgIHdhcm5pbmdUZXh0MS50ZXh0Q29udGVudCA9IFwiU29ycnksIHlvdSBhbHJlYWR5IGhhdmUgdGhpcyB0YXNrIVwiO1xuICAgIGNvbnN0IHdhcm5pbmdUZXh0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHdhcm5pbmdUZXh0Mi5jbGFzc0xpc3QuYWRkKFwid2FybmluZ19fdGV4dFwiKTtcbiAgICB3YXJuaW5nVGV4dDIudGV4dENvbnRlbnQgPSBcIllvdSBjYW4ndCBjcmVhdGUgaXQgYWdpYW4gdW50aWwgaXQgaXNuJ3QgZG9uZS9kZWxldGVkIDooXCI7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5idXR0b24sIHdhcm5pbmdUZXh0MSwgd2FybmluZ1RleHQyKTtcbiAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFwcCB9IGZyb20gJy4vYXBwJztcbmltcG9ydCAnLi9zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgJy4vbm9ybWFsaXplLnNjc3MnO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5ib2R5LmFwcGVuZENoaWxkKGFwcC5hcHBSb290KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=