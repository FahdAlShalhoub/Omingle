const match=require('../Matchmaker/match');

//Sends the chat channels to thier respective users through thier private channels
async function distributeChannels(namespace)
{
   let available=await match.exists();
   if(!available){
       return 'No public channels to distribute';
   }

   let numberOfDistributedChannels=0;
   await match.find()
    .then(matches=>{
        for(var i=0;i<matches.length;i++){
            namespace.to(matches[i].perChannel1).emit('matchFound',matches[i].chatChannel);
            namespace.to(matches[i].perChannel2).emit('matchFound',matches[i].chatChannel);
            match.deleteOne({chatChannel:matches[i].chatChannel});
            numberOfDistributedChannels++;
        }
    })
    .catch(err=>{
       throw new Error(err);
    });

    return `Connected ${numberOfDistributedChannels} Chat Channels`; 
}

function launch(interval,emitter)
{
    const namespace=emitter.of('/personalCh');

    setInterval(function(){
        distributeChannels(namespace)
        .then(msg=>{
            console.log(msg);
        })
        .catch(err=>{
            console.log(err);
        });
    },interval);

}

module.exports={
    launch,
    distributeChannels,
}