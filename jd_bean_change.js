diff --git a/jd_bean_change.js b/jd_bean_change.js
index 84c3d8b..15a9bdf 100644
--- a/jd_bean_change.js
+++ b/jd_bean_change.js
@@ -2,7 +2,7 @@
  * @Author: lxk0301 https://gitee.com/lxk0301
  * @Date: 2020-11-01 16:25:41
  * @Last Modified by:   lxk0301
- * @Last Modified time: 2021-03-29 15:25:41
+ * @Last Modified time: 2021-04-20 15:25:41
  */
 /*
 京东资产变动通知脚本：https://gitee.com/lxk0301/jd_scripts/raw/master/jd_bean_change.js
@@ -293,7 +293,7 @@ function redPacket() {
         } else {
           if (data) {
             data = JSON.parse(data).data
-            $.jxRed = 0, $.jsRed = 0, $.jdRed = 0, $.jxRedExpire = 0, $.jsRedExpire = 0, $.jdRedExpire = 0;
+            $.jxRed = 0, $.jsRed = 0, $.jdRed = 0, $.jdhRed = 0, $.jxRedExpire = 0, $.jsRedExpire = 0, $.jdRedExpire = 0, $.jdhRedExpire = 0;
             let t = new Date()
             t.setDate(t.getDate() + 1)
             t.setHours(0, 0, 0, 0)
@@ -309,6 +309,11 @@ function redPacket() {
                 if (vo['endTime'] === t) {
                   $.jsRedExpire += parseFloat(vo.balance)
                 }
+              } else if (vo.orgLimitStr && vo.orgLimitStr.includes("京东健康")) {
+                $.jdhRed += parseFloat(vo.balance)
+                if (vo['endTime'] === t) {
+                  $.jdhRedExpire += parseFloat(vo.balance)
+                }
               } else {
                 $.jdRed += parseFloat(vo.balance)
                 if (vo['endTime'] === t) {
@@ -321,7 +326,7 @@ function redPacket() {
             $.jdRed = $.jdRed.toFixed(2)
             $.balance = data.balance
             $.expiredBalance = data.expiredBalance || 0;
-            $.message += `\n当前总红包：${$.balance}(今日总过期${($.jxRedExpire + $.jsRedExpire + $.jdRedExpire).toFixed(2)})元 🧧\n京喜红包：${$.jxRed}(今日将过期${$.jxRedExpire.toFixed(2)})元 🧧\n极速版红包：${$.jsRed}(今日将过期${$.jsRedExpire.toFixed(2)})元 🧧\n京东红包：${$.jdRed}(今日将过期${$.jdRedExpire.toFixed(2)})元 🧧`;
+            $.message += `\n当前总红包：${$.balance}(今日总过期${($.jxRedExpire + $.jsRedExpire + $.jdRedExpire).toFixed(2)})元 🧧\n京喜红包：${$.jxRed}(今日将过期${$.jxRedExpire.toFixed(2)})元 🧧\n极速版红包：${$.jsRed}(今日将过期${$.jsRedExpire.toFixed(2)})元 🧧\n京东红包：${$.jdRed}(今日将过期${$.jdRedExpire.toFixed(2)})元 🧧\n健康红包：${$.jdhRed}(今日将过期${$.jdhRedExpire.toFixed(2)})元 🧧`;
             // if ($.expiredBalance > 0) $.message += `\n今明二日过期：${$.expiredBalance}元红包🧧`;
           } else {
             console.log(`京东服务器返回空数据`)

diff --git a/jd_club_lottery.js b/jd_club_lottery.js
index 5984b7c..c146b63 100644
--- a/jd_club_lottery.js
+++ b/jd_club_lottery.js
@@ -2,11 +2,12 @@
 * @Author: LXK9301
 * @Date: 2020-11-03 20:35:07
 * @Last Modified by: LXK9301
-* @Last Modified time: 2021-4-19 10:27:09
+* @Last Modified time: 2021-4-20 13:27:09
 */
 /*
 活动入口：京东APP首页-领京豆-摇京豆/京东APP首页-我的-京东会员-摇京豆
 增加京东APP首页超级摇一摇(不定时有活动)(此功能部分京东API抓包自：https://github.com/i-chenzhe/qx/blob/main/jd_shake.js)
+增加超级品牌日做任务及抽奖
 Modified from https://github.com/Zero-S1/JD_tools/blob/master/JD_vvipclub.py
 已支持IOS双京东账号,Node.js支持N个京东账号
 脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
@@ -47,7 +48,7 @@ let superShakeBeanConfig = {
   "taskVipName": "",
 }
 $.assigFirends = [];
-$.brandActivityId = 'd629534c-5276-4b59-953f-ba101df525e5';//超级品牌日活动ID
+$.brandActivityId = '';//超级品牌日活动ID
 $.brandActivityId2 = '2vSNXCeVuBy8mXTL2hhG3mwSysoL';//超级品牌日活动ID2
 const JD_API_HOST = 'https://api.m.jd.com/client.action';
 !(async () => {
@@ -898,18 +899,16 @@ function fc_getLottery(appId) {
 }
 //============超级品牌日==============
 async function superbrandShakeBean() {
-  if ($.brandActivityId) {
-    $.bradCanLottery = true;
-    await qryCompositeMaterials("advertGroup", "04405074", "Brands");//获取品牌活动ID
-    await superbrand_getHomeData();
-    if (!$.bradCanLottery) {
-      console.log(`【${$.stageName} 超级品牌日】：已完成抽奖`)
-      return
-    }
-    await superbrand_getMaterial();//获取完成任务所需的一些ID
-    await qryCompositeMaterials();//做任务
-    await superbrand_getGift();//抽奖
+  $.bradCanLottery = true;
+  await qryCompositeMaterials("advertGroup", "04405074", "Brands");//获取品牌活动ID
+  await superbrand_getHomeData();
+  if (!$.bradCanLottery) {
+    console.log(`【${$.stageName} 超级品牌日】：已完成抽奖或活动不在进行中`)
+    return
   }
+  await superbrand_getMaterial();//获取完成任务所需的一些ID
+  await qryCompositeMaterials();//做任务
+  await superbrand_getGift();//抽奖
 }
 function superbrand_getMaterial() {
   return new Promise(resolve => {
@@ -1084,6 +1083,9 @@ function superbrand_getHomeData() {
                 }
               } else {
                 console.log(`超级超级品牌日 getHomeData 失败： ${data['data']['bizMsg']}`)
+                if (data['data']['bizCode'] === 101) {
+                  $.bradCanLottery = false;
+                }
               }
             } else {
               console.log(`超级超级品牌日 getHomeData 异常： ${JSON.stringify(data)}`)
