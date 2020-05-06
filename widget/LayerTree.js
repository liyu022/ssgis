define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        'dojo/_base/array',
        "esri/layers/FeatureLayer",
        "dojo/on",
        "esri/graphic",
        "esri/config",
       "dojo/_base/xhr",
        "esri/request",
    	"esri/urlUtils",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        'dojo/query',
        ],function(declare, lang, array, basefx,MapAppconfig,arrayUtil,
        		FeatureLayer,on,Config,Graphic,Xhr,Request,UrlUtils,SimpleLineSymbol,SimpleFillSymbol,
        		SimpleMarkerSymbol,Color,PopupTemplate,InfoTemplate,query){
	return declare(null,{
		 treeNodeData: null,
		 treeObject:null,
		 featureLayer:null,
		 symbol:null,
		 isShow:false,
		 treenode: {
             treeSetting: {
                 check: {
                     enable: true
                 },
                 data: {
                     simpleData: {
                         enable: true
                     }
                 },
                 callback: {
                
                 },
                 view: {}
             }
         },
		 postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	this.inherited(arguments);
	        	
	        },
	        startup: function () {
	        	 
	        },
	        
	        intLayerTree:function(){
	            let self=this;
	            let treeSetting = this.treenode.treeSetting;
	            
	        	treeSetting.callback.onCheck = lang.hitch(this,this.TreeBeforecheck);
	        	treeSetting.callback.onCheck = lang.hitch(this,this.LayerTreeOnCheck)
	            treeSetting.callback.onClick = lang.hitch(this, function () {
                      return;
                  });
	          	this.treeNodeData=MapAppconfig.layerTree;
	        	this.treeObject=$.fn.zTree.init($("#layerTree"), treeSetting, this.treeNodeData);
	        	MapAppconfig.LayersTree=this.treeObject; 
	        	//初始widget时全部加载到地图  方便后面项目查询
	            //this.loadTree();
	        	
	        },
	        loadTree:function(){
	        	if(MapAppconfig.LayersTree!=null){
	        		let node=MapAppconfig.LayersTree.getNodes();
		        	var nodes= MapAppconfig.LayersTree.transformToArray(node);
		        	for(var i =0;i<nodes.length;i++){
		        		if(!nodes[i].isParent){
		        			
		        			this.loadLayer(nodes[i]);
		        		}
		            }
	        	}
	        },
	        LayerTreeOnCheck:function(event, treeId, treeNode){
	        	let nodes = [];
	        	innerErgodic(treeNode);
	            let hitchFun = lang.hitch(this, innerErgodic2);
                arrayUtil.forEach(nodes, hitchFun);
	        	function innerErgodic2(item, index){
	        		var checked = item.checked;
                    //checkedOld = item.checkedOld;
                if (checked) {
                	this.addLayer(item);
                   
                } else if (!checked) {
                  this.hiddenLayer(item);
                }
	        }
	        	//向nodes添加所有的根节点
              function innerErgodic(treeNode) {
                    if (treeNode.isParent) {
                        arrayUtil.forEach(treeNode.children, function (item, index) {
                            innerErgodic(item);
                        });
                    } else {
                        nodes.push(treeNode);
                    }
                }
	        	
	        },
	        TreeBeforecheck:function(event, treeId, treeNode){
	        	 innerFun(treeNode);
                 //设置各个根节点的checkedOld属性
                 function innerFun(treeNode) {
                     if (treeNode.isParent) {
                         arrayUtil.forEach(treeNode.children, function (item, index) {
                             innerFun(item);
                         });
                     } else {
                         treeNode.checkedOld = treeNode.checked;
                     }
                 }
	        },
	        loadLayer:function(item){
	        	let layerurl=item.urlc;
        		let layerid=item.name+"layer";
                	  let param={
                      		id:layerid,
                      		opacity:0.6,
                      		outFields: ["*"],
                      	    mode: FeatureLayer.MODE_ONDEMAND
                      	    }
		
                this.featureLayer=new FeatureLayer(layerurl,param);
                MapAppconfig.map.addLayer(this.featureLayer);  
                this.featureLayer.setVisibility(false);
                
	        },
			getGraphicHtml:function(obj){
				//bianhao: "1"
				// code: "1LCZBHFYLCDGLGC1"
				// flname: "水土流失综合治理"
				// outcomename: "林草植被恢复与林草地改良工程"
				// proid: 1
				// proname: "沮河上游生态保护修复项目（一期）"
				// shuxinglist: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
				//0: {propertyname: "封育牌", outcomecount: 10, outcomeunit: "个"}
				//1: {propertyname: "铁丝护栏", outcomecount: 1980, outcomeunit: "100延米"}
				//2: {propertyname: "幼林抚育（3 年 4 次）", outcomecount: 840.7, outcomeunit: "公顷"}
				//3: {propertyname: "迎春花", outcomecount: 258741, outcomeunit: "株"}
				//4: {propertyname: "连翘", outcomecount: 924186, outcomeunit: "株"}
				//5: {propertyname: "侧柏", outcomecount: 130536, outcomeunit: "株"}
				//6: {propertyname: "油松", outcomecount: 551696, outcomeunit: "株"}
				//7: {propertyname: "块状（方形）整地（40*40*30）", outcomecount: 345876, outcomeunit: "个"}
				//8: {propertyname: "小鱼鳞坑", outcomecount: 837051, outcomeunit: "个"}
				//9: {propertyname: "大鱼鳞坑", outcomecount: 682232, outcomeunit: "个"}
				// subname: "铜川市沮河上游生态保护修复项目(西川及主河道片区)"
				// zlname: "林草植被恢复与林草地改良工程"

			},
	        addLayer:function(item){
	        	if(item!=null){
	        		let layerurl=item.urlc;
	        		let layerid=item.name+"layer";
	        		var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, layerid);
                    if (layerIndex != -1) {
                    	this.featureLayer=MapAppconfig.map._layers[layerid];
                    	MapAppconfig.map._layers[layerid].setVisibility(true);
                    	on(this.featureLayer,"click",(evt)=>{
                      		 
                      		 this.getGraphicInfo(evt);
                      		 MapAppconfig.map.infoWindow.show(evt.mapPoint);
                      		
                      		this.setFeatureGraphic(this.featureLayer,evt);
                      	  $("#lickPro").click(function(){
                  			alert(333); })
                  			
                             })
                         
                    	
                    }else{
                    	  let param={
                          		id:layerid,
                          		opacity:0.6,
                          		outFields: ["*"],
                          	    mode: FeatureLayer.MODE_ONDEMAND,
                          }
                    		
						this.featureLayer=new FeatureLayer(layerurl,param);
						MapAppconfig.map.addLayer(this.featureLayer);
						if(MapAppconfig.map._layers[layerid].visible){
							on(this.featureLayer,"click",(evt)=>{
								 Xhr.get({
									 url:"http://113.140.66.230:9777/commonservice-system/swagger2/say/getshuxingbygiscode?code="+evt.graphic.attributes.CODE,
									 handleAs : "json",
									 load : function(data) {
										 if(data.code==0){
                                             let obj = data.list;
                                             let html="";
                                             if(obj.bianhao!=null){
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编号: "+"</div><div  style='padding-left:5px'>"+obj.bianhao+"</div></div>"
                                             }else{
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编号: "+"</div><div  style='padding-left:5px'></div></div>"
											  }
                                             if(obj.code!=null){
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编码: "+"</div><div  style='padding-left:5px'>"+obj.code+"</div></div>"
                                             }else{
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编码: "+"</div><div  style='padding-left:5px'></div></div>"
											  }
                                             if(obj.flname!=null){
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"父类名称: "+"</div><div  style='padding-left:5px'>"+obj.flname+"</div></div>"
                                             }else{
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"父类名称: "+"</div><div  style='padding-left:5px'></div></div>"
                                             }
                                             if(obj.outcomename!=null){
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"成果名称: "+"</div><div  style='padding-left:5px'>"+obj.outcomename+"</div></div>"
                                             }else{
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"成果名称: "+"</div><div  style='padding-left:5px'></div></div>"
                                             }
                                             if(obj.proid!=null){
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目ID: "+"</div><div  style='padding-left:5px'>"+obj.proid+"</div></div>"
                                             }else{
                                                 html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目ID: "+"</div><div  style='padding-left:5px'></div></div>"
                                             }
                                             if(obj.subname!=null){
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+"子项目名: "+"</div><div style='padding-left:5px'>"+obj.subname+"</div></div>"
                                             }else{
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+"子项目名: "+"</div><div style='padding-left:5px'></div></div>"
                                             }
                                             if(obj.zlname!=null){
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"子分类: "+"</div><div  style='padding-left:5px'>"+obj.zlname+"</div></div>"
                                             }else{
                                                 html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"子分类: "+"</div><div  style='padding-left:5px'></div></div>"
                                             }
                                             if(obj.shuxinglist!=null) {
                                                 for (let i = 0; i < obj.shuxinglist.length; i++) {
                                                     if (obj.shuxinglist[i].propertyname!=null) {
                                                         html += "<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >" + obj.shuxinglist[i].propertyname + ":</div><div  style='padding-left:5px'>" + obj.shuxinglist[i].outcomecount + ""+ obj.shuxinglist[i].outcomeunit+ "</div></div>"
                                                     }
                                                 }
                                             }
											  MapAppconfig.map.infoWindow.setTitle(obj.proname);
                                             MapAppconfig.map.infoWindow.setContent(html)
                                             MapAppconfig.map.infoWindow.show(evt.mapPoint);
										 }else{
											alert("数据后台访问接口异常！");
										 }
									 }
								 })
							 });
						}
	        		}
	        	}},
	        	setFeatureGraphic:function(featurelayer,evt){
	        		let geo=evt.graphic.geometry;
	        		
	        		let symBol=this.setSymbol(geo);
	        	
	        		 let tempIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "templayerid");
                    if(tempIndex!=-1){
                   	 let tempLayer= MapAppconfig.map._layers["templayerid"];
                   	 tempLayer.clear();
                   	 let graphic=new Graphic(evt.graphic.geometry,symBol,evt.graphic.attributes); 
                   	 tempLayer.add(graphic)
                   	 MapAppconfig.map.centerAndZoom(evt.graphic._extent.getCenter(),13)
                   	
                    }	
	        		
	        		
	        	},
	          setSymbol:function(geo){
	        	 switch (geo.type) {
         		 case "point":
	                    this.symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE,25,
	                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),1),
	                        new Color([0,255,0,0.1]));
	                    break;
	                case "polyline":
	                	this.symbol  = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
	                        new Color([179,0,255]),5);
	                    break;
	                case "polygon":
	                	this.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,new Color([0,0,255]),1),
		                        new Color([255,0,0,0]));
	                    break;
						

					default:
						break;
					}
	        	  return this.symbol;
	          },	
	          hiddenLayer:function(item){
	        	if(item!=null){
	        		let layerurl=item.urlc;
	        		let layerid=item.name+"layer";
	        		var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, layerid);
	        		if(layerIndex!=-1){
	        			MapAppconfig.map._layers[layerid].setVisibility(false);
	        		}
	        		
	        	}
	        	
	        },
	        showLightLayer:function(){
	        	let layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "templayerid");
	        	if(layerIndex!=-1){
	        		
	        	}
	        },

        getGraphicInfo:function(evt){

            if(evt.graphic!=null||evt.graphic!=undefined ||evt.graphic!=''){
                evt.graphic.attributes.NAME!=null?MapAppconfig.map.infoWindow.setTitle(evt.graphic.attributes.NAME)
                    :MapAppconfig.map.infoWindow.setTitle("");
                let html="";

                if(evt.graphic.attributes.PARENTTYPE!=null){
                    html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"专题类型: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.PARENTTYPE+"</div></div>"
                }
                if(evt.graphic.attributes.PRONAME!=null){
                    html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目名称: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.PRONAME+"</div></div>"
                }
                if(evt.graphic.attributes.PROTYPE!=null){
                    html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目类型: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.PROTYPE+"</div></div>"
                }
                if(evt.graphic.attributes.PRO_ID!=null){
                    html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目编号: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.PRO_ID+"</div></div>"
                }
                if(evt.graphic.attributes.BUILDER!=null){
                    html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"建设单位: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.BUILDER+"</div></div>"
                }
                if(evt.graphic.attributes.COUNTY!=null){
                    html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+"所在区: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.COUNTY+"</div></div>"
                }
                if(evt.graphic.attributes.TOWN!=null){
                    html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+"所在镇: "+"</div><div style='padding-left:5px'>"+evt.graphic.attributes.TOWN+"</div></div>"
                }
                if(evt.graphic.attributes.VILLAGE!=null){
                    html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"所在乡: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.VILLAGE+"</div></div>"
                }
                html+="<div style='margin-top: 2px;float:right'><div type='button' id='lickPro' class='layui-btn layui-btn-xs layui-btn-normal'>查看项目</div></div>"
                MapAppconfig.map.infoWindow.setContent(html)
            }
        }

		
	})

	
})