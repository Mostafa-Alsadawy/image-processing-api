import express from 'express';
import router from './api/imageAPI';
import path from 'path';
// initlize the server .
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
// set pug template engine for views and it is by default set to views folder.
app.set('view engine', 'pug');
// set the static folder for css and js files.
app.use(express.static(path.join(__dirname, '../', 'public')));

// the main page
app.get('/', (_req, res) => {
    res.status(200).render('index');
});
// the api page , using router .
app.use('/api', router);

// handels not found urls.
app.use((_req, res) => {
    res.status(404).render('404', { massage: "Sorry we can't find this page" });
});

export default app;
