(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{788:function(t,e,r){"use strict";r.r(e);r(65),r(77),r(23),r(49),r(78);var l=r(103),n=r.n(l),o={props:["xml","props"],data:function(){return{results:[],label:null}},watch:{props:function(){this.main()},xml:function(){this.init()}},mounted:function(){this.init(),this.main()},methods:{init:function(){},main:function(){var label=null,t=this.props.e,e=["corresp","ref"];if(t&&t.attributes)for(var i=0;i<e.length;i++){var r=e[i];if(t.attributes[r]){var l=t.attributes[r];if(l.includes("#"))l=l.replace("#","");else{var o=l.split("/");l=o[o.length-1]}label=l}}else t&&t.elements&&(label=t.elements[0].text);this.label=label;var c="https://diyhistory.org/iiif_conv.php/http://demo:demo@mimasearch.jp/bbp/mimasearch/api?callback=jQuery1720936973559136278_1581945920314&action=search&min-score=0.1&start-index=1&max-results=50&alt=json&auth=bWltYXNlYXJjaDptaW1hc2VhcmNoMjAwOA==&q="+label+"&_=1581945921405";this.results=[],n.a.get(c).then(function(t){var data=t.data;data=(data="{"+data.split("( {")[1]).replace("} );","}"),data=JSON.parse(data),this.results=data.searchResultSet.results}.bind(this)).catch((function(t){alert(t)}))},getHtml:function(t){return t.summary+" <a target='_blank' href='http://mimasearch.jp/bbp/mimasearch/api?action=detail&q="+this.label+"&doc_id="+t.doc_id+"&db_id="+t.db_id+"'>MIMAサーチ</a>"}}},c=r(55),h=r(107),m=r.n(h),d=r(341),f=r(338),v=r(690),_=r(669),w=r(503),j=r(363),x=r(340),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"ma-2",staticStyle:{overflow:"auto",height:"100%"}},[r("v-toolbar",{staticClass:"headline grey lighten-2",attrs:{flat:""}},[r("v-toolbar-title",[t._v("関連コンテンツ")])],1),t._v(" "),t.label?[r("v-card-text",[r("v-list",{attrs:{subheader:""}},[r("v-subheader",[r("a",{attrs:{target:"_blank",href:"http://mimasearch.jp/bbp/mimasearch/#/q="+t.label}},[t._v("「"+t._s(t.label)+"」をMIMAサーチで検索する")])])],1),t._v(" "),r("ol",t._l(t.results,(function(e,l){return r("v-list-item",{key:l},[r("li",{domProps:{innerHTML:t._s(t.getHtml(e))}})])})),1)],1)]:t._e()],2)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VCard:d.a,VCardText:f.b,VList:v.a,VListItem:_.a,VSubheader:w.a,VToolbar:j.a,VToolbarTitle:x.b})}}]);