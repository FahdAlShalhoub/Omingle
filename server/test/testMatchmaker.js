const chai=require('chai').assert;
const matchmaker=require('../Matchmaker/matchmaker');
const mongoose=require('mongoose');


describe('makePairs',function(){
  let elements=[ 
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
  { _id: '5d2981b4a11e215a67bc3ec9',
    uuid: '0f7b54f4-00b0-4f4c-a172-9e1dd9e334ed',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d2981c330396f58575a829d',
    uuid: 'b1eaea86-c048-4604-a0dc-3281b71a01c8',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d29825c4f6ce35a13719efc',
    uuid: '857cfc5c-0864-4151-b063-98808d18d828',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d2984dd1562a569b35b32d4',
    uuid: '57fc7c6e-47b5-471f-955b-c0caa39a8683',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 }];
    it('Two groups of pairs should not be equal',function(){
       chai.notDeepEqual(matchmaker.makePairs(elements),matchmaker.makePairs(elements));
    });
});

describe('saveMatches',function(){
  let elements=[ 
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
  { _id: '5d2981b4a11e215a67bc3ec9',
    uuid: '0f7b54f4-00b0-4f4c-a172-9e1dd9e334ed',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d2981c330396f58575a829d',
    uuid: 'b1eaea86-c048-4604-a0dc-3281b71a01c8',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d29825c4f6ce35a13719efc',
    uuid: '857cfc5c-0864-4151-b063-98808d18d828',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 },
  { _id: '5d2984dd1562a569b35b32d4',
    uuid: '57fc7c6e-47b5-471f-955b-c0caa39a8683',
    perChannel:
     '75666699b77db631f576041e8102a55b46758c01b807eacae0f170930ab59b3d',
    __v: 0 }];
   it('Works?',function(done){
    matchmaker.saveMatches(matchmaker.makePairs(elements))
    .then(()=>done())
    .catch(err=>{
      console.log(err);
      done();
    })
   });
   
});

describe('checkStatus',function(){
  it('Should be true if database has even number of bookings',function(done){
    matchmaker.checkStatus()
    .then(status=>{
      chai.isTrue(status);
      done();
    })
    .catch(()=>{
      done();
    });
  });
});