

let signup = (db,data)=>{

    return new Promise((resolve,reject)=>{
        db.user.save(data,(err)=>{
            if(!err){
                console.log("signup sucessful");
                resolve({status:"sucess"});
            }
            else{
                console.log("error");
                reject(err);
            }

        });
    }).then((data)=>{
        return data
    }).catch((err)=> {
        return err;
    });
};


module.exports = {signup:signup};


