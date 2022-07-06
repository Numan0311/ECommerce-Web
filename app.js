const path = require('path');
const express=require('express');
const bodyParser = require('body-parser');
const fileUpload=require('express-fileupload');
const db = require("./Models/productModel");

const productRouter=require('./Routes/productRoutes');
const userRouter=require('./Routes/userRoutes')

const app=express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(fileUpload())
//! Use of Multer


// const publicPath = path.join(__dirname, '/views');

app.set('views', './views');
app.set('view engine', 'ejs');

// app.set('view engine', 'ejs');
// app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard');

});

app.get('/store',(req,res)=>{
    let sql = 'select * from products';
    db.query(sql, (err, rest) => {
        if (err) console.log(err);
        res.render('store',{products:rest});
    });
})

app.get('/viewAllProducts', function(req, res) {
    let sql = 'select * from products';
    db.query(sql, (err, rest) => {
        if (err) console.log(err);
    res.render('allproducts',{products:rest});
    });

});

app.use('/editproduct/:id',function (req,res){
    // console.log(req.params.id)
    res.render('editproduct',{id:req.params.id});
})

app.get('/adduser', function(req, res) {
    res.render('adduser');

});

app.use('/db',(req,res)=>res.render('db'))

app.use('/api/v1/product',productRouter);

app.use('/api/v1/user',userRouter);

app.listen(8080,()=>{
    console.log('Server Running on Port 8080')
})
