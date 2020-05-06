/**

 * @Title: ZTLayerConfig.js

 * @Package dzdtApp

 * @Description: 各个专题的图层配置 构造物的配置在QueryLayerConfig中

 * @author kimbo

 * @date 2014年12月13日 下午1:54:38

 * @version V1.0

 */
define(["esri/symbols/PictureMarkerSymbol", "widget/MapAppConfig"], function (PictureMarkerSymbol, MapAppConfig) {
    var UNIT = {Meters: "米", Kilometre: "公里"};
    var numberFormat = function (value) {
        if (!value) {
            return 0;
        }
        var num = new Number(value);
        num = num.toFixed(3);
        return num;
    }
    return {
        layers: [
            {
                groupName: "客运站点",
                groupId: "LAYERGROUP_KYZD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol("widget/resources/marks/img_lxcheck_sd.png", 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "kyzmc", label: "客运站名称", isBriefly: true},
                    {name: "kyzbm", label: "客运站编码", isBriefly: true},
                    {name: "lxdh", label: "联系电话", isBriefly: true},
                    {name: "jyfw", label: "行政区划", isBriefly: true}
                ]
            },
            {
                groupName: "货运站点",
                groupId: "LAYERGROUP_HYZD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "HYZDMC", label: "货运站名称", isBriefly: true},
                    {name: "hyzbm", label: "货运站编码", isBriefly: true},
                    {name: "zj", label: "站级", isBriefly: true},
                    {name: "jyfw", label: "经营范围", isBriefly: true}
                ]
            },
            {
                groupName: "车辆维修企业",
                groupId: "LAYERGROUP_CLWXQY",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "jyyhmc", label: "维修企业名称", isBriefly: true},
                    {name: "jyyhxkzbh", label: "经营业户许可证编号", isBriefly: true},
                    {name: "jyyhmc", label: "经营业户名称", isBriefly: true},
                    {name: "xykhjg", label: "信誉考核结果", isBriefly: true},
                    {name: "wxlb", label: "维修类别", isBriefly: true}
                ]
            },
            {
                groupName: "驾培机构",
                groupId: "LAYERGROUP_JPJG",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "jyyhmc", label: "名称", isBriefly: true},
                    {name: "jyyhxkzbh", label: "经营业户许可证编号", isBriefly: true},
                    {name: "jgjb", label: "机构级别", isBriefly: true},
                    {name: "gm", label: "规模", isBriefly: true},
                    {name: "pxfw", label: "培训范围", isBriefly: true}
                ]
            },
            {
                groupName: "航运班线",
                groupId: "LAYERGROUP_KYBX",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24)
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "bxmc", label: "名称", isBriefly: true},
                    {name: "sfd", label: "始发地", isBriefly: true},
                    {name: "zdd", label: "终到地", isBriefly: true},
                    {name: "tjd", label: "途径地", isBriefly: true},
                    {name: "sbsj", label: "首班时间", isBriefly: true},
                    {name: "mbsj", label: "末班时间", isBriefly: true}
                ]
            },
            {
                groupName: "货运装载源头企业",
                groupId: "LAYERGROUP_HYZZYTQY",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "hyzzqyhjgqymc", label: "名称", isBriefly: true},
                    {name: "schwzl", label: "生产物种类", isBriefly: true},
                    {name: "zygydmc", label: "主要供应地名称", isBriefly: true},
                    {name: "zyysxlmc", label: "主要运输线路名称", isBriefly: true}
                ]
            },
            {
                groupName: "常规公共汽车运营线路",
                groupId: "LAYERGROUP_CGGGQCYYXL",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol("dzdtApp/resources/marks/img_lxcheck_sd.png", 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "lxmc", label: "名称", isBriefly: true},
                    {name: "lxbm", label: "路线编码", isBriefly: true},
                    {name: "xlfx", label: "路线方向", isBriefly: true},
                    {name: "xllc", label: "路线里程", isBriefly: true}
                ]
            },
            {
                groupName: "常规公共汽车运营站点",
                groupId: "LAYERGROUP_CGGGQCYYZD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "lxmc", label: "名称", isBriefly: true},
                    {name: "zdbh", label: "站点编码", isBriefly: true},
                    {name: "sxxfx", label: "上下行方向", isBriefly: true},
                    {name: "dylxmc", label: "对应线路名称", isBriefly: true},
                    {name: "dylxbm", label: "对应线路编码", isBriefly: true}
                ]
            },
            {
                groupName: "公共电汽车停车保养厂",
                groupId: "LAYERGROUP_GGDQCTCBYC",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "zcmc", label: "名称", isBriefly: true},
                    {name: "zcbh", label: "站场编号", isBriefly: true},
                    {name: "zcmc", label: "站场名称", isBriefly: true},
                    {name: "dz", label: "地址", isBriefly: true},
                    {name: "lxdh", label: "联系电话", isBriefly: true}
                ]
            },
            {
                groupName: "城市轨道交通运营线路",
                groupId: "LAYERGROUP_CSGDJTYYXL",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "lxbh", label: "线路编号", isBriefly: true},
                    {name: "lxlc", label: "线路里程", isBriefly: true}
                ]
            },
            {
                groupName: "城市轨道交通运营站点",
                groupId: "LAYERGROUP_CSGDJTYYZD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "zdmc", label: "名称", isBriefly: true},
                    {name: "zdbh", label: "站点编码", isBriefly: true},
                    {name: "sxxfx", label: "上下行方向", isBriefly: true}
                ]
            },
            {
                groupName: "出租车停靠点",
                groupId: "LAYERGROUP_CZCTK",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "zdmc", label: "名称", isBriefly: true},
                    {name: "zdbh", label: "停靠点编码", isBriefly: true},
                    {name: "zdlx", label: "停靠点类型", isBriefly: true}
                ]
            },
            {
                groupName: "港口",
                groupId: "LAYERGROUP_GK",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "gkmc", label: "名称", isBriefly: true},
                    {name: "gkdm", label: "港口编码", isBriefly: true}
                ]
            },
            {
                groupName: "重点渡口",
                groupId: "LAYERGROUP_ZDDK",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "dkmc", label: "名称", isBriefly: true},
                    {name: "dkdm", label: "渡口编码", isBriefly: true}
                ]
            },
            {
                groupName: "码头",
                groupId: "LAYERGROUP_MT",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "mtmc", label: "名称", isBriefly: true},
                    {name: "mtdm", label: "码头编码", isBriefly: true}
                ]
            },
            {
                groupName: "内河航道",
                groupId: "LAYERGROUP_NHHD",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "hdmc", label: "名称", isBriefly: true},
                    {name: "nhhddm", label: "内河航道代码", isBriefly: true}
                ]
            },
            {
                groupName: "执法部门",
                groupId: "LAYERGROUP_ZFBM",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "jgmc", label: "机构名称", isBriefly: true},
                    {name: "jgbm", label: "机构编码", isBriefly: true}
                ]
            },
            {
                groupName: "广告牌",
                groupId: "LAYERGROUP_GGP",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "mc", label: "名称", isBriefly: true},
                    {name: "zh", label: "桩号", isBriefly: true}
                ]
            },
            {
                groupName: "非公路标志",
                groupId: "LAYERGROUP_FGLBZ",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "mc", label: "名称", isBriefly: true},
                    {name: "zh", label: "桩号", isBriefly: true}
                ]
            },
            {
                groupName: "地面构筑物",
                groupId: "LAYERGROUP_DMGZW",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "mc", label: "名称", isBriefly: true},
                    {name: "zh", label: "桩号", isBriefly: true}
                ]
            },
            {
                groupName: "跨越公路设施",
                groupId: "LAYERGROUP_KYGLSS",//分组ID随便填写，但不能重复，仅在编程时使用，请部署时不要随便修改此项
                symbols: {
                    "defaultSymbol": function () {
                        return new PictureMarkerSymbol('dzdtApp/resources/marks/img_lxcheck_sd.png', 24, 24);
                    }
                },
                fields: [
                    {name: "ID", label: "ID", isBriefly: false},
                    {name: "mc", label: "名称", isBriefly: true},
                    {name: "zh", label: "桩号", isBriefly: true}
                ]
            }
        ]
    }
});