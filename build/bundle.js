(() => {
  "use strict";
  var t = {
      389: (t, e, s) => {
        s.r(e);
      },
      100: (t, e, s) => {
        s.r(e);
      },
      629: (t, e, s) => {
        s.r(e);
      },
      35: (t, e, s) => {
        s.r(e);
      },
      948: (t, e, s) => {
        s.r(e);
      },
      387: (t, e, s) => {
        s.r(e);
      },
      395: (t, e, s) => {
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.api = void 0);
        const a = s(570);
        e.api = new a.default();
      },
      570: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = class {
            constructor() {
              const t = localStorage.getItem("tasks");
              (this.tasksArr = JSON.parse(t)),
                this.tasksArr &&
                  this.tasksArr.map((t) =>
                    Object.assign(Object.assign({}, t), {
                      date: new Date(t.date),
                    })
                  );
            }
            getAll() {
              return (
                this.updateStoredData(),
                new Promise((t) => {
                  setTimeout(() => {
                    t(this.tasksArr);
                  }, 500);
                })
              );
            }
            add(t) {
              return new Promise((e) => {
                setTimeout(() => {
                  this.tasksArr ? this.tasksArr.push(t) : (this.tasksArr = [t]),
                    e(t),
                    this.updateStoredData();
                }, 1e3);
              });
            }
            remove(t) {
              return new Promise((e) => {
                (this.tasksArr = this.tasksArr.filter((e) => e.id !== t)),
                  this.updateStoredData(),
                  setTimeout(() => {
                    e(t);
                  }, 1e3);
              });
            }
            update(t) {
              return (
                (this.findTask(t.id).status = t.status),
                new Promise((e) => {
                  setTimeout(() => {
                    e(t), this.updateStoredData();
                  }, 1e3);
                })
              );
            }
            updateStoredData() {
              localStorage.setItem("tasks", JSON.stringify(this.tasksArr));
            }
            findTask(t) {
              return this.tasksArr.find((e) => e.id === t);
            }
          });
      },
      954: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = function (t) {
            return function (e) {
              const s = t.getState();
              t.updateState(
                (function (t, e) {
                  switch (e.type) {
                    case "LOAD_INITIAL_TASKS":
                      return Object.assign(Object.assign({}, t), {
                        loadingState: !1,
                        tasks: e.payload,
                      });
                    case "ADD_NOTE":
                      return Object.assign(Object.assign({}, t), {
                        loadingState: !1,
                        tasks: [...t.tasks, e.payload],
                      });
                    case "DELETE_NOTE":
                      return Object.assign(Object.assign({}, t), {
                        loadingState: !1,
                        tasks: t.tasks.filter((t) => t.id !== e.payload),
                      });
                    case "CHANGE_NOTE_STATUS":
                      return Object.assign(Object.assign({}, t), {
                        loadingTasks: t.loadingTasks.filter(
                          (t) => t !== e.payload.id
                        ),
                        tasks: t.tasks.map((t) =>
                          t.id === e.payload.id
                            ? Object.assign(Object.assign({}, t), {
                                status: e.payload.status,
                              })
                            : t
                        ),
                      });
                    case "CHANGE_FILTER":
                      return Object.assign(Object.assign({}, t), {
                        filter: e.payload,
                      });
                    case "CHANGE_IS_REVERSED":
                      return Object.assign(Object.assign({}, t), {
                        isReversed: e.payload,
                      });
                    case "LOADING_STATE":
                      return Object.assign(Object.assign({}, t), {
                        loadingState: e.payload,
                      });
                    case "NOTE_LOADING_STATE":
                      let s = t.loadingTasks.slice(0);
                      return (
                        e.payload.state
                          ? s.push(e.payload.id)
                          : (s = s.filter((t) => t !== e.payload.id)),
                        Object.assign(Object.assign({}, t), { loadingTasks: s })
                      );
                    default:
                      return t;
                  }
                })(JSON.parse(JSON.stringify(s)), e)
              );
            };
          });
      },
      586: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = class {
            constructor(t) {
              (this.subscribers = []), (this.state = t);
            }
            forcedConstructor(t) {
              this.state = t;
            }
            getState() {
              return this.state;
            }
            updateState(t) {
              (this.state = t),
                this.subscribers.forEach((t) => {
                  t(this.state);
                });
            }
            subscribe(t) {
              this.subscribers.push(t);
            }
            forceUpdate() {
              this.subscribers.forEach((t) => {
                t(this.state);
              });
            }
          });
      },
      584: (t, e, s) => {
        Object.defineProperty(e, "__esModule", { value: !0 }), s(389);
        const a = s(593),
          n = s(395);
        e.default = class {
          constructor(t) {
            (this.element = (0, a.createHtmlElement)("div", ["form"])),
              (this.dispatch = t);
          }
          createDOMElement() {
            (this.element.innerHTML = ""),
              (this.wrap = (0, a.createHtmlElement)("div", ["form__wrap"])),
              (this.input = (0, a.createHtmlElement)("input", ["form__input"])),
              this.input.setAttribute("type", "textarea"),
              this.input.setAttribute("required", "true"),
              (this.buttonAdd = (0, a.createHtmlElement)(
                "button",
                ["form__button"],
                "Add"
              )),
              this.buttonAdd.setAttribute("type", "submit"),
              this.buttonAdd.setAttribute("disabled", "true"),
              (this.counter = document.createElement("p")),
              this.counter.classList.add("board__counter"),
              (this.counterValue = 0),
              (this.counter.textContent = `${this.counterValue}/55`),
              (this.lengthWarning = (0, a.createHtmlElement)(
                "p",
                ["form__counter_error", "form__warning"],
                "Note should contain from 5 to 55 symbols"
              )),
              (this.bindedHandleInputValidation =
                this.handleInputValidation.bind(this)),
              (this.bindedHandleCreateNote = this.handleCreateNote.bind(this)),
              this.input.addEventListener(
                "input",
                this.bindedHandleInputValidation
              ),
              this.buttonAdd.addEventListener(
                "click",
                this.bindedHandleCreateNote
              ),
              this.wrap.append(
                this.input,
                this.counter,
                this.lengthWarning,
                this.buttonAdd
              ),
              this.element.appendChild(this.wrap);
          }
          onStateUpdate(t) {
            this.clearHandlers(),
              (this.tasksArray = t.tasks.slice(0)),
              this.createDOMElement();
          }
          getView() {
            return this.element;
          }
          inputValidation(t, e, s) {
            "" === t.value
              ? ((this.counterValue = 0), (this.taskText = ""))
              : ((this.counterValue = t.value.length),
                this.counterValue >= 55 && (t.value = this.taskText),
                (this.taskText = t.value[0].toUpperCase() + t.value.slice(1)),
                (t.value = this.taskText),
                this.counterValue < 5
                  ? (e.classList.add("form__counter_error"),
                    s.classList.add("form__warning_visible"),
                    this.buttonAdd.setAttribute("disabled", "true"))
                  : (e.classList.remove("form__counter_error"),
                    s.classList.remove("form__warning_visible"),
                    this.buttonAdd.removeAttribute("disabled"))),
              (e.textContent = `${this.counterValue}/55`);
          }
          handleInputValidation() {
            this.inputValidation(this.input, this.counter, this.lengthWarning);
          }
          handleCreateNote() {
            this.createNewNote(this.tasksArray);
          }
          clearHandlers() {
            this.input &&
              this.input.removeEventListener(
                "input",
                this.bindedHandleInputValidation
              ),
              this.buttonAdd &&
                this.buttonAdd.removeEventListener(
                  "click",
                  this.bindedHandleCreateNote
                );
          }
          createNewNote(t) {
            t.sort(
              (t, e) => new Date(t.date).getTime() - new Date(e.date).getTime()
            );
            const e = {
              id: t.length ? t[t.length - 1].id + 1 : 1,
              note: this.taskText,
              status: "active",
              date: new Date(),
            };
            this.dispatch({ type: "LOADING_STATE", payload: !0 }),
              n.api.add(e).then((t) => {
                this.dispatch({ type: "ADD_NOTE", payload: t });
              });
          }
        };
      },
      348: (t, e, s) => {
        Object.defineProperty(e, "__esModule", { value: !0 }), s(100);
        const a = s(593),
          n = s(42);
        e.default = class {
          constructor(t) {
            (this.spinner = null),
              (this.dispatch = t),
              (this.element = (0, a.createHtmlElement)("div", ["list"]));
          }
          onStateUpdate(t) {
            const e = t.loadingState;
            t.tasks &&
              (this.currentLength !== t.tasks.length ||
              this.filter !== t.filter ||
              this.isReversed !== t.isReversed
                ? (this.updateList(t), (this.spinner = null))
                : this.taskInstances.forEach((e) => e.onStateUpdate(t)),
              e && !this.spinner && this.addSpinner(),
              this.spinner && !t.loadingState && this.removeSpinner());
          }
          getView() {
            return this.element;
          }
          updateList(t) {
            (this.filter = t.filter),
              (this.isReversed = t.isReversed),
              this.taskInstances &&
                this.taskInstances.forEach((t) => {
                  t.clearHandlers();
                }),
              this.createTasksList(t.tasks);
          }
          addSpinner() {
            this.spinner = (0, a.createHtmlElement)("div", ["task__spinner"]);
            const t = (0, a.createHtmlElement)(
                "h3",
                ["task__spinner__text"],
                "Loading..."
              ),
              e = (0, a.createHtmlElement)("div", ["task__spinner_wrap"]);
            this.spinner.append(e), e.append(t), this.wrap.append(this.spinner);
          }
          removeSpinner() {
            this.spinner.remove(), (this.spinner = null);
          }
          createTasksList(t) {
            if (
              ((this.element.innerHTML = ""),
              (this.currentLength = 0),
              (this.wrap = (0, a.createHtmlElement)("div", ["list__wrap"])),
              t)
            ) {
              let e = [];
              (e =
                "active" === this.filter
                  ? this.createTaskElements(t, "active")
                  : "done" === this.filter
                  ? this.createTaskElements(t, "done")
                  : this.createTaskElements(t, "all")),
                e.forEach((t) => this.wrap.append(t)),
                this.element.appendChild(this.wrap);
            }
          }
          createTaskElements(t, e) {
            const s = [];
            return (
              this.sortElementsByDate(t),
              (this.taskInstances = []),
              t.forEach((t) => {
                if ("all" === e || t.status === e) {
                  const e = new n.default(t, this.dispatch);
                  s.push(e.getView()),
                    this.currentLength++,
                    this.taskInstances.push(e);
                }
              }),
              s
            );
          }
          sortElementsByDate(t) {
            this.isReversed
              ? t.sort(
                  (t, e) =>
                    new Date(t.date).getTime() - new Date(e.date).getTime()
                )
              : t.sort(
                  (t, e) =>
                    new Date(e.date).getTime() - new Date(t.date).getTime()
                );
          }
        };
      },
      678: (t, e, s) => {
        Object.defineProperty(e, "__esModule", { value: !0 }), s(629);
        const a = s(593);
        e.default = class {
          constructor(t) {
            (this.isReversed = !1),
              (this.dispatch = t),
              (this.element = (0, a.createHtmlElement)("div", ["nav"])),
              this.createDOMElement(),
              this.buttonAll.classList.add("nav__button_selected");
          }
          getView() {
            return this.element;
          }
          onStateUpdate(t) {
            switch (
              ([this.buttonAll, this.buttonActive, this.buttonDone].forEach(
                (t) => t.classList.remove("nav__button_selected")
              ),
              t.filter)
            ) {
              case "active":
                this.buttonActive.classList.add("nav__button_selected");
                break;
              case "done":
                this.buttonDone.classList.add("nav__button_selected");
                break;
              default:
                this.buttonAll.classList.add("nav__button_selected");
            }
            switch (t.isReversed) {
              case !0:
                this.buttonReserse.classList.add("nav__button_selected");
                break;
              case !1:
                this.buttonReserse.classList.remove("nav__button_selected");
            }
          }
          createDOMElement() {
            this.element.childNodes.forEach((t) => t.remove),
              (this.filterWrap = (0, a.createHtmlElement)("div", [
                "nav__container",
              ])),
              (this.buttonAll = (0, a.createHtmlElement)(
                "button",
                ["nav__button"],
                "All",
                "all"
              )),
              (this.buttonActive = (0, a.createHtmlElement)(
                "button",
                ["nav__button"],
                "Active",
                "active"
              )),
              (this.buttonDone = (0, a.createHtmlElement)(
                "button",
                ["nav__button"],
                "Done",
                "done"
              )),
              (this.buttonReserse = (0, a.createHtmlElement)("button", [
                "nav__button",
                "nav__reverse",
              ])),
              this.element.append(this.filterWrap, this.buttonReserse),
              this.filterWrap.append(
                this.buttonAll,
                this.buttonActive,
                this.buttonDone
              ),
              [this.buttonAll, this.buttonActive, this.buttonDone].forEach(
                (t) =>
                  t.addEventListener("click", () => {
                    this.dispatch({
                      type: "CHANGE_FILTER",
                      payload: t.dataset.name,
                    });
                  })
              ),
              this.buttonReserse.addEventListener("click", () => {
                switch (this.isReversed) {
                  case !0:
                    (this.isReversed = !1),
                      this.buttonReserse.classList.remove(
                        "nav__button_selected"
                      );
                    break;
                  case !1:
                    (this.isReversed = !0),
                      this.buttonReserse.classList.add("nav__button_selected");
                }
                this.dispatch({ type: "LOADING_STATE", payload: !0 }),
                  this.dispatch({
                    type: "CHANGE_IS_REVERSED",
                    payload: this.isReversed,
                  }),
                  this.dispatch({ type: "LOADING_STATE", payload: !1 });
              });
          }
        };
      },
      42: (t, e, s) => {
        Object.defineProperty(e, "__esModule", { value: !0 }), s(35);
        const a = s(593),
          n = s(395);
        e.default = class {
          constructor(t, e) {
            (this.status = t.status),
              (this.dispatch = e),
              (this.id = t.id),
              (this.element = (0, a.createHtmlElement)("div", ["task"])),
              this.createDOMElement(t);
          }
          getView() {
            return this.element;
          }
          onStateUpdate(t) {
            const e = t.loadingTasks.includes(this.id),
              s = t.tasks.find((t) => t.id === this.id).status;
            this.status !== s && this.updateTaskElement(t),
              e && !this.spinner
                ? this.addSpinner()
                : !e && this.spinner && this.removeSpinner();
          }
          createDOMElement(t) {
            (this.taskData = t),
              (this.element.innerHTML = ""),
              (this.wrap = (0, a.createHtmlElement)("div", ["task__wrap"]));
            const e = (0, a.createHtmlElement)("div", [
                "task__container_inner",
              ]),
              s = (0, a.createHtmlElement)("div", ["task__container_inner"]),
              n = (0, a.createHtmlElement)("h2", ["task__text"], t.note),
              i = (0, a.createHtmlElement)("div", ["task__container_buttons"]);
            let r;
            switch (
              ((this.buttonDone = (0, a.createHtmlElement)(
                "button",
                ["task__button"],
                "Done"
              )),
              (this.buttonDelete = (0, a.createHtmlElement)(
                "button",
                ["task__button"],
                "Delete"
              )),
              t.status)
            ) {
              case "active":
                (this.buttonDone = (0, a.createHtmlElement)(
                  "button",
                  ["task__button"],
                  "Done",
                  "done"
                )),
                  (this.buttonDelete = (0, a.createHtmlElement)(
                    "button",
                    ["task__button"],
                    "Delete"
                  )),
                  (r = (0, a.createHtmlElement)(
                    "p",
                    ["task__status", "task__status_active"],
                    "Active"
                  ));
                break;
              case "done":
                (this.buttonDone = (0, a.createHtmlElement)(
                  "button",
                  ["task__button", "task__button_done"],
                  "Undo",
                  "active"
                )),
                  (this.buttonDelete = (0, a.createHtmlElement)(
                    "button",
                    ["task__button", "task__button_done"],
                    "Delete"
                  )),
                  (r = (0, a.createHtmlElement)(
                    "p",
                    ["task__status", "task__status_done"],
                    "Done"
                  ));
            }
            const d = (0, a.createHtmlElement)(
              "p",
              ["task__date"],
              (0, a.getPrettyDate)(t.date)
            );
            this.element.appendChild(this.wrap),
              this.wrap.append(e, s),
              e.append(n, i),
              i.append(this.buttonDone, this.buttonDelete),
              s.append(r, d),
              (this.bindedHandleDelete = this.handleDelete.bind(this)),
              (this.bindedHandleDone = this.handleDone.bind(this)),
              this.buttonDone.addEventListener("click", this.bindedHandleDone),
              this.buttonDelete.addEventListener(
                "click",
                this.bindedHandleDelete
              );
          }
          handleDelete() {
            this.dispatch({ type: "LOADING_STATE", payload: !0 }),
              n.api.remove(this.id).then(
                (t) =>
                  new Promise((e) => {
                    this.dispatch({ type: "DELETE_NOTE", payload: t });
                  })
              );
          }
          handleDone() {
            (this.taskData.status = this.buttonDone.dataset.name),
              this.dispatch({
                type: "NOTE_LOADING_STATE",
                payload: { id: this.id, state: !0 },
              }),
              n.api.update(this.taskData).then((t) => {
                this.dispatch({
                  type: "CHANGE_NOTE_STATUS",
                  payload: { id: t.id, status: t.status },
                });
              });
          }
          clearHandlers() {
            this.buttonDelete &&
              this.buttonDelete.removeEventListener(
                "click",
                this.bindedHandleDelete
              ),
              this.buttonDone &&
                this.buttonDone.removeEventListener(
                  "click",
                  this.bindedHandleDone
                );
          }
          addSpinner() {
            this.spinner = (0, a.createHtmlElement)("div", ["task__spinner"]);
            const t = (0, a.createHtmlElement)(
                "h3",
                ["task__spinner__text"],
                "Loading..."
              ),
              e = (0, a.createHtmlElement)("div", ["task__spinner_wrap"]);
            this.spinner.append(e),
              e.append(t),
              this.element.append(this.spinner);
          }
          removeSpinner() {
            this.spinner.remove(), (this.spinner = null);
          }
          updateTaskElement(t) {
            this.clearHandlers(),
              (this.status = t.tasks.find((t) => t.id === this.id).status),
              this.createDOMElement(t.tasks.find((t) => t.id === this.id));
          }
        };
      },
      593: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.getPrettyDate = e.createHtmlElement = void 0),
          (e.createHtmlElement = function (t, e, s, a) {
            const n = document.createElement(t);
            return (
              e.forEach((t) => n.classList.add(t)),
              s && (n.textContent = s),
              a && (n.dataset.name = a),
              n
            );
          }),
          (e.getPrettyDate = function (t) {
            "string" == typeof t && (t = new Date(t));
            const e = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"][
                t.getDay()
              ],
              s = t.getDate(),
              a = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][t.getMonth()],
              n = t.getFullYear(),
              i = t.getHours();
            let r = t.getMinutes().toString();
            return (
              r.length < 2 && (r = "0" + r), `${e}   ${s} ${a} ${n}   ${i}:${r}`
            );
          });
      },
    },
    e = {};
  function s(a) {
    var n = e[a];
    if (void 0 !== n) return n.exports;
    var i = (e[a] = { exports: {} });
    return t[a](i, i.exports, s), i.exports;
  }
  (s.r = (t) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
    (() => {
      s(387), s(948);
      const t = s(593),
        e = s(954),
        a = s(584),
        n = s(348),
        i = s(678),
        r = s(586),
        d = s(395),
        l = document.querySelector("body"),
        o = (0, t.createHtmlElement)("div", ["app"]);
      l.append(o);
      const h = (0, t.createHtmlElement)("h1", ["app__title"], "To-do List"),
        c = (0, t.createHtmlElement)("div", ["app__container"]);
      o.append(h, c);
      const u = new r.default({
          filter: "all",
          tasks: [],
          loadingState: !1,
          loadingTasks: [],
          isReversed: !1,
        }),
        p = (0, e.default)(u);
      [new i.default(p), new n.default(p), new a.default(p)].forEach((t) => {
        u.subscribe(t.onStateUpdate.bind(t)), c.append(t.getView());
      }),
        p({ type: "LOADING_STATE", payload: !0 }),
        d.api.getAll().then((t) => {
          p({ type: "LOAD_INITIAL_TASKS", payload: t });
        });
    })();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxtQkFFNUNrSCxFQUFROUYsT0FBTytGLEVBQVVDLEdBRXpCLE1BQU1DLEVBQVUsSUFBSSxVQWpCVyxDQUM3QnJKLE9BQVEsTUFDUmdCLE1BQU8sR0FDUEQsY0FBYyxFQUNkRyxhQUFjLEdBQ2RDLFlBQVksSUFhUlcsR0FBVyxhQUFtQnVILEdBS3RCLENBSkYsSUFBSSxVQUFJdkgsR0FDUCxJQUFJLFVBQUtBLEdBQ1QsSUFBSSxVQUFLQSxJQUdoQkosU0FBUzRILElBQ2JELEVBQVF6SCxVQUFVMEgsRUFBS2hHLGNBQWNOLEtBQUtzRyxJQUMxQ0YsRUFBVWhHLE9BQU9rRyxFQUFLN0YsVUFBVSxJQUdsQzNCLEVBQVMsQ0FDUGhCLEtBQU0sZ0JBQ05HLFNBQVMsSUFHWCxFQUFBeEMsSUFBSWEsU0FBU3FGLE1BQU0zRCxJQUNqQmMsRUFBUyxDQUFFaEIsS0FBTSxxQkFBc0JHLFFBQVNELEdBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL29seWFsYXNzLy4vc3JjL2FwaS9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9hcGkvbG9jYWxBcGkudHMiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvY29tcG9uZW50cy9kaXNwYXRjaGVyL2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvc3RvcmFnZS9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL3ZpZXcvZm9ybS9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL3ZpZXcvbGlzdC9pbmRleC50cyIsIndlYnBhY2s6Ly9vbHlhbGFzcy8uL3NyYy9jb21wb25lbnRzL3ZpZXcvbmF2L2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL2NvbXBvbmVudHMvdmlldy90YXNrL2luZGV4LnRzIiwid2VicGFjazovL29seWFsYXNzLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL29seWFsYXNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29seWFsYXNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2x5YWxhc3MvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsQXBpIGZyb20gXCIuL2xvY2FsQXBpXCI7XG5pbXBvcnQgU2VydmVyQXBpIGZyb20gXCIuL3NlcnZlckFwaVwiO1xuXG5leHBvcnQgY29uc3QgYXBpID0gbmV3IExvY2FsQXBpKCk7XG4vLyBjaGFuZ2UgXCJuZXcgTG9jYWxBcGkoKVwiIHRvIFwibmV3IFNlcnZlckFwaSgpXCIgdG8gc3dpdGNoIGZyb20gbG9jYWxzdG9yYWdlIHRvIFNlcnZlciBtZW1vcml6aW5nXG4vLyB0byB1c2Ugc2VydmVyIG1lbW9yaXppbmcgeW91IGFsc28gbmVlZCB0byBsb2NhbGx5IGluc3RhbGwgSlNPTiBTZXJ2ZXIgd2l0aCBcIm5wbSBpbnN0YWxsIGpzb24tc2VydmVyXCIgYW5kIHN0YXJ0IGl0IHdpdGggXCJucHgganNvbi1zZXJ2ZXIgLS13YXRjaCBkYi5qc29uXCJcbiIsImltcG9ydCB7IFRhc2tEYXRhT2JqIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgQXBpSW50ZXJmYWNlIGZyb20gXCIuL2FwaUludGVyZmFjZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbEFwaSBpbXBsZW1lbnRzIEFwaUludGVyZmFjZSB7XG4gIHRhc2tzQXJyOiBUYXNrRGF0YU9ialtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGpzb25UYXNrcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIik7XG4gICAgdGhpcy50YXNrc0FyciA9IEpTT04ucGFyc2UoanNvblRhc2tzKTtcbiAgICBpZiAodGhpcy50YXNrc0Fycikge1xuICAgICAgdGhpcy50YXNrc0Fyci5tYXAoKG9iajogVGFza0RhdGFPYmopID0+ICh7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgZGF0ZTogbmV3IERhdGUob2JqLmRhdGUpLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbCgpIHtcbiAgICB0aGlzLnVwZGF0ZVN0b3JlZERhdGEoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VGFza0RhdGFPYmpbXT4oKHJlcykgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlcyh0aGlzLnRhc2tzQXJyKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGQobmV3VGFzazogVGFza0RhdGFPYmopIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VGFza0RhdGFPYmo+KChyZXMpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50YXNrc0Fycikge1xuICAgICAgICAgIHRoaXMudGFza3NBcnIucHVzaChuZXdUYXNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRhc2tzQXJyID0gW25ld1Rhc2tdO1xuICAgICAgICB9XG4gICAgICAgIHJlcyhuZXdUYXNrKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdG9yZWREYXRhKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZShpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlcykgPT4ge1xuICAgICAgdGhpcy50YXNrc0FyciA9IHRoaXMudGFza3NBcnIuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gICAgICB0aGlzLnVwZGF0ZVN0b3JlZERhdGEoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXMoaWQpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUodXBkYXRlZFRhc2s6IFRhc2tEYXRhT2JqKSB7XG4gICAgdGhpcy5maW5kVGFzayh1cGRhdGVkVGFzay5pZCkuc3RhdHVzID0gdXBkYXRlZFRhc2suc3RhdHVzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUYXNrRGF0YU9iaj4oKHJlcykgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlcyh1cGRhdGVkVGFzayk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTdG9yZWREYXRhKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU3RvcmVkRGF0YSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3NBcnIpKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFRhc2soaWQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnRhc2tzQXJyLmZpbmQoKHRhc2spID0+IHRhc2suaWQgPT09IGlkKTtcbiAgfVxufVxuIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4uL3N0b3JhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbiwgRGlzcGF0Y2gsIFN0YXRlT2JqIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmZ1bmN0aW9uIHJlZHVjZXIoY3VycmVudFN0YXRlOiBTdGF0ZU9iaiwgYWN0aW9uOiBBY3Rpb24pOiBTdGF0ZU9iaiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFwiTE9BRF9JTklUSUFMX1RBU0tTXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jdXJyZW50U3RhdGUsXG4gICAgICAgIGxvYWRpbmdTdGF0ZTogZmFsc2UsXG4gICAgICAgIHRhc2tzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgIH07XG4gICAgY2FzZSBcIkFERF9OT1RFXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jdXJyZW50U3RhdGUsXG4gICAgICAgIGxvYWRpbmdTdGF0ZTogZmFsc2UsXG4gICAgICAgIHRhc2tzOiBbLi4uY3VycmVudFN0YXRlLnRhc2tzLCBhY3Rpb24ucGF5bG9hZF0sXG4gICAgICB9O1xuXG4gICAgY2FzZSBcIkRFTEVURV9OT1RFXCI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jdXJyZW50U3RhdGUsXG4gICAgICAgIGxvYWRpbmdTdGF0ZTogZmFsc2UsXG4gICAgICAgIHRhc2tzOiBjdXJyZW50U3RhdGUudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBhY3Rpb24ucGF5bG9hZCksXG4gICAgICB9O1xuXG4gICAgY2FzZSBcIkNIQU5HRV9OT1RFX1NUQVRVU1wiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uY3VycmVudFN0YXRlLFxuICAgICAgICBsb2FkaW5nVGFza3M6IGN1cnJlbnRTdGF0ZS5sb2FkaW5nVGFza3MuZmlsdGVyKChpZCk9PiBpZCE9PWFjdGlvbi5wYXlsb2FkLmlkKSxcbiAgICAgICAgdGFza3M6IGN1cnJlbnRTdGF0ZS50YXNrcy5tYXAoKHRhc2spID0+XG4gICAgICAgICAgdGFzay5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWRcbiAgICAgICAgICAgID8geyAuLi50YXNrLCBzdGF0dXM6IGFjdGlvbi5wYXlsb2FkLnN0YXR1cyB9XG4gICAgICAgICAgICA6IHRhc2tcbiAgICAgICAgKSxcbiAgICAgIH07XG5cbiAgICBjYXNlIFwiQ0hBTkdFX0ZJTFRFUlwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uY3VycmVudFN0YXRlLFxuICAgICAgICBmaWx0ZXI6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgfTtcblxuICAgIGNhc2UgXCJDSEFOR0VfSVNfUkVWRVJTRURcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmN1cnJlbnRTdGF0ZSxcbiAgICAgICAgaXNSZXZlcnNlZDogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9O1xuXG4gICAgY2FzZSBcIkxPQURJTkdfU1RBVEVcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmN1cnJlbnRTdGF0ZSxcbiAgICAgICAgbG9hZGluZ1N0YXRlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgIH07XG5cbiAgICBjYXNlIFwiTk9URV9MT0FESU5HX1NUQVRFXCI6XG4gICAgICBsZXQgbG9hZGluZ0FyciA9IGN1cnJlbnRTdGF0ZS5sb2FkaW5nVGFza3Muc2xpY2UoMCk7XG4gICAgICBpZiAoYWN0aW9uLnBheWxvYWQuc3RhdGUpIHtcbiAgICAgICAgbG9hZGluZ0Fyci5wdXNoKGFjdGlvbi5wYXlsb2FkLmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRpbmdBcnIgPSBsb2FkaW5nQXJyLmZpbHRlcigodGFzaykgPT4gdGFzayAhPT0gYWN0aW9uLnBheWxvYWQuaWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgLi4uY3VycmVudFN0YXRlLCBsb2FkaW5nVGFza3M6IGxvYWRpbmdBcnIgfTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoZXJGdW5jdGlvbihzdG9yYWdlSW5zdGFuY2U6IFN0b3JhZ2UpOiBEaXNwYXRjaCB7XG4gIHJldHVybiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb246IEFjdGlvbikge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHN0b3JhZ2VJbnN0YW5jZS5nZXRTdGF0ZSgpO1xuICAgIHN0b3JhZ2VJbnN0YW5jZS51cGRhdGVTdGF0ZShyZWR1Y2VyKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VycmVudFN0YXRlKSksIGFjdGlvbikpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgU3RhdGVPYmogfSBmcm9tIFwidHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRlOiBTdGF0ZU9iajtcbiAgc3Vic2NyaWJlcnM6IEZ1bmN0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGVPYmopIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICBmb3JjZWRDb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGVPYmopIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHN0YXRlOiBTdGF0ZU9iaikge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICBmbih0aGlzLnN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnNjcmliZShmbjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgZm9yY2VVcGRhdGUoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgZm4odGhpcy5zdGF0ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IERpc3BhdGNoLCBTdGF0ZU9iaiwgVGFza0RhdGFPYmogfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUh0bWxFbGVtZW50IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwiLi4vLi4vLi4vYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0ge1xuICBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgd3JhcDogSFRNTERpdkVsZW1lbnQ7XG4gIGRpc3BhdGNoOiBEaXNwYXRjaDtcbiAgYnV0dG9uQWRkOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY291bnRlclZhbHVlOiBudW1iZXI7XG4gIHRhc2tUZXh0OiBzdHJpbmc7XG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBjb3VudGVyOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgbGVuZ3RoV2FybmluZzogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gIHRhc2tzQXJyYXk6IFRhc2tEYXRhT2JqW107XG4gIGJpbmRlZEhhbmRsZUlucHV0VmFsaWRhdGlvbjogKCkgPT4gdm9pZCB8IHVuZGVmaW5lZDtcbiAgYmluZGVkSGFuZGxlQ3JlYXRlTm90ZTogKCkgPT4gdm9pZCB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkaXNwYXRjaDogRGlzcGF0Y2gpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIiwgW1wiZm9ybVwiXSk7XG4gICAgdGhpcy5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuICB9XG5cbiAgY3JlYXRlRE9NRWxlbWVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0aGlzLndyYXAgPSBjcmVhdGVIdG1sRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIiwgW1wiZm9ybV9fd3JhcFwiXSk7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KFwiaW5wdXRcIiwgW1wiZm9ybV9faW5wdXRcIl0pO1xuICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRhcmVhXCIpO1xuICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJ0cnVlXCIpO1xuICAgIHRoaXMuYnV0dG9uQWRkID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIFtcImZvcm1fX2J1dHRvblwiXSxcbiAgICAgIFwiQWRkXCJcbiAgICApO1xuICAgIHRoaXMuYnV0dG9uQWRkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJzdWJtaXRcIik7XG4gICAgdGhpcy5idXR0b25BZGQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIHRoaXMuY291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRoaXMuY291bnRlci5jbGFzc0xpc3QuYWRkKFwiYm9hcmRfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5jb3VudGVyVmFsdWUgPSAwO1xuICAgIHRoaXMuY291bnRlci50ZXh0Q29udGVudCA9IGAke3RoaXMuY291bnRlclZhbHVlfS81NWA7XG4gICAgdGhpcy5sZW5ndGhXYXJuaW5nID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTFBhcmFncmFwaEVsZW1lbnQ+KFxuICAgICAgXCJwXCIsXG4gICAgICBbXCJmb3JtX19jb3VudGVyX2Vycm9yXCIsIFwiZm9ybV9fd2FybmluZ1wiXSxcbiAgICAgIFwiTm90ZSBzaG91bGQgY29udGFpbiBmcm9tIDUgdG8gNTUgc3ltYm9sc1wiXG4gICAgKTtcblxuICAgIHRoaXMuYmluZGVkSGFuZGxlSW5wdXRWYWxpZGF0aW9uID0gdGhpcy5oYW5kbGVJbnB1dFZhbGlkYXRpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJpbmRlZEhhbmRsZUNyZWF0ZU5vdGUgPSB0aGlzLmhhbmRsZUNyZWF0ZU5vdGUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMuYmluZGVkSGFuZGxlSW5wdXRWYWxpZGF0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5iaW5kZWRIYW5kbGVDcmVhdGVOb3RlKTtcblxuICAgIHRoaXMud3JhcC5hcHBlbmQoXG4gICAgICB0aGlzLmlucHV0LFxuICAgICAgdGhpcy5jb3VudGVyLFxuICAgICAgdGhpcy5sZW5ndGhXYXJuaW5nLFxuICAgICAgdGhpcy5idXR0b25BZGRcbiAgICApO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLndyYXApO1xuICB9XG5cbiAgb25TdGF0ZVVwZGF0ZShzdGF0ZTogU3RhdGVPYmopIHtcbiAgICB0aGlzLmNsZWFySGFuZGxlcnMoKTtcbiAgICB0aGlzLnRhc2tzQXJyYXkgPSBzdGF0ZS50YXNrcy5zbGljZSgwKTtcbiAgICB0aGlzLmNyZWF0ZURPTUVsZW1lbnQoKTtcbiAgfVxuXG4gIGdldFZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgaW5wdXRWYWxpZGF0aW9uKFxuICAgIGlucHV0RWxlbTogSFRNTElucHV0RWxlbWVudCxcbiAgICB3YXJuRWxlbTE6IEhUTUxQYXJhZ3JhcGhFbGVtZW50LFxuICAgIHdhcm1FbGVtMjogSFRNTFBhcmFncmFwaEVsZW1lbnRcbiAgKTogdm9pZCB7XG4gICAgaWYgKGlucHV0RWxlbS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgdGhpcy5jb3VudGVyVmFsdWUgPSAwO1xuICAgICAgdGhpcy50YXNrVGV4dCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY291bnRlclZhbHVlID0gaW5wdXRFbGVtLnZhbHVlLmxlbmd0aDtcbiAgICAgIGlmICh0aGlzLmNvdW50ZXJWYWx1ZSA+PSA1NSkgaW5wdXRFbGVtLnZhbHVlID0gdGhpcy50YXNrVGV4dDtcbiAgICAgIHRoaXMudGFza1RleHQgPVxuICAgICAgICBpbnB1dEVsZW0udmFsdWVbMF0udG9VcHBlckNhc2UoKSArIGlucHV0RWxlbS52YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlucHV0RWxlbS52YWx1ZSA9IHRoaXMudGFza1RleHQ7XG4gICAgICBpZiAodGhpcy5jb3VudGVyVmFsdWUgPCA1KSB7XG4gICAgICAgIHdhcm5FbGVtMS5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5hZGQoXCJmb3JtX193YXJuaW5nX3Zpc2libGVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uQWRkLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5FbGVtMS5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybV9fY291bnRlcl9lcnJvclwiKTtcbiAgICAgICAgd2FybUVsZW0yLmNsYXNzTGlzdC5yZW1vdmUoXCJmb3JtX193YXJuaW5nX3Zpc2libGVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uQWRkLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICB3YXJuRWxlbTEudGV4dENvbnRlbnQgPSBgJHt0aGlzLmNvdW50ZXJWYWx1ZX0vNTVgO1xuICB9XG5cbiAgaGFuZGxlSW5wdXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0aW9uKHRoaXMuaW5wdXQsIHRoaXMuY291bnRlciwgdGhpcy5sZW5ndGhXYXJuaW5nKTtcbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZU5vdGUoKSB7XG4gICAgdGhpcy5jcmVhdGVOZXdOb3RlKHRoaXMudGFza3NBcnJheSk7XG4gIH1cblxuICBjbGVhckhhbmRsZXJzKCkge1xuICAgIGlmICh0aGlzLmlucHV0KVxuICAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5iaW5kZWRIYW5kbGVJbnB1dFZhbGlkYXRpb24pO1xuICAgIGlmICh0aGlzLmJ1dHRvbkFkZClcbiAgICAgIHRoaXMuYnV0dG9uQWRkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmJpbmRlZEhhbmRsZUNyZWF0ZU5vdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVOZXdOb3RlKHRhc2tzQXJyYXk6IFRhc2tEYXRhT2JqW10pIHtcbiAgICB0YXNrc0FycmF5LnNvcnQoXG4gICAgICAoYSwgYikgPT4gbmV3IERhdGUoYS5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKVxuICAgICk7XG4gICAgY29uc3QgdGFza09iajogVGFza0RhdGFPYmogPSB7XG4gICAgICBpZDogdGFza3NBcnJheS5sZW5ndGggPyB0YXNrc0FycmF5W3Rhc2tzQXJyYXkubGVuZ3RoIC0gMV0uaWQgKyAxIDogMSxcbiAgICAgIG5vdGU6IHRoaXMudGFza1RleHQsXG4gICAgICBzdGF0dXM6IFwiYWN0aXZlXCIsXG4gICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgIH07XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcIkxPQURJTkdfU1RBVEVcIixcbiAgICAgIHBheWxvYWQ6IHRydWUsXG4gICAgfSk7XG4gICAgYXBpLmFkZCh0YXNrT2JqKS50aGVuKCh0YXNrT2JqKSA9PiB7XG4gICAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJBRERfTk9URVwiLFxuICAgICAgICBwYXlsb2FkOiB0YXNrT2JqLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IERpc3BhdGNoLCBTdGF0ZU9iaiwgVGFza0RhdGFPYmosIEZpbHRlciB9IGZyb20gXCIuLi8uLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbEVsZW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHNcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuLi90YXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3Qge1xuICBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSB3cmFwOiBIVE1MRGl2RWxlbWVudDtcbiAgZGlzcGF0Y2g6IERpc3BhdGNoO1xuICBwcml2YXRlIGN1cnJlbnRMZW5ndGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc1JldmVyc2VkOiBib29sZWFuO1xuICBwcml2YXRlIGZpbHRlcjogRmlsdGVyO1xuICB0YXNrSW5zdGFuY2VzOiBUYXNrW107XG4gIHNwaW5uZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoZGlzcGF0Y2g6IERpc3BhdGNoKSB7XG4gICAgdGhpcy5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXCJsaXN0XCJdKTtcbiAgfVxuXG4gIG9uU3RhdGVVcGRhdGUoc3RhdGU6IFN0YXRlT2JqKSB7XG4gICAgY29uc3QgbG9hZGluZ1N0YXRlID0gc3RhdGUubG9hZGluZ1N0YXRlO1xuICAgIGlmIChzdGF0ZS50YXNrcykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmN1cnJlbnRMZW5ndGggIT09IHN0YXRlLnRhc2tzLmxlbmd0aCB8fFxuICAgICAgICB0aGlzLmZpbHRlciAhPT0gc3RhdGUuZmlsdGVyIHx8XG4gICAgICAgIHRoaXMuaXNSZXZlcnNlZCAhPT0gc3RhdGUuaXNSZXZlcnNlZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdChzdGF0ZSk7XG4gICAgICAgIHRoaXMuc3Bpbm5lciA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRhc2tJbnN0YW5jZXMuZm9yRWFjaCgodGFzaykgPT4gdGFzay5vblN0YXRlVXBkYXRlKHN0YXRlKSk7XG4gICAgICB9XG4gICAgICBpZiAobG9hZGluZ1N0YXRlICYmICF0aGlzLnNwaW5uZXIpIHtcbiAgICAgICAgdGhpcy5hZGRTcGlubmVyKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zcGlubmVyICYmICFzdGF0ZS5sb2FkaW5nU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVTcGlubmVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9XG5cbiAgdXBkYXRlTGlzdChzdGF0ZTogU3RhdGVPYmopIHtcbiAgICB0aGlzLmZpbHRlciA9IHN0YXRlLmZpbHRlcjtcbiAgICB0aGlzLmlzUmV2ZXJzZWQgPSBzdGF0ZS5pc1JldmVyc2VkO1xuICAgIGlmICh0aGlzLnRhc2tJbnN0YW5jZXMpXG4gICAgICB0aGlzLnRhc2tJbnN0YW5jZXMuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICB0YXNrLmNsZWFySGFuZGxlcnMoKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHN0YXRlLnRhc2tzKTtcbiAgfVxuXG4gIGFkZFNwaW5uZXIoKSB7XG4gICAgdGhpcy5zcGlubmVyID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIsIFtcInRhc2tfX3NwaW5uZXJcIl0pO1xuICAgIGNvbnN0IHRleHQgPSBjcmVhdGVIdG1sRWxlbWVudChcImgzXCIsIFtcInRhc2tfX3NwaW5uZXJfX3RleHRcIl0sIFwiTG9hZGluZy4uLlwiKTtcbiAgICBjb25zdCB0eXBlZCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXG4gICAgICBcInRhc2tfX3NwaW5uZXJfd3JhcFwiLFxuICAgIF0pO1xuICAgIHRoaXMuc3Bpbm5lci5hcHBlbmQodHlwZWQpO1xuICAgIHR5cGVkLmFwcGVuZCh0ZXh0KTtcbiAgICB0aGlzLndyYXAuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gIH1cblxuICByZW1vdmVTcGlubmVyKCkge1xuICAgIHRoaXMuc3Bpbm5lci5yZW1vdmUoKTtcbiAgICB0aGlzLnNwaW5uZXIgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUYXNrc0xpc3QodGFza3M6IFRhc2tEYXRhT2JqW10pIHtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0aGlzLmN1cnJlbnRMZW5ndGggPSAwO1xuICAgIHRoaXMud3JhcCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXCJsaXN0X193cmFwXCJdKTtcbiAgICBpZiAodGFza3MpIHtcbiAgICAgIGxldCB0YXNrRWxlbWVudHMgPSBbXTtcbiAgICAgIGlmICh0aGlzLmZpbHRlciA9PT0gXCJhY3RpdmVcIikge1xuICAgICAgICB0YXNrRWxlbWVudHMgPSB0aGlzLmNyZWF0ZVRhc2tFbGVtZW50cyh0YXNrcywgXCJhY3RpdmVcIik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyID09PSBcImRvbmVcIikge1xuICAgICAgICB0YXNrRWxlbWVudHMgPSB0aGlzLmNyZWF0ZVRhc2tFbGVtZW50cyh0YXNrcywgXCJkb25lXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFza0VsZW1lbnRzID0gdGhpcy5jcmVhdGVUYXNrRWxlbWVudHModGFza3MsIFwiYWxsXCIpO1xuICAgICAgfVxuICAgICAgdGFza0VsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB0aGlzLndyYXAuYXBwZW5kKGVsKSk7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53cmFwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRhc2tFbGVtZW50cyh0YXNrczogVGFza0RhdGFPYmpbXSwgZmlsdGVyOiBGaWx0ZXIpIHtcbiAgICBjb25zdCB0YXNrRWxlbWVudHNBcnJheTogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIHRoaXMuc29ydEVsZW1lbnRzQnlEYXRlKHRhc2tzKTtcbiAgICB0aGlzLnRhc2tJbnN0YW5jZXMgPSBbXTtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyID09PSBcImFsbFwiIHx8IHRhc2suc3RhdHVzID09PSBmaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRhc2ssIHRoaXMuZGlzcGF0Y2gpO1xuICAgICAgICB0YXNrRWxlbWVudHNBcnJheS5wdXNoKG5ld1Rhc2suZ2V0VmlldygpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50TGVuZ3RoKys7XG4gICAgICAgIHRoaXMudGFza0luc3RhbmNlcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0YXNrRWxlbWVudHNBcnJheTtcbiAgfVxuXG4gIHNvcnRFbGVtZW50c0J5RGF0ZSh0YXNrc0FycjogVGFza0RhdGFPYmpbXSkge1xuICAgIGlmICh0aGlzLmlzUmV2ZXJzZWQpIHtcbiAgICAgIHRhc2tzQXJyLnNvcnQoXG4gICAgICAgIChhLCBiKSA9PiBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGIuZGF0ZSkuZ2V0VGltZSgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrc0Fyci5zb3J0KFxuICAgICAgICAoYSwgYikgPT4gbmV3IERhdGUoYi5kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmRhdGUpLmdldFRpbWUoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcbmltcG9ydCB7IFN0YXRlT2JqLCBEaXNwYXRjaCwgRmlsdGVyIH0gZnJvbSBcInR5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sRWxlbWVudCB9IGZyb20gXCIuLi8uLi8uLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXYge1xuICBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBmaWx0ZXJXcmFwOiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBidXR0b25BbGw6IEhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIGJ1dHRvbkFjdGl2ZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgYnV0dG9uRG9uZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgYnV0dG9uUmVzZXJzZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGRpc3BhdGNoOiBEaXNwYXRjaDtcbiAgcHJpdmF0ZSBpc1JldmVyc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGlzcGF0Y2g6IERpc3BhdGNoKSB7XG4gICAgdGhpcy5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXCJuYXZcIl0pO1xuICAgIHRoaXMuY3JlYXRlRE9NRWxlbWVudCgpO1xuICAgIHRoaXMuYnV0dG9uQWxsLmNsYXNzTGlzdC5hZGQoXCJuYXZfX2J1dHRvbl9zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFZpZXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfVxuXG4gIG9uU3RhdGVVcGRhdGUoc3RhdGU6IFN0YXRlT2JqKSB7XG4gICAgW3RoaXMuYnV0dG9uQWxsLCB0aGlzLmJ1dHRvbkFjdGl2ZSwgdGhpcy5idXR0b25Eb25lXS5mb3JFYWNoKChidXR0b24pID0+XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fYnV0dG9uX3NlbGVjdGVkXCIpXG4gICAgKTtcbiAgICBzd2l0Y2ggKHN0YXRlLmZpbHRlcikge1xuICAgICAgY2FzZSBcImFjdGl2ZVwiOlxuICAgICAgICB0aGlzLmJ1dHRvbkFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwibmF2X19idXR0b25fc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRvbmVcIjpcbiAgICAgICAgdGhpcy5idXR0b25Eb25lLmNsYXNzTGlzdC5hZGQoXCJuYXZfX2J1dHRvbl9zZWxlY3RlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmJ1dHRvbkFsbC5jbGFzc0xpc3QuYWRkKFwibmF2X19idXR0b25fc2VsZWN0ZWRcIik7XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhdGUuaXNSZXZlcnNlZCkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICB0aGlzLmJ1dHRvblJlc2Vyc2UuY2xhc3NMaXN0LmFkZChcIm5hdl9fYnV0dG9uX3NlbGVjdGVkXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHRoaXMuYnV0dG9uUmVzZXJzZS5jbGFzc0xpc3QucmVtb3ZlKFwibmF2X19idXR0b25fc2VsZWN0ZWRcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVET01FbGVtZW50KCkge1xuICAgIHRoaXMuZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKGVsKSA9PiBlbC5yZW1vdmUpO1xuICAgIHRoaXMuZmlsdGVyV3JhcCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXG4gICAgICBcIm5hdl9fY29udGFpbmVyXCIsXG4gICAgXSk7XG4gICAgdGhpcy5idXR0b25BbGwgPSBjcmVhdGVIdG1sRWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudCwgRmlsdGVyPihcbiAgICAgIFwiYnV0dG9uXCIsXG4gICAgICBbXCJuYXZfX2J1dHRvblwiXSxcbiAgICAgIFwiQWxsXCIsXG4gICAgICBcImFsbFwiXG4gICAgKTtcbiAgICB0aGlzLmJ1dHRvbkFjdGl2ZSA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50LCBGaWx0ZXI+KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIFtcIm5hdl9fYnV0dG9uXCJdLFxuICAgICAgXCJBY3RpdmVcIixcbiAgICAgIFwiYWN0aXZlXCJcbiAgICApO1xuICAgIHRoaXMuYnV0dG9uRG9uZSA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50LCBGaWx0ZXI+KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIFtcIm5hdl9fYnV0dG9uXCJdLFxuICAgICAgXCJEb25lXCIsXG4gICAgICBcImRvbmVcIlxuICAgICk7XG4gICAgdGhpcy5idXR0b25SZXNlcnNlID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiYnV0dG9uXCIsIFtcbiAgICAgIFwibmF2X19idXR0b25cIixcbiAgICAgIFwibmF2X19yZXZlcnNlXCIsXG4gICAgXSk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLmZpbHRlcldyYXAsIHRoaXMuYnV0dG9uUmVzZXJzZSk7XG4gICAgdGhpcy5maWx0ZXJXcmFwLmFwcGVuZCh0aGlzLmJ1dHRvbkFsbCwgdGhpcy5idXR0b25BY3RpdmUsIHRoaXMuYnV0dG9uRG9uZSk7XG5cbiAgICBbdGhpcy5idXR0b25BbGwsIHRoaXMuYnV0dG9uQWN0aXZlLCB0aGlzLmJ1dHRvbkRvbmVdLmZvckVhY2goKGJ1dHRvbikgPT5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBcIkNIQU5HRV9GSUxURVJcIixcbiAgICAgICAgICBwYXlsb2FkOiBidXR0b24uZGF0YXNldC5uYW1lIGFzIEZpbHRlcixcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5idXR0b25SZXNlcnNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMuaXNSZXZlcnNlZCkge1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdGhpcy5pc1JldmVyc2VkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5idXR0b25SZXNlcnNlLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZfX2J1dHRvbl9zZWxlY3RlZFwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICB0aGlzLmlzUmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuYnV0dG9uUmVzZXJzZS5jbGFzc0xpc3QuYWRkKFwibmF2X19idXR0b25fc2VsZWN0ZWRcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogXCJMT0FESU5HX1NUQVRFXCIsXG4gICAgICAgIHBheWxvYWQ6IHRydWVcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogXCJDSEFOR0VfSVNfUkVWRVJTRURcIiwgcGF5bG9hZDogdGhpcy5pc1JldmVyc2VkIH0pO1xuICAgICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFwiTE9BRElOR19TVEFURVwiLFxuICAgICAgICBwYXlsb2FkOiBmYWxzZVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuaW1wb3J0IHsgRGlzcGF0Y2gsIFRhc2tEYXRhT2JqLCBTdGF0dXMsIFN0YXRlT2JqIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sRWxlbWVudCwgZ2V0UHJldHR5RGF0ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4uLy4uLy4uL2FwaVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gIHByaXZhdGUgd3JhcDogSFRNTERpdkVsZW1lbnQ7XG4gIGRpc3BhdGNoOiBEaXNwYXRjaDtcbiAgcHJpdmF0ZSBzdGF0dXM6IFN0YXR1cztcbiAgcHJpdmF0ZSBpZDogbnVtYmVyO1xuICBwcml2YXRlIGJ1dHRvbkRvbmU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIGJ1dHRvbkRlbGV0ZTogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGJpbmRlZEhhbmRsZURvbmU6ICgpID0+IHZvaWQ7XG4gIGJpbmRlZEhhbmRsZURlbGV0ZTogKCkgPT4gdm9pZDtcbiAgdGFza0RhdGE6IFRhc2tEYXRhT2JqO1xuICBzcGlubmVyOiBIVE1MRGl2RWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IodGFza0RhdGE6IFRhc2tEYXRhT2JqLCBkaXNwYXRjaDogRGlzcGF0Y2gpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHRhc2tEYXRhLnN0YXR1cztcbiAgICB0aGlzLmRpc3BhdGNoID0gZGlzcGF0Y2g7XG4gICAgdGhpcy5pZCA9IHRhc2tEYXRhLmlkO1xuICAgIHRoaXMuZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcImRpdlwiLCBbXCJ0YXNrXCJdKTtcbiAgICB0aGlzLmNyZWF0ZURPTUVsZW1lbnQodGFza0RhdGEpO1xuICB9XG5cbiAgZ2V0VmlldygpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9XG5cbiAgb25TdGF0ZVVwZGF0ZShzdGF0ZTogU3RhdGVPYmopIHtcbiAgICBjb25zdCBpc0xvYWRpbmcgPSBzdGF0ZS5sb2FkaW5nVGFza3MuaW5jbHVkZXModGhpcy5pZCk7XG4gICAgY29uc3QgbmV3U3RhdHVzID0gc3RhdGUudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5pZCA9PT0gdGhpcy5pZCkuc3RhdHVzO1xuXG4gICAgaWYgKHRoaXMuc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcbiAgICAgIHRoaXMudXBkYXRlVGFza0VsZW1lbnQoc3RhdGUpO1xuICAgIH1cbiAgICBpZiAoaXNMb2FkaW5nICYmICF0aGlzLnNwaW5uZXIpIHtcbiAgICAgIHRoaXMuYWRkU3Bpbm5lcigpO1xuICAgIH0gZWxzZSBpZiAoIWlzTG9hZGluZyAmJiB0aGlzLnNwaW5uZXIpIHtcbiAgICAgIHRoaXMucmVtb3ZlU3Bpbm5lcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRE9NRWxlbWVudCh0YXNrRGF0YTogVGFza0RhdGFPYmopIHtcbiAgICB0aGlzLnRhc2tEYXRhID0gdGFza0RhdGE7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy53cmFwID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIsIFtcInRhc2tfX3dyYXBcIl0pO1xuICAgIGNvbnN0IGxlZnRDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBbXCJ0YXNrX19jb250YWluZXJfaW5uZXJcIl0pO1xuICAgIGNvbnN0IHJpZ2h0Q29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgW1widGFza19fY29udGFpbmVyX2lubmVyXCJdKTtcbiAgICBjb25zdCB0YXNrVGV4dCA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiaDJcIiwgW1widGFza19fdGV4dFwiXSwgdGFza0RhdGEubm90ZSk7XG4gICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiZGl2XCIsIFtcbiAgICAgIFwidGFza19fY29udGFpbmVyX2J1dHRvbnNcIixcbiAgICBdKTtcbiAgICB0aGlzLmJ1dHRvbkRvbmUgPSBjcmVhdGVIdG1sRWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICBcImJ1dHRvblwiLFxuICAgICAgW1widGFza19fYnV0dG9uXCJdLFxuICAgICAgXCJEb25lXCJcbiAgICApO1xuICAgIHRoaXMuYnV0dG9uRGVsZXRlID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIFtcInRhc2tfX2J1dHRvblwiXSxcbiAgICAgIFwiRGVsZXRlXCJcbiAgICApO1xuICAgIGxldCBzdGF0dXNFbGVtO1xuICAgIHN3aXRjaCAodGFza0RhdGEuc3RhdHVzKSB7XG4gICAgICBjYXNlIFwiYWN0aXZlXCI6XG4gICAgICAgIHRoaXMuYnV0dG9uRG9uZSA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50LCBTdGF0dXM+KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgW1widGFza19fYnV0dG9uXCJdLFxuICAgICAgICAgIFwiRG9uZVwiLFxuICAgICAgICAgIFwiZG9uZVwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYnV0dG9uRGVsZXRlID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgW1widGFza19fYnV0dG9uXCJdLFxuICAgICAgICAgIFwiRGVsZXRlXCJcbiAgICAgICAgKTtcbiAgICAgICAgc3RhdHVzRWxlbSA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICAgICAgIFwicFwiLFxuICAgICAgICAgIFtcInRhc2tfX3N0YXR1c1wiLCBcInRhc2tfX3N0YXR1c19hY3RpdmVcIl0sXG4gICAgICAgICAgXCJBY3RpdmVcIlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb25lXCI6XG4gICAgICAgIHRoaXMuYnV0dG9uRG9uZSA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50LCBTdGF0dXM+KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgW1widGFza19fYnV0dG9uXCIsIFwidGFza19fYnV0dG9uX2RvbmVcIl0sXG4gICAgICAgICAgXCJVbmRvXCIsXG4gICAgICAgICAgXCJhY3RpdmVcIlxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJ1dHRvbkRlbGV0ZSA9IGNyZWF0ZUh0bWxFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIFtcInRhc2tfX2J1dHRvblwiLCBcInRhc2tfX2J1dHRvbl9kb25lXCJdLFxuICAgICAgICAgIFwiRGVsZXRlXCJcbiAgICAgICAgKTtcbiAgICAgICAgc3RhdHVzRWxlbSA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICAgICAgIFwicFwiLFxuICAgICAgICAgIFtcInRhc2tfX3N0YXR1c1wiLCBcInRhc2tfX3N0YXR1c19kb25lXCJdLFxuICAgICAgICAgIFwiRG9uZVwiXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBkYXRlRWxlbSA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICAgXCJwXCIsXG4gICAgICBbXCJ0YXNrX19kYXRlXCJdLFxuICAgICAgZ2V0UHJldHR5RGF0ZSh0YXNrRGF0YS5kYXRlKVxuICAgICk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53cmFwKTtcbiAgICB0aGlzLndyYXAuYXBwZW5kKGxlZnRDb250YWluZXIsIHJpZ2h0Q29udGFpbmVyKTtcbiAgICBsZWZ0Q29udGFpbmVyLmFwcGVuZCh0YXNrVGV4dCwgYnV0dG9uc0NvbnRhaW5lcik7XG4gICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQodGhpcy5idXR0b25Eb25lLCB0aGlzLmJ1dHRvbkRlbGV0ZSk7XG4gICAgcmlnaHRDb250YWluZXIuYXBwZW5kKHN0YXR1c0VsZW0sIGRhdGVFbGVtKTtcblxuICAgIHRoaXMuYmluZGVkSGFuZGxlRGVsZXRlID0gdGhpcy5oYW5kbGVEZWxldGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJpbmRlZEhhbmRsZURvbmUgPSB0aGlzLmhhbmRsZURvbmUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYnV0dG9uRG9uZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5iaW5kZWRIYW5kbGVEb25lKTtcbiAgICB0aGlzLmJ1dHRvbkRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5iaW5kZWRIYW5kbGVEZWxldGUpO1xuICB9XG5cbiAgaGFuZGxlRGVsZXRlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogXCJMT0FESU5HX1NUQVRFXCIsXG4gICAgICBwYXlsb2FkOiB0cnVlLFxuICAgIH0pO1xuICAgIGFwaVxuICAgICAgLnJlbW92ZSh0aGlzLmlkKVxuICAgICAgLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKT0+e1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVfTk9URVwiLFxuICAgICAgICAgICAgcGF5bG9hZDogaWQsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBoYW5kbGVEb25lKCkge1xuICAgIHRoaXMudGFza0RhdGEuc3RhdHVzID0gdGhpcy5idXR0b25Eb25lLmRhdGFzZXQubmFtZSBhcyBTdGF0dXM7XG4gICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcIk5PVEVfTE9BRElOR19TVEFURVwiLFxuICAgICAgcGF5bG9hZDogeyBpZDogdGhpcy5pZCwgc3RhdGU6IHRydWUgfSxcbiAgICB9KTtcbiAgICBhcGlcbiAgICAgIC51cGRhdGUodGhpcy50YXNrRGF0YSlcbiAgICAgIC50aGVuKCh0YXNrRGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBcIkNIQU5HRV9OT1RFX1NUQVRVU1wiLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGlkOiB0YXNrRGF0YS5pZCxcbiAgICAgICAgICAgIHN0YXR1czogdGFza0RhdGEuc3RhdHVzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgfVxuXG4gIGNsZWFySGFuZGxlcnMoKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uRGVsZXRlKVxuICAgICAgdGhpcy5idXR0b25EZWxldGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYmluZGVkSGFuZGxlRGVsZXRlKTtcbiAgICBpZiAodGhpcy5idXR0b25Eb25lKVxuICAgICAgdGhpcy5idXR0b25Eb25lLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmJpbmRlZEhhbmRsZURvbmUpO1xuICB9XG5cbiAgYWRkU3Bpbm5lcigpIHtcbiAgICB0aGlzLnNwaW5uZXIgPSBjcmVhdGVIdG1sRWxlbWVudDxIVE1MRGl2RWxlbWVudD4oXCJkaXZcIiwgW1widGFza19fc3Bpbm5lclwiXSk7XG4gICAgY29uc3QgdGV4dCA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiaDNcIiwgW1widGFza19fc3Bpbm5lcl9fdGV4dFwiXSwgXCJMb2FkaW5nLi4uXCIpO1xuICAgIGNvbnN0IHR5cGVkID0gY3JlYXRlSHRtbEVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KFwiZGl2XCIsIFtcbiAgICAgIFwidGFza19fc3Bpbm5lcl93cmFwXCIsXG4gICAgXSk7XG4gICAgdGhpcy5zcGlubmVyLmFwcGVuZCh0eXBlZCk7XG4gICAgdHlwZWQuYXBwZW5kKHRleHQpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5zcGlubmVyKTtcbiAgfVxuXG4gIHJlbW92ZVNwaW5uZXIoKSB7XG4gICAgdGhpcy5zcGlubmVyLnJlbW92ZSgpO1xuICAgIHRoaXMuc3Bpbm5lciA9IG51bGw7XG4gIH1cblxuICB1cGRhdGVUYXNrRWxlbWVudChzdGF0ZTogU3RhdGVPYmopIHtcbiAgICB0aGlzLmNsZWFySGFuZGxlcnMoKTtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXRlLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suaWQgPT09IHRoaXMuaWQpLnN0YXR1cztcbiAgICB0aGlzLmNyZWF0ZURPTUVsZW1lbnQoc3RhdGUudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5pZCA9PT0gdGhpcy5pZCkpO1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlSHRtbEVsZW1lbnQ8VCA9IEhUTUxFbGVtZW50LCBEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPihcbiAgdHlwZTogc3RyaW5nLFxuICBjc3NDbGFzc0FycmF5OiBzdHJpbmdbXSxcbiAgdGV4dD86IHN0cmluZyxcbiAgZGF0YT86IERcbikge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgY3NzQ2xhc3NBcnJheS5mb3JFYWNoKChzdHlsZSkgPT4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlKSk7XG4gIGlmICh0ZXh0KSBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKGRhdGEpIGVsZW1lbnQuZGF0YXNldC5uYW1lID0gZGF0YTtcbiAgcmV0dXJuIGVsZW1lbnQgYXMgVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXR0eURhdGUoZGF0ZTogRGF0ZSkge1xuICBjb25zdCBkYXlzQXJyID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VuXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xuICBjb25zdCBtb250aHNBcnIgPSBbXG4gICAgXCJKYW5cIixcbiAgICBcIkZlYlwiLFxuICAgIFwiTWFyXCIsXG4gICAgXCJBcHJcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuXCIsXG4gICAgXCJKdWxcIixcbiAgICBcIkF1Z1wiLFxuICAgIFwiU2VwXCIsXG4gICAgXCJPY3RcIixcbiAgICBcIk5vdlwiLFxuICAgIFwiRGVjXCIsXG4gIF07XG4gIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgfVxuICBjb25zdCBkYXk6IHN0cmluZyA9IGRheXNBcnJbZGF0ZS5nZXREYXkoKV07XG4gIGNvbnN0IGRhdGVOdW06IG51bWJlciA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aDogc3RyaW5nID0gbW9udGhzQXJyW2RhdGUuZ2V0TW9udGgoKV07XG4gIGNvbnN0IHllYXI6IG51bWJlciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gIGxldCBtaW5zID0gZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcbiAgaWYgKG1pbnMubGVuZ3RoIDwgMikgbWlucyA9IFwiMFwiICsgbWlucztcbiAgcmV0dXJuIGAke2RheX0gICAke2RhdGVOdW19ICR7bW9udGh9ICR7eWVhcn0gICAke2hvdXJzfToke21pbnN9YDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5zY3NzXCI7XG5pbXBvcnQgXCIuL25vcm1hbGl6ZS5zY3NzXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sRWxlbWVudCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgZGlzcGF0Y2hlckZ1bmN0aW9uIGZyb20gXCIuL2NvbXBvbmVudHMvZGlzcGF0Y2hlclwiO1xuaW1wb3J0IEZvcm0gZnJvbSBcIi4vY29tcG9uZW50cy92aWV3L2Zvcm1cIjtcbmltcG9ydCBMaXN0IGZyb20gXCIuL2NvbXBvbmVudHMvdmlldy9saXN0XCI7XG5pbXBvcnQgTmF2IGZyb20gXCIuL2NvbXBvbmVudHMvdmlldy9uYXZcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvc3RvcmFnZVwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgeyBTdGF0ZU9iaiB9IGZyb20gXCJ0eXBlc1wiO1xuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlT2JqID0ge1xuICBmaWx0ZXI6IFwiYWxsXCIsXG4gIHRhc2tzOiBbXSxcbiAgbG9hZGluZ1N0YXRlOiBmYWxzZSxcbiAgbG9hZGluZ1Rhc2tzOiBbXSxcbiAgaXNSZXZlcnNlZDogZmFsc2UsXG59O1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBhcHBSb290ID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgW1wiYXBwXCJdKTtcbmJvZHkuYXBwZW5kKGFwcFJvb3QpO1xuXG5jb25zdCBhcHBUaXRsZSA9IGNyZWF0ZUh0bWxFbGVtZW50KFwiaDFcIiwgW1wiYXBwX190aXRsZVwiXSwgXCJUby1kbyBMaXN0XCIpO1xuY29uc3QgY29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoXCJkaXZcIiwgW1wiYXBwX19jb250YWluZXJcIl0pO1xuXG5hcHBSb290LmFwcGVuZChhcHBUaXRsZSwgY29udGFpbmVyKTtcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKGluaXRpYWxTdGF0ZSk7XG5jb25zdCBkaXNwYXRjaCA9IGRpc3BhdGNoZXJGdW5jdGlvbihzdG9yYWdlKTtcbmNvbnN0IG5hdiA9IG5ldyBOYXYoZGlzcGF0Y2gpO1xuY29uc3QgbGlzdCA9IG5ldyBMaXN0KGRpc3BhdGNoKTtcbmNvbnN0IGZvcm0gPSBuZXcgRm9ybShkaXNwYXRjaCk7XG5cbmNvbnN0IHZpZXdzID0gW25hdiwgbGlzdCwgZm9ybV07XG52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gIHN0b3JhZ2Uuc3Vic2NyaWJlKHZpZXcub25TdGF0ZVVwZGF0ZS5iaW5kKHZpZXcpKTtcbiAgY29udGFpbmVyLmFwcGVuZCh2aWV3LmdldFZpZXcoKSk7XG59KTtcblxuZGlzcGF0Y2goe1xuICB0eXBlOiBcIkxPQURJTkdfU1RBVEVcIixcbiAgcGF5bG9hZDogdHJ1ZSxcbn0pO1xuXG5hcGkuZ2V0QWxsKCkudGhlbigodGFza3MpID0+IHtcbiAgZGlzcGF0Y2goeyB0eXBlOiBcIkxPQURfSU5JVElBTF9UQVNLU1wiLCBwYXlsb2FkOiB0YXNrcyB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImFwaSIsImNvbnN0cnVjdG9yIiwianNvblRhc2tzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRoaXMiLCJ0YXNrc0FyciIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIm9iaiIsImRhdGUiLCJEYXRlIiwiZ2V0QWxsIiwidXBkYXRlU3RvcmVkRGF0YSIsIlByb21pc2UiLCJyZXMiLCJzZXRUaW1lb3V0IiwiYWRkIiwibmV3VGFzayIsInB1c2giLCJyZW1vdmUiLCJpZCIsImZpbHRlciIsInRhc2siLCJ1cGRhdGUiLCJ1cGRhdGVkVGFzayIsImZpbmRUYXNrIiwic3RhdHVzIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImZpbmQiLCJzdG9yYWdlSW5zdGFuY2UiLCJhY3Rpb24iLCJjdXJyZW50U3RhdGUiLCJnZXRTdGF0ZSIsInVwZGF0ZVN0YXRlIiwidHlwZSIsImxvYWRpbmdTdGF0ZSIsInRhc2tzIiwicGF5bG9hZCIsImxvYWRpbmdUYXNrcyIsImlzUmV2ZXJzZWQiLCJsb2FkaW5nQXJyIiwic2xpY2UiLCJzdGF0ZSIsInJlZHVjZXIiLCJzdWJzY3JpYmVycyIsImZvcmNlZENvbnN0cnVjdG9yIiwiZm9yRWFjaCIsImZuIiwic3Vic2NyaWJlIiwiZm9yY2VVcGRhdGUiLCJkaXNwYXRjaCIsImVsZW1lbnQiLCJjcmVhdGVIdG1sRWxlbWVudCIsImNyZWF0ZURPTUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ3cmFwIiwiaW5wdXQiLCJzZXRBdHRyaWJ1dGUiLCJidXR0b25BZGQiLCJjb3VudGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiY291bnRlclZhbHVlIiwidGV4dENvbnRlbnQiLCJsZW5ndGhXYXJuaW5nIiwiYmluZGVkSGFuZGxlSW5wdXRWYWxpZGF0aW9uIiwiaGFuZGxlSW5wdXRWYWxpZGF0aW9uIiwiYmluZCIsImJpbmRlZEhhbmRsZUNyZWF0ZU5vdGUiLCJoYW5kbGVDcmVhdGVOb3RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZCIsImFwcGVuZENoaWxkIiwib25TdGF0ZVVwZGF0ZSIsImNsZWFySGFuZGxlcnMiLCJ0YXNrc0FycmF5IiwiZ2V0VmlldyIsImlucHV0VmFsaWRhdGlvbiIsImlucHV0RWxlbSIsIndhcm5FbGVtMSIsIndhcm1FbGVtMiIsInZhbHVlIiwidGFza1RleHQiLCJsZW5ndGgiLCJ0b1VwcGVyQ2FzZSIsInJlbW92ZUF0dHJpYnV0ZSIsImNyZWF0ZU5ld05vdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic29ydCIsImEiLCJiIiwiZ2V0VGltZSIsInRhc2tPYmoiLCJub3RlIiwidGhlbiIsInNwaW5uZXIiLCJjdXJyZW50TGVuZ3RoIiwidXBkYXRlTGlzdCIsInRhc2tJbnN0YW5jZXMiLCJhZGRTcGlubmVyIiwicmVtb3ZlU3Bpbm5lciIsImNyZWF0ZVRhc2tzTGlzdCIsInRleHQiLCJ0eXBlZCIsInRhc2tFbGVtZW50cyIsImNyZWF0ZVRhc2tFbGVtZW50cyIsImVsIiwidGFza0VsZW1lbnRzQXJyYXkiLCJzb3J0RWxlbWVudHNCeURhdGUiLCJidXR0b25BbGwiLCJidXR0b25BY3RpdmUiLCJidXR0b25Eb25lIiwiYnV0dG9uIiwiYnV0dG9uUmVzZXJzZSIsImNoaWxkTm9kZXMiLCJmaWx0ZXJXcmFwIiwiZGF0YXNldCIsIm5hbWUiLCJ0YXNrRGF0YSIsImlzTG9hZGluZyIsImluY2x1ZGVzIiwibmV3U3RhdHVzIiwidXBkYXRlVGFza0VsZW1lbnQiLCJsZWZ0Q29udGFpbmVyIiwicmlnaHRDb250YWluZXIiLCJidXR0b25zQ29udGFpbmVyIiwic3RhdHVzRWxlbSIsImJ1dHRvbkRlbGV0ZSIsImRhdGVFbGVtIiwiZ2V0UHJldHR5RGF0ZSIsImJpbmRlZEhhbmRsZURlbGV0ZSIsImhhbmRsZURlbGV0ZSIsImJpbmRlZEhhbmRsZURvbmUiLCJoYW5kbGVEb25lIiwiY3NzQ2xhc3NBcnJheSIsImRhdGEiLCJzdHlsZSIsImRheSIsImdldERheSIsImRhdGVOdW0iLCJnZXREYXRlIiwibW9udGgiLCJnZXRNb250aCIsInllYXIiLCJnZXRGdWxsWWVhciIsImhvdXJzIiwiZ2V0SG91cnMiLCJtaW5zIiwiZ2V0TWludXRlcyIsInRvU3RyaW5nIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwidW5kZWZpbmVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yIiwiYXBwUm9vdCIsImFwcFRpdGxlIiwiY29udGFpbmVyIiwic3RvcmFnZSIsInZpZXciXSwic291cmNlUm9vdCI6IiJ9
