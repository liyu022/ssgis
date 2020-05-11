define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        'dojo/_base/array',
        "esri/layers/FeatureLayer",
        "dojo/on",
        "esri/tasks/query",
        "esri/graphic",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        'dojo/query',
        ],function(declare, lang, array, basefx,MapAppconfig,arrayUtil,
        		FeatureLayer,on,Query,Graphic,SimpleLineSymbol,
        		SimpleFillSymbol,SimpleMarkerSymbol,
        		Color,PopupTemplate,InfoTemplate,query){
	return declare(null,{
		 featureLayer:null,
		 symbol:null,
		 postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	this.inherited(arguments);
	        	
	        },
	        startup: function () {
	        	 
	        },
	        queryLayerTree:function(name){
	        	$("#layerTree").css('display', 'block');
	      		$("#layerTree").animate({left:"2px"}, 800,"linear", function () {});
	      	 MapAppconfig.LayersTree.checkAllNodes(false);
	      	 MapAppconfig.LayersTree.cancelSelectedNode();
	   		 let arry=MapAppconfig.layerTree;
	   		 if(arry.length>0){
            	 for(var i=0;i<arry.length;i++){
             		let layerid=arry[i].name+"layer";
             		let layerurl=arry[i].urlc;
             		let id=arry[i].id;
             		
             		if(layerurl!=undefined){
             			this.addLayer(layerid,name,layerurl,id);
             		}else{
             			continue
             		}
            	 }                
              }
	        },
	        addLayer:function(layerid,name,layerurl,id){
	        	let layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, layerid);
	        	if(layerid!=null){
                	  let param={
                      		id:layerid,
                      		opacity:0.6,
                      		outFields: ["*"],
                      	    mode: FeatureLayer.MODE_SNAPSHOT,
                      }
                    this.featureLayer=new FeatureLayer(layerurl,param);
                    let query = new Query();
                    query.where = "PRONAME = '"+name+"'";
                    this.featureLayer.queryCount(query, function(count) {
	                     if(count>0){
	                    	let node = MapAppconfig.LayersTree.getNodeByParam("id", id, null)
	                     	if(node !=null){
	                     		node.checked = true;
	                     		function checkNode(node){
	                     			if(node.getParentNode()!=null){
	                     				node.getParentNode().checked=true;
	                     				checkNode(node.getParentNode());
	                     			}
	                     			
	                     		};
	                     		checkNode(node);
	                     		MapAppconfig.LayersTree.updateNode(node);
	                     	}
	                        if (layerIndex == -1) {
	                        	this.featureLayer=new FeatureLayer(layerurl,param);
		                        MapAppconfig.map.addLayer(this.featureLayer); 
		                        this.featureLayer.setDefinitionExpression("PRONAME = '"+name+"'");
	                        }else{
	                        	MapAppconfig.map._layers[layerid].setDefinitionExpression("PRONAME = '"+name+"'");
		                        MapAppconfig.map._layers[layerid].setVisibility(true);
	                        }
	                        on(this.featureLayer,"click",lang.hitch(this,(evt)=>{
	                        	let self=this;
	                             getGraphicInfo(evt);
		   	                     setFeatureGraphic(this.featureLayer,evt);
                  		
	   	                    }));
	                        function setFeatureGraphic(featurelayer,evt){
	                    		let geo=evt.graphic.geometry;
	                    		let symBol=setSymbol(geo);
	                    		 let tempIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "templayerid");
	                            if(tempIndex!=-1){
	                           	 let tempLayer= MapAppconfig.map._layers["templayerid"];
	                           	 tempLayer.clear();
	                           	 let graphic=new Graphic(evt.graphic.geometry,symBol,evt.graphic.attributes); 
	                           	 tempLayer.add(graphic)
	                           	 MapAppconfig.map.centerAndZoom(evt.graphic._extent.getCenter(),13)
	                           	
	                            }	
	                    		
	                    		
	                    	};
	                      function setSymbol(geo){
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
	                       };
	   	                    function getGraphicInfo(evt){
								   if(evt.graphic.attributes.CODE==null){
									   alert("code为null");
									   MapAppconfig.map.infoWindow.hide();
								   }else{
									dojo.xhrGet({
										url: "http://113.140.66.230:9777/commonservice-system/swagger2/say/getshuxingbygiscode?code="+evt.graphic.attributes.CODE,
										handleAs: "json",
										preventCache: true,
										sync : true,
										load: dojo.hitch(this, function(response, ioargs){
											if(response.code==0){
												console.log(response);
												let html="";
												if(response.list.bianhao!=null){
													html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编号: "+"</div><div  style='padding-left:5px'>"+response.list.bianhao+"</div></div>"
												}
												if(response.list.code!=null){
													html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"编码: "+"</div><div  style='padding-left:5px'>"+response.list.code+"</div></div>"
												}
												if(response.list.outcomename!=null){
													html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"成果名称: "+"</div><div  style='padding-left:5px'>"+response.list.outcomename+"</div></div>"
												}
												if(response.list.proid!=null){
													html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目id: "+"</div><div  style='padding-left:5px'>"+response.list.proid+"</div></div>"
												}
												if(response.list.subname!=null){
													html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"子项目名称: "+"</div><div  style='padding-left:5px'>"+response.list.subname+"</div></div>"
												}
												if(response.list.zlname!=null){
													html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+"子分类名称: "+"</div><div  style='padding-left:5px'>"+response.list.zlname+"</div></div>"
												}
												if(response.list.shuxinglist.length>0){
													for(let i=0;i<response.list.shuxinglist.length;i++){
														html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;''><div >"+response.list.shuxinglist[i].propertyname+":</div><div style='padding-left:5px'>"+response.list.shuxinglist[i].outcomecount+response.list.shuxinglist[i].outcomeunit+"</div></div>"
													}
												}
												MapAppconfig.map.infoWindow.setContent(html);
												MapAppconfig.map.infoWindow.show(evt.mapPoint);
											}
										}),
										error: dojo.hitch(this, function(error, ioargs) {			
											console.log(error)
										})
									});
								}
							}
	                    }else{
	                    	if (layerIndex != -1) {
	                        	MapAppconfig.map._layers[layerid].setVisibility(false);
	                        }
	                    }
                    }, function(error) {
                      console.log(error);
                    });
	        	}
	        },
	    	
	        
	        	
	})

	
})