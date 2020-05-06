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
        "esri/symbols/PictureMarkerSymbol",
        "esri/Color",
        "esri/layers/GraphicsLayer",
        "dojo/number"
        ],function(declare, lang, array, basefx,MapAppconfig,arrayUtil,
        		FeatureLayer,on,Graphic,SimpleLineSymbol,SimpleFillSymbol,
        		SimpleMarkerSymbol,PictureMarkerSymbol,Color,GraphicsLayer,number){
	return declare(null,{
		 treeNodeData: null,
		 treeObject:null,
		 featureLayer:null,
		 symbol:null,
		 tempLayer:null,
		 bjtempLayer:null,
		 timeInterval:null,
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
	        	this.bjtempLayer=new GraphicsLayer();
	        	this.tempLayer= MapAppconfig.map._layers["templayerid"];
	        },
	        intLayerTree:function(){
	        
	            let treeSetting = this.treenode.treeSetting;
	        	treeSetting.callback.onCheck = lang.hitch(this,this.TreeBeforecheck);
	        	treeSetting.callback.onCheck = lang.hitch(this,this.LayerTreeOnCheck)
	            treeSetting.callback.onClick = lang.hitch(this, function () {
                      return;
                  });
	          	this.treeNodeData=MapAppconfig.layerTree;
	        	this.treeObject=$.fn.zTree.init($("#mapLinkTree"), treeSetting, this.treeNodeData);
	        	this.treeObject.expandAll(false);
	        	//this.treeObject.expandNode(this.treeObject.getNodes()[0], true);
	        	MapAppconfig.LayersTree=this.treeObject;
	        },
	        expandFirstNode:function(zTrees){
	        	let nodes=zTrees.getNodes();
	        	if(nodes!=null){
	        		for(let i=0;i<nodes.length;i++){
	        			if(i==0){
	        				zTrees.expandNode(nodes[i],true);
	        			}else{
	        				zTrees.expandNode(nodes[i],false);
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
	        addLayer:function(item){
	        	if(item!=null){
	        		let layerurl=item.urlbj;
	        		let layerid=item.name+"layer";
	        		var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, layerid);
	        	
                    if (layerIndex != -1) {
                    	MapAppconfig.map._layers[layerid].setVisibility(true);
                    
                    }else{
                    	
                        let param={
                        		id:layerid,
                        		opacity:0.4
                        }
                        this.featureLayer=new FeatureLayer(layerurl,param);
                    	MapAppconfig.map.addLayer(this.featureLayer);
                    	
                    }
                    if(MapAppconfig.map._layers[layerid].visible){
                    	
                    	 on(this.featureLayer,"click",(evt)=>{
                    		 switch (evt.graphic.geometry.type) {
                    		 case "point":
//     		                    this.symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
//     		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),1),
//     		                        new Color([0,255,0,0.8]));
                    			 
                    			 //this.symbol=new PictureMarkerSymbol(MapAppconfig.root + '/images/mapimage/selectPoint.png',40,40);
                    			 this.symbol=new PictureMarkerSymbol(MapAppconfig.root + '/images/mapimage/雨量计33.gif',40,40);
     		                    break;
     		                case "polyline":
     		                	this.symbol  = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
     		                        new Color([255,0,0,0.8]),2);
     		                    break;
     		                case "polygon":
     		                	/*this.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
     		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,new Color([0,0,255]),5),
     		                        new Color([255,0,0,0.5]));*/
     		               	this.symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
         		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,0,255]),3),
         		                        new Color([255,0,0,0]));
     		                    break;
								

							default:
								break;
							}
                    	
                        let tempIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "templayerid");
                         if(tempIndex!=-1){
                        	 this.clearGraphicLayer();
                        	 
                        	 let graphic=new Graphic(evt.graphic.geometry,this.symbol,evt.graphic.attributes); 
                        	 this.tempLayer.add(graphic)
                        	 this.bjtempLayer.add(graphic.clone());
                        	 MapAppconfig.mapt.addLayer(this.bjtempLayer);
                        	 MapAppconfig.map.centerAndZoom(evt.graphic._extent.getCenter(),15);
                        	
                        	
                        	 //tempLayer.clear();
                        	/* if(this.timeInterval!=null){
                        		 clearInterval(this.timeInterval) 
                        	 }
                        	 this.timeInterval=setInterval(this.clearGraphicLayer,4000);*/
                        
                         }
                         })	
                    }
                   
	        	}
	        	
	        },
	        clearGraphicLayer:function(){
	        	 this.tempLayer.clear();
	        	 this.bjtempLayer.clear();
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

		
	})

	
})