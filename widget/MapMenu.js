define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/fx",
        "widget/MapAppconfig",    
        'dojo/_base/array',
        "dijit/Menu",
        "dijit/MenuItem",
        ],function(declare, lang ,basefx,MapAppconfig,arrayUtil,
      		  Menu,
    		  MenuItem){
	return declare(null,{
		  ctxMenuForGraphics:null,
		  postCreate: function () {
	            this.inherited(arguments);
	        },
	        constructor:function(){
	        	this.inherited(arguments);
	        	
	        },
	        intMenuWwidget:function(){
	        	this.creatMenu();
	        	MapAppconfig.MapMenu=this.ctxMenuForGraphics;
	        	
	        },
	        creatMenu:function(){
	        	 this.ctxMenuForGraphics = new Menu({});
	        	 this.ctxMenuForGraphics.addChild(new MenuItem({
	                 label: "<a>全屏</a>",
	                 onClick:lang.hitch(this, function () {
	                	 this.fullScreen();
	     	        	
	                 })
	             }));
	        
	        	 this.ctxMenuForGraphics.addChild(new MenuItem({
	                 label: "<a>全图</a>",
	                 onClick: lang.hitch(this,function () {
	                	 let self=this; 
	                	 MapAppconfig.map.centerAndZoom([MapAppconfig.mapCenter.lat,MapAppconfig.mapCenter.lon], MapAppconfig.mapCenter.level)
	     				
	                  
	                 })
	             }));
	        	 this.ctxMenuForGraphics.addChild(new MenuItem({
	                 label: "<a>清空</a>",
	                 onClick: lang.hitch(this,function () {
	                	 let self=this; 
	                	 this.clearTemp();
	     				
	                  
	                 })
	             }));
	        	 this.ctxMenuForGraphics.addChild(new MenuItem({
	                 label: "<a>关闭图层</a>",
	                 onClick: lang.hitch(this,function () {
	                	 let self=this; 
	                	 this.hiddenLayers()
	                  
	                 })
	             }));
	        	 this.ctxMenuForGraphics.addChild(new MenuItem({
	                 label: "<a id='layerid'>显示图层</a>",
	                 onClick: lang.hitch(this,function () {
	                	 let self=this; 
	                	 if($("#layerid").text()=="隐藏图层"){
	                		 $("#layerid").text("显示图层");
	                		
	                		 $("#layerTree").animate({left:"-370px"}, 800,"linear",function(){
	                			 $("#layerTree").css('display', 'none');
	                		 });
	                	 }else{
	                		 $("#layerid").text("隐藏图层");
	                		 $("#layerTree").css('display', 'block');
	                		 $("#layerTree").animate({
	                			 left:"2px"
	                         }, 800,"linear", function () {
	                           
	                         });
	                	 }
	                	
	              
	                  
	                 })
	             }));
	        },
	        clearTemp:function(){
	         MapAppconfig.drawToolbar.deactivate();
	         MapAppconfig.navToolbar.deactivate();
	         let tempLayer= MapAppconfig.map._layers["templayerid"];
           	 tempLayer.clear();
           	 //清除矢量动画
           	var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "vectTimeid");
			if(layerIndex!=-1){
				if(MapAppconfig.vectInter!=null){
					 clearInterval(MapAppconfig.vectInter);
				}
				
				this.imglayer=MapAppconfig.map._layers["vectTimeid"];
				MapAppconfig.map.removeLayer(this.imglayer);
				
				
			}
         	 MapAppconfig.map.setMapCursor("default");	
	        },
	        fullScreen:function(){
	             let self=this;
	        	 if (document.documentElement.requestFullscreen) {
	        		 document.documentElement.requestFullscreen();
	             } else if (document.documentElement.mozRequestFullScreen) {
	            	 document.documentElement.mozRequestFullScreen();
	             } else if (document.documentElement.webkitRequestFullScreen) {
	            	 document.documentElement.webkitRequestFullScreen();
	             }

	        },
	        hiddenLayers:function(){
	        	if(MapAppconfig.LayersTree!=null||MapAppconfig.LayersTree!=null!="undefined"){
	        		let nodes=MapAppconfig.LayersTree.getCheckedNodes(true);
                    if(nodes.length>0){
                    	for(var i=0;i<nodes.length;i++){
                    		let layerid=nodes[i].name+"layer";
        	        		var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, layerid);
                            if (layerIndex != -1) {
                            	MapAppconfig.map._layers[layerid].setVisibility(false);
                            }
                            if(nodes[0].isParent){

                        		MapAppconfig.LayersTree.checkNode(nodes[0], false, true);
                        	}
                    	}                    
                    	

                    }

	        	}
	        }

	 })

})