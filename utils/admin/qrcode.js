const crypto = require('crypto');
const user_model = require('../db/model/user');

const _gen_qrcode = async () => {
  let qrCode = require('qrcode');
  // share link

  let unused_hash = await user_model.find({ state: 'pending' }).exec();
  let url = null;

  if (unused_hash[0]) {
    // unused hash
    let hash = unused_hash[0].token;
    url = `http://192.168.2.1:2060/wifidog/auth?token=${hash}`;
  } else {
    // generate hash code and add to db
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    let hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
    url = `http://192.168.2.1:2060/wifidog/auth?token=${hash}`;
    await user_model.create({
      mac_addr: '',
      ip_addr: '',
      token: hash,
      state: 'pending',
      gw_id: '',
      incoming: 0,
      outgoing: 0
    });
  }

  return { qrcode: await qrCode.toDataURL(url), url: url };
}

module.exports = {
  gen_qrcode: _gen_qrcode
}
