(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/feedback/feedback"],{"07d7":function(e,n,t){"use strict";(function(e){t("12ae");a(t("66fd"));var n=a(t("5133"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},5133:function(e,n,t){"use strict";t.r(n);var a=t("cd23"),u=t("f904");for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);t("b6c3");var c,o=t("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=r.exports},"62e8":function(e,n,t){},b6c3:function(e,n,t){"use strict";var a=t("62e8"),u=t.n(a);u.a},cd23:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return a}));var a={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"483e"))}},u=function(){var e=this,n=e.$createElement;e._self._c},i=[]},f904:function(e,n,t){"use strict";t.r(n);var a=t("f956"),u=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);n["default"]=u.a},f956:function(e,n,t){"use strict";(function(e,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=i(t("a34a"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t,a,u,i,c){try{var o=e[i](c),r=o.value}catch(s){return void t(s)}o.done?n(r):Promise.resolve(r).then(a,u)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(a,u){var i=e.apply(n,t);function o(e){c(i,a,u,o,r,"next",e)}function r(e){c(i,a,u,o,r,"throw",e)}o(void 0)}))}}var r={data:function(){return{imageList:[],content:""}},methods:{submit:function(){var n=this;return o(u.default.mark((function t(){var a,i,c;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],e.showLoading(),i=0;case 3:if(!(i<n.imageList.length)){t.next=11;break}return t.next=6,n.uploadFiles(n.imageList[i].url,n.imageList[i].name);case 6:c=t.sent,a.push(c);case 8:i++,t.next=3;break;case 11:n.updateFeedback({content:n.content,feedbackImages:a});case 12:case"end":return t.stop()}}),t)})))()},del:function(e){this.imageList.splice(e,1)},addImage:function(){var n=this,t=5-this.imageList.length;e.chooseImage({count:t,success:function(e){var a=e.tempFiles;a.forEach((function(e,a){a<t&&n.imageList.push({url:e.path,name:e.name})}))}})},uploadFiles:function(e,n){return o(u.default.mark((function t(){var i;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.uploadFile({filePath:e,cloudPath:n});case 2:return i=t.sent,console.log(i),t.abrupt("return",i.fileID);case 5:case"end":return t.stop()}}),t)})))()},updateFeedback:function(n){var t=this,a=n.content,u=n.feedbackImages;this.$api.update_feedback({content:a,feedbackImages:u}).then((function(n){console.log(n),e.hideLoading(),e.showToast({title:"反馈提交成功",icon:"none"}),t.imageList=[],t.content="",setTimeout((function(){e.switchTab({url:"/pages/tabbar/my/my"})}),1500)})).catch((function(){e.hideLoading(),e.showToast({title:"反馈提交失败",icon:"none"})}))}}};n.default=r}).call(this,t("543d")["default"],t("a9ff")["default"])}},[["07d7","common/runtime","common/vendor"]]]);