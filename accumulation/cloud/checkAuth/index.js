// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  await cloud.callFunction({
    name: 'getUserInfo',
    success: (res) => {
      return res
      // if (res.data.length == 1) {
      //   return true
      // } else {
      //   return false
      // }
    }
  })
}