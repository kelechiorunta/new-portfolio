import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import userRouter from './routes/userRoutes/userRoutes.js';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

server.use(express.static(path.resolve(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.json());
server.use('/', userRouter);//Mount the userRouter with the root route

const indexPath = path.resolve(__dirname, 'public', 'index.html');
const cvPath = path.resolve(__dirname, 'public', 'CV.pdf');



server.get('/', async(req, res) => {
    const indexfile = await readFile(indexPath);
    res.send(indexfile);
})

server.get('/cv', async(req, res) => {
    const cvfile = await readFile(cvPath);
    res.send(cvfile)
})

server.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})