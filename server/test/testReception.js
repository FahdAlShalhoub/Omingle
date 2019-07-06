const chai=require('chai').assert;
const reception=require('../Receptionist/reception');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
.then();

describe('book()',function(){
    it('Non-duplicated uuid should be saved successfully',()=>{
        return reception.book('cfd11aba-f107-4ec9-a00c-192819eecc5');
    });
   
});


