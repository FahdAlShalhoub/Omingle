const matchmaker=require('../Matchmaker/matchmaker');

//Signs the new user to the waiting list. 
exports.book=function(uuid)
{
    
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


