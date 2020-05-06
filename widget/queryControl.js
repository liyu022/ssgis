/**
 * Created by Administrator on 2014/12/2 0002.
 */
define(["dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/toolbars/draw",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/dijit/InfoWindow",
    "esri/InfoTemplate",
    "widget/Util",
    "widget/LoadingWidget",
    "widget/MapAppConfig",
    "widget/QueryLayerConfig"
], function (lang, on, topic, query, QueryTask, IdentifyTask, IdentifyParameters, Graphic, GraphicsLayer, Draw, Point, PictureMarkerSymbol, InfoWindow, InfoTemplate, Util, Loading, MapAppConfig, QueryLayerConfig) {
    return {
        queryTask: new QueryTask(MapAppConfig.defaultQueryService),
        identifyTask: new IdentifyTask(MapAppConfig.defaultQueryService),
        identifyParams: new IdentifyParameters(),
        lxQuery: function () {
            MapAppConfig.mapManager.onDrawRequest({
                label: "画点",
                geometryType: Draw.POINT,
                onDrawEnd: lang.hitch(this, this.execIQuery)
            });
        },

        execIQuery: function (obj) {
            var self = this;
            self.identifyParams.tolerance = 2;
            self.identifyParams.returnGeometry = true;
            //LAYER_OPTION_TOP LAYER_OPTION_VISIBLE LAYER_OPTION_ALL
            self.identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            self.identifyParams.layerIds = QueryLayerConfig.getQueryLayerIdsByGroupId("LAYERGROUP_DL");
            self.identifyParams.mapExtent = MapAppConfig.map.extent;
            self.identifyParams.width = MapAppConfig.map.width;
            self.identifyParams.height = MapAppConfig.map.height;
            self.identifyParams.geometry = obj.geometry;
            self.identifyTask.execute(self.identifyParams, function (idResults) {
                if (idResults.length > 0) {
                    var rs = idResults[0].feature.attributes;
                    var layerName = idResults[0].layerName;
                    topic.publish("leftPanelNavRequest", {
                        headMenu: "路线查询",
                        QueryStatistics: "查询",
                        text: "默认",
                        paramsData: {
                            jsdj: rs["路段技术等级"],
                            qdmc: rs["起点名称"],
                            zdmc: rs["止点名称"],
                            qdzh: rs["起点桩号"],
                            zdzh: rs["止点桩号"],
                            lxdm: rs["路线代码"],
                            lxmc: rs["路线名称"],
                            sxxfx: rs["上下行方向"],
                            layerName: layerName
                        }
                    });
                } else {
                    Loading.showMsg({msg: "没有查询到数据！"});
                    Loading.hide();
                }
            }, function (err) {
                Loading.showMsg({msg: "路线查询出现异常！"});
                Loading.hide();
                console.error("路线查询出现异常::" + err);
            });
        },
        gzwQuery: function () {
            MapAppConfig.mapManager.onDrawRequest({
                label: "画点",
                geometryType: Draw.POINT,
                onDrawEnd: lang.hitch(this, this.GZWQuery)
            });
        },
        zhQuery: function () {
            MapAppConfig.mapManager.onDrawRequest({
                label: "画点",
                geometryType: Draw.POINT,
                onDrawEnd: lang.hitch(this, this.execZHQuery)
            });
        },
        /**
         * 桩号查询
         */
        execZHQuery: function (obj) {
            MapAppConfig.map.infoWindow.hide();
            MapAppConfig.map.graphics.clear();
            var self = this;
            self.identifyParams.tolerance = 5;
            self.identifyParams.returnGeometry = true;
            //LAYER_OPTION_TOP LAYER_OPTION_VISIBLE LAYER_OPTION_ALL
            self.identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            self.identifyParams.layerIds = QueryLayerConfig.getQueryLayerIdsByGroupId("LAYERGROUP_DL");
            self.identifyParams.mapExtent = MapAppConfig.map.extent;
            self.identifyParams.width = MapAppConfig.map.width;
            self.identifyParams.height = MapAppConfig.map.height;
            self.identifyParams.geometry = obj.geometry;
            Loading.show();
            self.identifyTask.execute(self.identifyParams, function (idResults) {
                if (idResults.length == 0) {
                    //console.info("没有查询到数据！");
                    Loading.showMsg({msg: "没有查询到数据！"});
                    Loading.hide();
                    return;
                }
                Loading.hide();
                var feature = idResults[0].feature;
                var layerId = idResults[0].layerId;
                var lxdm = feature.attributes["路线代码"];
                var qdzh = feature.attributes["起点桩号"];
                var zdzh = feature.attributes["止点桩号"];
                var mapPoint = Util.getPosByLonLat(feature.geometry, qdzh, zdzh, self.identifyParams.geometry);
                Util.addZHtoMap(mapPoint, feature);
            }, function (err) {
                console.error("桩号查询出错", err);
            });
        },
        GZWQuery: function (obj) {
            var self = this;
            var identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 5;
            identifyParams.returnGeometry = true;
            //LAYER_OPTION_TOP LAYER_OPTION_VISIBLE LAYER_OPTION_ALL
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.mapExtent = MapAppConfig.map.extent;
            identifyParams.width = MapAppConfig.map.width;
            identifyParams.height = MapAppConfig.map.height;
            identifyParams.geometry = obj.geometry;

            var allLayerIds = QueryLayerConfig.getStructureLayerIds();
            identifyParams.layerIds = allLayerIds;
            MapAppConfig.map.graphics.clear();
            Loading.show();
            self.identifyTask.execute(identifyParams, function (idResults) {
                Loading.hide();
                if (idResults.length == 0) {
                    Loading.showMsg();
                    return;
                }
                //将查询记录绘制到地图
                var feature = idResults[0].feature;
                var layerId = idResults[0].layerId;
                var symbol = QueryLayerConfig.getSymbolsByLayerId(layerId).defaultSymbol();
                var graphic = new Graphic(feature.geometry, symbol);
                var contentHTML = QueryLayerConfig.buildFeatureTipHTML(layerId, feature);
                var infoTemplate = new InfoTemplate("详细信息", contentHTML);
                graphic.setInfoTemplate(infoTemplate);
                MapAppConfig.map.graphics.add(graphic);
            });
        }
    };
});
