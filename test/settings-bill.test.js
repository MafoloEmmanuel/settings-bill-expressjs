const assert = require('assert');
const SettingsBill = require('../settings-bill');

describe("Testing Settings Bill with ExpressJs", function(){
    const settingsBill = SettingsBill();
    
    describe("Set the values", function(){
        it('Should be able to set the value of the call cost', function(){
            settingsBill.setSettings( {
            callCost: 2.50 ,
            smsCost: 0.50,
            warningLevel: 10,   
            criticalLevel: 20
            })
            assert.deepEqual({
                callCost: 2.50 ,
                smsCost: 0.50,
                warningLevel: 10,   
                criticalLevel: 20 
            }, settingsBill.getSettings())
        })

    })

    describe("Show the overall totals of calls and smses" , function(){
        it('should calculate the total for one call and one sms', function(){
            settingsBill.setSettings({
                callCost: 3.89,
                smsCost: 2.25,
                warningLevel: 15,
                criticalLevel: 25
            });
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');

            assert.equal(3.89, settingsBill.getCallTotal());
            assert.equal(2.25, settingsBill.getSmsTotal());
            assert.equal(6.14, settingsBill.grandTotal());




        });
        it('should calculate the total for three calls and three sms', function(){
            settingsBill.setSettings({
                callCost: 3.89,
                smsCost: 2.25,
                warningLevel: 15,
                criticalLevel: 25
            });
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');

            assert.equal(15.56, settingsBill.getCallTotal());
            assert.equal(9.00, settingsBill.getSmsTotal());
            assert.equal(24.56, settingsBill.grandTotal());
        })
    })
    describe("Show the warning and critical levels", function(){
        it('Show the total in orange when a warning level is reached', function(){
            settingsBill.setSettings({
                callCost: 10.50,
                smsCost: 5.50,
                warningLevel: 20,
                criticalLevel: 40
            });
            settingsBill.recordAction('call');
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
           

            assert.equal(36.56, settingsBill.getCallTotal());
            assert.equal(14.5, settingsBill.getSmsTotal());
            assert.equal(51.06, settingsBill.grandTotal());
        })
        
    })
})