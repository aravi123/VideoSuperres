
const formidable = require('formidable');
const fs =require('fs');



let uploadvideo = (data,db,name)=>{

    return new Promise((resolve,reject)=>{

        let filename,network;

        console.log("here122");
        let form = new formidable.IncomingForm({
            uploadDir:"./uploads"
        });
        form.parse(data,(err,fields,files)=>{
            //data.use = fields;
           console.log(Object.keys(fields));
           network = Object.keys(fields)[0];
           console.log(files);
        });
        form.on('fileBegin',(name,file)=>{
            console.log("file upload starts");
            //console.log(file.name);
            file.name = file.name;
        });

        form.on('file',(name,file)=>{
            console.log("file uploaded");
            fs.rename(file.path, form.uploadDir + "/" + file.name);
            filename = file.name;

        });

        form.on('end',()=>{
            const zerorpc = require('zerorpc');
            const client  = new zerorpc.Client();
            client.connect("tcp://127.0.0.1:4242");
            let data = {
                filename:filename,
                user:name,
                network:network,
                status:false
            };
            console.log(data);
            db.uploads.save(data,(err)=>{
                if (!err){
                    let name = data.filename+"/"+data.network;
                    client.invoke("Mainfn",name,(err,res,more)=>{
                        resolve({status:true});
                    })
                }
            });
            console.log(filename);
            console.log(name);
        });

        form.on('error',(err)=>{
            console.log(err);
                reject({status:false});
        });



    }).then((status)=>{
        return status;
    }).catch((err)=>{
        return err;
    });

};


module.exports = {

    uploadvideo:uploadvideo

};