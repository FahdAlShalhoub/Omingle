
class matchClass{
    constructor(uuid1,uuid2)
    {
        this.uuid1=uuid1;
        this.uuid2=uuid2;
    }

    get UUIDs()
    {
        jsonNotation={
            "uuid1":this.uuid1,
            "uuid2":this.uuid2
        }
        return jsonNotation;
    }
}