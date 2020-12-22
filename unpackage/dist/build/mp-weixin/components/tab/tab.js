(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tab/tab"],{"3aae":function(n,t,e){"use strict";e.r(t);var a=e("4e4a"),u=e("779b");for(var c in u)"default"!==c&&function(n){e.d(t,n,(function(){return u[n]}))}(c);e("6d44");var i,o=e("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=r.exports},"4e4a":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return a}));var a={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"483e"))}},u=function(){var n=this,t=n.$createElement;n._self._c},c=[]},"6d44":function(n,t,e){"use strict";var a=e("b8c5"),u=e.n(a);u.a},"779b":function(n,t,e){"use strict";e.r(t);var a=e("f03b"),u=e.n(a);for(var c in a)"default"!==c&&function(n){e.d(t,n,(function(){return a[n]}))}(c);t["default"]=u.a},b8c5:function(n,t,e){},f03b:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:{list:{type:Array,default:function(){return[]}},tabIndex:{type:Number,default:function(){return 0}}},watch:{tabIndex:function(n){this.activeIndex=n,console.log(this.activeIndex,"tab组件")}},data:function(){return{activeIndex:0}},methods:{open:function(){n.navigateTo({url:"/pages/home-label/home-label"})},clickTab:function(n,t){this.activeIndex=t,this.$emit("tab",{data:n,index:t})}}};t.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tab/tab-create-component',
    {
        'components/tab/tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3aae"))
        })
    },
    [['components/tab/tab-create-component']]
]);
