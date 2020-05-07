(function () {
	var MapAppconfig = {
			geometryService:"http://113.140.66.230:18180/arcgis/rest/services/Utilities/Geometry/GeometryServer",
			xmpro:"http://113.140.66.230:18180/arcgis/rest/services/TCSSmap/MapServer",
			
			//ssym:"http://113.140.66.230:18180/arcgis/rest/services/TCYM/MapServer",
			ssym:"http://192.168.2.39:6080/arcgis/rest/services/sstcbjx/MapServer",
			sssl:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxBaseMap_XX/MapServer",
			ssslbz:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxBaseMap_LB/MapServer",
			
			ssyx:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxImgMap/MapServer",
//			ssyxbz:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxBaseMap_LB/MapServer",
//			ssyxdt:"http://localhost:6080/arcgis/rest/services/new_tcyx/MapServer",
			ssyxdt:"http://192.168.2.39:6080/arcgis/rest/services/tcyxdt/MapServer",
			ssdm:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxShade/MapServer",
			ssdmbz:"http://113.140.66.226:33225/arcgis/rest/services/TDTSxImgLabel/MapServer",
			ssztbj:"http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer",
			
			styx:"http://192.168.2.39:6080/arcgis/rest/services/cjskyx/MapServer",

		mapExtent: {
			wkid: 4326,
			xmin: 108.567,
			ymin: 34.83,
			xmax: 109.5,
			ymax: 35.5
		},
		mapCenter: {
			lat: 109.033,
			lon: 35.165,
			level: 10
		},
		layerTree: [{
			"id": "ztsj",
			"name": "专题数据",
			"pId": "zt",
			"open": true
		},
//-----------------------------------水土流失开始--------------------------------------------------------
		{
			"id": "stls",
			"pId": "ztsj",
			"name": "水土流失",
			"open": true
		},
		{
			"id": "stls1",
			"name": "谷坊",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new/MapServer/12",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/12",

		},
		{
			"id": "stls2",
			"name": "拦砂坝",
			"pId": "stls",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new/MapServer/14",
		 	"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/14",
		},
		{
			"id": "stls3",
			"name": "生产路",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new/MapServer/18",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/18"
		},
		{
			"id": "stls4",
			"name": "田间道路",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new/MapServer/19",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/19"
		},
		{
			"id": "stls5",
			"name": "排水沟",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/20",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/20"
		},
		{
			"id": "stls6",
			"name": "排洪沟",
			"pId": "stls",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/21",
		 	"urlbj":"http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/21"
		},
		{
			"id": "stls7",
			"name": "水源涵养林",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/27",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/27"
		},
		{
			"id": "stls8",
			"name": "梯田改造",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/28",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/28"
		},
		{
			"id": "stls9",
			"name": "水保经果林",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/29",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/29"
		},
		{
			"id": "stls10",
			"name": "封山育林",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/30",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/30"
		},
		{
			"id": "stls11",
			"name": "水土保持林",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/31",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/31"
		},
		{
			"id": "stls12",
			"name": "湿地",
			"pId": "stls",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/35",
		 	"urlbj":"http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/35"
		},
		{
			"id": "stls13",
			"name": "林分改良",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/32",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/32",
			"timeUrl":"http://localhost:6080/arcgis/rest/services/zdybf/MapServer/0",
		},
		{
			"id": "stls14",
			"name": "测未完成淤地坝",
			"pId": "stls",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new/MapServer/11",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/11"
		},
//-----------------------------------水土流失结束--------------------------------------------------------
//-----------------------------------农田生态提升开始----------------------------------------------------
		{
			"id": "stts",
			"pId": "ztsj",
			"name": "农田生态提升",
			"open": true
		},
		{
			"id": "stts1",
			"name": " 涝池",
			"pId": "stts",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/25",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/25"
		},
		{
			"id": "stts2",
			"name": "小型蓄水池",
			"pId": "stts",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/10",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/10"
		},
		{
			"id": "stts3",
			"name": "堰塘",
			"pId": "stts",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/24",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/24"
		},
		{
			"id": "stts4",
			"name": "测未完成小型蓄水池",
			"pId": "stts",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/13",
		 	"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/13"
		},
		{
			"id": "stts5",
			"name": "农田提升改造",
			"pId": "stts",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/36",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/36"
		},
		{
			"id": "stts5",
			"name": "蓄水池",
			"pId": "stts",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/26",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/26"
		},

//-----------------------------------农田生态提升结束--------------------------------------------------------
//-----------------------------------水资源保护与利用开始---------------------------------------------------
		{
			"id": "szybh",
			"pId": "ztsj",
			"name": "水资源保护与利用",
			"open": true
		},
		{
			"id": "szybh1",
			"name": "箱涵",
			"pId": "szybh",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/15",
		 	"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/15"
		},
		{
			"id": "szybh2",
			"name": "护岸",
			"pId": "szybh",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/16",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/16"
		},
		{
			"id": "szybh3",
			"name": "测未完成道路、排水沟、护岸",
			"pId": "szybh",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/23",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/23"
		},
		{
			"id": "szybh4",
			"name": "亲水步道",
			"pId": "szybh",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/17",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/17"
		},
//-----------------------------------水资源保护与利用结束--------------------------------------------------------
//-----------------------------------农村面源污染整治开始---------------------------------------------------		
		{
			"id": "ncmwr",
			"pId": "ztsj",
			"name": "农村面源污染整治",
			"open": true
		},
		{
			"id": "ncmwr1",
			"name": "污水处理厂",
			"pId": "ncmwr",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/8",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/8"
		},
		{
			"id": "ncmwr2",
			"name": "垃圾中转站",
			"pId": "ncmwr",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/9",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/9"
		},
		{
			"id": "ncmwr3",
			"name": "镇级点位",
			"pId": "ncmwr",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/6",
		 	"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/6"
		},
		{
			"id": "ncmwr4",
			"name": "村级点位",
			"pId": "ncmwr",
			"open": true,
		 	"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/7",
		 	"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/7"
		},
//-----------------------------------农村面源污染整治结束--------------------------------------------------------
//-----------------------------------农村面源污染整治开始---------------------------------------------------
		{
			"id": "fqks",
			"pId": "ztsj",
			"name": "废弃矿山整治",
			"open": true
		},
		{
			"id": "fqks1",
			"name": "废弃矿山整治",
			"pId": "fqks",
			"open": true,
			"urlc": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new1/MapServer/33",
			"urlbj": "http://113.140.66.230:18180/arcgis/rest/services/TCZTmap_new2/MapServer/33"
		}],
	}
	window.MapAppconfig = MapAppconfig;
	if (typeof define === "function" && define.amd) {
		define("widget/MapAppconfig", [], function () {
			return MapAppconfig;
		});
	}

}
)()