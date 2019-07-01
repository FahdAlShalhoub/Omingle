// const chatControl=require('../ChatControl/chatControl');
// const match=require('./matchClass');
exports.match=function(waitingList)
{
    let match1=new matchClass(waitingList.uuid[0],waitingList.uuid[1]);
    console.log(match1.UUIDs);
}


class matchClass{
    constructor(uuid1,uuid2)
    {
        this.uuid1=uuid1;
        this.uuid2=uuid2;
    }

    get UUIDs()
    {
       var jsonNotation={
            "uuid1":this.uuid1,
            "uuid2":this.uuid2
        }
        return jsonNotation;
    }
}