

let login = (db,data)=>{


    return new Promise((resolve,reject)=>{
        db.user.find({email:data.email},(err,docs)=>{
            if (!err){
                console.log(docs);
                if (docs[0].password==data.password){
                    resolve();
                }
                else{
                    reject();
                }
            }
        });
    }).then(()=>{
        return true;
    }).catch(()=>{
        return false;
    });

};

module.exports = {
    login:login
};