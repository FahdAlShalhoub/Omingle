const booking=require('../Receptionist/booking');

    async function addUserToRoom(uuid,socket)
    {
        var result;
        if(! await booking.exists({uuid:uuid})){
            result = "User Has not made a booking"
        }

        await booking.findOne({uuid:uuid})
        .then(booking=>{
            socket.join(booking.perChannel);
            result = "User has joined the channel";
        })
        .catch(err=>{
            throw new Error(err);
        });

        return result; 
    }

    async function removeUserFromRoom(uuid,socket)
    {
        var result;
        if(! await booking.exists({uuid:uuid})){
            result = "User Has not made a booking"
        }
        booking.findOne({uuid:uuid})
        .then(booking=>{
            socket.leave(booking.perChannel);
            result = "User Has left the channel";
        })
        .catch(err=>{
            throw new Error(err);
        }); 

        return result;
    }

    module.exports={
        addUserToRoom,
        removeUserFromRoom
    }


