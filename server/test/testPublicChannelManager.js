const sinon=require('sinon');
const chai=require('chai').assert;
const public=require('../ChatControl/publicChannelManager');

describe('testPublicChannelManager.js',function(){
    describe('distributeChannels',function(){
        beforeEach('Stubbing match.find and match.deleteOne',function(){
            let dummyMatch={
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            }
            sinon.stub(match,'find')
            .resolves(dummyMatch);

        });
    
        afterEach('Stub deletion',function(){
            sinon.restore();
        });
    
        it('Should distribute 1 chat channels',function(done){
            var namespace={to:function(){}};
            sinon.stub(namespace,'to').returns({emit: function(){}});

            public.distributeChannels(namespace)
            .then(result=>{
                chai.equal(result,'Connected 1 Chat Channels');
                done();
            })
            .catch(err=>{
                done(err);
            });
            
        });
    });
    
});

