import {Server} from 'socket.io';
import __dirname from './utils/constantsUtil.js';
import cartRouter from './routes/cartRouter.js';
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import websocket from './websocket.js';

const app = express();

//MongoDB connect
const uri = "mongodb+srv://dgel92:coderhouse24@coderhouse-backend.vybr2c8.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=coderhouse-backend";
mongoose.connect(uri);

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/products', viewsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);