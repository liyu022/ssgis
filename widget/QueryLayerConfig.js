/**

 * @Title: LayerConfig.js

 * @Package dzdtApp

 * @Description: 图层配置

 * @author kimbo

 * @date 2014年12月9日 上午8:58:57

 * @version V1.0

 */
define(["esri/symbols/PictureMarkerSymbol", "widget/MapAppConfig", "dzdtApp/ZTLayerConfig"], function (PictureMarkerSymbol, MapAppConfig, ZTLayerConfig) {
    var UNIT = {Meters: "米", Kilometre: "公里"};
    var numberFormat = function (value) {
        if (value == 0) {
            return 0.000;
        }
        if (!value) {
            return 0.000;
        }
        var num = new Number(value);
        num = num.toFixed(3);
        return num;
    }
    return {
        layers: [
            {
                layerId: [16, 17, 18, 19, 20, 21],//支持同一类型的多个图层配置 例如：高速公路、国道、省道、县道、乡道、专道 值需要和地图服务中的图层ID对应
                layerName: ["高速公路", "国道", "省道", "县道", "乡道", "专道"],//自定义图层名称 可随意修改 个数需要和layerId对应
                layerUserId: ["GSGL", "GUODAO", "SHENGDAO", "XIANDAO", "XIANGDAO", "ZHUANGDAO"],//编程时使用到的ID  不要随意修改 个数需要和layerId对应
                groupName: "道路",//图层分组名称 可随意填写
                groupId: "LAYERGROUP_DL",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "LXDM", label: "路线代码", isBriefly: true, isFeatureGroupField: true},
                    {name: "QDMC", label: "起点名称", isBriefly: true},
                    {name: "ZDMC", label: "止点名称", isBriefly: true},
                    {name: "QDZH", label: "起点桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "ZDZH", label: "止点桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre}
                ]
            },
            {
                layerId: [13, 14],//支持同一类型的多个图层配置 例如：高速公路、国道、省道、县道、乡道、专道 值需要和地图服务中的图层ID对应
                layerName: ["车道特征", "路面类型"],//自定义图层名称 可随意修改 个数需要和layerId对应
                layerUserId: ["CDTZ", "LMLX"],//编程时使用到的ID  不要随意修改 个数需要和layerId对应
                groupName: "道路专题统计",//图层分组名称 可随意填写
                groupId: "LAYERGROUP_Statistic",//分组ID随便填写，但不能重复，仅在编程时使用，请不要随便修改此项
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "LXDM", label: "路线代码", isBriefly: true, isFeatureGroupField: true},
                    {name: "QDZH", label: "起点桩号", isBriefly: true},
                    {name: "ZDZH", label: "止点桩号", isBriefly: true},
                    {name: "QDMC", label: "起点名称", isBriefly: true},
                    {name: "ZDMC", label: "止点名称", isBriefly: true}
                ]
            },
            {
                layerId: [2, 3, 4],
                layerName: ["国省桥", "县道桥梁", "乡专村道桥梁"],
                layerUserId: ["GSQ", "XDQ", "XZCQ", "QL"],//编程时使用到的ID  不要随意修改 个数需要和layerId对应
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                groupName: "桥梁",
                groupId: "LAYERGROUP_QL",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                //1特大桥，2大桥，3中桥，4小桥
                symbols: {
                    "symbolFilterField": "QLJSZKPDDM",
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_qldefault.png', 24, 24);
                    },
                    "4": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_qldefault.png', 24, 24);
                    },
                    "3": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_qlbig.png', 26, 26);
                    },
                    "2": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_qlbigger.png', 30, 30);
                    },
                    "1": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_qlbiggest.png', 32, 32);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "QLMC", label: "桥梁名称", isBriefly: true},
                    {name: "QLDM", label: "桥梁编码", isBriefly: true},
//                    {name: "SJHZDJDM", label: "荷载等级", isBriefly: true, format: dzdtAppConfig.levelFormat},
                    {name: "QLJSZKPDDM", label: "评定等级", isBriefly: true, format: dzdtAppConfig.pddjFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "ASYNXFLDM", label: "使用年限分类", isBriefly: true, format: dzdtAppConfig.yearTypeFormat},
                    {name: "QLZXZH", label: "中心桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre}

                ]
            },
            {
                layerId: [5],
                isChangleAble: false,
                layerName: ["桥梁"],
                layerUserId: ["QLFX"],//编程时使用到的ID  不要随意修改 个数需要和layerId对应
                groupName: "桥梁分析",
                groupId: "LAYERGROUP_QLFX",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_ql.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "QLMC", label: "桥梁名称", isBriefly: true},
                    {name: "SJHZDJDM", label: "荷载等级", isBriefly: true},
                    {name: "QLJSZKPDDM", label: "评定等级", isBriefly: true},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "ASYNXFLDM", label: "使用年限分类", isBriefly: true},
                    {name: "QLZXZH", label: "中心桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre}

                ]
            },
            {
                layerId: [0, 1],
                layerName: ["隧道", "特长和长隧道"],
                layerUserId: ["SD", "TCCSD"],//编程时使用到的ID  不要随意修改 个数需要和layerId对应
                groupName: "隧道",
                groupId: "LAYERGROUP_SD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "symbolFilterField": "SDFL",
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sdsmall.png', 24, 24);
                    },
                    //1特长隧道
                    "1": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sdbiggest.png', 32, 32);
                    },
                    //2长隧道
                    "2": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sdbigger.png', 30, 30);
                    },
                    //3中隧道
                    "3": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sdbig.png', 26, 26);
                    },
                    //4短隧道
                    "4": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sdsmall.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "SDMC", label: "隧道名称", isBriefly: true},
                    {name: "SDBM", label: "隧道编码", isBriefly: true},
                    {name: "SDZXZH", label: "中心桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "SDFL", label: "隧道分类", isBriefly: true, format: dzdtAppConfig.sdflTypeFormat},
                    {name: "JSPDDJ", label: "评定等级", isBriefly: true, format: dzdtAppConfig.sdpddjTypeFormat},
                    {name: "SDCD", label: "隧道长度", isBriefly: true, unit: UNIT.Meters},
                    {name: "SDJK", label: "隧道净宽", isBriefly: true, unit: UNIT.Meters},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                ]
            },
            {
                layerId: [7],
                layerName: ["收费站"],
                layerUserId: ["SFZ"],
                groupName: "收费站",
                groupId: "LAYERGROUP_SFZ",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_sfz.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "SFZMC", label: "收费站名称", isBriefly: true},
                    {name: "SFZBM", label: "收费站编码", isBriefly: true},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "SXXFX", label: "收费站分类", isBriefly: true, format: dzdtAppConfig.sfzlxTypeFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                ]
            },
            {
                layerId: [6],
                layerName: ["服务区"],
                layerUserId: ["FWQ"],
                groupName: "服务区",
                groupId: "LAYERGROUP_FWQ",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                //1高速公路服务区，2一般公路服务区
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_fwqyiban.png', 24, 24);
                    },
                    "1": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_fwqgs.png', 30, 30);
                    },
                    "2": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_fwqyiban.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "FWQMC", label: "服务区名称", isBriefly: true},
                    {name: "FWQBM", label: "服务区编码", isBriefly: true},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "LX", label: "服务区类型", isBriefly: true, format: dzdtAppConfig.fwqTypeFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "LXBM", label: "路线编码", isBriefly: true},
                ]
            },
            {
                layerId: [12],
                layerName: ["交通流量观测站"],
                layerUserId: ["JTLGCZ"],
                groupName: "交通流量观测站",
                groupId: "LAYERGROUP_GCZ",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_jtlgcz.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "GCZMC", label: "观测站名称", isBriefly: true},
                    {name: "GCZBM", label: "观测站编码", isBriefly: true},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "GCZLX", label: "观测类型", isBriefly: true, format: dzdtAppConfig.gclxTypeFormat},
                    {name: "GCFX", label: "观测方向", isBriefly: true, format: dzdtAppConfig.gcfxTypeFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                ]
            },
            {
                layerId: [11],
                layerName: ["出入口"],
                groupName: "出入口",
                layerUserId: ["CRK"],
                groupId: "LAYERGROUP_CRK",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_crk.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是+否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */ {name: "ID", label: "ID", isBriefly: false},
                    {name: "CRKBM", label: "出入口编码", isBriefly: true},
                    {name: "CRKMC", label: "出入口名称", isBriefly: true},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "LX", label: "类型", isBriefly: true, format: dzdtAppConfig.crkTypeFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "LXBM", label: "路线编码", isBriefly: true},
                ]
            },
            {
                layerId: [10],
                layerName: ["监控设施设备"],
                layerUserId: ["JKSSSB"],
                groupName: "监控设备",
                groupId: "LAYERGROUP_JKSSSB",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_jksxsb.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "JKSSMC", label: "设备名称", isBriefly: true},
                    {name: "JKSSBH", label: "设备编号", isBriefly: true},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "JKSBLX", label: "监控设备类型", isBriefly: true, format: dzdtAppConfig.jksxsblxTypeFormat},
                    {name: "SBSYZT", label: "设备使用状态", isBriefly: true, format: dzdtAppConfig.sbsyztTypeFormat},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "LXBM", label: "路线编码", isBriefly: true},
                ]
            },
            {
                layerId: [9],
                layerName: ["可变情报板"],
                layerUserId: ["KBQBB"],
                groupName: "可变情报板",
                groupId: "LAYERGROUP_KBQBB",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_kbqbb.png', 24, 24);
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "QBBMC", label: "情报板名称", isBriefly: true},
                    {name: "QBBBM", label: "情报板编码", isBriefly: true},
                    {name: "QBBLX", label: "类型", isBriefly: true, format: dzdtAppConfig.qbbTypeFormat},
                    {name: "SBSYZT", label: "使用状态", isBriefly: true, format: dzdtAppConfig.sbsyztTypeFormat},
                    {name: "ZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "LXMC", label: "路线名称", isBriefly: true},
                    {name: "LXBM", label: "路线编码", isBriefly: true},
                ]
            },
            {
                layerId: [8],
                layerName: ["治超站"],
                layerUserId: ["ZCZ"],
                groupName: "治超站",
                groupId: "LAYERGROUP_ZCZ",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_lxcheck_zcz.png', 24, 24)
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "ZCZMC", label: "治超站名称", isBriefly: true},
                    {name: "ZCZBM", label: "治超站编码", isBriefly: true},
                    {name: "ZDJB", label: "级别", isBriefly: true, format: dzdtAppConfig.pddjFormat},
                    {name: "LXJSDJ", label: "技术等级", isBriefly: true, format: dzdtAppConfig.jsdjFormat},
                    {name: "DWZH", label: "桩号", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "LXMC", label: "路线名称", isBriefly: true}
                ]
            },
            {
                layerId: [8],
                layerName: ["标志标牌"],
                layerUserId: ["BZBP"],
                groupName: "标志标牌",
                groupId: "LAYERGROUP_BZBP",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                isStructure: true,//如果此项为true则在选择构造物时可选中此图层
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('resources/marks/img_mapicon_bzbp.png', 24, 24)
                    }
                },
                fields: [
                /**
                 * isBriefly是否在简要信息中显示
                 * isFeatureGroupField 是否是图元的分组字段 如果存在此字段在点选一个图元后会查找同一类型的其它图元
                 *  如选中G2中的某一段，程序会自动选择所有的G2
                 */
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "BPMC", label: "标牌名称", isBriefly: true},
                    {name: "BPBM", label: "标牌编码", isBriefly: true},
                    {name: "DWZH", label: "定位桩号", isBriefly: true, format: dzdtAppConfig.pddjFormat},
                    {name: "XZQHBM", label: "行政区划", isBriefly: true, format: dzdtAppConfig.jsdjFormat},
                    {name: "BPLX", label: "标牌类型", isBriefly: true, format: numberFormat, unit: UNIT.Kilometre},
                    {name: "BPYT", label: "标牌用途", isBriefly: true},
                    {name: "ID", label: "图片", isBriefly: false},
                ]
            }
        ].concat(ZTLayerConfig.layers),
        endWith: function (str, s) {
            if (!str || !s) {
                return false;
            }
            if (s == null || s == "" || str.length == 0 || s.length > str.length)
                return false;
            if (str.substring(str.length - s.length) == s)
                return true;
            else
                return false;
        },
        getQueryTaskUrl: function () {
            var taskUrl = dzdtAppConfig.defaultQueryService;
            if (!taskUrl) {
                console.error("AppConfig中未配置默认的数据查询地址");
                return null;
            }
            if (!this.endWith(taskUrl, "/")) {
                taskUrl = taskUrl + "/";
            }
            return taskUrl;
        },
        /**
         * 获取所有构造物图层
         */
        getStructureLayer: function () {
            var allStructureLayer = [];
            $.each(this.layers, function (i, layer) {
                if (layer["isStructure"] == true) {
                    allStructureLayer.push(layer);
                }
            });
            return allStructureLayer;
        },
        getStructureLayerIds: function () {
            var allStructureLayer = this.getStructureLayer();
            var allStructureLayerIds = [];
            $.each(allStructureLayer, function (i, layer) {
                allStructureLayerIds = allStructureLayerIds.concat(layer["layerId"]);
            });
            console.info("allStructureLayerIds:", allStructureLayerIds);
            return allStructureLayerIds;
        },
        formatValue: function (field, value) {
            if (value == undefined || field == null) {
                return "";
            }
            var format = field["format"];
            if (format) {
                value = format(value);
            }
            if (field["unit"]) {
                value += field["unit"];
            }
            return value;
        },
        buildFeatureTipHTMLByGroupId: function (layerGroupId, feature) {
            var fields = this.getLayerBrieflyFieldsByGroupId(layerGroupId);
            return this.buildFeatureHTML(fields, feature);
        },
        buildFeatureTipHTMLByUserId: function (layerUserId, feature) {
            var fields = this.getLayerBrieflyFieldsByUserId(layerUserId);
            return this.buildFeatureHTML(fields, feature);
        },
        buildFeatureTipHTML: function (layerId, feature) {
            var fields = this.getLayerBrieflyFields(layerId);
            return this.buildFeatureHTML(fields, feature);

        },
        buildFeatureHTML: function (fields, feature) {
            var html = [];
            var attrs = feature.attributes;
            if (fields) {//配置了字段信息 否则显示全部没翻译的信息
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    var label = field["label"];
                    var value = attrs[field["name"].toUpperCase()];
                    if (!value) {
                        value = attrs[field["name"].toLowerCase()];
                    }
                    value = this.formatValue(field, value);
                    html.push("<b>" + label + "</b>:" + value);
                }
            } else {
                for (var o in attrs) {
                    var label = o;
                    var value = attrs[o];
                    if (!value) {
                        value = "";
                    }
                    html.push("<b>" + label + "</b>:" + value);
                }
            }

            var contentHTML = html.join("<br/>");
            return contentHTML;
        },
        /**
         * 获取字段中文名
         */
        getFieldChineseLabel: function (layerId, fieldName) {
            var field = this.getField(layerId, fieldName);
            if (field) {
                return field["label"];
            } else {
                return null;
            }
        }, /**
         * 获取字段中文名
         */
        getField: function (layerId, fieldName) {
            var layerFields = this.getLayerFields(layerId);
            var layerField = null;
            if (layerFields) {
                for (var i = 0; i < layerFields.length; i++) {
                    var field = layerFields[i];
                    if (field["name"].toUpperCase() == fieldName.toUpperCase()) {
                        layerField = field;
                    }
                }
            }
            return layerField;
        },
        getSymbolsByGroupId: function (groupId) {
            var layerConfig = this.getLayerConfigByGroupId(groupId);
            if (layerConfig) {
                return layerConfig["symbols"];
            }
            return null;
        },
        getSymbolsByLayerId: function (layerId) {
            var layerConfig = this.getLayerConfig(layerId);
            if (layerConfig) {
                return layerConfig["symbols"];
            }
            return null;
        },
        /**
         * 通过自定义图层编号获取图层在地图服务中的编号
         */
        getLayerConfigByLayerUserId: function (layerUserId) {
            var layerConfig = null;
            $.each(this.layers, function (i, obj) {
                //console(typeof(layerId),layerId);
                if (typeof(obj["layerUserId"]) == 'object') {
                    $.each(obj["layerUserId"], function (i, o) {
                        if (o == layerUserId) {
                            layerConfig = obj;
                            return false;
                        }
                    });
                } else {
                    if (obj["layerUserId"] == layerUserId) {
                        layerConfig = obj;
                        return false;
                    }
                }
            });
            return layerConfig;
        },
        getLayerIdByUserId: function (layerUserId) {
            var layerConfig = this.getLayerConfigByLayerUserId(layerUserId);
            if (!layerConfig) {
                return null;
            }
            var userIds = layerConfig["layerUserId"];
            console.info("getLayerIdByUserId:", layerUserId);
            if (typeof(userIds) == 'object') {
                var layerId = layerConfig["layerId"];
                console.info("layerId:", layerId);
                for (var i = 0; i < userIds.length; i++) {
                    if (userIds[i] == layerUserId) {
                        return layerId[i];
                    }
                }
            } else {
                return layerConfig["layerId"];
            }
            return null;
        },
        /**
         * 通过图层分组编号获取图层配置信息
         */
        getLayerConfigByGroupId: function (layerGroupId) {
            var layerConfig = null;
            $.each(this.layers, function (i, obj) {
                if (obj["groupId"] == layerGroupId) {
                    layerConfig = obj;
                    return false;
                }
            });
            return layerConfig;
        },
        /**
         * 通过图层分组编号获取图层ID
         */
        getQueryLayerIdsByGroupId: function (layerGroupId) {
            var layerConig = this.getLayerConfigByGroupId(layerGroupId);
            if (!layerConig) {
                return [];
            }
            return layerConig["layerId"];
        },
        /**
         * 通过图层编号获取图层字段信息
         */
        getLayerFieldsByGroupId: function (layerGroupId) {
            var layerConfig = this.getLayerConfigByGroupId(layerGroupId);
            if (layerConfig) {
                return layerConfig["fields"];
            }
            return null;
        },
        getFeatureGroupFieldByGroupId: function (layerGroupId) {
            var layerConig = this.getLayerConfigByGroupId(layerGroupId);
            if (!layerConig) {
                return null;
            }
            var field = null;
            var fields = this.getLayerFieldsByGroupId(layerGroupId);
            if (!fields) {
                return null;
            }
            $.each(fields, function (i, obj) {
                if (obj["isFeatureGroupField"]) {
                    field = obj;
                    return false;
                }
            });
            return field;
        },
        /**
         * 通过图层编号获取图层配置信息
         */
        getLayerConfig: function (layerId) {
            var layerConfig = null;
            $.each(this.layers, function (i, obj) {
                //console(typeof(layerId),layerId);
                if (typeof(obj["layerId"]) == 'object') {
                    $.each(obj["layerId"], function (i, o) {
                        if (o == layerId) {
                            layerConfig = obj;
                            return false;
                        }
                    });
                } else {
                    if (obj["layerId"] == layerId) {
                        layerConfig = obj;
                        return false;
                    }
                }
            });
            return layerConfig;
        },
        /**
         * 通过图层编号获取图层字段信息
         */
        getLayerFields: function (layerId) {
            var layerConfig = this.getLayerConfig(layerId);
            if (layerConfig) {
                return layerConfig["fields"];
            }
            return null;
        },
        getLayerFieldsByUserId: function (layerUserId) {
            var layerConfig = this.getLayerConfigByLayerUserId(layerUserId);
            if (layerConfig) {
                return layerConfig["fields"];
            }
            return null;
        },
        getLayerBrieflyFields: function (layerId) {
            var allFields = this.getLayerFields(layerId);
            if (!allFields) {
                return null;
            }
            var fields = [];
            for (var i = 0; i < allFields.length; i++) {
                var field = allFields[i];
                if (field["isBriefly"] == true) {
                    fields.push(field);
                }
            }
            if (fields.length > 0) {
                return fields;
            } else {
                return null;
            }
        },
        getLayerBrieflyFieldsByUserId: function (layerUserId) {
            var allFields = this.getLayerFieldsByUserId(layerUserId);
            if (!allFields) {
                return null;
            }
            var fields = [];
            for (var i = 0; i < allFields.length; i++) {
                var field = allFields[i];
                if (field["isBriefly"] == true) {
                    fields.push(field);
                }
            }
            if (fields.length > 0) {
                return fields;
            } else {
                return null;
            }
        },
        getLayerBrieflyFieldsByGroupId: function (layerGroupId) {
            var allFields = this.getLayerFieldsByGroupId(layerGroupId);
            if (!allFields) {
                return null;
            }
            var fields = [];
            for (var i = 0; i < allFields.length; i++) {
                var field = allFields[i];
                if (field["isBriefly"] == true) {
                    fields.push(field);
                }
            }
            if (fields.length > 0) {
                return fields;
            } else {
                return null;
            }
        },
        getFeatureGroupField: function (layerId) {
            var field = null;
            var fields = this.getLayerFields(layerId);
            if (!fields) {
                return null;
            }
            $.each(fields, function (i, obj) {
                if (obj["isFeatureGroupField"]) {
                    field = obj;
                    return false;
                }
            });
            return field;
        },
        /**
         * 通过图层编号获取图层名称
         */
        getLayerName: function (layerId) {
            var layerConfig = this.getLayerConfig(layerId);
            if (layerConfig) {
                return layerConfig["layerName"];
            }
            return null;
        },
        /**
         * 通过图层编号和字段英文名获取字段中文名
         */
        getFieldChineseLabel: function (layerId, fieldName) {
            var fieldLabel = null;
            if (!fieldName) {
                return null;
            }
            var layerConfig = this.getLayerConfig(layerId);
            if (layerConfig == null) {
                return null;
            }
            if (!layerConfig["fields"]) {
                return null;
            }
            $.each(layerConfig["fields"], function (i, obj) {
                if (obj["name"].toUpperCase() == fieldName.toUpperCase()) {
                    fieldLabel = obj["label"];
                    return false;
                }
            });
            return fieldLabel;
        },


        /**
         * 通过图层用户编号和字段中文名获取字段原始名称
         */
        getFieldEnglishLabel: function (groupID, labelName) {
            if (!labelName) {
                return null;
            }
            var layerFieldsConfig = this.getLayerConfigByGroupId(groupID);
            if (layerFieldsConfig == null) {
                return null;
            }
            var fields = layerFieldsConfig.fields;
            var len = layerFieldsConfig.fields.length;
            for (var i = 0; i < len; i++) {
                var obj = layerFieldsConfig.fields[i];
                if (labelName.toUpperCase() == obj["label"].toUpperCase()) {
                    return obj["name"];
                }
            }
            return null;
        },
        /**
         * 获取所有查询图层的编号
         */
        getQueryLayerIds: function () {
            var arr = [];
            $.each(this.layers, function (i, obj) {
                if (typeof(obj["layerId"]) == 'object') {
                    $.each(obj["layerId"], function (i, o) {
                        arr.push(o);
                    });
                } else {
                    arr.push(obj["layerId"]);
                }
            });
            return arr;
        }
    }
});
