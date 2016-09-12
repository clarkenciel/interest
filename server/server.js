/* simple dev server */
import express from 'express';
import { resolve, relative } from 'path';

const app = express();

app.use('/app', express.static(resolve(__dirname+'/../app')));
app.get('/', (req, res) => res.sendFile('index.html', { 'root': resolve(__dirname+'/..') }));

app.listen(3000);
