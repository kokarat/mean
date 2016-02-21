exports.login = function(req,res){

  console.log(req.body);

  // Set session ถ้าคลิกปุ่ม remember
  if(req.body.remember === 'remember'){
    req.session.remember = true;
    req.session.email = req.body.email;
  }

  //Validator
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  //req.sanitizeBody('email').normalizeEmail(); //ทำให้อยู่ในรูปแบบที่เราอยากได้ เช่นทำให้เป็นตัวเล็กหมด
  var error = req.validationErrors(); // ถ้าไม่ error  จะไม่มีค่า

  console.log(req.body.email);

  if(error){
    res.render('index',{
      title: 'Errors:' + JSON.stringify(error),// JSON.stringify => แปลง JSON เป็น string
      isLoggedIn: false
    });
    return;
  }

  res.render('index',{
    title: 'Logged in as '+ req.body.email,
    isLoggedIn:true
  });
};

exports.logout = function(req,res){

  // Clear session
  req.session = null;

  res.render('index',{
    title: 'See you later',
    isLoggedIn:false
  });

}
