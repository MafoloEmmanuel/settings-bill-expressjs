//setup express
const express = require('express');
const exphbs = require('express-handlebars');
const SettingsBill = require('./settings-bill');
var moment = require('moment');
moment().format()

const settingsBill = SettingsBill(); 

const app = express();
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create a default route using "/"
app.get('/', function (req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals:{
            callTotal :settingsBill.getCallTotal().toFixed(2),
            smsTotal: settingsBill.getSmsTotal().toFixed(2),
            grandTotal: settingsBill.grandTotal().toFixed(2),
            levels: settingsBill.totalClassName()
        }

    })
})
//create a settings route using "/settings"
app.post('/settings', function (req, res) {
    settingsBill.setSettings({
        smsCost: req.body.smsCost,
        callCost: req.body.callCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    });
    console.log(req.body);
    //works the same as return
    res.redirect('/')

})

//used to capture values selected in the form
app.post('/action', function (req, res) {
    //capture the call/sms type to add  
    //we get that from the form and put names on the radio buttons 
    //console.log(req.body.actionType)
    settingsBill.recordAction(req.body.actionType);
    res.redirect('/')
})

//
app.get('/actions', function (req, res) {

    let actionList = settingsBill.actions()
    actionList.forEach(element => {
    element.currentTime = moment(element.timestamp).fromNow();
    })  
    res.render('actions', {
        actions: actionList
    })
})
// 
app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType
    let actionList = settingsBill.actionsFor()
    actionList.forEach(element => {
    element.currentTime = moment(element.timestamp).fromNow();
    }) 
    res.render('actions', {
        actions: settingsBill.actionsFor(actionType)

    })
})
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App started at port: ', PORT)

})
