define(["dojo/_base/declare","dojo/_base/fx","esri/symbols/SimpleMarkerSymbol"],
		function(declare,basefx,SimpleMarkerSymbol){
	return declare(null,{
	     _maps: null,//参与联动的地图控件集合
         _activeMapEventHandlers: null,//当前鼠标所在地图事件集合
         _mapMouseOverEventHandlers:null,//所有地图mouse-over事件集合
         _mouseGraphicLayers:null,//鼠标联动GraphicLayer
         activeMap: null,//当前激活地图
         mouseSymbol:null,//鼠标样式
         constructor: function () {
             this._maps = [];
             this._activeMapEventHandlers=[];
             this._mapMouseOverEventHandlers=[];
             this.mouseSymbol=new SimpleMarkerSymbol({
                 "color": [255,0,0],
                 "size": 10,
                 "xoffset": 0,
                 "yoffset": 0,
                 "type": "esriSMS",
                 "style": "esriSMSCircle",
                 "outline": {
                     "color": [255,0,0],
                     "width": 1,
                     "type": "esriSLS",
                     "style": "esriSLSSolid"
                 }
             })
         },
         addMap: function (map) {
             var self = this;
            if (this._maps.indexOf(map) != -1)return;//如果已经在联动地图集合就不添加
            
             var mouseHandler= map.on("mouse-over", function (evt) {//鼠标在哪个地图上，该地图就是激活地图
                 self.activeMap = map;
                 self. _clearActiveMapEvents();
                 self._bindActiveMapEvents();
             });
             this._maps.push(map);
             this._mapMouseOverEventHandlers.push(mouseHandler);
         },
         removeMap: function (map) {
             var idx = this._maps.indexOf(map);
             this._maps.splice(idx, 1);
             this._mapMouseOverEventHandlers[idx].remove();
             this._mapMouseOverEventHandlers.splice(idx, 1);
          
             this._clearActiveMapEvents();
 
         },
         _clearActiveMapEvents: function () {
             this._activeMapEventHandlers.forEach(function (eventHandler) {
                 eventHandler.remove();
             });
             this._activeMapEventHandlers = [];
         },
         _bindActiveMapEvents: function () {
             var self = this;
             //放大联动
             this._activeMapEventHandlers.push(this.activeMap.on("zoom-end", function (evt) {
                 self._maps.forEach(function (map) {
                    if (map != self.activeMap) {
                         map.setExtent(evt.extent);
                     }
                 });
            }));
            //平移联动
            this._activeMapEventHandlers.push(this.activeMap.on("pan-end", function (evt) {
                self._maps.forEach(function (map) {
                    if (map != self.activeMap) {
                        map.setExtent(evt.extent);
                    }
                });
            }));

           //鼠标联动
            this._activeMapEventHandlers.push(this.activeMap.on("mouse-move", function (evt) {
                self._maps.forEach(function (map) {
                  
                });
            }));
        },

	})
})