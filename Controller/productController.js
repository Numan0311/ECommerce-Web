const db = require("../Models/productModel");
const path = require('path');

// const multer = require('multer');
// const upload = multer({dest: 'uploads/'})
//
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// let upload = multer({ dest })


// Create Operation
// const mw = upload.single('image')
module.exports.createProduct = async function (req, res, next) {

    console.log(req.files)
    if(req.files) {
        console.log('in body',req.body)
        const file = req.files.fileattach;
        file.mv(`uploads/` + file.name);
            req.body.image = 'uploads/' + file.name;

            // res.send('data')
            let sql = 'insert into products set ?';
            db.query(sql, req.body, (err) => {
                if (err) console.log(err)
                // else console.log('Product Added');
                // res.status(201).send('Product Added Successfully')
            })
        res.redirect('/viewAllProducts')
    }
    // next();
}

// Read Operation
module.exports.viewALlProducts = function (req, res) {

    let sql = 'select * from products';
    db.query(sql, (err, rest) => {
        if (err) console.log(err);
        else res.status(200).json(rest);
    })
    // res.end();
}

// Update Operation
module.exports.updateProduct = function (req, res) {
    if(req.files) {
        console.log('in update')
        console.log(req.files.fileattach)
        const file = req.files.fileattach;
        file.mv(`uploads/` + file.name, function (e) {
            console.log(e)
        })
        req.body.image = 'uploads/' + file.name;
        console.log('in update')
        console.log('body',req.body)
        let sql = `update products set ? where id=${parseInt(req.params.id)}`
        db.query(sql, req.body, (err,rest) => {
            // console.log('rest',rest);
            if (err) console.log(err);
            else res.redirect('/viewAllProducts')
        })
    }
}

// Delete Operation
module.exports.deleteProduct = function (req, res) {
    // console.log(req.params.id);
    let sql = `delete from products where id=${parseInt(req.params.id)}`;
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        if (!result.affectedRows) res.status(404).json('Not Found')
        else res.redirect('/viewAllProducts')
    })
    // res.end();
}