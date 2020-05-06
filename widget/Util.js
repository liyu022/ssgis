define([
    "dzdtApp/MapDataUtil",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/dijit/InfoWindow",
    "esri/InfoTemplate",
    "esri/graphic", "dojox/widget/Standby", "dojo/topic"], function (MapDataUtil, Point, PictureMarkerSymbol, InfoWindow, InfoTemplate, Graphic, Standby, topic) {
    topic.subscribe("", function () {
    });
    return {
        urlPattern: /^\s*(https?):\/\/([\-\w\.]+)+(:\d+)?(\/([\w\/_\.\-]*(\?\S+)?)?)?\s*$/,
        fitExtent: function () {
            MapDataUtil.fitExtent();
        },
        /**
         * layerName:图层名
         * where：where条件
         * isClear：是否清空地图 false不清空 true 清空 默认是清空的
         */
        queryShape: function (queryParams, isClear) {
            console.log(queryParams.layerName + "----" + queryParams.where);
            MapDataUtil.query({//针对平台再次对数据访问更新服务API进行封装
                layerName: queryParams.layerName,
                where: queryParams.where
            }, isClear);
        },
        clearPartGraphic: function (params) {
            MapDataUtil.clearPartGraphic(params);
        },
        /*
         通过解析obj得到queryShape需要的参数，再调用queryShape
         * */
        queryShapeHelper: function (/*该方法的参数*/obj) {
            this.queryShape(obj["layerName"], obj["where"]);
        },
        isUrl: function (/*String*/ value) {
            if (value) {
                value = value + ""; // ensure it's a string
                return this.urlPattern.test(value);
            }
            return false;
        },
        parseUrl: function (/*URL*/ url) {
            /* Parses url into an associative array of strings
             *  [0] - full url  "http://www.w3schools.com:8080/jsref/tryit.asp?filename=tryjsref_match_regexp"
             *  [1] - protocol  "http"
             *  [2] - host      "www.w3schools.com"
             *  [3] - port      ":8080"
             *  [4] - path      "/jsref/tryit.asp?filename=tryjsref_match_regexp"
             *  [5] - rel. path "jsref/tryit.asp?filename=tryjsref_match_regexp"
             *  [6] - GET args  "?filename=tryjsref_match_regexp"
             */
            var theArrayOfParts = [];
            if (url) {
                url = url + ""; // ensure it's a string
                theArrayOfParts = url.match(this.urlPattern);
            }

            theArrayOfParts.fullUrl = theArrayOfParts[0];
            theArrayOfParts.protocol = theArrayOfParts[1];
            theArrayOfParts.host = theArrayOfParts[2];
            theArrayOfParts.port = theArrayOfParts[3];
            theArrayOfParts.path = theArrayOfParts[4];
            theArrayOfParts.relativePath = theArrayOfParts[5];
            theArrayOfParts.getArgs = theArrayOfParts[6];

            return theArrayOfParts;
        },
        round: function (number, numPlaces) {
            //console.debug("round(" + number + ", " + numPlaces + ")");
            if (!numPlaces) {
                numPlaces = 0;
            }
            if (numPlaces > 5) {
                numPlaces = 5;
            }
            if (numPlaces < -5) {
                numPlaces = -5;
            }
            numPlaces = Math.round(numPlaces);

            //console.debug("rounding " + number + " to " + numPlaces + " places");
            var factor = Math.pow(10, numPlaces);

            return Math.round(number * factor) / factor;
        },
        generateM: function (polyLine, roadStart, roadEnd) {
            var firstPart = polyLine.paths[0];
            var startmile = new Number(roadStart);
            var endmile = new Number(roadEnd);
            var pnts = [], len = firstPart.length, spatialReference = polyLine.spatialReference;
            for (var i = 0; i < len; i++) {
                var x = firstPart[i][0];
                var y = firstPart[i][1];
                var mapPoint = Point(x, y, spatialReference);
                pnts.push(mapPoint);
            }
            //分配M值
            var p1, p2, length = 0, m = 0;
            if (roadStart > roadEnd) {
                m = pnts.length - 2;
                for (var i = m; i >= 0; i--) {
                    p1 = pnts[i];
                    p2 = pnts[i + 1];
                    var len = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    p1.m = length;
                    length += len;
                    p2.m = length;
                }
            } else {
                for (var i = 0, size = pnts.length; i < size - 1; i++) {
                    p1 = pnts[i];
                    p2 = pnts[i + 1];
                    var len = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    p1.m = length;
                    length += len;
                    p2.m = length;
                }
            }


            // 计算桩号比例
            var factor = (endmile - startmile) / length;
            console.info("比例因子:" + factor);
            // 更新每个点内的桩号值
            for (var i = 0, j = pnts.length; i < j; i++) {
                var p = pnts[i];
                p.m = p.m * factor + startmile;
            }
            if (pnts[0].m > pnts[1].m) {
                //升序
                pnts.sort(function (o1, o2) {
                    return (o1.m - o2.m);
                });
            }
            return pnts;
        },
        measure: {
            getDistanceXYXY: function (x1, y1, x2, y2) {
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            },
            getDistance: function (p1, p2) {
                return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
            },
            getGreatCircleDistance1: function (/*esri.geometry.Point*/p1, /*esri.geometry.Point*/ p2) {
                this.measure.getGreatCircleDistance2(p1.y, p1.x, p2.y, p2.x);
            },
            getGreatCircleDistance2: function (/*Number*/ lat1, /*Number*/ lon1, /*Number*/ lat2, /*Number*/ lon2) {
                try {
                    var m = this.measure;
                    var rlat1 = m.degreesToRadians(lat1);
                    var rlon1 = m.degreesToRadians(lon1);
                    var rlat2 = m.degreesToRadians(lat2);
                    var rlon2 = m.degreesToRadians(lon2);

                    var ellipse = {
                        name: "WGS80",
                        a: 6378.137 / 1.852,
                        invf: 298.257223563
                    };

                    // Some Util functions
                    var mod = function (x, y) {
                        return x - y * Math.floor(x / y);
                    };

                    var modcrs = function (x) {
                        return mod(x, 2 * Math.PI);
                    };

                    var a = ellipse.a;
                    var f = 1 / ellipse.invf;

                    var r, tu1, tu2, cu1, su1, cu2, s1, b1, f1;
                    var x, sx, cx, sy, cy, y, sa, c2a, cz, e, c, d;
                    var EPS = 0.00000000005;
                    var faz, baz, s;
                    var iter = 1;
                    var MAXITER = 100;
                    if ((rlat1 + rlat2 === 0.0) && (Math.abs(rlon1 - rlon2) == Math.PI)) {
                        alert("Course and distance between antipodal points is undefined");
                        rlat1 = rlat1 + 0.00001; // allow algorithm to complete
                    }
                    if (rlat1 == rlat2 && (rlon1 == rlon2 || Math.abs(Math.abs(rlon1 - rlon2) - 2 * Math.PI) < EPS)) {
                        //console.warn("Points 1 and 2 are identical- course undefined");
                        return 0;
                    }
                    r = 1 - f;
                    tu1 = r * Math.tan(rlat1);
                    tu2 = r * Math.tan(rlat2);
                    cu1 = 1.0 / Math.sqrt(1.0 + tu1 * tu1);
                    su1 = cu1 * tu1;
                    cu2 = 1.0 / Math.sqrt(1.0 + tu2 * tu2);
                    s1 = cu1 * cu2;
                    b1 = s1 * tu2;
                    f1 = b1 * tu1;
                    x = rlon2 - rlon1;
                    d = x + 1; // force one pass

                    var atan2 = this.atan2;
                    while ((Math.abs(d - x) > EPS) && (iter < MAXITER)) {
                        iter = iter + 1;
                        sx = Math.sin(x);
                        cx = Math.cos(x);
                        tu1 = cu2 * sx;
                        tu2 = b1 - su1 * cu2 * cx;
                        sy = Math.sqrt(tu1 * tu1 + tu2 * tu2);
                        cy = s1 * cx + f1;
                        y = atan2(sy, cy);
                        sa = s1 * sx / sy;
                        c2a = 1 - sa * sa;
                        cz = f1 + f1;
                        if (c2a > 0.0) {
                            cz = cy - cz / c2a;
                        }
                        e = cz * cz * 2.0 - 1.0;
                        c = ((-3.0 * c2a + 4.0) * f + 4.0) * c2a * f / 16.0;
                        d = x;
                        x = ((e * cy * c + cz) * sy * c + y) * sa;
                        x = (1.0 - c) * x * f + rlon2 - rlon1;
                    }
                    faz = modcrs(atan2(tu1, tu2));
                    baz = modcrs(atan2(cu1 * sx, b1 * cx - su1 * cu2) + Math.PI);
                    x = Math.sqrt((1 / (r * r) - 1) * c2a + 1);
                    x += 1;
                    x = (x - 2.0) / x;
                    c = 1.0 - x;
                    c = (x * x / 4.0 + 1.0) / c;
                    d = (0.375 * x * x - 1.0) * x;
                    x = e * cy;
                    s = ((((sy * sy * 4.0 - 3.0) * (1.0 - e - e) * cz * d / 6.0 - x) * d / 4.0 + cz) * sy * d + y) * c * a * r;
                    var out = {};
                    out.d = s;
                    out.dist = s * 1852; // to meters
                    out.crs12 = faz;
                    out.crs21 = baz;
                    if (Math.abs(iter - MAXITER) < EPS) {
                        alert("Algorithm did not converge");
                    }
                    return out.dist;
                }
                catch (err) {
                    console.error("Error calculating great circle distance", err);
                    return 0;
                }
            }
        },
        getNearestPoint: function (polyLine, pos) {
            var pnts = [];
            var firstPart = polyLine.paths[0];
            for (var i = 0, j = firstPart.length; i < j; i++) {
                var x = firstPart[i][0];
                var y = firstPart[i][1];
                var mapPoint = Point(x, y, polyLine.spatialReference);
                pnts.push(mapPoint);
            }
            var nearestPnt = pnts[0];
            console.info("nearestPnt:", pnts.length);
            var dis = this.measure.getDistance(nearestPnt, pos.geometry);
            for (var i = 1, j = pnts.length; i < j; i++) {
                var d = this.measure.getDistance(pnts[i], pos.geometry);
                console.info("dis:" + dis + " d:" + d);
                if (d < dis) {
                    dis = d;
                    nearestPnt = pnts[i];
                }
            }
            return nearestPnt;
        },
        /**
         * 根据坐标获取桩号
         */
        getPosByLonLat: function (polyLine, roadStart, roadEnd, pos) {
            var pnts = this.generateM(polyLine, roadStart, roadEnd);
            //找到最近点
            var startIdx = 0, endIdx = pnts.length - 1;
            var pStart, pEnd;
            var disStart, disEnd;
            while (endIdx - startIdx >= 2) {
                var midIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
                pStart = pnts[startIdx];
                pEnd = pnts[endIdx];
                disStart = this.measure.getDistance(pStart, pos);
                disEnd = this.measure.getDistance(pEnd, pos);
                if (disStart < disEnd) {
                    endIdx = midIdx;
                } else {
                    startIdx = midIdx;
                }
            }
            var p1 = pnts[startIdx];
            var p2 = pnts[endIdx];
            pos.m = p1.m + (p2.m - p1.m) / 2;
            pos.x = p1.x + (p2.x - p1.x) / 2;
            pos.y = p1.y + (p2.y - p1.y) / 2;
            return pos;
        },
        /**
         * 根据桩号值获取点
         */
        getLonLatByRoadPos: function (polyLine, roadStart, roadEnd, pos) {
            var pnts = this.generateM(polyLine, roadStart, roadEnd);
            var size = pnts.length;
            pos = new Number(pos);
            //找到最近点
            var startIdx = 0;
            var endIdx = size - 1;
            var midIdx;
            while (endIdx - startIdx > 2) {
                midIdx = Math.floor((startIdx + endIdx) / 2);
                if ((pnts[midIdx].m) * 100 > pos * 100) {
                    endIdx = midIdx;
                } else {
                    startIdx = midIdx;
                }
            }
            var p1 = pnts[startIdx];
            var p2 = pnts[endIdx];
            var p = {m: pos};
            var x = (p.m - p1.m) / (p2.m - p1.m) * (p2.x - p1.x) + parseFloat(p1.x);
            var y = (p.m - p1.m) / (p2.m - p1.m) * (p2.y - p1.y) + parseFloat(p1.y);
            var point = new Point(x, y, polyLine.spatialReference);
            point.m = pos;
            return point;
        },

        addZHtoMap: function (mapPoint, graphic) {
            if (mapPoint && graphic) {
                var html = [];
                var lxdm = graphic.attributes["路线代码"];
                if (!lxdm) {
                    lxdm = graphic.attributes["LXDM"]
                }
                html.push("<b>路线代码：</b>" + lxdm);
                html.push("<b>当前桩号：</b>" + mapPoint.m.toFixed(3) + "公里");
                var contentHTML = html.join("<br/>");
                var infoTemplate = new InfoTemplate("详细信息", contentHTML);
                var picturePath = require.toUrl();
                var symbol = PictureMarkerSymbol("dzdtApp/resources/image/zh.png", 20, 20);
                var graphic = new Graphic(mapPoint, symbol);
                graphic.setInfoTemplate(infoTemplate);
                dzdtAppConfig.map.graphics.add(graphic);
                dzdtAppConfig.map.centerAt(mapPoint);//地图居中
            }
        },

        nullToWarp: function (obj) {
            if (obj === null) {
                return "";
            } else {
                return obj;
            }
        },

        hightlightGraphic: function (labelName, where, isInitial) {
            return MapDataUtil.hightlightGraphic(labelName, where, isInitial);
        }
    }
});