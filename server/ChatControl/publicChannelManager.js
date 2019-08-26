const match=require('../Matchmaker/match');

//Sends the chat channels to thier respective users through thier private channels
async function distributeChannels(namespace)
{
   if(await !match.exists()){
       return 'No public channels to distribute';
   }

   var num=0;
   await match.find()
    .then(matches=>{
        if(matches.length==undefined){
            namespace.to(matches.perChannel1).emit('matchFound',matches.chatChannel);
            namespace.to(matches.perChannel2).emit('matchFound',matches.chatChannel);
            match.deleteOne({chatChannel:matches.chatChannel});
            num++;
        }
        else
        for(var i=0;i<matches.length;i++){
            namespace.to(matches[i].perChannel1).emit('matchFound',matches[i].chatChannel);
            namespace.to(matches[i].perChannel2).emit('matchFound',matches[i].chatChannel);
            match.deleteOne({chatChannel:matches[i].chatChannel});
            num++;
        }
    })
    .catch(err=>{
       throw new Error(err);
    });

    return `Connected ${num} Chat Channels`; 
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