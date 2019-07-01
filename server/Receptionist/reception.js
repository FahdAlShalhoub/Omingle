const matchmaker=require('../Matchmaker/matchmaker');
const fs=require('fs');
var waitingList=JSON.parse(fs.readFileSync('server/Receptionist/waitinglist.json','utf-8'));

//Signs the new user to the waiting list. 
exports.book=function(uuid)
{
    if(isValid(uuid)&&!isDuplicated(uuid)){
        waitingList.uuid.push(uuid); 
        fs.writeFile('server/Receptionist/waitinglist.json',JSON.stringify(waitingList),(err)=>{
            if(err){
            return {"msg":"Oops, Something Went Wrong."}
            }
        });
        return {"msg":"Looking For Chat"};
    } else {
        return {"msg":"UUID is invalid"};
    }
}

//Checks if the submitted uuid is valid.
function isValid(uuid)
{  
    var uuid=uuid.toString();
    if(uuid.length==36){
        if(uuid[8]=="-"&&uuid[13]=="-"&&uuid[18]=="-"&&uuid[23]=="-"){
            return true;
        } else{
            return false
        }
    } else {
        return false;
    }

}

//Checks if the submitted uuid is already in the waiting list.
function isDuplicated(uuid)
{
   for(var i=0;i<waitingList.uuid.length;i++){
       if(waitingList.uuid[i]==uuid){
           return true;
       }
   }
}

//Empties The Waiting List.
function clearWaitingList()
{
    var emptyList={"uuid":[]};
    fs.writeFile('server/Receptionist/waitinglist.json',JSON.stringify(emptyList),(err)=>{
        if(err){
        console.log(err);
        }
    waitingList=JSON.parse(fs.readFileSync('server/Receptionist/waitinglist.json','utf-8'));
    });

}

//Passes the waiting list to the matchmaker and empties the waitinglist.json every 5 seconds
setInterval(()=>{
    if(waitingList.uuid.length>1){
    matchmaker.match(waitingList);
    clearWaitingList();
    } else{
        console.log("Not Enough UUID's");
    }
},5*1000);