exports.login = function(req,res){
  console.log(req.body);
  console.log('Email:'+ req.body.email);
  console.log('Password:'+ req.body.password);

  //Validator
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail(); //ทำให้อยู่ในรูปแบบที่เราอยากได้ เช่นทำให้เป็นตัวเล็กหมด
  var error = req.validationErrors(); // ถ้าไม่ error  จะไม่มีค่า

  if(error){
    res.render('index',{
      title: 'There have been validation errors:' + JSON.stringify(error),// JSON.stringify => แปลง JSON เป็น string
      isLoggedIn: false
    });
    return;
  }

  res.render('index',{
    title: 'Logged in as'+ req.body.email,
    isLoggedIn:true
  });
};

exports.logout = function(req,res){
  res.render('index',{
    title: 'See you later',
    isLoggedIn:false
  });

}
