module.exports = function SettingsBill() {

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;
    let callTotal = 0;
    let smsTotal = 0

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
        if (!hasReachedCriticalLevel()) {
            let cost = 0;
            if (action != null && (smsCost > 0 || callCost > 0)) {
                if (action === 'sms') {
                    cost = smsCost;
                }
                else if (action === 'call') {
                    cost = callCost;
                }

                actionList.push({
                    type: action,
                    cost,
                    timestamp: new Date()


                });
            }
            // console.log(actionList)

        }
    }
  
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
    }
    function getCallTotal() {

        callTotal = getTotal('call');
        return callTotal
    }
    function getSmsTotal() {
        smsTotal = getTotal('sms');

        return smsTotal

    }
    function grandTotal() {

        let grandTotal =getSmsTotal()+ getCallTotal()

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
        actionsFor,
        grandTotal,
        getCallTotal,
        getSmsTotal,
        totalClassName,
        hasReachedWarningLevel,
        hasReachedCriticalLevel
    }
}