"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageAPI_1 = __importDefault(require("./api/imageAPI"));
const path_1 = __importDefault(require("path"));
// initlize the server .
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port${port}`);
});
// set pug template engine for views and it is by default set to views folder.
app.set('view engine', 'pug');
// set the static folder for css and js files.
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
// the main page
app.get('/', (req, res) => {
    res.render('index');
});
// the api page , using router .
app.use('/api', imageAPI_1.default);
// handels not found urls.
app.use((req, res) => {
    res.status(404).render('404', { massage: "Sorry we can't find this page" });
});
exports.default = app;
