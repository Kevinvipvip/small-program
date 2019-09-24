/**云函数入口文件
 * 返回数据格式:code：1  状态；data:{}||[] 返回的数据内容；msg:'' 提示内容
 **/
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let user_list = null;
  await db.collection('user').where({
    openid: wxContext.OPENID
  }).get().then((res) => {
    user_list = res.data[0]
    // return res
  }, (fail) => {})

  return await {
    code: 1,
    data: {
      id: user_list._id,
			nickname: user_list.nickName,
      gender: user_list.gender,
      avatar: user_list.avatarUrl
    },
    msg: '成功'
  }
}