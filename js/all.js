// 執行時先做一次, 接著每秒運行一次
printTimeZone();
setInterval(printTimeZone, 1000);

function printTimeZone(){
  const el = document.querySelector('.timeList');
  const timeZoneArray = [getLocalTime('NEW YORK'), getLocalTime('LONDON'), getLocalTime('BANGKOK'), getLocalTime(), getLocalTime('SYDNEY')];
  let htmlStr = '';
  timeZoneArray.forEach((item) => {
    htmlStr = htmlStr + `
    <li>
      <h3>
        ${item.countryName}
        <span>${item.day} ${item.monthStr}. ${item.year}</span>
      </h3>
      <span class="nowTime">${item.time}</span>
    </li>
    `
  });
  el.innerHTML = htmlStr;
}

function getLocalTime(country = 'TAIWAN'){
  // Date 物件是基於世界標準時間（UTC） 
  let d = new Date();
  let targetCountry;
  let localTimeZone;
  const timeFormat = 'zh-TW'; 
  switch (country) {
    case 'NEW YORK':
    targetCountry = 'America/New_York';
      break;
    case 'LONDON':
    targetCountry = 'Europe/London';
      break;
    case 'BANGKOK':
    targetCountry = 'Asia/Bangkok';
      break;
    case 'SYDNEY':
    targetCountry = 'Australia/Sydney';
      break;
    case 'TAIWAN':
    targetCountry = 'Asia/Taipei';
      break;
  }
  localTimeZone = d.toLocaleString(timeFormat, { timeZone: targetCountry, hour12: false });
  return dateFormat(country, localTimeZone);
}

function dateFormat(country,date){
  const monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  let dateStr = date.split(' ')[0];
  let timeStr = date.split(' ')[1];
  let month = dateStr.split('/')[1]
  const dateObj = {
    countryName: country,
    time: timeStr.split(':')[0] + ':' + timeStr.split(':')[1],
    monthStr: monthArr[month - 1],
    year: dateStr.split('/')[0],
    day: dateStr.split('/')[2],
  }
  return dateObj;
}