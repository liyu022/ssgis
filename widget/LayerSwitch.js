define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/fx",
        "widget/MapAppconfig",    
        'dojo/_base/array',
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        ],function(declare, lang ,basefx,MapAppconfig,arrayUtil,ArcGISTiledMapServiceLayer,ArcGISDynamicMapServiceLayer){
	var layerSwitch= declare(null,{
	
		 currentLayer:"",
		 layerIndex:"",
		 postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	this.inherited(arguments);
	        	
	        },
	        intUI:function(){
	        	
//	        	this.currentLayer=new ArcGISTiledMapServiceLayer(MapAppconfig.ssyx);
//	        	this.currentLayer.id="ssyxid";
//	        	this.currentLayer.setVisibility(false);
//	        	MapAppconfig.map.addLayer(this.currentLayer);
//	        	
//	        	MapAppconfig.map.addLayer(this.currentLayer);
//	        	this.currentLayer=new ArcGISTiledMapServiceLayer(MapAppconfig.ssyxbz);
//	        	this.currentLayer.id="ssyxbzid";
//	        	this.currentLayer.setVisibility(false);
//	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	
//	        	this.currentLayer=new ArcGISDynamicMapServiceLayer(MapAppconfig.ssyxdt);
//	        	this.currentLayer.id="ssyxdtid";
//	        	this.currentLayer.setVisibility(false);
//	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	this.currentLayer=new ArcGISDynamicMapServiceLayer(MapAppconfig.ssyxdt);
	        	this.currentLayer.id="ssyxdtid";
	        	this.currentLayer.setVisibility(false);
	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	
	        	
	        	
	        	this.currentLayer=new ArcGISTiledMapServiceLayer(MapAppconfig.ssdm);
	        	this.currentLayer.id="ssdmid";
	        	this.currentLayer.setVisibility(false);
	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	
	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	this.currentLayer=new ArcGISTiledMapServiceLayer(MapAppconfig.ssdmbz);
	        	this.currentLayer.id="ssdmbzid";
	        	this.currentLayer.setVisibility(false);
	        	MapAppconfig.map.addLayer(this.currentLayer);
	        	this.switchLayer();
	        },
	        switchLayer:function(){
	      
	        	this.currentLayer=MapAppconfig.map.getLayer("ssymid");
	        	$("#imageClick").click(lang.hitch(this,()=>{
	        		MapAppconfig.map.removeLayer(this.currentLayer);
	        		MapAppconfig.map.getLayer("ssslid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssslbzid").setVisibility(false);
	        		
//	        		MapAppconfig.map.getLayer("ssyxid").setVisibility(true);
//	        		MapAppconfig.map.getLayer("ssyxbzid").setVisibility(true);
	        		MapAppconfig.map.getLayer("ssyxdtid").setVisibility(true);
	        		
	        		
	        		MapAppconfig.map.getLayer("ssdmid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssdmbzid").setVisibility(false);
	        		
	        	
	        		//MapAppconfig.map.addLayer(this.currentLayer);
	        		
	        	}))
	        	$("#dxClick").click(lang.hitch(this,()=>{
	        		MapAppconfig.map.getLayer("ssslid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssslbzid").setVisibility(false);
	        		
//	        		MapAppconfig.map.getLayer("ssyxid").setVisibility(false);
//	        		MapAppconfig.map.getLayer("ssyxbzid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssyxdtid").setVisibility(false);
	        		
	        		MapAppconfig.map.getLayer("ssdmid").setVisibility(true);
	        		MapAppconfig.map.getLayer("ssdmbzid").setVisibility(true);
	        		MapAppconfig.map.removeLayer(this.currentLayer);
	        		MapAppconfig.map.addLayer(this.currentLayer);
	        	}))
	        	$("#xzqClick").click(lang.hitch(this,()=>{
	        		MapAppconfig.map.getLayer("ssslid").setVisibility(true);
	        		MapAppconfig.map.getLayer("ssslbzid").setVisibility(true);
	        		
//	        		MapAppconfig.map.getLayer("ssyxid").setVisibility(false);
//	        		MapAppconfig.map.getLayer("ssyxbzid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssyxdtid").setVisibility(false);
	        		
	        		MapAppconfig.map.getLayer("ssdmid").setVisibility(false);
	        		MapAppconfig.map.getLayer("ssdmbzid").setVisibility(false);
	        		MapAppconfig.map.removeLayer(this.currentLayer);
	        		MapAppconfig.map.addLayer(this.currentLayer);
	        	}))
	        	$("#maplinkClick").click(lang.hitch(this,()=>{
	        		
	        		window.open("http://localhost:8080/gis/MapLinkager.html")
	        	}));
	        },
	        getLayerByid:function(){
	        	
	       
	        }
		
	})
	return layerSwitch;
	
})