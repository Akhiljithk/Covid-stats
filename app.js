const express = require('express');
var path = require('path');
const novalCovid = require('novelcovid')
const exhbs = require('express-handlebars')

const app = express();
var PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("app is listening at port 4000")
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.engine('hbs', exhbs({
    extname: 'hbs',
    defaultView: 'homePage',
    laayoutsDir: __dirname+'/views/layouts/',
    partialsDir:__dirname+'/views/partials/',
}))
app.use(express.static(path.join(__dirname, 'public')));

async function getData(callBack){
    let data=await novalCovid.gov('india')
    data=data.states
    var keralaData = data.find((item)=>{
    return item.state === 'Kerala'
    })

    callBack(keralaData)
}

app.get('/',(req,res)=>{
    getData((data)=>{
        // newArr = [{data}]
        console.log(data)
        res.render('homePage',data)
    })
})