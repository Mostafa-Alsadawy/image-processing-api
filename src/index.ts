import express from 'express';
import router from './api/imageAPI';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server is running on port${port}`);
});

app.use('/api', router);

export default app;
