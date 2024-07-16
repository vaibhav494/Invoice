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
app.get('/insert', (req, res)=>{
    User.find({},'name')
    .then(seller_name => res.json(seller_name))
    .catch(err => res.json(err))
})

app.post('/insert', async(req, res) => {
    try {
    const SellerName = req.body.seller_name
    const SellerAddress = req.body.seller_address
    const SellerGst = req.body.seller_gst
    const SellerState = req.body.seller_state
    console.log(SellerAddress)
    console.log(SellerName)
    console.log(SellerGst)
    console.log(typeof(SellerState))
    const formData = await User.create({
        name: SellerName,
        address: SellerAddress,
        gst: SellerGst,
        state: SellerState,
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
