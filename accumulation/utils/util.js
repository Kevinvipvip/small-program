const formatTime = (date, dateType) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (dateType) {
    if (dateType === 'date') {
      return [year, month, day].map(formatNumber).join('-');
    } else if (dateType === 'time') {
      return [hour, minute, second].map(formatNumber).join(':');
    }
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};

//获取当前日期时间
const getDate = fn => {
  let timestamp = Date.parse(new Date());  // 将获取的日期装换成时间戳
  let date = new Date(timestamp);
  //获取当前年份  
  let Y = date.getFullYear();
  //获取当前月份  
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let endM = (date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 2) : date.getMonth() + 2);
  //获取当前日期 
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let startDate = Y + '-' + M + '-' + D;
  let endDate = Y + '-' + endM + '-' + D;
  let finishDate = {
    startDate,
    endDate
  };
  fn(finishDate)
};

// 上传图片
const uploadImages = fn => {
  wx.chooseImage({
    count: 9,
    sourceType: ['album', 'camera'],
    success: function (res) {
      for (let i = 0; i < res.tempFiles.length; i++) {
        if (res.tempFiles[i].size > 512000) {
          wx.showToast({
            title: '请上传小于1M的照片',
            icon: 'none'
          });
          return;
        }
      }
      if (res.tempFiles.length < 3) {
        wx.showToast({
          title: '请上传不少于3张照片',
          icon: 'none'
        });
      } else {
        fn(res.tempFiles)
      }
    },
  })
};

const toast = (title, duration, icon = 'none') => {
  let dura = duration || 2000;
  wx.showToast({
    title: title,
    icon: icon,
    duration: dura
  })
};

const modal = (message, callback) => {
  wx.showModal({
    title: '',
    content: message,
    showCancel: false,
    success() {
      if (callback) {
        callback()
      }
    }
  })
};

const getCloudImage = (fileList, success, fail) => {
  wx.cloud.getTempFileURL({
    fileList: fileList,
    success: (res) => {
      if (success) {
        success(res.fileList)
      }
    },
    fail: () => {
      if (fail) {
        fail()
      }
    }
  })
};
module.exports = {
  formatTime: formatTime,
  getDate: getDate,
  uploadImages: uploadImages,
  toast: toast,
  modal: modal,
  getCloudImage: getCloudImage
};
