const booking=require('./booking');
const sha256=require('sha256');

//Signs the new user to the waiting list. 
exports.book=function(uuid)
{
   return new Promise((resolve,reject)=>{ 
        booking.findOne({uuid:uuid})
        .then(book=>{
            if(book!=null) reject("Duplicate UUID");
            const newBooking=new booking({uuid:uuid,perChannel:sha256('uuid')});
            newBooking.save()
            .then(()=> resolve("Saved Successfully"))
            .catch(err=>{
                reject('err');
            });
        })
        .catch(err=>{
            reject(err);
        });
   });
}


