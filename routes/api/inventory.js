const router = require('express').Router();
const mongoose=require('mongoose')
const Inventory = mongoose.model('Inventories');


router.post('/addInventory',(req,res,next)=>{
    const {body:{inventory}}=req;
    // const {body:{productId}}=req.inventory;
    const productId=inventory.productId
    console.log(productId)
    
    const newInventory=new Inventory(inventory)
    return newInventory.save()
    .then(()=>{res.json({message:"Product Created"})

})
})


router.post('/addQty',(req,res,next)=>{
    const {body:{order}}=req;

    const productId=order.productId

     Inventory.findOne({productId})
    .then((data)=>{
        const qty=data.qty
        console.log(qty);
        
        const addingQyt=parseInt(qty)+parseInt(order.qty);
        console.log(addingQyt);
        Inventory.findOneAndUpdate({'productId':productId },{$set:{'qty':addingQyt}}).then(value =>{
            res.json({message:"order cancelled"})
        })
        
    })
})
router.post('/reduceQty',(req,res,next)=>{
    const {body:{order}}=req;

    const productId=order.productId

     Inventory.findOne({productId})
    .then((data)=>{
        const qty=data.qty
        console.log(qty);
        
        const addingQyt=parseInt(qty)-parseInt(order.qty);
        console.log(addingQyt);
        Inventory.findOneAndUpdate({'productId':productId },{$set:{'qty':addingQyt}}).then(value =>{
            res.json({message:"order created"})
        })
        
    })
})
router.get('/get',(req,res,next)=>{
    Inventory.find().then((data)=>{
        res.json(data)
    }).catch(next)
})
module.exports=router