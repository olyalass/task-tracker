import LocalApi from "./localApi";
import ServerApi from "./serverApi";

export const api = new LocalApi();
// change "new LocalApi()" to "new ServerApi()" to switch from localstorage to Server memorizing
// to use server memorizing you also need to locally install JSON Server with "npm install json-server" and start it with "npx json-server --watch db.json"
