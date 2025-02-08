import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

server.use(express.static(path.resolve(__dirname, 'public')));

const indexPath = path.resolve(__dirname, 'public', 'index.html');



server.get('/', async(req, res) => {
    const indexfile = await fs.readFile(indexPath);
    res.send(indexfile);
})

server.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})