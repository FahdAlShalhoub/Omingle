const booking=require('./booking');
const sha256=require('sha256');

//Signs the new user to the waiting list. 
async function book(uuid)
{
  let valid = await isValid(uuid);
  
  if(valid){
    const channel=sha256(uuid);
    const newBooking=new booking({uuid:uuid,perChannel:channel});
    newBooking.save()
    .then(()=>{})
    .catch(err=>{
        throw new Error(err);
    });
    return channel;
  }
  else
   throw new Error('Duplicate UUID');
}

//Checks if the submitted uuid is valid
async function isValid(uuid)
{
    let valid;

    await booking.findOne({uuid:uuid})
    .then(book=>{
      if(book==null){
        valid=true;
      }
      else{
        if(book.uuid===uuid)
        valid=false;
        else
        valid=true;
      }
    })
    .catch(err=>{
        throw new Error(err);
    });

    return valid;
}

module.exports={
  isValid,
  book
};


