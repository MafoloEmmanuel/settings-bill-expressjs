const assert = require('assert');
const SettingsBill = require('../settings-bill');

describe('Testing Settings Bill with ExpressJS', function(){
    let theSettingsBill = SettingsBill();
   
    it("Should be able to set the settings", function(){
    let theSettingsBill = SettingsBill();

        theSettingsBill.setSettings(
            {
                callCost: 5.00,
                smsCost: 2.00,
                warningLevel: 10,
                criticalLevel: 15
            });
            assert.deepEqual({
                callCost: 5.00,
                smsCost: 2.00,
                warningLevel: 10,
                criticalLevel: 15
            }, theSettingsBill.getSettings()
            )
    });
    it('Should be able to add a total for only one call', function(){
    let theSettingsBill = SettingsBill();
        
        theSettingsBill.setSettings(
            {
                callCost: 5.00,
                smsCost: 2.00,
                warningLevel: 10,
                criticalLevel: 15
            });
            theSettingsBill.recordAction('call');

            assert.equal(5.00, theSettingsBill.getCallTotal());
            assert.equal(0.00, theSettingsBill.getSmsTotal());

            assert.equal(5.00, theSettingsBill.grandTotal());

    });
    it('Should be able to show a total for adding one sms and one call', function(){
        
    let theSettingsBill = SettingsBill();
        
        theSettingsBill.setSettings(
            {
                callCost: 5.00,
                smsCost: 2.00,
                warningLevel: 10,
                criticalLevel: 15
            });
            theSettingsBill.recordAction('sms');
            theSettingsBill.recordAction('call');


            assert.equal(5.00, theSettingsBill.getCallTotal());
            assert.equal(2.00, theSettingsBill.getSmsTotal());

            assert.equal(7.00, theSettingsBill.grandTotal());

    });
    it('Should be able to add a total for three calls and two smses', function(){
        let theSettingsBill = SettingsBill();
               
                theSettingsBill.setSettings(
                    {
                        callCost: 5.00,
                        smsCost: 2.00,
                        warningLevel: 20,
                        criticalLevel: 30
                    });
                    theSettingsBill.recordAction('call');
                    theSettingsBill.recordAction('sms');
                    theSettingsBill.recordAction('call');
                    theSettingsBill.recordAction('sms');
                    theSettingsBill.recordAction('call');
                   
        
                    assert.equal(15, theSettingsBill.getCallTotal());
                    assert.equal(4, theSettingsBill.getSmsTotal());
                    assert.equal(19, theSettingsBill.grandTotal());
            });
    describe('Change colors for the warning and critical levels', function(){
        it('Overall total color should be orange when a warning level is reached', function(){
    let theSettingsBill = SettingsBill();
           
            theSettingsBill.setSettings(
                {
                    callCost: 5.00,
                    smsCost: 2.00,
                    warningLevel: 20,
                    criticalLevel: 30
                });
                theSettingsBill.recordAction('call');
                theSettingsBill.recordAction('sms');
                theSettingsBill.recordAction('call');
                theSettingsBill.recordAction('sms');
                theSettingsBill.recordAction('call');
                theSettingsBill.recordAction('sms');
                theSettingsBill.recordAction('call');
                theSettingsBill.recordAction('sms');
    
                assert.equal(20, theSettingsBill.getCallTotal());
                assert.equal(8, theSettingsBill.getSmsTotal());
                assert.equal(28, theSettingsBill.grandTotal());
                assert.equal('warning', theSettingsBill.totalClassName());
        });
    
    it('Overall total color should be red when a critical level is reached', function(){
    let theSettingsBill = SettingsBill();
       
        theSettingsBill.setSettings(
            {
                callCost: 5.00,
                smsCost: 2.00,
                warningLevel: 20,
                criticalLevel: 30
            });
            theSettingsBill.recordAction('call');
            theSettingsBill.recordAction('sms');
            theSettingsBill.recordAction('call');
            theSettingsBill.recordAction('sms');
            theSettingsBill.recordAction('call');
            theSettingsBill.recordAction('sms');
            theSettingsBill.recordAction('call');
            theSettingsBill.recordAction('sms');
            theSettingsBill.recordAction('call');

            assert.equal(25.00, theSettingsBill.getCallTotal());
            assert.equal(8.00, theSettingsBill.getSmsTotal());
            assert.equal(33.00, theSettingsBill.grandTotal());
            assert.equal('danger', theSettingsBill.totalClassName());
    });

});
});