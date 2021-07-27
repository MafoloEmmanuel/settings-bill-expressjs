//setup express
const express = require('express');
const exphbs  = require('express-handlebars');
const SettingsBill = require('./settings-bill')
const settingsBill = SettingsBill();

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

 app.use(express.static('public'));

 app.use(express.urlencoded({extended: true})); 
app.use(express.json());
 
//create a default route using "/"
app.get('/', function(req,res){
     res.render('index', {
         settings: settingsBill.getSettings()
     })
})
//create a settings route using "/settings"
app.post('/settings', function(req,res){ 
settingsBill.setSettings({
    smsCost : req.body.smsCost,
    callCost :req.body.callCost,
    warningLevel : req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
});
res.redirect('/')
console.log(settingsBill);

})


app.post('/action', function(req,res){

})
app.get('/actions', function(req,res){
    
})
// 
app.get('/actions/:type', function(req,res){
    
})
const PORT = process.env.PORT || 3011;

app.listen( PORT, function(){
    console.log('App started at port: ', PORT)
}) 
