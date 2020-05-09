define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        'dojo/_base/array',
		"esri/layers/FeatureLayer",
		"esri/layers/GraphicsLayer",
		"dojo/on",
		"esri/graphic",
        "esri/geometry/Extent",
        "esri/SpatialReference",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol",
        "esri/TimeExtent", 
        "esri/dijit/TimeSlider",
		"dojo/dom", 
		"esri/Color",
        "esri/tasks/query",
        "dojo/domReady!"
        ],function(declare, lang,
        		array, basefx,
        		MapAppconfig,
        		arrayUtil,
				FeatureLayer,
				GraphicsLayer,
        		on,Graphic,Extent,SpatialReference,
				ArcGISDynamicMapServiceLayer,
				SimpleMarkerSymbol,
				SimpleLineSymbol,
        		TimeExtent,
        		TimeSlider,
        		Query,
				dom,
				Color){
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
	        intLayerBuss:function(layerid){
                layerurl = "http://192.168.2.39:6080/arcgis/rest/services/yqyd/MapServer/0";
                let param={
					id:layerid,
					mode: FeatureLayer.MODE_ONDEMAND,
					outFields: ["*"],
					showLabels: true
				}
				this.featureLayer=new FeatureLayer(layerurl,param);
				MapAppconfig.map.addLayer(this.featureLayer);
				on(this.featureLayer,"click",(evt)=>{
					MapAppconfig.map.graphics.clear();
					if(evt.graphic!=null||evt.graphic!=undefined ||evt.graphic!=''){
						evt.graphic.attributes.NAME!=null?MapAppconfig.map.infoWindow.setTitle(evt.graphic.attributes.NAME):MapAppconfig.map.infoWindow.setTitle("");
						let html="";
						if(evt.graphic.attributes.OBJECTID!=null){
							html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目类型: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.OBJECTID+"</div></div>"
						}
						if(evt.graphic.attributes.BASIN!=null){
							html+="<div style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"专题类型: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.BASIN+"</div></div>"
						}
						if(evt.graphic.attributes.NAME!=null){
							html+="<div  style='display:flex;line-height:20px;border-bottom-width:1px; border-bottom-style:dashed; border-bottom-color:#ced5d8;'><div >"+"项目名称: "+"</div><div  style='padding-left:5px'>"+evt.graphic.attributes.NAME+"</div></div>"
						}
						MapAppconfig.map.infoWindow.setContent(html);
						MapAppconfig.map.infoWindow.show(evt.mapPoint);
						let graphicline ={geometry:evt.graphic.geometry,"symbol":{"color":[255,0,0,255],"width":2,"type":"esriSLS","style":"esriSLSSolid"}};
						let graphic=new Graphic(graphicline);
						MapAppconfig.map.graphics.add(graphic);
						MapAppconfig.map.centerAndZoom(evt.graphic._extent.getCenter(),10)
					}
				})
			},
			
	        delSubEle:function(){
	        	
	        	
	        }
	       
	        
	        
	})

	
})