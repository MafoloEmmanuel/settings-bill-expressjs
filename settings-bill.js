module.exports = function SettingsBill(moment) {

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;
    let callTotal=0;
    let smsTotal=0

    let actionList = [];

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {

        let cost = 0;
        if (action === 'sms') {
            cost = smsCost;
        }
        else if (action === 'call') {
            cost = callCost;
        }
    
        actionList.push({
            type: action,
            cost,
            timestamp: moment(new Date).fromNow() //add a range 
        });
        console.log(actionList)
    
   
    }
    /*
    function stopTotal(actionMade){
         if(!criticalLevel>=grandTotal()){
            if(actionMade== 'call'){
                callTotal += callCost;
            }
            else if(actionMade== 'sms'){
                smsTotal += smsCost;
            }
         }
         
    }*/
    function actions() {
        //console.log(actionList)

        return actionList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getTotal(type) {
        let total = 0;

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;

        // the short way using reduce and arrow functions

        // return actionList.reduce((total, action) => { 
        //     let val = action.type === type ? action.cost : 0;
        //     return total + val;
        // }, 0);
    }


    /*
        function totals() {
            let smsTotal = getTotal('sms')
            let callTotal  = getTotal('call')
            return {
                smsTotal,
                callTotal,
                grandTotal : grandTotal()
            }
        }*/
    function getCallTotal() {
        
        callTotal = getTotal('call');
        return callTotal
    }
    function getSmsTotal() {
        smsTotal = getTotal('sms');
       
            return smsTotal
        
    }
    function grandTotal() {
        let grandTotal = getTotal('sms') + getTotal('call');
        return grandTotal
        

    }
    function totalClassName() {
        const total = grandTotal();
        //console.log(total)
        if (total >= criticalLevel) {
            return "danger";
        } else if (total >= warningLevel) {
            return "warning";
        }

    }
    function hasReachedWarningLevel() {
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        return grandTotal() >= criticalLevel;
    }
    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
       // stopTotal,
        actionsFor,
        //totals,
        grandTotal,
        getCallTotal,
        getSmsTotal,
        totalClassName,
        hasReachedWarningLevel,
        hasReachedCriticalLevel
    }
}