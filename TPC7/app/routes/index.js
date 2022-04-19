var express = require('express');
var router = express.Router();
var axios = require('axios');

const apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ";
const api = "http://clav-api.di.uminho.pt/v2/";

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(api+"classes?estrutura=arvore&nivel=1&apikey="+apikey)
      .then(response => {
        data = response.data
        res.render('index',{entrys:data})
      })
      .catch(erro => {res.render('error', {error:erro})})
});

router.get('/classes/:id',(req,res)=>{
  axios.get(api+"classes/c"+req.params.id+"?fs=application%2Fjson&apikey="+apikey)
      .then(response => {
        data = response.data
        // console.log(data)
        res.render('classe',{data:data})
      })
      .catch(erro => {
        res.render('error',{error:erro})
      })
});

module.exports = router;