module.exports = {
   debug: true,
   mongoDBuri:  'mongodb://localhost/gpsTracker',
   sessionSecret: 'development_key',
   facebook:{
      clientID: '516817321831068',
      clientSecret: '8e53f1452656dfb975a01730ff1920fe',
      callbackURL: 'http://localhost:3000/oauth/facebook/callback'
   },
   google:{
      clientID: '135774242133-fj11tnukfi1nvqtirr2j9rkpbs3ve0ql.apps.googleusercontent.com',
      clientSecret: '5rRNBEeTJ4ugzHACxG9FdaXM',
      callbackURL: 'http://localhost:3000/oauth/google/callback'
   }
};