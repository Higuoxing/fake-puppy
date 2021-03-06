module.exports = (app)=> {
  app.use('/admin/register' ,   require('./register' ));
  app.use('/admin/login'    ,   require('./login'    ));
  app.use('/admin/panel'    ,   require('./panel'    ));
  app.use('/admin/qrcode'   ,   require('./qrcode'   ));
  app.use('/admin/device'   ,   require('./device'   ));
  app.use('/admin/user'     ,   require('./user'     ));
}
