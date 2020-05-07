define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        'dojo/_base/array',
        "esri/layers/FeatureLayer",
        "dojo/on",
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        'dojo/query',
        "widget/LayerTools"
        ],function(declare, lang, array, basefx,MapAppconfig,arrayUtil,
        		FeatureLayer,on,Graphic,SimpleLineSymbol,SimpleFillSymbol,
        		SimpleMarkerSymbol,Color,PopupTemplate,InfoTemplate,query,LayerTools){
	return declare(null,{
		 treeNodeData: null,
		 treeObject:null,
		 featureLayer:null,
		 symbol:null,
		 isShow:false,
		 layerTool:null,
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
	            this.layerTool=new LayerTools();
	        	treeSetting.callback.onCheck = lang.hitch(this,this.TreeBeforecheck);
	        	treeSetting.callback.onCheck = lang.hitch(this,this.LayerTreeOnCheck)
	            treeSetting.callback.onClick = lang.hitch(this, function () {
                      return;
	            
                  });
	        	 treeSetting.callback.onRightClick = lang.hitch(this,this.showRightMenu);
	          	this.treeNodeData=MapAppconfig.layerTree;
	        	this.treeObject=$.fn.zTree.init($("#layerTree"), treeSetting, this.treeNodeData);
	        	MapAppconfig.LayersTree=this.treeObject; 
	  
	        },
	        showRightMenu:function(event, treeId, treeNode){
	        	if(!treeNode.isParent){
	        		let top = $(window).scrollTop();
	        		this.showMenu(event.clientX, event.clientY+top);
	        		this.layerTool.intLayerTool(treeNode)
	        	}
	        	
	        },
	        showMenu:function(x, y){
	        	$("#rightMenu ul").show();
	        	$("#rightMenu").css({
	        		  "top" : y + "px",
	                  "left" : x + "px",
	                  "visibility" : "visible"
	        	});
	        	
	        },
	        loadTree:function(){
	        	
	        	if(MapAppconfig.LayersTree!=null){
	        		let node=MapAppconfig.LayersTree.getNodes();
		        	var nodes= MapAppconfig.LayersTree.transformToArray(node);
		        	for(var i =0;i<nodes.length;i++){
		        		if(!nodes[i].isParent){
		        		    console.log(nodes[i]);
		        			this.loadLayer(nodes[i]);
		        			MapAppconfig.LayersTree.checkNode(nodes[i], true, true);
		        		}else{
		        			MapAppconfig.LayersTree.checkNode(nodes[i], true, true);
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
                    //this.featureLayer.setDefinitionExpression("PRONAME='沮河上游生态保护修复项目（一期）'");
          		
                    if(MapAppconfig.map._layers[layerid].visible){
                    	
                    	 on(this.featureLayer,"click",(evt)=>{
                    		 
                    		 this.getGraphicInfo(evt);
                    		 MapAppconfig.map.infoWindow.show(evt.mapPoint);
                    		
                    		this.setFeatureGraphic(this.featureLayer,evt);
                    		  $("#lickPro").click(function(){
                      			alert(333);
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
	        	    html+="<div style='margin-top: 2px;float:right'><div type='button' id='lickPro' class='layui-btn layui-btn-xs layui-btn-normal'>查看详情</div></div>"
	     
	        	    MapAppconfig.map.infoWindow.setContent(html)
	        	
	        	
	        		
	        	}
	        	
	        }

		
	})

	
})