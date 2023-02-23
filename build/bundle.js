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
        const date2 = new Date();
        date2.setMonth(0, 10);
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
        if (localStorage.getItem("notes") === undefined) {
            const notesJson = JSON.stringify(notesArr);
            localStorage.setItem("notes", notesJson);
        }
        const navigation = new nav_1.Nav();
        this.list = new list_1.List();
        const form = new form_1.Form();
        const bindedMethod = this.handleNoteSubmit.bind(this);
        form.onFormSubmit(bindedMethod);
        container.append(navigation.container, this.list.container, form.container);
    }
    handleNoteSubmit(noteData) {
        const newNote = new note_1.Note(noteData.note, noteData.date, noteData.status);
        this.list.addNote(newNote);
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
        this.container = document.createElement("div");
        this.container.classList.add("list");
        this.renderNotes();
    }
    getFromLocalStorage() {
        this.notesArr = JSON.parse(localStorage.getItem("notes")).map((obj) => (Object.assign(Object.assign({}, obj), { date: new Date(obj.date) })));
    }
    renderNotes() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.getFromLocalStorage();
        this.notesArr.forEach(e => {
            const note = new note_1.Note(e.note, e.date, e.status);
            this.container.appendChild(note.container);
        });
    }
    addNote(note) {
        this.container.appendChild(note.container);
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
    console.log(date);
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
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
__webpack_require__(/*! ./normalize.scss */ "./src/normalize.scss");
const body = document.querySelector("body");
const app = new app_1.App();
body.appendChild(app.appRoot);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVILE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxvQ0FBb0MsQ0FBQztRQUNoRSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxXQUFXLEdBQUcsMERBQTBELENBQUM7UUFFdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUVGO0FBekJELDBCQXlCQzs7Ozs7OztVQzNCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQSwrREFBNEI7QUFDNUIsOERBQXVCO0FBQ3ZCLG9FQUEwQjtBQUUxQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2Zvcm0vc3R5bGVzLnNjc3M/NDU2YSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL2xpc3Qvc3R5bGVzLnNjc3M/MTc2MSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25hdi9zdHlsZXMuc2Nzcz82ZjExIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbm90ZS9zdHlsZXMuc2Nzcz85NWNhIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvd2FybmluZy9zdHlsZXMuc2Nzcz8xODY0Iiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL25vcm1hbGl6ZS5zY3NzP2MzYmEiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvc3R5bGVzLnNjc3M/MDI5YSIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9mb3JtL2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvbGlzdC9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25hdi9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL25vdGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy93YXJuaW5nL2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29seWFsYXNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgTmF2IH0gZnJvbSBcIi4vY29tcG9uZW50cy9uYXZcIjtcbmltcG9ydCB7IE5vdGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL25vdGVcIjtcbmltcG9ydCB7IEZvcm0gfSBmcm9tIFwiLi9jb21wb25lbnRzL2Zvcm1cIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xpc3RcIjtcbmltcG9ydCB7IERhdGFPYmogfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgYXBwUm9vdDogSFRNTERpdkVsZW1lbnQ7XG4gIGxpc3Q6IExpc3Q7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcHBSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmFwcFJvb3QuY2xhc3NMaXN0LmFkZChcImFwcFwiKTtcblxuICAgIGNvbnN0IGFwcFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGFwcFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJhcHBfX3RpdGxlXCIpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhcHBfX2NvbnRhaW5lclwiKTtcbiAgICB0aGlzLmFwcFJvb3QuYXBwZW5kKGFwcFRpdGxlLCBjb250YWluZXIpO1xuICAgIGFwcFRpdGxlLnRleHRDb250ZW50ID0gXCJUby1kbyBMaXN0XCI7XG5cbiAgICBjb25zdCBkYXRlMSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZTEuc2V0TW9udGgoMCwgMSk7XG5cbiAgICBjb25zdCBkYXRlMiA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZTIuc2V0TW9udGgoMCwgMTApO1xuXG4gICAgY29uc3Qgbm90ZXNBcnI6IEFycmF5PERhdGFPYmo+ID0gW1xuICAgICAge1xuICAgICAgICBub3RlOiBcIkNyZWF0ZSBuZXcgdGFza3NcIixcbiAgICAgICAgc3RhdHVzOlwiQWN0aXZlXCIsIFxuICAgICAgICBkYXRlOiBkYXRlMlxuICAgICAgfSwgXG5cbiAgICAgIHtcbiAgICAgICAgbm90ZTogXCJDcmVhdGUgdG8tZG8gbGlzdCBhcHBcIixcbiAgICAgICAgc3RhdHVzOiBcIkRvbmVcIixcbiAgICAgICAgZGF0ZTogZGF0ZTFcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibm90ZXNcIikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgbm90ZXNKc29uID0gSlNPTi5zdHJpbmdpZnkobm90ZXNBcnIpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJub3Rlc1wiLCBub3Rlc0pzb24pO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdmlnYXRpb24gPSBuZXcgTmF2KCk7XG4gICAgdGhpcy5saXN0ID0gbmV3IExpc3QoKTtcbiAgICBjb25zdCBmb3JtID0gbmV3IEZvcm0oKTtcbiAgICBjb25zdCBiaW5kZWRNZXRob2QgPSB0aGlzLmhhbmRsZU5vdGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgICBmb3JtLm9uRm9ybVN1Ym1pdChiaW5kZWRNZXRob2QpXG5cbiAgICBjb250YWluZXIuYXBwZW5kKG5hdmlnYXRpb24uY29udGFpbmVyLCB0aGlzLmxpc3QuY29udGFpbmVyLCBmb3JtLmNvbnRhaW5lcik7XG5cbiAgfVxuXG4gIGhhbmRsZU5vdGVTdWJtaXQobm90ZURhdGE6IERhdGFPYmopIHtcbiAgICBjb25zdCBuZXdOb3RlID0gbmV3IE5vdGUobm90ZURhdGEubm90ZSwgbm90ZURhdGEuZGF0ZSwgbm90ZURhdGEuc3RhdHVzKTtcbiAgICB0aGlzLmxpc3QuYWRkTm90ZShuZXdOb3RlKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgeyBEYXRhT2JqLCBTdWJtaXRIYW5kbGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBXYXJuaW5nIH0gZnJvbSBcIi4uL3dhcm5pbmdcIjtcblxuXG5cbmV4cG9ydCBjbGFzcyBGb3JtIHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBidXR0b25BZGQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIG5vdGVUZXh0OiBzdHJpbmc7XG4gIHByaXZhdGUgY291bnRlclZhbHVlOiBudW1iZXI7XG4gIGhhbmRsZXI6IFN1Ym1pdEhhbmRsZXIgfCBudWxsID0gbnVsbFxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG5cbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dGFyZWFcIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJ0cnVlXCIpO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJib2FyZF9faW5wdXRcIik7XG5cbiAgICB0aGlzLmJ1dHRvbkFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5idXR0b25BZGQuY2xhc3NMaXN0LmFkZChcImJvYXJkX19idXR0b25cIik7XG4gICAgdGhpcy5idXR0b25BZGQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC50ZXh0Q29udGVudCA9IFwiQWRkXCI7XG4gICAgdGhpcy5idXR0b25BZGQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIFxuICAgIGNvbnN0IGNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb3VudGVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZF9fY291bnRlclwiKTtcbiAgICB0aGlzLmNvdW50ZXJWYWx1ZSA9IDA7XG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IGAke3RoaXMuY291bnRlclZhbHVlfS81NWA7XG4gICAgY29uc3QgbGVuZ3RoV2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxlbmd0aFdhcm5pbmcuY2xhc3NMaXN0LmFkZChcImJvYXJkX19jb3VudGVyX2Vycm9yXCIsIFwiYm9hcmRfX3dhcm5pbmdcIik7XG4gICAgbGVuZ3RoV2FybmluZy50ZXh0Q29udGVudCA9IFwiTm90ZSBzaG91bGQgY29udGFpbiBmcm9tIDUgdG8gNTUgc3ltYm9sc1wiO1xuICAgIGNvbnN0IHdhcm5pbmdBbGVydCA9IG5ldyBXYXJuaW5nKHRoaXMuYnV0dG9uQWRkKTtcbiAgICBcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoaW5wdXQsIGNvdW50ZXIsIGxlbmd0aFdhcm5pbmcsIHRoaXMuYnV0dG9uQWRkLCB3YXJuaW5nQWxlcnQuY29udGFpbmVyKTtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB0aGlzLmNvdW50QW5kVXBncmFkZUlucHV0KGlucHV0LCBjb3VudGVyLCBsZW5ndGhXYXJuaW5nKSk7XG4gICAgdGhpcy5idXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBkYXRhQXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibm90ZXNcIikpO1xuICAgICAgaWYgKHRoaXMuY2hlY2tOb3RlRHVwbGVzKGRhdGFBcnJheSwgd2FybmluZ0FsZXJ0LmNvbnRhaW5lcik9PT1mYWxzZSkge1xuICAgICAgICBjb25zdCBuZXdOb3RlID0gdGhpcy5jcmVhdGVOZXdOb3RlKGRhdGFBcnJheSk7XG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZXIobmV3Tm90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmNvdW50ZXJWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMubm90ZVRleHQgPSBcIlwiO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIGNvdW50QW5kVXBncmFkZUlucHV0KGlucHV0RWxlbTpIVE1MSW5wdXRFbGVtZW50LCB3YXJuRWxlbTE6IEhUTUxQYXJhZ3JhcGhFbGVtZW50LCB3YXJtRWxlbTI6SFRNTFBhcmFncmFwaEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoaW5wdXRFbGVtLnZhbHVlPT09XCJcIikge1xuICAgICAgdGhpcy5jb3VudGVyVmFsdWUgPSAwO1xuICAgICAgdGhpcy5ub3RlVGV4dCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY291bnRlclZhbHVlID0gaW5wdXRFbGVtLnZhbHVlLmxlbmd0aDtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXJWYWx1ZSA+PSA1NSkgaW5wdXRFbGVtLnZhbHVlID0gdGhpcy5ub3RlVGV4dDtcbiAgICAgIHRoaXMubm90ZVRleHQgPSBpbnB1dEVsZW0udmFsdWVbMF0udG9VcHBlckNhc2UoKSArIGlucHV0RWxlbS52YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlucHV0RWxlbS52YWx1ZSA9IHRoaXMubm90ZVRleHQ7XG4gICAgICBpZiAodGhpcy5jb3VudGVyVmFsdWUgPCA1KSB7XG4gICAgICAgIHdhcm5FbGVtMS5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2NvdW50ZXJfZXJyb3JcIik7XG4gICAgICAgIHdhcm1FbGVtMi5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX3dhcm5pbmdfdmlzaWJsZVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25BZGQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuRWxlbTEuY2xhc3NMaXN0LnJlbW92ZShcImJvYXJkX19jb3VudGVyX2Vycm9yXCIpO1xuICAgICAgICB3YXJtRWxlbTIuY2xhc3NMaXN0LnJlbW92ZShcImJvYXJkX193YXJuaW5nX3Zpc2libGVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uQWRkLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHdhcm5FbGVtMS50ZXh0Q29udGVudCA9IGAke3RoaXMuY291bnRlclZhbHVlfS81NWA7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrTm90ZUR1cGxlcyhkYXRhQXJyYXk6IEFycmF5PERhdGFPYmo+LCB3YXJuQWxlcnRFbGVtOiBIVE1MRGl2RWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGxldCBleGlzdGluZ05vdGUgPSBkYXRhQXJyYXkuZmluZChkYXRhQXJyYXkgPT4gZGF0YUFycmF5Lm5vdGUgPT09IHRoaXMubm90ZVRleHQpO1xuICAgIGlmIChleGlzdGluZ05vdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV4aXN0aW5nTm90ZS5zdGF0dXMgPT09IFwiQWN0aXZlXCIpIHtcbiAgICAgICAgd2FybkFsZXJ0RWxlbS5jbGFzc0xpc3QuYWRkKFwid2FybmluZ192aXNpYmxlXCIpO1xuICAgICAgICB0aGlzLmJ1dHRvbkFkZC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgIHByaXZhdGUgY3JlYXRlTmV3Tm90ZShkYXRhQXJyYXk6IEFycmF5PERhdGFPYmo+KSB7XG4gICAgY29uc3Qgbm90ZU9iaiA9IHtcbiAgICAgIG5vdGU6IHRoaXMubm90ZVRleHQsXG4gICAgICBzdGF0dXM6IFwiQWN0aXZlXCIsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgpXG4gICAgfVxuICAgIGRhdGFBcnJheS5wdXNoKG5vdGVPYmopO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibm90ZXNcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YUFycmF5KSk7XG4gICAgcmV0dXJuIG5vdGVPYmpcbiAgIH1cblxuICAgb25Gb3JtU3VibWl0KGhhbmRsZXI6IFN1Ym1pdEhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG4gICB9XG59IiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgTm90ZSB9IGZyb20gXCIuLi9ub3RlXCI7XG5pbXBvcnQgeyBEYXRhT2JqIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgbm90ZXNBcnI6IEFycmF5PERhdGFPYmo+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcblxuICAgIHRoaXMucmVuZGVyTm90ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICB0aGlzLm5vdGVzQXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm5vdGVzXCIpKS5tYXAoKG9iajogRGF0YU9iaikgPT4gKHsuLi5vYmosIGRhdGU6IG5ldyBEYXRlKG9iai5kYXRlKX0pKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyTm90ZXMoKSB7XG4gICAgd2hpbGUgKHRoaXMuY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICB0aGlzLm5vdGVzQXJyLmZvckVhY2goZSA9PiB7XG4gICAgICBjb25zdCBub3RlOiBOb3RlID0gbmV3IE5vdGUoZS5ub3RlLCBlLmRhdGUsIGUuc3RhdHVzKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGUuY29udGFpbmVyKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFkZE5vdGUobm90ZTogTm90ZSkge1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGUuY29udGFpbmVyKTtcbiAgfVxuXG59IiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuXG5leHBvcnQgY2xhc3MgTmF2IHtcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgYnV0dG9uc0NvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gIGJ1dHRvbkFsbDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGJ1dHRvblRvRG86IEhUTUxCdXR0b25FbGVtZW50O1xuICBidXR0b25Eb25lOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnV0dG9uUmV2ZXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCduYXYnKTtcbiAgICB0aGlzLmJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJ1dHRvbnNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmF2X19jb250YWluZXInKTtcbiAgICB0aGlzLmJ1dHRvblJldmVydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uUmV2ZXJ0LmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uc0NvbnRhaW5lciwgdGhpcy5idXR0b25SZXZlcnQpO1xuXG4gICAgY29uc3QgYnV0dG9uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnV0dG9uSW1nLmNsYXNzTGlzdC5hZGQoJ25hdl9fcmV2ZXJ0Jyk7XG4gICAgdGhpcy5idXR0b25SZXZlcnQuYXBwZW5kQ2hpbGQoYnV0dG9uSW1nKTtcbiAgICBcblxuICAgIHRoaXMuYnV0dG9uQWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25BbGwuY2xhc3NMaXN0LmFkZCgnbmF2X19idXR0b24nKTtcbiAgICB0aGlzLmJ1dHRvbkFsbC50ZXh0Q29udGVudCA9IFwiQWxsXCI7XG4gICAgdGhpcy5idXR0b25Ub0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25Ub0RvLmNsYXNzTGlzdC5hZGQoJ25hdl9fYnV0dG9uJyk7XG4gICAgdGhpcy5idXR0b25Ub0RvLnRleHRDb250ZW50ID0gXCJUby1kb1wiO1xuICAgIHRoaXMuYnV0dG9uRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS5jbGFzc0xpc3QuYWRkKCduYXZfX2J1dHRvbicpO1xuICAgIHRoaXMuYnV0dG9uRG9uZS50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xuICAgIHRoaXMuYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQodGhpcy5idXR0b25BbGwsIHRoaXMuYnV0dG9uVG9EbywgdGhpcy5idXR0b25Eb25lKTtcbiAgfVxufSIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGNsYXNzIE5vdGUge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b25EZWxldGU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBidXR0b25Eb25lOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgbm90ZVRleHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIGRhdGU6IERhdGUsIHN0YXR1czogc3RyaW5nKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3RlXCIpO1xuICAgIGNvbnN0IGxlZnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGxlZnRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdGVfX2NvbnRhaW5lcl9pbm5lclwiKTtcbiAgICBjb25zdCByaWdodENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcmlnaHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdGVfX2NvbnRhaW5lcl9pbm5lclwiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQobGVmdENvbnRhaW5lciwgcmlnaHRDb250YWluZXIpO1xuXG4gICAgY29uc3Qgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBub3RlLmNsYXNzTGlzdC5hZGQoXCJub3RlX190ZXh0XCIpO1xuICAgIG5vdGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIHRoaXMubm90ZVRleHQgPSB0ZXh0O1xuICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJ1dHRvbnNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdGVfX2NvbnRhaW5lcl9idXR0b25zXCIpO1xuICAgIGxlZnRDb250YWluZXIuYXBwZW5kKG5vdGUsIGJ1dHRvbnNDb250YWluZXIpO1xuXG4gICAgdGhpcy5idXR0b25EZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuYnV0dG9uRGVsZXRlLmNsYXNzTGlzdC5hZGQoXCJub3RlX19idXR0b25cIik7XG4gICAgdGhpcy5idXR0b25EZWxldGUudGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xuICAgIHRoaXMuYnV0dG9uRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5idXR0b25Eb25lLmNsYXNzTGlzdC5hZGQoXCJub3RlX19idXR0b25cIik7XG4gICAgdGhpcy5idXR0b25Eb25lLnRleHRDb250ZW50ID0gXCJEb25lXCI7XG4gICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQodGhpcy5idXR0b25Eb25lLCB0aGlzLmJ1dHRvbkRlbGV0ZSk7XG5cbiAgICBjb25zdCBzdGF0dXNFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc3RhdHVzRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fc3RhdHVzXCIpO1xuICAgIHN0YXR1c0VsZW0udGV4dENvbnRlbnQgPSBzdGF0dXM7XG4gICAgaWYgKHN0YXR1cyA9PT0gXCJBY3RpdmVcIikge1xuICAgICAgc3RhdHVzRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fc3RhdHVzX2FjdGl2ZVwiKVxuICAgIH0gIGVsc2Uge1xuICAgICAgc3RhdHVzRWxlbS5jbGFzc0xpc3QuYWRkKFwibm90ZV9fc3RhdHVzX2RvbmVcIik7XG4gICAgICB0aGlzLmJ1dHRvbkRvbmUuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgdGhpcy5idXR0b25EZWxldGUuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH07XG5cbiAgICBjb25zdCBkYXRlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGRhdGVFbGVtLmNsYXNzTGlzdC5hZGQoXCJub3RlX19kYXRlXCIpO1xuICAgIGRhdGVFbGVtLnRleHRDb250ZW50ID0gZ2V0UHJldHR5RGF0ZShkYXRlKTtcblxuICAgIHJpZ2h0Q29udGFpbmVyLmFwcGVuZChzdGF0dXNFbGVtLCBkYXRlRWxlbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJldHR5RGF0ZSAoZGF0ZTogRGF0ZSkge1xuICBjb25zb2xlLmxvZyhkYXRlKVxuICBjb25zdCBkYXlzQXJyID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VuXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xuICBjb25zdCBtb250aHNBcnIgPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XG4gIGNvbnN0IGRheTogc3RyaW5nID0gZGF5c0FycltkYXRlLmdldERheSgpXTtcbiAgY29uc3QgZGF0ZU51bTogbnVtYmVyID0gZGF0ZS5nZXREYXRlKCk7XG4gIGNvbnN0IG1vbnRoOiBzdHJpbmcgPSBtb250aHNBcnJbZGF0ZS5nZXRNb250aCgpXTtcbiAgY29uc3QgeWVhcjogbnVtYmVyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgbGV0IG1pbnMgPSBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpO1xuICBpZiAobWluc1sxXSA9PT0gXCJ1bmRlZmluZWRcIikgbWlucyA9IFwiMFwiICsgbWlucztcbiAgcmV0dXJuIGAke2RheX0gICAke2RhdGVOdW19ICR7bW9udGh9ICR7eWVhcn0gICAke2hvdXJzfToke21pbnN9YDtcblxufSIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcblxuZXhwb3J0IGNsYXNzIFdhcm5pbmcge1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBidXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGFkZEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndhcm5pbmdcIik7XG5cbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LmFkZChcIndhcm5pbmdfX2J1dHRvblwiKTtcbiAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIndhcm5pbmdfdmlzaWJsZVwiKTtcbiAgICAgIGFkZEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHdhcm5pbmdUZXh0MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHdhcm5pbmdUZXh0MS5jbGFzc0xpc3QuYWRkKFwid2FybmluZ19fdGV4dFwiKTtcbiAgICB3YXJuaW5nVGV4dDEudGV4dENvbnRlbnQgPSBcIlNvcnJ5LCB5b3UgYWxyZWFkeSBoYXZlIHRoaXMgdGFzayFcIjtcbiAgICBjb25zdCB3YXJuaW5nVGV4dDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB3YXJuaW5nVGV4dDIuY2xhc3NMaXN0LmFkZChcIndhcm5pbmdfX3RleHRcIik7XG4gICAgd2FybmluZ1RleHQyLnRleHRDb250ZW50ID0gXCJZb3UgY2FuJ3QgY3JlYXRlIGl0IGFnaWFuIHVudGlsIGl0IGlzbid0IGRvbmUvZGVsZXRlZCA6KFwiO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHRoaXMuYnV0dG9uLCB3YXJuaW5nVGV4dDEsIHdhcm5pbmdUZXh0Mik7XG4gIH1cblxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHAgfSBmcm9tICcuL2FwcCc7XG5pbXBvcnQgJy4vc3R5bGVzLnNjc3MnO1xuaW1wb3J0ICcuL25vcm1hbGl6ZS5zY3NzJztcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYm9keS5hcHBlbmRDaGlsZChhcHAuYXBwUm9vdCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9