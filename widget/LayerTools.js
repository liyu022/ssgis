define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        'dojo/_base/array',
        "esri/layers/FeatureLayer",
        "dojo/on",
        "esri/geometry/Extent",
        "esri/SpatialReference",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/TimeExtent", 
        "esri/dijit/TimeSlider",
        "dojo/dom", 
        "esri/tasks/query",
        "dojo/domReady!"
        ],function(declare, lang,
        		array, basefx,
        		MapAppconfig,
        		arrayUtil,
        		FeatureLayer,
        		on,Extent,SpatialReference,
        		ArcGISDynamicMapServiceLayer,
        		TimeExtent,
        		TimeSlider,
        		Query,
        		dom){
	return declare(null,{
		   layerid:null,
		   fatureLayer:null,
		   imgurl:null,
		   imglayer:null,
		   timeExtent:null,
		   timeSlider:null,
		   postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	
	        },
	        intLayerTool:function(treeNode){
	        	this.layerid=treeNode.name+"layer";
        			$("#fullLayer").unbind().click(()=>{
            			$("#rightMenu ul").hide();
            			var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, this.layerid);
            			if(layerIndex!=-1){
            				this.fatureLayer=MapAppconfig.map._layers[this.layerid];
            				if(this.fatureLayer.visible){
            					MapAppconfig.map.centerAndZoom(this.fatureLayer.fullExtent.getCenter(),11)
            				}
            			}
            		});
        			$("#timeLayer").unbind().click(()=>{
        				 $("#rightMenu ul").hide();
        				 
                          let timeUrl=treeNode.timeUrl; 
                          console.log(timeUrl);
                          if(timeUrl != null || !"".equals(timeUrl.trim())){
                        	  let myArray=new Array()
            				  let mglayer=new FeatureLayer(timeUrl);
            	 				mglayer.id="vectTimeid"
            	 				MapAppconfig.map.addLayer(mglayer);
            	 				let query = new esri.tasks.Query();
            	 				let whereStr = "1=1";
            	 				query.where = whereStr;
            	 			    query.returnGeometry = true;
            	 			    query.outFields = ["time","year"];
            	 				 mglayer.queryFeatures(query, function(featurea){
            	 			        let features=featurea.features;
            	 			        if(features.length>0){
            	 			        	features.forEach(function(value, index, features) {
            	 			        		myArray.push(value.attributes.time);
                 	 						
                 	 					})
            	 			        }
            	 			       if(myArray.length>0){
            	 			    	  function unique(arr) {
            	 			    		    const res = new Map();
            	 			    		    return arr.filter((a) => !res.has(a) && res.set(a, 1))
            	 			    	  };
            	 			    	 let arr=unique(myArray);
            	 			    	 arr.sort();
            	 			    	 let vectInter=setInterval(function(){
            	 			    
            	 			    		for(var i = 0; i < arr.length; i++) {
            	                            (function(i) {
            	                                setTimeout(function() {
            	                                	console.log(i)
            	                                	this.imglayer=MapAppconfig.map._layers["vectTimeid"];
                          							 this.imglayer.setDefinitionExpression("time = '"+arr[i]+"'");
            	                                }, (i) * 1000);
            	                            })(i)
            	                        }

            	 			    		
            	 			    	 },3000);
            	 			    	MapAppconfig.vectInter=vectInter;   
                  	 				}
            	 					
            	 				 },function(evt){alert(evt)});

                          }
        				 
        	        	
        			});
	        },
	        delSubEle:function(){
	        	
	        	
	        }
	       
	        
	        
	})

	
})