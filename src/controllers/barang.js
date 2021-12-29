const {barang} = require("../../models")
const {user} = require("../../models")


exports.addBarang =async(req,res) => {
    try{
        console.log(req.files)
        const data =  await barang.create({
            photo:"http://localhost:2022/uploads/"+req.files.photo[0].filename,
            name:req.body.name,
            harga_jual:req.body.harga_jual,
            harga_beli: req.body.harga_beli,
            stock:req.body.stock,
            idUser:req.user.id
        })
        res.send({
            status: "succes",
            message :"Success to add Barang",
            data:data
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.getBarangs =async(req,res) => {
    try{
       const data =  await barang.findAll({
           include:
        {
            model : user,
            as : "user",
            attributes : {
                exclude:["createdAt","updatedAt"]
            }      
        },
           attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })
        
        res.send({
            status: "succes",
            message :"Success to get Barangs",
            data: data
        })
    }
    
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.getBarang=async(req,res) => {
    const id = req.params.id;
    try{
       const data =  await barang.findOne({
               where: {id},
               include:
                {
                    model : user,
                    as : "user",
                    attributes : {
                        exclude:["createdAt","updatedAt"]
                    }      
                },
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
                })
            res.send({
            status: "succes",
            message :"Success to get Barang",
            data:data,
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}

exports.updateBarang =async(req,res) => {
    const id = req.params.id;
    try{
        await barang.update({
            photo:"http://localhost:2022/uploads/"+req.files.photo[0].filename,
            name:req.body.name,
            harga_jual:req.body.harga_jual,
            harga_beli: req.body.harga_beli,
            stock:req.body.stock 
            },{
                    where: {id}
        })
    
        const data = await barang.findOne({
            where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update Barang",
            data: data
        })
        
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}


exports.deleteBarang =async(req,res) => {
    const id = req.params.id;
    try{
       await barang.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete Barang",
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error",
            id:id
        })
    }
}