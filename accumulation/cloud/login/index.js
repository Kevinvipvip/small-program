/**云函数入口文件
 * 返回数据格式:code：1  状态；data:{}||[] 返回的数据内容；msg:'' 提示内容
 * 需要传参： avatarUrl（头像链接）；gender（性别）{1:男性；2:女性；0:保密}；nickName（昵称）
 **/
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  let user_list = []

  await db.collection('user').where({
    openid: wxContext.OPENID
  }).get().then((res) => {
    user_list = res.data
    // return res
  }, (fail) => {})


  if (user_list.length !== 0) {
    // return {
    //   tip: '已授权',
    //   data: user_list
    // }
  } else {
    // return {
    //   tip: '未授权',
    //   data: user_list
    // }
    await db.collection('user').add({
      data: {
        appid: wxContext.APPID,
        openid: wxContext.OPENID,
        avatarUrl: event.avatarUrl,
        gender: event.gender,
        nickName: event.nickName
      }
    }).then((res) => {
      return {
        code: 1,
        data: res,
        msg: '成功'
      }
    }, (fail) => {
      return {
        code: 2,
        data: '授权失败，请重新授权',
        msg: '失败'
      }
    })
  }
}