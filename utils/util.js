const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

// 获取网络状态 true: online, fase: offline
const getNetworkStatus = () => {
  var status = false;

  wx.getNetworkType({
    success: networkStatus => {
      var networkType = networkStatus.networkType;
      if (
        networkType !== '2g' &&
        networkType !== 'none' &&
        networkType !== 'unknown'
      ) {
        status = true;
      } else {
        status = false;
      }
    },
    fail: () => {
      status = false;
    }
  });

  return status;
}

module.exports = {
  formatTime: formatTime,
  getNetworkStatus: getNetworkStatus
};
