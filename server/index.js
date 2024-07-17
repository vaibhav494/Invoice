console.log("index js started")

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

const User = require('./models/dataScheme')
const Invoice_detail = require('./models/full_invoice_detail')
app.use(express.json());

app.use(cors());
console.log("before mongo conn")
mongoose.connect('mongodb://localhost:27017/invoice')

app.get('/get_seller_detail/:name', (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }

    User.findOne({ name: name })
        .then(seller_detail => {
            if (!seller_detail) {
                return res.status(404).json({ error: 'Seller not found' });
            }
            res.json(seller_detail);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.post('/insert_full_invoice_detail', async(req, res)=>{
    try {
        const formData1 = await Invoice_detail.create({
            Buyer_Name: req.body.Buyer_Name,
            Seller_Name: req.body.Seller_Name,
            Invoice_Number: req.body.Invoice_Number,
            Invoice_Date: req.body.Invoice_Date,
            Total_Amount: req.body.Total_Amount,
        })
            await formData1.save();
            res.send("invoice data added..")
        } catch(err) {
            console.log(err)
        }
})

app.get('/insert_full_invoice_detail', (req, res)=>{
    Invoice_detail.find()
    .then(seller_name => res.json(seller_name))
    .catch(err => res.json(err))
})

app.get('/insert', (req, res)=>{
    User.find({},'name')
    .then(seller_name => res.json(seller_name))
    .catch(err => res.json(err))
})

app.post('/insert', async(req, res) => {
    try {
    const formData = await User.create({
        name: req.body.seller_name,
        address: req.body.seller_address,
        gst: req.body.seller_gst,
        state: req.body.seller_state,
    })
        await formData.save();
        res.send("inserted data..")
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
