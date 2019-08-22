const chai=require('chai').assert;
const sinon=require('sinon');
const matchmaker=require('../Matchmaker/matchmaker');
const match=require('../Matchmaker/match');
const booking=require('../Receptionist/booking');

describe('testMatchmaker.js',function(){
  describe('makePairs',function(){
    const elements=[ 
    { _id: '5d297a87af7a9d433329b4b5',
      uuid: '7fc1e382-9f75-4155-bd09-d702ac85ab4b',
      perChannel:
      '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
      __v: 0 },
    { _id: '5d29808b3f40661da38eb27d',
      uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
      perChannel:
      '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
      __v: 0 },
    { _id: '5d2980bd3e4484565327c9c6',
      uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
      perChannel:
      '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
      __v: 0 },
    { _id: '5d2981386ecb665813609c3a',
      uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
      perChannel:
      '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
      __v: 0 }
      ];

      it('Should Produce an array of objects',function(){
        let data=elements.slice();
        let result=matchmaker.makePairs(data);
        chai.isArray(result);
      });

      it('The result of pairing four bookings should have 2 pairs',function(){
        let data=elements.slice();
        let result=matchmaker.makePairs(data).length;
        chai.equal(result,2);
      });

      it('Two groups of pairs should not be equal',function(){
        let data1=elements.slice();
        let data2=elements.slice();
        let result1=matchmaker.makePairs(data1);
        let result2=matchmaker.makePairs(data2)
        chai.notDeepEqual(result1,result2);
      });
  });

  describe('checkStatus',function(){
    before('Stub Connection',function(){
      const elements=[ 
        { _id: '5d297a87af7a9d433329b4b5',
        uuid: '7fc1e382-9f75-4155-bd09-d702ac85ab4b',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
      { _id: '5d29808b3f40661da38eb27d',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
      { _id: '5d2980bd3e4484565327c9c6',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
      { _id: '5d2981386ecb665813609c3a',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
        ];
      sinon
        .stub(booking,'find')
        .resolves(elements);
    });
    after('Stub Deletion',function(){
      sinon.restore();
    });

    it('Should return true if number of elements is even',function(done){
      matchmaker.checkStatus()
      .then(stat=>{
        chai.isTrue(stat);
        done();
      })
      .catch(err=>{
        done(err);
      }); 
    });

  });

  describe('saveMatches',function(){
    beforeEach('Setting up the spy',function(){
      sinon.spy(match,'insertMany');
    });
    
    afterEach('Tearing up the spy',function(){
      match.insertMany.restore();
    });

    let pairs=[
      {
        elm1: { _id: '5d297a87af7a9d433329b4b5',
        uuid: '7fc1e382-9f75-4155-bd09-d702ac85ab4b',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
        elm2: { _id: '5d29808b3f40661da38eb27d',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 }
      },
      {
        elm1: { _id: '5d2980bd3e4484565327c9c6',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 },
        elm2: { _id: '5d2981386ecb665813609c3a',
        uuid: '5ab2d48d-edc6-403e-9359-e53e350f13bf',
        perChannel:
        '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
        __v: 0 }
      }
    ];

    it('The insertMany method should be called once ',function(done){
      matchmaker.saveMatches(pairs)
      .then(()=>{
        chai.isTrue(match.insertMany.called);
        done();
      })
      .catch(err=>{
        done(err);
      });
    });

    it('An array of matches should be passed to insertMany',function(done){
      matchmaker.saveMatches(pairs)
      .then(()=>{
        let firstCallArgs=match.insertMany.args[0];
        let firstArg=firstCallArgs[0];
        let firstElementInFirstArg=firstArg[0];
        chai.isArray(firstArg);
        chai.instanceOf(firstElementInFirstArg,match);
        done();
      })
      .catch(err=>{
        done(err);
      });
    });
  });
  
});
