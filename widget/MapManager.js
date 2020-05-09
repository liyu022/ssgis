define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/fx",
        "esri/toolbars/navigation",
        "esri/toolbars/draw",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/graphic",
        "esri/tasks/LengthsParameters",
        "esri/geometry/Point",
        "esri/geometry/Polyline",
        "esri/tasks/AreasAndLengthsParameters",
        "esri/tasks/GeometryService",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",
        "dojo/number",
        "esri/symbols/SimpleFillSymbol",
        "esri/SpatialReference",
        "widget/MapAppconfig",
        'dojo/_base/array',
        "dojo/on",
        ],function(declare, lang, array, basefx,Navigation,Draw,SimpleMarkerSymbol,SimpleLineSymbol,Color,Graphic,
        		LengthsParameters,Point,Polyline,AreasAndLengthsParameters,GeometryService,Font,TextSymbol,number,
        		SimpleFillSymbol,SpatialReference,MapAppconfig,arrayUtil,on){
	return declare(null,{
		navToolbar: null,
        drawToolbar: null,
        geometryService:null,
        isDrawPoint:false,
        isDrawLine:false,
	    isDrawPloygon:false,
	    makerSymbol: null,
	    inputPoints: [],//存储生成点的集合
	    startFont:null,
	    textSymbol:null,
	    lengthParams :null,
	    sPoint:null,
	    ePoint:null,
	    polyline :null,
	    totalGraphic:null,//存储点集合
	    totleDistance: 0.0,//总距离
	    tempLayer:null,
	    postCreate: function () {
            this.inherited(arguments);
        },
		constructor:function (param){
			 let layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, param.layerid);
			 if(layerIndex!=-1){
				 this.tempLayer=MapAppconfig.map.getLayer(param.layerid); 
				
			 }
			this.makerSymbol= new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,8,
	                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([204,102,51]),1),
	                new Color([158.184,71,0.65]));
			this.startFont=new Font('12px').setWeight(Font.WEIGHT_BOLD);
			this.navToolbar=new Navigation(MapAppconfig.map);
			this.geometryService=new GeometryService(MapAppconfig.geometryService);
			this.drawToolbar=new Draw(MapAppconfig.map);
			MapAppconfig.drawToolbar=this.drawToolbar;
			MapAppconfig.navToolbar=this.navToolbar;
			
			this.handleClick();
	        this.showLonlat();
	     
	        MapAppconfig.map.on("click",lang.hitch(this,function(evt){
	        	if(this.isDrawLine||this.isDrawPoint||this.isDrawPloygon){
	        		this.addGraphic(evt);
	        	}else{
	        		return;
	        	}
	        }))
	        this.drawToolbar.on("draw-complete",lang.hitch(this,function (evt) {
	            this.addToMap(evt);
	        }));
	     

	        
		},
		handleClick:function(){
			$("#ZoomIn").click(lang.hitch(this, function(){
				this.isDrawLine=false;
				this.isDrawPoint=false;
				this.isDrawPloygon=false;
				this.drawToolbar.deactivate();
				this.navToolbar.activate(Navigation.ZOOM_IN);
				MapAppconfig.map.setMapCursor("default");	
			}))
			$("#ZoomOut").click(lang.hitch(this, function(){
				this.isDrawLine=false;
				this.isDrawPoint=false;
				this.isDrawPloygon=false;
				this.drawToolbar.deactivate();
				this.navToolbar.activate(Navigation.ZOOM_OUT);
				MapAppconfig.map.setMapCursor("default");	
			}))
			$("#Pan").click(lang.hitch(this, function(){
				this.isDrawLine=false;
				this.isDrawPoint=false;
				this.isDrawPloygon=false;
				this.drawToolbar.deactivate();
				this.navToolbar.activate(Navigation.PAN);
				MapAppconfig.map.setMapCursor("default");
					
			}))
			$("#DrawPoint").click(lang.hitch(this, function(){
				this.navToolbar.deactivate();
			    this.isDrawPoint=true;
				this.isDrawLine=false;
				this.isDrawPloygon=false;
				this.drawToolbar.activate(Draw.POINT);
				MapAppconfig.map.setMapCursor("crosshair");
			}))
			$("#DrawLine").click(lang.hitch(this,()=>{
				this.navToolbar.deactivate();
				this.isDrawLine=true;
				this.isDrawPoint=false;
				this.isDrawPloygon=false;
				this.drawToolbar.activate(Draw.POLYLINE);
				MapAppconfig.map.setMapCursor("crosshair");
			}))
			$("#DrawPolygon").click(lang.hitch(this,()=>{
				this.navToolbar.deactivate();
				this.isDrawLine=false;
				this.isDrawPoint=false;
				this.isDrawPloygon=true;
				this.drawToolbar.activate(Draw.POLYGON);
				MapAppconfig.map.setMapCursor("crosshair");
				
			}))
			$("#MapExtent").click(lang.hitch(this,()=>{
				MapAppconfig.map.centerAndZoom([MapAppconfig.mapCenter.lat,MapAppconfig.mapCenter.lon], MapAppconfig.mapCenter.level)
				
			}))
			$("#MapClear").click(lang.hitch(this,()=>{
				this.clearTools();
			}))
			
		},
		showLonlat:function(){
			MapAppconfig.map.on("mouse-move",lang.hitch(this,function(evt){
				if(evt.mapPoint!=null){
					let inf="经度为："+evt.mapPoint.x.toFixed(3)+"    纬度为："+evt.mapPoint.y.toFixed(3);
					$("#xyinfor").html(inf);
				}
			
				}));
		},
		addGraphic:function(evt){
			MapAppconfig.map.enableScrollWheelZoom();
			if(this.isDrawPoint){
				let xypoint=evt.mapPoint;
				this.tempLayer.add(new Graphic(xypoint,this.makerSymbol));
			}else if(this.isDrawLine){
				 this.inputPoints.push(evt.mapPoint);
				 if(this.inputPoints.length ===1){
		                this.textSymbol = new TextSymbol("起点",this.startFont,new Color([204,102,51]));
		                this.textSymbol.setOffset(0,-20);
		                this.tempLayer.add(new Graphic(evt.mapPoint,this.textSymbol));
		               
		            }
				 this.tempLayer.add(new Graphic(evt.mapPoint,this.
	                		makerSymbol));
				  if(this.inputPoints.length >=2){
					  this.lengthParams=new LengthsParameters();
					  this.lengthParams.distanceUnit = GeometryService.UNIT_METER;
		               this.lengthParams.calculationType = "preserveShape";
		                this.sPoint = this.inputPoints[this.inputPoints.length-2];
		                this.ePoint = this.inputPoints[this.inputPoints.length-1];
		                if(this.sPoint.x ===this.ePoint.x &&this.sPoint.y===this.ePoint.y){
		                    return;
		                }
		                this.polyline = new Polyline(MapAppconfig.map.spatialReference);
		                this.polyline.addPath([this.sPoint,this.ePoint]);
		                this.lengthParams.polylines=[this.polyline];
		                this.geometryService.lengths(this.lengthParams,lang.hitch(this,function(distance){
		                   this.lengthLable(distance);
				  
				        }))
				}
				
			}
	
			
		},
		addToMap:function(evt){
			 if(this.isDrawPoint||this.isDrawLine||this.isDrawPloygon){
		            var geometry = evt.geometry;//绘制图形的geometry
		            //将绘制的图形添加到地图上去
		            var symbol = null;
		            switch (geometry.type){
		                case "point":
		                    symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,10,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),1),
		                        new Color([0,255,0,0.25]));
		                    break;
		                case "polyline":
		                    symbol  = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
		                        new Color([255,0,0,0.8]),2);
		                    break;
		                case "polygon":
		                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),2),
		                        new Color([255,255,0,0.25]));
		                    break;
		                case "extent":
		                    symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),2),
		                        new Color([255,255,0,0.25]));
		                    break;
		            }
		            this.tempLayer.add(new Graphic(geometry,symbol));
		            
		            if(this.isDrawLine){
		                this.inputPoints.splice(0,this.inputPoints.length);//删除数组中的所有元素
		                this.totleDistance =0.0;
		                this.totalGraphic = null;
		            }
		            else if(this.isDrawPloygon){
		                //设置面积和长度的参数
		                 var areasAndLengthsParameters =new AreasAndLengthsParameters();
                         areasAndLengthsParameters.lengthUnit = GeometryService.UNIT_METER;//设置距离单位
                         areasAndLengthsParameters.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;//设置面积单位
                         areasAndLengthsParameters.calculationType = "geodesic";
                         this.geometryService.simplify([geometry],lang.hitch(this,function (simplifiedGeometries) {
                             areasAndLengthsParameters.polygons = simplifiedGeometries;
                             this.geometryService.areasAndLengths(areasAndLengthsParameters,lang.hitch(this, (result)=> {
                                 var font =new Font("16px",Font.STYLE_NORMAL,Font.VARIANT_NORMAL,Font.WEIGHT_BOLDER);
                                 var areaResult = new TextSymbol(number.format(result.areas[0],{
                                     pattern:'#.000'
                                 })+"平方公里",font,new Color([204,102,51]));
                                 var spoint = new Point(geometry.getExtent().getCenter().x,geometry.getExtent().getCenter().y,MapAppconfig.map.spatialReference);
                                 this.tempLayer.add(new Graphic(spoint,areaResult));//在地图上显示测量的面积
                             }));
                         }));
		            }
		        }
		},
		clearTools:function(){
			this.drawToolbar.deactivate();
			this.navToolbar.deactivate();
			this.tempLayer.clear();
			this.isDrawLine=false;
			this.isDrawPoint=false;
			this.isDrawPloygon=false;
			this.clearlayer();
		 	var layerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "vectTimeid");
			if(layerIndex!=-1){
				if(MapAppconfig.vectInter!=null){
					 clearInterval(MapAppconfig.vectInter);
				}
				let imglayer=MapAppconfig.map._layers["vectTimeid"];
				MapAppconfig.map.removeLayer(imglayer);
			}
				
			MapAppconfig.map.setMapCursor("default");
		},
		clearlayer:function(){
			MapAppconfig.map.graphics.clear();
			MapAppconfig.map.infoWindow.hide();
			let itemRiverlayerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "itemRiverlayerid");
			if(itemRiverlayerIndex!=-1){
				let itemRiverlayer=MapAppconfig.map._layers["itemRiverlayerid"];
			    MapAppconfig.map.removeLayer(itemRiverlayer);
			}
			let itemBusslayerIndex = arrayUtil.indexOf(MapAppconfig.map.graphicsLayerIds, "itemBusslayerid");
			if(itemBusslayerIndex!=-1){
				let itemBusslayer=MapAppconfig.map._layers["itemBusslayerid"];
			    MapAppconfig.map.removeLayer(itemBusslayer);
			}
		},
		areaLable:function(result){
			 var font =new Font("16px",Font.STYLE_NORMAL,Font.VARIANT_NORMAL,Font.WEIGHT_BOLDER);
              var areaResult = new TextSymbol(number.format(result.areas[0],{
                  pattern:'#.000'
              })+"平方公里",font,new Color([204,102,51]));
              var _spoint = new Point(evt[0].getExtent().getCenter().x,evt[0].getExtent().getCenter().y,MapAppconfig.map.spatialReference);
              this.tempLayer.add(new Graphic(_spoint,areaResult));//在地图上显示测量的面积 
		},
		lengthLable:function(distance){
			 let _distance = number.format(distance.lengths[0]/1000);
             this.totleDistance+=parseFloat(_distance);//计算总长度
             let beetwentDistances = _distance+"千米";
             let tdistance = new TextSymbol(beetwentDistances,this.startFont,new Color([204,102,51]));
             tdistance.setOffset(40,-3);
             this.tempLayer.add(new Graphic(this.ePoint,tdistance));
             if(this.totalGraphic){
            	 this.tempLayer.remove(this.totalGraphic);
             }
             var total=number.format(this.totleDistance,{
                 pattern:"#.000"
             });
             //    设置总长度的显示样式，并添加到地图上
             var totalSymbol=new TextSymbol("总长度："+total+"千米",this.startFont,new Color([204,102,51]));
             totalSymbol.setOffset(40,-15);
             this.totalGraphic= this.tempLayer.add(new Graphic(this.ePoint,totalSymbol));
		},
		
	})
	
})