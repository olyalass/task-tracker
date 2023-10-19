import LocalApi from "./localApi";
import ServerApi from "./serverApi";

export const api = new LocalApi();
// change "new LocalApi()" on "new ServerApi()" to switch from localstorage to Server memorizing