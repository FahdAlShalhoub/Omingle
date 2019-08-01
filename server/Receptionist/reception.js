const booking=require('./booking');
const sha256=require('sha256');

//Signs the new user to the waiting list. 
async function book(uuid)
{
  let exists = await booking.exists({uuid:uuid});
  if(!exists){
    const channel=sha256(uuid);
    
    booking.create({uuid:uuid,perChannel:channel})
    .then()
    .catch(err=>{
        throw new Error(err);
    });
    return channel;
  }
  else
   throw new Error('Duplicate UUID');
}

module.exports={
  book
};


