(function(t){function e(e){for(var r,l,i=e[0],o=e[1],c=e[2],d=0,p=[];d<i.length;d++)l=i[d],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&p.push(n[l][0]),n[l]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,i=1;i<a.length;i++){var o=a[i];0!==n[o]&&(r=!1)}r&&(s.splice(e--,1),t=l(l.s=a[0]))}return t}var r={},n={app:0},s=[];function l(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=t,l.c=r,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(a,r,function(e){return t[e]}.bind(null,r));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=o;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},2:function(t,e){},4678:function(t,e,a){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=s(t);return a(e)}function s(t){if(!a.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}n.keys=function(){return Object.keys(r)},n.resolve=s,t.exports=n,n.id="4678"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("router-view")],1),a("v-footer",{staticClass:"mt-5",attrs:{dark:!0,inset:!0}},[a("v-container",[a("p",{staticClass:"text-center my-5"},[t._v("TEI-C東アジア/日本語分科会")])])],1)],1)},s=[],l={data:function(){return{}},methods:{}},i=l,o=a("2877"),c=a("6544"),u=a.n(c),d=a("7496"),p=a("a523"),f=a("a75b"),m=a("553a"),h=Object(o["a"])(i,n,s,!1,null,null,null),v=h.exports;u()(h,{VApp:d["a"],VContainer:p["a"],VContent:f["a"],VFooter:m["a"]});var b=a("8c4f"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-app-bar",[a("v-toolbar-title",[t._v("TEI Level 4 Viewer")]),a("v-spacer"),a("v-menu",{attrs:{left:"",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({attrs:{icon:""}},r),[a("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[a("v-list",t._l(t.map,(function(e,r){return a("v-list-item",{key:r,on:{click:function(a){t.components.c=e,t.dialog=!t.dialog}}},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(r))])],1)],1)})),1)],1),a("v-btn",{attrs:{icon:"",href:"./"}},[a("v-icon",[t._v("mdi-home")])],1)],1),a("v-container",{directives:[{name:"show",rawName:"v-show",value:!t.start,expression:"!start"}],staticClass:"my-5"},[a("h2",{staticClass:"mb-5"},[t._v("TEI Level 4 Viewer")]),a("p",[t._v("TEI/XMLファイルを選択してください。")]),a("input",{attrs:{type:"file",id:"files",multiple:""},on:{change:t.handleFileSelect}}),a("output",{staticClass:"mt-5",attrs:{id:"list"}}),a("br"),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例１：走れメロス")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=https://www.dhii.jp/nagasaki/dazai_all_20191012.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"https://www.dhii.jp/nagasaki/dazai_all_20191012.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例２：芥川龍之介 三つの宝")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/1126_tei.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v("例３：芥川龍之介 二人小町")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"https://raw.githubusercontent.com/TEI-EAJ/aozora_tei/master/data/complete/tei_lib_lv3/86_tei.xml",target:"_blank"}},[t._v("サンプルデータを見る")]),a("br"),a("br"),a("p",{staticClass:"mt-5"},[t._v(" 例４：Emily Dickinson ‘Faith is a fine invention’ from "),a("a",{attrs:{href:"http://v-machine.org/samples/"}},[t._v("Versioning Machine")])]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"primary",to:"/?u=https://tei-eaj.github.io/koui/data/faith.xml"}},[t._v("可視化例を見る")]),a("v-btn",{staticClass:"mx-2 my-1",attrs:{href:"http://v-machine.org/samples/faith.xml",target:"_blank"}},[t._v("サンプルデータを見る")])],1),t.start?a("div",{staticStyle:{height:"800px"}},[a("splitpanes",{staticClass:"default-theme",attrs:{size:"50"}},[a("pane",{attrs:{size:"20"}},[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal",size:"50"}},[a("pane",{attrs:{size:"50"}},[a(t.components.c1,{tag:"component",attrs:{xml:t.xml,props:t.props}})],1),a("pane",{attrs:{size:"50"}},[a(t.components.c2,{tag:"component",attrs:{xml:t.xml,props:t.props}})],1)],1)],1),a("pane",{attrs:{size:"60"}},[a("v-card",{staticClass:"ma-2 pa-2",staticStyle:{overflow:"auto",height:"100%"}},[a("v-card-text",{staticClass:"text--primary"},[a("Hello",{attrs:{elements:t.data.elements},on:{parentMessage:t.messageLog}})],1)],1)],1),a("pane",{attrs:{size:"20"}},[a("splitpanes",{staticClass:"default-theme",attrs:{horizontal:"horizontal",size:"50"}},[a("pane",{attrs:{size:"50"}},[a(t.components.c3,{tag:"component",attrs:{xml:t.xml,props:t.props}})],1),a("pane",{attrs:{size:"50"}},[a(t.components.c4,{tag:"component",attrs:{xml:t.xml,props:t.props}})],1)],1)],1)],1)],1):t._e(),a("v-dialog",{attrs:{width:"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a(t.components.c,{tag:"component",attrs:{xml:t.xml,props:t.props}})],1)],1)},j=[],y=(a("c975"),a("d81d"),a("4e82"),a("a9e3"),a("b64b"),a("d3b7"),a("ac1f"),a("5319"),a("1276"),a("9f12")),x=a("53fe"),A=a("bc3a"),k=a.n(A),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2 pa-2",staticStyle:{overflow:"auto",height:"100%"}},[a("v-img",{attrs:{src:"data:image/jpeg;base64,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"}}),a("v-card-title",[t._v("田崎真也")]),a("v-card-subtitle",[t._v("たさき しんや")]),a("v-divider"),a("v-card-text",{staticClass:"text--primary"},[a("div",[t._v(" 田崎 眞也は、日本のソムリエ、ワインタレント、料理評論家。有限会社サンティール代表取締役社長、有限会社インターソムリエ代表取締役社長、有限会社エルミタージュ代表取締役社長、日本ソムリエ協会会長。報道などでは新字体で田崎 真也と表記されることもある。 "),a("a",{attrs:{href:"#"}},[t._v("ウィキペディア")])])])],1)},C=[],w={data:function(){return{}},methods:{}},z=w,O=a("b0af"),V=a("99d9"),T=a("ce7e"),S=a("adda"),I=Object(o["a"])(z,_,C,!1,null,null,null),q=I.exports;u()(I,{VCard:O["a"],VCardSubtitle:V["a"],VCardText:V["b"],VCardTitle:V["c"],VDivider:T["a"],VImg:S["a"]});var E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ma-2 pa-2"},[a("div",{staticStyle:{width:"100%",height:"600px"}},[a("l-map",{attrs:{zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,(function(e,r){return a("l-marker",{key:r,attrs:{"lat-lng":e.latlng}},[a("l-popup",[a("a",{attrs:{target:"_blank",href:e.url}},[t._v(t._s(e.content))])])],1)}))],2)],1)])},P=[],N=a("2699"),B=a("a40a"),L=a("4e2b"),H=a("f60f"),M=a("e11e");a("6cc5");delete M["Icon"].Default.prototype._getIconUrl,M["Icon"].Default.mergeOptions({iconRetinaUrl:a("584d"),iconUrl:a("6397"),shadowUrl:a("e2b9")});var W={components:{LMap:N["a"],LTileLayer:B["a"],LMarker:L["a"],LPopup:H["a"]},data:function(){return{url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",zoom:8,center:[35.693825,139.703356]}},methods:{}},D=W,Q=Object(o["a"])(D,E,P,!1,null,null,null),J=Q.exports,G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2"},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("外部サイト")])],1),t.label?[a("v-list",{attrs:{subheader:""}},[a("v-subheader",[t._v("「"+t._s(t.label)+"」を調べる")]),t._l(t.items,(function(e){return a("v-list-item",{key:e.title,attrs:{href:e.link+t.label,target:"_blank"}},[a("v-list-item-avatar",[a("v-img",{attrs:{src:e.avator}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],2)]:t._e()],2)},R=[],U={data:function(){return{label:null,items:[{title:"Wikipedia",avator:"https://pbs.twimg.com/profile_images/378800000669744275/31f249f84c8297ba8fc3fd9b6c63816f_400x400.png",link:"https://ja.wikipedia.org/wiki/"},{title:"Twitter",avator:"https://image.flaticon.com/icons/png/512/124/124021.png",link:"https://twitter.com/hashtag/"},{title:"Amazon",avator:"https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png",link:"https://www.amazon.co.jp/s?k="}]}},props:["xml","props"],mounted:function(){this.init(),this.main()},watch:{props:function(){this.main()},xml:function(){this.init()}},methods:{init:function(){},main:function(){var t=null,e=this.props.e,a=["corresp","ref"];if(e&&e.attributes)for(var r=0;r<a.length;r++){var n=a[r];if(e.attributes[n]){var s=e.attributes[n];if(-1!=s.indexOf("#"))s=s.replace("#","");else{var l=s.split("/");s=l[l.length-1]}t=s}}else e&&e.elements&&(t=e.elements[0].text);this.label=t}}},F=U,K=a("8860"),X=a("da13"),Z=a("8270"),Y=a("5d23"),$=a("e0c7"),tt=a("71d9"),et=a("2a7f"),at=Object(o["a"])(F,G,R,!1,null,null,null),rt=at.exports;u()(at,{VCard:O["a"],VImg:S["a"],VList:K["a"],VListItem:X["a"],VListItemAvatar:Z["a"],VListItemContent:Y["a"],VListItemTitle:Y["b"],VSubheader:$["a"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2"},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("関連コンテンツ")])],1),a("v-list",{attrs:{subheader:""}},[a("v-subheader",[t._v("powered by MIMAサーチ")]),t._l(["aaa","bbb"],(function(e,r){return a("v-list-item",{key:r},[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e)}})],1)],1)}))],2)],1)},st=[],lt={data:function(){return{}},methods:{}},it=lt,ot=Object(o["a"])(it,nt,st,!1,null,null,null),ct=ot.exports;u()(ot,{VCard:O["a"],VList:K["a"],VListItem:X["a"],VListItemContent:Y["a"],VListItemTitle:Y["b"],VSubheader:$["a"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var ut=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2"},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("人物情報")])],1),a("v-card-title",[t._v(t._s(t.obj.persName))]),a("v-card-subtitle",[t._v(t._s(t.obj.occupation))])],1)},dt=[],pt={data:function(){return{map:{},obj:{}}},props:["xml","props"],mounted:function(){this.init(),this.main()},watch:{props:function(){this.main()},xml:function(){this.init()}},methods:{init:function(){var t=this.xml,e=t.querySelector("listPerson");if(e){for(var a=e.querySelectorAll("person"),r={},n=0;n<a.length;n++){var s=a[n],l=s.attributes["xml:id"].value,i={id:l};s.querySelector("persName")&&(i.persName=s.querySelector("persName").textContent),s.querySelector("occupation")&&(i.occupation=s.querySelector("occupation").textContent),r[i.id]=i}this.map=r}},main:function(){this.obj={};var t=this.props.e;if(t&&t.attributes){for(var e=null,a=["corresp","ref"],r=0;r<a.length;r++){var n=a[r];t.attributes[n]&&(e=this.props.e.attributes[n].replace("#",""))}this.map[e]&&(this.obj=this.map[e])}}}},ft=pt,mt=Object(o["a"])(ft,ut,dt,!1,null,null,null),ht=mt.exports;u()(mt,{VCard:O["a"],VCardSubtitle:V["a"],VCardTitle:V["c"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2",staticStyle:{overflow:"auto",height:"100%"}},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("呼称")])],1),t.arr.length>0?[a("v-card-title",[t._v("「"+t._s(t.id)+"」の呼称（"+t._s(t.arr.length)+"件）")]),a("v-card-text",[a("v-btn",{on:{click:function(e){t.flg=!t.flg}}},[t.flg?[t._v("グラフを隠す")]:[t._v("グラフを表示")]],2),a("Sunburst",{directives:[{name:"show",rawName:"v-show",value:t.flg,expression:"flg"}],attrs:{height:"300",data:t.data}}),a("ol",{staticClass:"mt-5"},t._l(t.arr,(function(e,r){return a("li",{key:r},[a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(r){var n=r.on;return[a("span",t._g({},n),[t._v(t._s(e.label))])]}}],null,!0)},[a("span",[t._v(t._s(e.size)+" / "+t._s(e.all)+" ("+t._s((e.size/e.all*100).toFixed(2))+"%)")])])],1)})),0)],1)]:t._e()],2)},bt=[],gt=(a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("sunburst",{staticClass:"mt-5",style:"height : "+t.height+"px",attrs:{data:t.data,colorScheme:"schemePastel1"},scopedSlots:t._u([{key:"legend",fn:function(t){var e=t.nodes,r=t.colorGetter,n=t.width;return a("breadcrumbTrail",{attrs:{current:e.mouseOver,root:e.root,colorGetter:r,from:e.zoomed,width:n}})}},{key:"top",fn:function(t){var e=t.nodes;return a("nodeInfoDisplayer",{attrs:{current:e.mouseOver,root:e.root,clicked:e.clicked,description:"of selected"}})}},{key:"default",fn:function(e){var r=e.on,n=e.actions;return[a("highlightOnHover",t._b({},"highlightOnHover",{on:r,actions:n},!1)),a("zoomOnClick",t._b({},"zoomOnClick",{on:r,actions:n},!1))]}}])})}),jt=[],yt=a("9b2a"),xt=(a("6116"),{components:{breadcrumbTrail:yt["breadcrumbTrail"],highlightOnHover:yt["highlightOnHover"],sunburst:yt["sunburst"],zoomOnClick:yt["zoomOnClick"],nodeInfoDisplayer:yt["nodeInfoDisplayer"]},props:["height","data"]}),At=xt,kt=Object(o["a"])(At,gt,jt,!1,null,null,null),_t=kt.exports,Ct={components:{Sunburst:_t},data:function(){return{flg:!1,arr:[],id:null,data:{}}},props:["xml","props"],mounted:function(){this.init(),this.main()},watch:{props:function(){this.main()},xml:function(){this.init()}},methods:{init:function(){},main:function(){this.arr=[],this.id=null;var t=this.props.e,e=null,a=["corresp","ref"];if(t&&"speaker"==t.name)for(var r=this.xml,n=r.querySelectorAll("speaker"),s=0;s<n.length;s++){var l=n[s];if(l.textContent==t.elements[0].text){e=l.parentElement.attributes.who.value.replace("#","");break}}else if(t&&t.attributes)for(var i=["corresp","ref"],o=0;o<i.length;o++){var c=i[o];t.attributes[c]&&(e=t.attributes[c].replace("#",""))}if(null!=e){this.id=e;var u=this.xml;if(u){for(var d=u.querySelector("body"),p=[],f=0;f<a.length;f++)for(var m=d.querySelectorAll("["+a[f]+'="#'+e+'"]'),h=0;h<m.length;h++)p.push(m[h]);for(var v={},b=0,g=0;g<p.length;g++){var j=p[g],y=j.textContent;v[y]||(v[y]=0),v[y]+=1,b+=1}for(var x=[],A=0;A<p.length;A++){var k=p[A],_=k.textContent;x.push({label:_,size:v[_],all:b})}this.arr=x;var C=[];for(var w in v)C.push({name:w,size:v[w]});this.data={children:C}}}}}},wt=Ct,zt=a("8336"),Ot=a("3a2f"),Vt=Object(o["a"])(wt,vt,bt,!1,null,null,null),Tt=Vt.exports;u()(Vt,{VBtn:zt["a"],VCard:O["a"],VCardText:V["b"],VCardTitle:V["c"],VToolbar:tt["a"],VToolbarTitle:et["a"],VTooltip:Ot["a"]});var St=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"ma-2",staticStyle:{overflow:"auto",height:"100%"}},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("発話内容")])],1),t.arr.length>0?[a("v-card-title",[t._v("「"+t._s(t.id)+"」の発話（"+t._s(t.arr.length)+"件）")]),a("v-card-text",[a("v-btn",{on:{click:function(e){t.flg=!t.flg}}},[t.flg?[t._v("ワードクラウドを隠す")]:[t._v("ワードクラウドを表示")]],2),a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.flg,expression:"flg"}],staticClass:"mt-2",attrs:{outlined:""}},[a("v-card-text",[a("Wordcloud",{attrs:{text:t.text}})],1)],1),a("ol",{staticClass:"mt-5"},t._l(t.arr,(function(e,r){return a("li",{key:r},[t._v(t._s(e))])})),0)],1)]:t._e()],2)},It=[],qt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mt-2"},[0==t.defaultWords.length?[a("div",[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.conv()}}},[t._v("実行")]),a("p",{staticClass:"mt-5"},[t._v(t._s(t.status))])],1)]:[a("wordcloud",{attrs:{data:t.defaultWords,nameKey:"name",valueKey:"value",color:t.myColors,showTooltip:!0,wordClick:t.wordClickHandler}}),a("v-card",{attrs:{outlined:""}},[a("v-card-title",[a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{attrs:{dense:"",headers:t.headers,items:t.defaultWords,search:t.search}})],1)]],2)},Et=[],Pt=(a("96cf"),a("b23c")),Nt=a.n(Pt),Bt=a("9b23"),Lt=a.n(Bt),Ht={components:{wordcloud:Lt.a},props:["text"],name:"Wordcloud",data:function(){return{status:"",builder:Nt.a.builder({dicPath:"dict"}),myColors:["#1f77b4","#629fc9","#94bedb","#c9e0ef"],defaultWords:[],tmp:"",search:"",headers:[{text:"形態素",value:"name"},{text:"出現回数",value:"value"}],desserts:this.defaultWords}},watch:{text:function(){this.defaultWords=[]}},methods:{wordClickHandler:function(t,e,a){this.tmp=e+a},conv:function(){var t,e,a,r,n;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:return t=this.text,e=t.length,a=1e5,r=this.text.length.toLocaleString()+"文字",e>a&&(t=t.substr(0,a),r="文字が多いため、はじめの"+a.toLocaleString()+"文字（"+e.toLocaleString()+"文字中）"),r+="のテキストを処理中。",this.status=r,n=this,s.t0=this.builder,s.next=11,regeneratorRuntime.awrap((function(e,a){if(e)throw n.status="",e;for(var r=a.tokenize(t),s={},l=0;l<r.length;l++){var i=r[l];if("名詞"==i.pos&&"非自立"!==i.pos_detail_1){var o=i.surface_form;s[o]||(s[o]=0),s[o]+=1}}var c=[];for(var u in s)c.push({name:u,value:s[u]});n.defaultWords=c,n.status=""}));case 11:s.t1=s.sent,s.t0.build.call(s.t0,s.t1);case 13:case"end":return s.stop()}}),null,this)}}},Mt=Ht,Wt=a("8fea"),Dt=a("2fa4"),Qt=a("8654"),Jt=Object(o["a"])(Mt,qt,Et,!1,null,null,null),Gt=Jt.exports;u()(Jt,{VBtn:zt["a"],VCard:O["a"],VCardTitle:V["c"],VDataTable:Wt["a"],VSpacer:Dt["a"],VTextField:Qt["a"]});var Rt={components:{Wordcloud:Gt},data:function(){return{flg:!1,arr:[],id:null,text:""}},props:["xml","props"],mounted:function(){this.init(),this.main()},watch:{props:function(){this.main()},xml:function(){this.init()}},methods:{init:function(){},main:function(){this.arr=[],this.id=null;var t=["corresp","ref"],e=this.props.e,a=null;if(e&&"speaker"==e.name)for(var r=this.xml,n=r.querySelectorAll("speaker"),s=0;s<n.length;s++){var l=n[s];if(l.textContent==e.elements[0].text){a=l.parentElement.attributes.who.value.replace("#","");break}}else if(e&&e.attributes)for(var i=0;i<t.length;i++){var o=t[i];e.attributes[o]&&(a=e.attributes[o].replace("#",""))}if(null!=a){this.id=a;var c=this.xml;if(c){for(var u=c.querySelector("body"),d=u.querySelectorAll("sp"),p=[],f=0;f<d.length;f++){var m=d[f];if(m.attributes&&m.attributes["who"]&&m.attributes["who"].value.replace("#","")==a){for(var h=m.querySelectorAll("p"),v="",b=0;b<h.length;b++)v+=h[b].textContent;p.push(v)}}d=u.querySelectorAll("said");for(var g=0;g<d.length;g++){var j=d[g];j.attributes["who"]&&j.attributes["who"].value.replace("#","")==a&&p.push(j.textContent)}this.arr=p;for(var y="",x=0;x<p.length;x++)y+=p[x]+"\n";this.text=y}}}}},Ut=Rt,Ft=Object(o["a"])(Ut,St,It,!1,null,null,null),Kt=Ft.exports;u()(Ft,{VBtn:zt["a"],VCard:O["a"],VCardText:V["b"],VCardTitle:V["c"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var Xt,Zt,Yt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{overflow:"auto",height:"100%"}},[a("v-toolbar",{staticClass:"headline grey lighten-2"},[a("v-toolbar-title",[t._v("人物の出現頻度")])],1),a("v-card",[a("v-card-text",[a("chart",{staticClass:"mb-4",attrs:{height:300,xml:t.xml}})],1)],1)],1)},$t=[],te=a("1fca"),ee={extends:te["a"],name:"chart",props:["xml"],watch:{xml:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){this.arr=[],this.id=null;var t=this.xml,e=["persName","rs"],a=["corresp","ref"];if(t){for(var r={},n=t.querySelector("body"),s=0;s<e.length;s++)for(var l=e[s],i=0;i<a.length;i++)for(var o=a[i],c=n.querySelectorAll(l+"["+o+"]"),u=0;u<c.length;u++)for(var d=c[u],p=d.attributes[o].value.split(" "),f=0;f<p.length;f++){var m=p[f].replace("#","");r[m]||(r[m]=0),r[m]+=1}var h=Object.keys(r).map((function(t){return{key:t,value:r[t]}}));h.sort((function(t,e){return t.value<e.value?1:t.value>e.value?-1:0}));for(var v=[],b=[],g=0;g<h.length;g++){var j=h[g];v.push(j.key),b.push(j.value)}var y={labels:v,datasets:[{label:"Frequency",data:b,borderWidth:1}]},x={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[],yAxes:[{ticks:{beginAtZero:!0}}]}};this.renderChart(y,x)}}}},ae=ee,re=Object(o["a"])(ae,Xt,Zt,!1,null,null,null),ne=re.exports,se={components:{Chart:ne},props:["xml","props"],data:function(){return{}}},le=se,ie=Object(o["a"])(le,Yt,$t,!1,null,null,null),oe=ie.exports;u()(ie,{VCard:O["a"],VCardText:V["b"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var ce=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{overflow:"auto",height:"100%"}},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("呼称割合の可視化")])],1),a("v-card",[a("v-card-text",[a("sunburst",{staticClass:"mt-5",staticStyle:{height:"600px"},attrs:{data:t.data,colorScheme:"schemePastel1"},scopedSlots:t._u([{key:"legend",fn:function(t){var e=t.nodes,r=t.colorGetter,n=t.width;return a("breadcrumbTrail",{attrs:{current:e.mouseOver,root:e.root,colorGetter:r,from:e.zoomed,width:n}})}},{key:"top",fn:function(t){var e=t.nodes;return a("nodeInfoDisplayer",{attrs:{current:e.mouseOver,root:e.root,clicked:e.clicked,description:"of selected"}})}},{key:"default",fn:function(e){var r=e.on,n=e.actions;return[a("highlightOnHover",t._b({},"highlightOnHover",{on:r,actions:n},!1)),a("zoomOnClick",t._b({},"zoomOnClick",{on:r,actions:n},!1))]}}])})],1)],1)],1)},ue=[],de={components:{breadcrumbTrail:yt["breadcrumbTrail"],highlightOnHover:yt["highlightOnHover"],sunburst:yt["sunburst"],zoomOnClick:yt["zoomOnClick"],nodeInfoDisplayer:yt["nodeInfoDisplayer"]},props:["xml","props"],data:function(){return{data:{}}},mounted:function(){this.init()},methods:{init:function(){this.arr=[],this.id=null;var t=this.xml,e=["persName","rs"],a=["corresp","ref"];if(t){for(var r={},n=t.querySelector("body"),s=0;s<e.length;s++)for(var l=e[s],i=0;i<a.length;i++)for(var o=a[i],c=n.querySelectorAll(l+"["+o+"]"),u=0;u<c.length;u++)for(var d=c[u],p=d.textContent,f=d.attributes[o].value.split(" "),m=0;m<f.length;m++){var h=f[m].replace("#","");r[h]||(r[h]={});var v=r[h];v[p]||(v[p]=0),v[p]+=1}var b=Object.keys(r).map((function(t){return{key:t,value:r[t]}}));b.sort((function(t,e){return t.value<e.value?1:t.value>e.value?-1:0}));var g=[];for(var j in r){var y=r[j],x=[];for(var A in y)x.push({name:A,size:y[A]});g.push({name:j,children:x})}this.data={children:g}}}}},pe=de,fe=Object(o["a"])(pe,ce,ue,!1,null,null,null),me=fe.exports;u()(fe,{VCard:O["a"],VCardText:V["b"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var he=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{overflow:"auto",height:"100%"}},[a("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[a("v-toolbar-title",[t._v("ワードクラウド")])],1),a("v-card-text",{staticClass:"mt-5"},[a("Wordcloud",{attrs:{text:t.text}})],1)],1)},ve=[],be={components:{Wordcloud:Gt},data:function(){return{text:""}},props:["xml","props"],created:function(){this.init(),this.main()},watch:{xml:function(){this.init()}},methods:{init:function(){},main:function(){var t=this.xml;if(t){for(var e=t.querySelector("body"),a=e.querySelectorAll("sp"),r=[],n=0;n<a.length;n++){var s=a[n];if(s.attributes&&s.attributes["who"]){for(var l=s.querySelectorAll("p"),i="",o=0;o<l.length;o++)i+=l[o].textContent;r.push(i)}}a=e.querySelectorAll("said");for(var c=0;c<a.length;c++){var u=a[c];r.push(u.textContent)}for(var d="",p=0;p<r.length;p++)d+=r[p]+"\n";this.text=d}}}},ge=be,je=Object(o["a"])(ge,he,ve,!1,null,null,null),ye=je.exports;u()(je,{VCard:O["a"],VCardText:V["b"],VToolbar:tt["a"],VToolbarTitle:et["a"]});var xe=a("c51a"),Ae={components:{Map:J,Wiki:q,Link:rt,MIMA:ct,Person:ht,Name:Tt,Sp:Kt,Graph:oe,Pie:me,Wordcloud:ye},data:function(){return{start:!1,dialog:!1,drawer:!1,data:null,xml:null,e:null,components:{c1:"Person",c2:"Link",c3:"Name",c4:"Sp"},map:{"人物の出現頻度":oe,"呼称割合の可視化":me,"ワードクラウド":ye}}},mounted:function(){this.init()},watch:{$route:function(){this.$router.go({path:this.$router.currentRoute.path,force:!0})},xml:function(){this.handleXml()}},computed:{props:function(){return{e:this.e}}},methods:{handleFileSelect:function(t){for(var e=t.target.files,a=0;a<e.length;a++){var r=e[a],n=new FileReader;n.readAsText(r);var s=this;n.onload=function(){var t=new DOMParser,e=t.parseFromString(n.result,"text/xml");s.xml=e}}},handleXml:function(){var t=this.xml,e=(new XMLSerializer).serializeToString(t),a=xe.xml2json(e,{compact:!1,spaces:4});this.data=JSON.parse(a),this.start=!0},init:function(){var t=this,e=null==this.$route.query.u?null:this.$route.query.u;e?(-1!=e.indexOf("bbp")&&(this.components={c1:"Wiki",c2:"Map",c3:"MIMA",c4:"Link",c:"Graph"}),k.a.get(e,{}).then((function(e){var a=e.data;if("string"==typeof a){var r=new DOMParser;a=r.parseFromString(a,"text/xml")}t.xml=a}))):this.start=!1},messageLog:function(t){this.e=t},init2:function(){var t=this,e=null==this.$route.query.u?"test3.xml":this.$route.query.u;this.exec2main(e);for(var a=Object.assign({},this.$route.query),r=a.class?a.class.split(","):["Q282"],n=function(){function t(e){Object(y["a"])(this,t),this.endpoint=e}return Object(x["a"])(t,[{key:"query",value:function(t){var e=this.endpoint+"?query="+encodeURIComponent(t),a={Accept:"application/sparql-results+json"};return fetch(e,{headers:a}).then((function(t){return t.json()}))}}]),t}(),s="https://query.wikidata.org/sparql",l="",i=0;i<r.length;i++){var o=r[i];l+="{  ?item wdt:P31 wd:"+o+";\n        rdfs:label ?label . }",i!=r.length-1&&(l+=" UNION ")}var c="#ネコ\n      SELECT DISTINCT *\n      WHERE \n      {\n  "+l+'\n    filter(lang(?label) = "en")\n    optional { ?item schema:description ?description . filter(lang(?description) = "en")}\n    optional { ?item wdt:P18 ?image }\n    optional { ?item wdt:P571 ?inception }\n    optional { ?item wdt:P495 ?country . ?country rdfs:label ?country_label . filter(lang(?country_label) = "en")}\n    optional { ?item wdt:P176 ?manufacturer . ?manufacturer  rdfs:label ?manufacturer_label . filter(lang(?manufacturer_label) = "en") }\n  }',u=new n(s);u.query(c).then((function(e){for(var a=e.results.bindings,r={},n=0;n<a.length;n++){var s=a[n];for(var l in s){var i=s[l].value;"inception"==l&&(i=i.split("-")[0]),r[l]||(r[l]={}),r[l][i]||(r[l][i]=0),r[l][i]+=1}}for(var o={},c=[{label:"Inception",field:"inception"},{label:"Country",field:"country_label"},{label:"Manufacturer",field:"manufacturer_label"}],u={},d=0;d<c.length;d++){var p=c[d];u[p.label]={terms:{field:p.field,order:{_count:"desc"},size:20}}}var f=function(t){var e=u[t].terms,a=Number(e.size),n=e.field.replace(".keyword",""),s=r[n],l={};for(var i in s)l[i]=s[i];var c=Object.keys(l).map((function(t){return{key:t,value:l[t]}}));c.sort((function(t,e){return t.value<e.value?1:t.value>e.value?-1:0})),a>c.length&&(a=c.length);for(var d=[],p=0;p<a;p++)d.push({key:c[p].key,doc_count:c[p].value});o[n]={buckets:d}};for(var m in u)f(m);var h={aggregations:o,hits:{hits:a,total:{relation:"gte",value:a.length}}};t.results=h}))}}},ke=Ae,_e=a("40dc"),Ce=a("169a"),we=a("132d"),ze=a("e449"),Oe=Object(o["a"])(ke,g,j,!1,null,null,null),Ve=Oe.exports;u()(Oe,{VAppBar:_e["a"],VBtn:zt["a"],VCard:O["a"],VCardText:V["b"],VContainer:p["a"],VDialog:Ce["a"],VIcon:we["a"],VList:K["a"],VListItem:X["a"],VListItemContent:Y["a"],VListItemTitle:Y["b"],VMenu:ze["a"],VSpacer:Dt["a"],VToolbarTitle:et["a"]}),r["a"].use(b["a"]);var Te=[{path:"/",name:"index",component:Ve},{path:"/test",name:"test",component:Gt}],Se=new b["a"]({base:"",routes:Te,scrollBehavior:function(){return{x:0,y:0}}}),Ie=Se,qe=a("f309");r["a"].use(qe["a"]);var Ee=new qe["a"]({}),Pe=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[t._l(t.elements,(function(e,r){return[e.text?[a("span",{key:r},[t._v(t._s(e.text))])]:"p"==e.name||"head"==e.name||"ab"==e.name||"list"==e.name||"listPerson"==e.name||"item"==e.name||"person"==e.name?[a("span",{key:r,staticClass:"my-5",class:"tei-"+e.name},[e.elements?a("Hello",{key:r,attrs:{elements:e.elements,parent:e.name},on:{parentMessage:t.messageLog}}):t._e()],1)]:"teiHeader"==e.name?[a("v-sheet",{key:r,staticClass:"pa-5",attrs:{color:"grey lighten-3"}},[e.elements?a("Hello",{key:r,attrs:{elements:e.elements,parent:e.name},on:{parentMessage:t.messageLog}}):t._e()],1)]:"title"==e.name?[a("h2",{key:r,staticClass:"my-5"},[e.elements?a("Hello",{key:r,attrs:{elements:e.elements,parent:e.name},on:{parentMessage:t.messageLog}}):t._e()],1)]:"eaj:ruby"==e.name||e.attributes&&"ruby"==e.attributes.type?[a("ruby",{key:r},[a("Hello",{attrs:{elements:e.elements[0].elements}}),a("rt",[t._v(t._s(e.elements[2].elements[0].text))])],1)]:"persName"==e.name||"placeName"==e.name||"name"==e.name||"rs"==e.name||"speaker"==e.name?[a("span",{key:r,class:"tei-"+e.name,style:"person"!=t.parent&&"respStmt"!=t.parent?t.style(e.name):"margin-right : 10px; margin-left : 10px;",attrs:{id:e.id},on:{click:function(a){"person"!=t.parent&&"respStmt"!=t.parent&&t.$emit("parentMessage",e)}}},[e.elements?a("Hello",{key:r,attrs:{elements:e.elements,parent:e.name},on:{parentMessage:t.messageLog}}):t._e()],1)]:"figure"!=e.name?[a("span",{key:r,class:"tei-"+e.name},[e.elements?a("Hello",{key:r,attrs:{elements:e.elements,parent:e.name},on:{parentMessage:t.messageLog}}):t._e()],1)]:t._e()]}))],2)},Ne=[],Be=a("eb9a"),Le={name:"Hello",props:["elements","flg","parent"],data:function(){return{}},mounted:function(){for(var t=this.elements,e=0;e<t.length;e++){var a=t[e];a.id=Be["a"].v1()}},methods:{messageLog:function(t){this.$emit("parentMessage",t)},style:function(t){var e="0,0,255";return"persName"==t||"rs"==t?e="0,255,0":"placeName"==t&&(e="255,0,0"),"background-color : rgba("+e+", 0.2);"}}},He=Le,Me=a("8dd9"),We=Object(o["a"])(He,Pe,Ne,!1,null,null,null),De=We.exports;u()(We,{VSheet:Me["a"]});var Qe=a("512e");r["a"].config.productionTip=!1,r["a"].component("Hello",De),r["a"].component("Splitpanes",Qe["Splitpanes"]),r["a"].component("Pane",Qe["Pane"]),new r["a"]({router:Ie,vuetify:Ee,render:function(t){return t(v)}}).$mount("#app")}});
//# sourceMappingURL=app.6158a12d.js.map