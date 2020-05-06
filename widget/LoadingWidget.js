/**  

* @Title: LoadingWidget.js

 * @Package

 * @Description: Loading条

 * @author kimbo

 * @date 2014年12月4日 上午10:23:46

 * @version V1.0

 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dijit/_WidgetBase",
        "dojo/topic",
        "dojo/on",
        "dojo/domReady!"],function(declare, lang, array,
                _WidgetBase, topic, on){
	 return {
		 loadDivId:"LOADINGWIDGETID",
		 timeOut:10*1000,//超时时间设置
		 showMsg:function(params){
			 if(!params){
				 params={};
			 }
			 var defaultParams={
						title:'系统信息',
						msg:'没有查询到相关记录',
						timeout:3000,
						showType:'slide',
						style:{
							 right:'',
							 bottom:''
						}
					};
			 var p=$.extend(defaultParams,params);
			 $.messager.show(p);
		 },
		 show:function(msg){
			 //<div style="width: 1349px; height: 1081px; display: block; z-index: 9002;" class="window-mask"></div>
			 var w=$(document.body).width();
			 var h=$(document.body).height();
			 var div=$("#"+this.loadDivId);
			 if(div.get(0)){
				 if(msg){
					 div.find("[name='msg']").html(msg);
				 }
				 div.show();
				 this.setTimeout();
				 return;
			 }
			 if(!msg){
				 msg="正在加载数据，请稍后...";
			 }
			 var msgDiv=$("<DIV>").attr({name:"msg"}).css({
				 width:"100%",
				 "text-align":"center",
				 "font-size":"12px",
				 position:"absolute",
				 top:h/2
			 }).html(msg);
			 $("<DIV>").attr({id:this.loadDivId}).css({
				 width:w,
				 height:h,
				 zIndex:9002
			 }).addClass("window-mask").append(msgDiv).appendTo(document.body);
			 this.setTimeout();
		 },
		 hide:function(){
			 var div=$("#"+this.loadDivId);
			 div.hide();
		 },
		 setTimeout:function(){
			 var self=this;
			 if(this.timer!=null){
				 window.clearTimeout(this.timer);
			 }
			 this.timer=window.setTimeout(function(){
				 self.hide();
				 this.timer=null;
			 },this.timeOut);
		 }
	 }
});