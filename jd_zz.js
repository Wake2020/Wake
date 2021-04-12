diff --git a/jd_zz.js b/jd_zz.js
index 132b587..eeb713e 100644
--- a/jd_zz.js
+++ b/jd_zz.js
@@ -8,17 +8,14 @@
 ============Quantumultx===============
 [task_local]
 # 京东赚赚
-10 0 * * * https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_jdzz.js, tag=京东赚赚, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzz.png, enabled=true
-
+10 0 * * * https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jdzz.js, tag=京东赚赚, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzz.png, enabled=true
 ================Loon==============
 [Script]
-cron "10 0 * * *" script-path=https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_jdzz.js,tag=京东赚赚
-
+cron "10 0 * * *" script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jdzz.js,tag=京东赚赚
 ===============Surge=================
-京东赚赚 = type=cron,cronexp="10 0 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_jdzz.js
-
+京东赚赚 = type=cron,cronexp="10 0 * * *",wake-system=1,timeout=3600,script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jdzz.js
 ============小火箭=========
-京东赚赚 = type=cron,script-path=https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_jdzz.js, cronexpr="10 0 * * *", timeout=3600, enable=true
+京东赚赚 = type=cron,script-path=https://gitee.com/lxk0301/jd_scripts/raw/master/jd_jdzz.js, cronexpr="10 0 * * *", timeout=3600, enable=true
  */
 const $ = new Env('京东赚赚');
 const notify = $.isNode() ? require('./sendNotify') : '';
@@ -36,24 +33,19 @@ if ($.isNode()) {
   if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
   };
 } else {
-  let cookiesData = $.getdata('CookiesJD') || "[]";
-  cookiesData = jsonParse(cookiesData);
-  cookiesArr = cookiesData.map(item => item.cookie);
-  cookiesArr.reverse();
-  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
-  cookiesArr.reverse();
-  cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
+  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
 }
 const JD_API_HOST = 'https://api.m.jd.com/client.action';
 const inviteCodes = [
-  ``,
-  ``,
+  `A3bfBSSgXGb240Npt@AUWE53NfPt29dbwO8giY-=@ASjFXnquXyjwAAA@AAjNWmKSYxSgJCGHw3nxOkA@AUWE52eTplXJ5YSa4lS4-@AUWE5yd7asW16SwejjDko@AUWE5yfD2iVxNVSeDvj4K@SanTTlZKpId5h-KB1QVKw@S5KkcRR1N9VXRIB3xwvQDdw@S5KkcRR8b9wLVIU-ix_UOcg@S5KkcRU9M81DXckyhwfQKIQ`,
+  `A3bfBSSgXGb240Npt@AUWE53NfPt29dbwO8giY-=@ASjFXnquXyjwAAA@AAjNWmKSYxSgJCGHw3nxOkA@AUWE52eTplXJ5YSa4lS4-@AUWE5yd7asW16SwejjDko@AUWE5yfD2iVxNVSeDvj4K@SanTTlZKpId5h-KB1QVKw@S5KkcRR1N9VXRIB3xwvQDdw@S5KkcRR8b9wLVIU-ix_UOcg`
 ]
 let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
 !(async () => {
-  $.tuanList = []
+  $.tuanList = [];
+  $.authorTuanList = [];
   await requireConfig();
-  if (helpAuthor) await getAuthorShareCode('https://raw.githubusercontent.com/ZFeng3242/updateTeam/master/shareCodes/jd_zz.json');
+  if (helpAuthor) await getAuthorShareCode('http://github.com/ZFeng3242/updateTeam/raw/master/shareCodes/jd_zz.json');
   if (helpAuthor) await getAuthorShareCode('https://raw.githubusercontent.com/ZFeng3242/updateTeam/master/shareCodes/jd_zz.json');
   if (!cookiesArr[0]) {
     $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
@@ -62,7 +54,7 @@ let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 
   for (let i = 0; i < cookiesArr.length; i++) {
     if (cookiesArr[i]) {
       cookie = cookiesArr[i];
-      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
+      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
       $.index = i + 1;
       $.isLogin = true;
       $.nickName = '';
@@ -87,13 +79,27 @@ let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 
       await notify.sendNotify($.name, allMessage);
     }
   }
+  console.log(`\n\n开始账号内部互助 【赚京豆(微信小程序)-瓜分京豆】活动(优先内部账号互助(需内部cookie数量大于${$.assistNum || 4}个)，如有剩余助力次数则给作者lxk0301助力)\n`)
   for (let i = 0; i < cookiesArr.length; i++) {
     $.canHelp = true
     if (cookiesArr[i]) {
       cookie = cookiesArr[i];
-      for (let j = 0; j < $.tuanList.length; ++j) {
-        await helpFriendTuan($.tuanList[j])
-        if(!$.canHelp) break
+      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
+      if ($.canHelp && cookiesArr.length > $.assistNum || 4) {
+        console.log(`开始账号内部互助 赚京豆-瓜分京豆 活动，优先内部账号互助`)
+        for (let j = 0; j < $.tuanList.length; ++j) {
+          console.log(`账号 ${$.UserName} 开始给 【${$.tuanList[j]['assistedPinEncrypted']}】助力`)
+          await helpFriendTuan($.tuanList[j])
+          if(!$.canHelp) break
+        }
+      }
+      if ($.canHelp) {
+        console.log(`开始账号内部互助 赚京豆-瓜分京豆 活动，如有剩余则给作者lxk0301助力`)
+        for (let j = 0; j < $.authorTuanList.length; ++j) {
+          console.log(`账号 ${$.UserName} 开始给作者lxk0301 ${$.authorTuanList[j]['assistedPinEncrypted']}助力`)
+          await helpFriendTuan($.authorTuanList[j])
+          if(!$.canHelp) break
+        }
       }
     }
   }
@@ -108,17 +114,18 @@ let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 
 async function jdWish() {
   $.bean = 0
   $.tuan = null
-  $.hasOpen = false
+  $.hasOpen = false;
+  $.assistStatus = 0;
+  await getTaskList(true)
   await getUserTuanInfo()
   if (!$.tuan) {
     await openTuan()
     if ($.hasOpen) await getUserTuanInfo()
   }
-  if ($.tuan) $.tuanList.push($.tuan)
+  if ($.tuan && $.assistStatus !== 3) $.tuanList.push($.tuan)
 
   await helpFriends()
   await getUserInfo()
-  await getTaskList()
   $.nowBean = parseInt($.totalBeanNum)
   $.nowNum = parseInt($.totalNum)
   for (let i = 0; i < $.taskList.length; ++i) {
@@ -144,25 +151,41 @@ function showMsg() {
     message += `本次获得${parseInt($.totalBeanNum) - $.nowBean}京豆，${parseInt($.totalNum) - $.nowNum}金币\n`
     message += `累计获得${$.totalBeanNum}京豆，${$.totalNum}金币\n可兑换${$.totalNum / 10000}元无门槛红包\n兑换入口:京东赚赚微信小程序->赚好礼->金币提现`
     if (parseInt($.totalBeanNum) - $.nowBean > 0) {
+      //IOS运行获得京豆大于0通知
       $.msg($.name, '', `京东账号${$.index} ${$.nickName}\n${message}`);
     } else {
       $.log(message)
     }
     // 云端大于10元无门槛红包时进行通知推送
-   // if ($.isNode() && $.totalNum >= 1000000) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `京东账号${$.index} ${$.nickName}\n当前金币：${$.totalNum}个\n可兑换无门槛红包：${parseInt($.totalNum) / 10000}元\n`,)
-    allMessage += `京东账号${$.index} ${$.nickName}\n当前金币：${$.totalNum}个\n可兑换无门槛红包：${parseInt($.totalNum) / 10000}元\n兑换入口:京东赚赚微信小程序->赚好礼->金币提现${$.index !== cookiesArr.length ? '\n\n' : ''}`;    resolve();
+    // if ($.isNode() && $.totalNum >= 1000000) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `京东账号${$.index} ${$.nickName}\n当前金币：${$.totalNum}个\n可兑换无门槛红包：${parseInt($.totalNum) / 10000}元\n`,)
+    allMessage += `京东账号${$.index} ${$.nickName}\n当前金币：${$.totalNum}个\n可兑换无门槛红包：${parseInt($.totalNum) / 10000}元\n兑换入口:京东赚赚微信小程序->赚好礼->金币提现${$.index !== cookiesArr.length ? '\n\n' : ''}`;
+    resolve();
   })
 }
 function getAuthorShareCode(url) {
   return new Promise(resolve => {
-    $.get({url: `${url}?${new Date()}`,
-      headers:{
+    const options = {
+      url: `${url}?${new Date()}`, "timeout": 10000, headers: {
         "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
-      }}, async (err, resp, data) => {
+      }
+    };
+    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
+      const tunnel = require("tunnel");
+      const agent = {
+        https: tunnel.httpsOverHttp({
+          proxy: {
+            host: process.env.TG_PROXY_HOST,
+            port: process.env.TG_PROXY_PORT * 1
+          }
+        })
+      }
+      Object.assign(options, { agent })
+    }
+    $.get(options, async (err, resp, data) => {
       try {
         if (err) {
         } else {
-          $.tuanList = $.tuanList.concat(JSON.parse(data))
+          $.authorTuanList = $.authorTuanList.concat(JSON.parse(data))
           console.log(`作者助力码获取成功`)
         }
       } catch (e) {
@@ -184,13 +207,13 @@ function helpFriendTuan(body) {
           if (safeGet(data)) {
             data = JSON.parse(data);
             if (data.success) {
-              console.log('助力成功')
+              console.log('助力结果：助力成功\n')
             } else {
-              if (data.resultCode === '9200008') console.log('不能助力自己')
-              else if (data.resultCode === '9200011') console.log('已经助力过')
-              else if (data.resultCode === '2400205') console.log('团已满')
-              else if (data.resultCode === '2400203') {console.log('助力次数已耗尽');$.canHelp = false}
-              else console.log(`未知错误`)
+              if (data.resultCode === '9200008') console.log('助力结果：不能助力自己\n')
+              else if (data.resultCode === '9200011') console.log('助力结果：已经助力过\n')
+              else if (data.resultCode === '2400205') console.log('助力结果：团已满\n')
+              else if (data.resultCode === '2400203') {console.log('助力结果：助力次数已耗尽\n');$.canHelp = false}
+              else console.log(`助力结果：未知错误\n`)
             }
           }
         }
@@ -214,14 +237,22 @@ function getUserTuanInfo() {
         } else {
           if (safeGet(data)) {
             data = JSON.parse(data);
-            if (data.data && !data.data.canStartNewAssist) {
-              $.tuan = {
-                "activityIdEncrypted": data.data.id,
-                "assistStartRecordId": data.data.assistStartRecordId,
-                "assistedPinEncrypted": data.data.encPin,
-                "channel": "FISSION_BEAN"
+            if (data['success']) {
+              $.log(`\n\n【赚京豆(微信小程序)-瓜分京豆】能否再次开团: ${data.data.canStartNewAssist ? '可以' : '否'}\n\n`)
+              if (data.data && !data.data.canStartNewAssist) {
+                $.tuan = {
+                  "activityIdEncrypted": data.data.id,
+                  "assistStartRecordId": data.data.assistStartRecordId,
+                  "assistedPinEncrypted": data.data.encPin,
+                  "channel": "FISSION_BEAN"
+                }
+                $.tuanActId = data.data.id;
+                $.assistStatus = data['data']['assistStatus'];
+                $.assistNum = data['data']['assistNum'] || 4;
               }
-              $.tuanActId = data.data.id
+            } else {
+              $.tuan = true;//活动火爆
+              console.log(`获取【赚京豆(微信小程序)-瓜分京豆】活动信息失败 ${JSON.stringify(data)}\n`)
             }
           }
         }
@@ -246,7 +277,10 @@ function openTuan() {
           if (safeGet(data)) {
             data = JSON.parse(data);
             if (data['success']) {
+              console.log(`【赚京豆(微信小程序)-瓜分京豆】开团成功`)
               $.hasOpen = true
+            } else {
+              console.log(`\n开团失败：${JSON.stringify(data)}\n`)
             }
           }
         }
@@ -269,11 +303,11 @@ function getUserInfo() {
         } else {
           if (safeGet(data)) {
             data = JSON.parse(data);
-            if (data.data.shareTaskRes) {
-              console.log(`\n【京东账号${$.index}（${$.nickName || $.UserName}）的${$.name}好友互助码】${data.data.shareTaskRes.itemId}\n`);
-            } else {
-              console.log(`\n\n已满5人助力或助力功能已下线,故暂时无${$.name}好友助力码\n\n`)
-            }
+            // if (data.data.shareTaskRes) {
+            //   console.log(`\n【京东账号${$.index}（${$.nickName || $.UserName}）的${$.name}好友互助码】${data.data.shareTaskRes.itemId}\n`);
+            // } else {
+            //   console.log(`\n\n已满5人助力或助力功能已下线,故暂时无${$.name}好友助力码\n\n`)
+            // }
           }
         }
       } catch (e) {
@@ -285,7 +319,7 @@ function getUserInfo() {
   })
 }
 
-function getTaskList() {
+function getTaskList(flag = false) {
   return new Promise(resolve => {
     $.get(taskUrl("interactTaskIndex"), async (err, resp, data) => {
       try {
@@ -298,6 +332,9 @@ function getTaskList() {
             $.taskList = data.data.taskDetailResList
             $.totalNum = data.data.totalNum
             $.totalBeanNum = data.data.totalBeanNum
+            if (flag && $.taskList.filter(item => !!item && item['taskId']=== 3) && $.taskList.filter(item => !!item && item['taskId']=== 3).length) {
+              console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${$.taskList.filter(item => !!item && item['taskId']=== 3)[0]['itemId']}\n`);
+            }
           }
         }
       } catch (e) {
@@ -352,7 +389,7 @@ async function helpFriends() {
 function readShareCode() {
   console.log(`开始`)
   return new Promise(async resolve => {
-    $.get({url: `https://raw.githubusercontent.com/ZFeng3242/RandomShareCode/master/JD_Jdzz.json`, 'timeout': 10000}, (err, resp, data) => {
+    $.get({url: `https://code.chiang.fun/api/v1/jd/jdzz/read/${randomCount}/`, 'timeout': 10000}, (err, resp, data) => {
       try {
         if (err) {
           console.log(`${JSON.stringify(err)}`)
@@ -431,7 +468,7 @@ function taskUrl(functionId, body = {}) {
       'Connection': 'keep-alive',
       'Content-Type': 'application/json',
       'Referer': 'http://wq.jd.com/wxapp/pages/hd-interaction/index/index',
-      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
+      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
       'Accept-Language': 'zh-cn',
       'Accept-Encoding': 'gzip, deflate, br',
     }
@@ -450,7 +487,7 @@ function taskTuanUrl(function_id, body = {}) {
       "Host": "api.m.jd.com",
       "Referer": "https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html",
       "Cookie": cookie,
-      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
+      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
     }
   }
 }
@@ -462,7 +499,7 @@ function taskPostUrl(function_id, body = {}) {
     headers: {
       "Cookie": cookie,
       'Content-Type': 'application/x-www-form-urlencoded',
-      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
+      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
     }
   }
 }
@@ -479,7 +516,7 @@ function TotalBean() {
         "Connection": "keep-alive",
         "Cookie": cookie,
         "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
-        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
+        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
       }
     }
     $.post(options, (err, resp, data) => {
@@ -495,7 +532,7 @@ function TotalBean() {
               return
             }
             if (data['retcode'] === 0) {
-              $.nickName = data['base'].nickname;
+              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
             } else {
               $.nickName = $.UserName
             }
@@ -536,4 +573,4 @@ function jsonParse(str) {
   }
 }
 // prettier-ignore
-function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
+function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
\ No newline at end of file
