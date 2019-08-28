const sinon=require('sinon');
const chai=require('chai').assert;
const public=require('../ChatControl/publicChannelManager');

describe('testPublicChannelManager.js',function(){
    describe('distributeChannels',function(){
        beforeEach('Stubbing match.deleteOne',function(){
           sinon.stub(match,'deleteOne')
           .resolves({ok: 1});
        });
    
        afterEach('Stub deletion',function(){
            sinon.restore();
        });
    
        it('Should distribute 1 chat channels',function(done){
            let namespace={to:function(){}};
            let dummyMatch=[{
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            }];
            sinon.stub(match,'find').resolves(dummyMatch);
            sinon.stub(namespace,'to').returns({emit: function(){}});
            sinon.stub(match,'exists').resolves(true);

            public.distributeChannels(namespace)
            .then(result=>{
                chai.equal(result,'Connected 1 Chat Channels');
                done();
            })
            .catch(err=>{
                done(err);
            });
            
        });

        it('Should distribute 4 chat channels',function(done){
            let namespace={to:function(){}};
            let dummyMatch=[{
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            },
            {
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            },
            {
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            },
            {
                uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
            }];
            sinon.stub(match,'find').resolves(dummyMatch);
            sinon.stub(namespace,'to').returns({emit: function(){}});
            sinon.stub(match,'exists').resolves(true);

            public.distributeChannels(namespace)
            .then(result=>{
                chai.equal(result,'Connected 4 Chat Channels');
                done();
            })
            .catch(err=>{
                done(err);
            });
        });

        it('Should distribute no channels',function(done){
            let namespace={to:function(){}};
            sinon.stub(match,'exists').resolves(false);
            sinon.stub(namespace,'to').returns({emit: function(){}});

            public.distributeChannels(namespace)
            .then(res=>{
                chai.equal(res,'No public channels to distribute');
                done();
            })
            .catch(err=>{
                done(err);
            });

        });

        it('Should connect 200 channels in ~20ms',function(done){
            this.timeout(20);
            let namespace={to:function(){}};
            let dummyMatch=[];
            for(let i=0;i<200;i++){
                dummyMatch.push({ 
                    uuid1:'7fc1e382-9f75-4155-bd09-d702ac85ab4b',
                    uuid2:'5ab2d48d-edc6-403e-9359-e53e350f13bf',
                    perChannel1:'6F11D378C4F70709EDD63A8A034386EAB705C164A06D82D743FFE66ADD3C00E6',
                    perChannel2:'75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
                    chatChannel:'B49190C0C3738077B339E8D6FB85EB565B044870A784653824211920D56A0A20'
                });
            }
            sinon.stub(match,'find').resolves(dummyMatch);
            sinon.stub(match,'exists').resolves(true);
            sinon.stub(namespace,'to').returns({emit: function(){}});

            public.distributeChannels(namespace)
            .then(res=>{
                chai.equal(res,'Connected 200 Chat Channels');
                done();
            }) 
           .catch(err=>{
               done(err);
           })

        })
        
    });

});

