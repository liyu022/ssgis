define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/fx",
        "widget/MapAppconfig",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/TimeExtent", 
        "esri/dijit/TimeSlider",
        "dojo/_base/array", 
        "dojo/dom", 
        "dojo/domReady!"
        ],
        function(declare, lang, basefx,
        		MapAppconfig,ArcGISDynamicMapServiceLayer,
        		TimeExtent, TimeSlider,
                arrayUtils, dom){
	return declare(null,{
		   
		styxid:"styxid",
		postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	this.inherited(arguments);
	        	
	        },
	        intImage:function(){
	        	
	        	let opLayer = new ArcGISDynamicMapServiceLayer(MapAppconfig.styx,{id:this.styxid});
	        	opLayer.setVisibility(false);
	        	MapAppconfig.map.addLayer(opLayer);
	        	
	        	let timeExtent = new TimeExtent();
	        	let timeSlider = new TimeSlider({
	                 style: "width: 100%;"
	               }, dom.byId("timeSliderDiv"));
	        	 MapAppconfig.map.setTimeSlider(timeSlider);
	        	 timeExtent.startTime = new Date("2013/12/31 00:00:00 UTC");
	             timeExtent.endTime = new Date("2016/12/31 00:00:00 UTC");
	             timeSlider.setThumbCount(2);
	             timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, "esriTimeUnitsYears");
	             timeSlider.setThumbIndexes([0,1]);
	             timeSlider.setThumbMovingRate(2000);
	             timeSlider.on("time-extent-change", this.disPlayTimeInfo);
	             timeSlider.setLoop(true);
	             timeSlider.startup();

	        	 var labels = arrayUtils.map(timeSlider.timeStops, function(timeStop, i) { 
	                        return timeStop.getUTCFullYear(); 
	               }); 
	               
	               timeSlider.setLabels(labels);
	               $("#skcClick").click(()=>{
	            	   this.dispalyTimeLayer();
	               })
	        },
		disPlayTimeInfo:function(timeExtent){
			 let info = "当前影像时间："+timeExtent.endTime.getFullYear()+" 年";
			 dom.byId("labelText").innerHTML = info;
			
		},
		dispalyTimeLayer:function(){
			let traget= dom.byId("timeInfo");
			
			let timeLayer=MapAppconfig.map.getLayer(this.styxid)
			if(traget.style.visibility=="hidden"){
				 
                traget.style.visibility="visible";
                timeLayer.show();

        }else{

                traget.style.visibility="hidden";
                timeLayer.setVisibility(false);
         }
	}
	        
		
		
	})
})