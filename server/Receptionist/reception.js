const booking=require('./booking');
const sha256=require('sha256');

//Signs the new user to the waiting list. 
exports.book= async function(uuid)
{
  let valid = await isValid(uuid);
  
  if(valid){
    const newBooking=new booking({uuid:uuid,perChannel:sha256('uuid')});
    newBooking.save()
    .then(msg=>{
        console.log(msg);
    })
    .catch(err=>{
        throw new Error(err);
    });
    return 'Saved Successfully';
  }

  throw new Error('Duplicate UUID');
}

async function isValid(uuid)
{
    let valid=false;

    await booking.findOne({uuid:uuid})
    .then(book=>{
       if(book!=null)
       valid=false;
       else
       valid=true;
    })
    .catch(err=>{
        throw new Error(err);
    });

    return valid;
}


