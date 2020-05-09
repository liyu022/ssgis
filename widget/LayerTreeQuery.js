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
        "esri/symbols/SimpleFillSymbol",
        "esri/Color",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        'dojo/query',
        ],function(declare, lang, array, basefx,MapAppconfig,arrayUtil,
        		FeatureLayer,on,Query,Graphic,Color,PopupTemplate,InfoTemplate,query){
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
	       /*infoLayerTree:function(){
	        	let arry=MapAppconfig.layerTree;
		   		 if(arry.length>0){
		   			 for(var i=0;i<arry.length;i++){
		   				let layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, arry[i]);
		   				if(layerIndex == -1){
		   					let layerurl=arry[i].urlc;
			        		let layerid=arry[i].name+"layer";
		             		if(layerurl!=undefined){
		             			let param={
		                          		id:layerid,
		                          		opacity:0.6,
		                          		outFields: ["*"],
		                          	    mode: FeatureLayer.MODE_ONDEMAND,
		                          }
		             			this.featureLayer=new FeatureLayer(layerurl,param);
			   				    MapAppconfig.map.addLayer(this.featureLayer);
			   				    this.featureLayer.setVisibility(false);
		             		}else{
		             			continue
		             		}
		   				}
	            	 }                
	              }
	        },*/
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
	             			if(layerid == "水源涵养林layer"){
	             				this.addLayer(layerid,name,layerurl,id);
	             			}
	             		}else{
	             			continue
	             		}
	            	 }                
	              }
	        },
	        addLayer:function(layerid,name,layerurl,id){
        		 let featureLayer= MapAppconfig.map._layers[layerid];
                 /*if(featureLayer.graphics.length>0){
     	        	 console.dir(name);
                	 featureLayer.setDefinitionExpression("PRONAME = '"+name+"'");
                	 MapAppconfig.map._layers[layerid].setVisibility(true);
                	 let node = MapAppconfig.LayersTree.getNodeByParam("name", name, null)
                	 cosnole.log(node);
                 	 if(node !=null){
                 		node.checked = true;
                 		MapAppconfig.LayersTree.updateNode(node);
                 	 }
                 }else{
                	 MapAppconfig.map._layers[layerid].setVisibility(false);
                 }*/
                /* on(this.featureLayer,"click",lang.hitch(this,(evt)=>{
                     this.getGraphicInfo(evt);
               		 MapAppconfig.map.infoWindow.show(evt.mapPoint);
                 }))*/
/*                  let query = new Query();
                    query.where = "PRONAME = '"+name+"'";
                    this.featureLayer.queryCount(query, function(count) {
	                     if(count>0){
	                    	let node = MapAppconfig.LayersTree.getNodeByParam("id", id, null)
	                     	if(node !=null){
	                     		node.checked = true;
	                     		MapAppconfig.LayersTree.updateNode(node);
	                     	}
	                        if (layerIndex == -1) {
	                        	this.featureLayer=new FeatureLayer(layerurl,param);
		                        MapAppconfig.map.addLayer(this.featureLayer); 
		                        this.featureLayer.setDefinitionExpression("PRONAME = '"+name+"'");
	                        }else{
	                        	this.featureLayer=new FeatureLayer(layerurl,param);
		                        this.featureLayer.setDefinitionExpression("PRONAME = '"+name+"'");
		                        MapAppconfig.map._layers[layerid].setVisibility(true);
	                        }
	                        on(this.featureLayer,"click",lang.hitch(this,(evt)=>{
		   	               		let sef=this; 
	                             getGraphicInfo(evt);
		   	               		 MapAppconfig.map.infoWindow.show(evt.mapPoint);
	   	                    }))
	   	                    function getGraphicInfo(evt){
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
	            	        	    MapAppconfig.map.infoWindow.setContent(html)
	            	        	}
	                        }
	                    }else{
	                    	if (layerIndex != -1) {
	                        	MapAppconfig.map._layers[layerid].setVisibility(false);
	                        }
	                    }
                    }, function(error) {
                      console.log(error);
                    });*/
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