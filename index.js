import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import sharp from 'sharp';
import { Readable } from 'stream';
import userRouter from './routes/userRoutes/userRoutes.js';
import { error } from 'console';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

var allowedOrigins = ['https://new-portfolio-kappa-ruddy.vercel.app', 'http://localhost:4100', '*']
const corsOptions = {
    origin: function(origin, callback){
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            return callback(null, true)
        }else{
            return callback(new Error("Domain not supported"), false)
        }
    },
    credentials: true,
    method: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

server.use(express.static(path.resolve(__dirname, 'public')));
server.enable('trust proxy'); //For proxy server domains such as vercel for deployment
server.use(cors(corsOptions));
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

var downloadResult = {msg:'', status:''};
server.get('/cv', (req, res) => {
    res.setHeader("Content-Type", "application/pdf");  // Set the correct file type
    res.setHeader("Content-Disposition", "attachment; filename=CV.pdf"); // Force download

    res.download(cvPath, (err) => {
        if (err) {
            downloadResult.msg = 'Failed to download CV'
            downloadResult.status = 'failed'
            console.error("Error downloading CV:", err);
            return res.status(500).json({ error: "Error downloading file" });
        }   
            downloadResult.msg = "CV Successfully downlaoded"
            downloadResult.status = 'success';
            console.log("CV Successfully downloaded")
            
            // return res.status(200).json({message: "CV downloaded successfully"});
    });

    req.downloadMsg = downloadResult;
    // next();

})

server.get('/downloadResult', (req, res) => {
    if (req.downloadMsg) {
        if (req.downloadMsg.status === 'success'){
            res.status(200).json({message: req.downloadMsg.msg});
        }else if (req.downloadMsg.status === 'failed') {
            res.status(500).json({error: req.downloadMsg.msg})
        }    
    }
    
    }
)


server.get('/backgroundPic', async(req, res) => {
    const backgroundImage = path.resolve(__dirname, 'public', 'imgs', 'developer.png')
    const bufferedImg = await sharp(backgroundImage).resize(20).toBuffer();
    const readable = new Readable();
    // const readableStream = createReadStream(backgroundImage)

    readable.push(bufferedImg);
    readable.push(null);

    readable.on('error', (err) => {
        return res.status(500).json({error: err.message})
    })

    readable.on('end', () => {
        console.log("Stream finished successfully");
        
    })
    readable.pipe(res);
    // readableStream.pipe(res);
    
})

server.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})