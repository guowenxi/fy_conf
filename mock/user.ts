import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'GET /api/fyUnificationReceive/handleEvent/getList': {
    "success":1,
    "errorCode":null,
    "message":"",
    "data":{
      "followInfo":{},
      "info":{
        "actionType":null,
        "annexType":null,
        "appid":"",
        "assistList":[],
        "authName":"",
        "authorityIdea":"",
        "cardPic":"",
        "caseType":null,
        "completeTime":null,
        "consultationCenterId":"",
        "consultationUserId":"",
        "controlIdea":"",
        "createDepartmentId":"",
        "createTime":"2020-06-05 15:03:30",
        "createUserId":"zx1",
        "cutOffTime":"2020-06-10 00:00:00",
        "dealType":"诉讼业务1",
        "dealTypeName":"",
        "department":"",
        "earlyWarningLevel":0,
        "earlyWarningName":"",
        "earlyWarningTime":"2020-06-05 15:03:30",
        "eventClass":1,
        "eventId":"",
        "eventNumber":"202006050001",
        "eventStatus":2,
        "eventTypes":"",
        "files":"",
        "firstDepartmentId":"1",
        "followId":"",
        "followTime":null,
        "handDetail":"",
        "handType":0,
        "handleDepartmentId":"1",
        "handleFilesListStr":"",
        "handlePlatCenterId":"1",
        "handlePlatCenterName":"诉讼服务平台",
        "handleStatus":1,
        "handleTimes":null,
        "handleType":2,
        "hostHandleId":"c6cbc05f71da45888e1693a81fa3702e",
        "hotWordTypes":"",
        "id":"12ff5896e81b4d9b9009ff8c1751a928",
        "incidentAddress":"123",
        "incidentContent":"123123",
        "incidentRemark":"",
        "incidentTime":"2020-06-05 15:03:30",
        "incidentTimeLast":null,
        "inputPic":"",
        "insertIndex":13,
        "involveWeb":"",
        "isAnalyse":1,
        "isAnnex":1,
        "isRead":0,
        "isSelfCreate":1,
        "isTeamWork":1,
        "isType":0,
        "isWarning":-1,
        "joinNum":"",
        "link":"",
        "measure":"",
        "openid":"",
        "petitionCardId":"123",
        "petitionPeople":"12312",
        "petitionPeopleList":[
          {
            "cardId":"123",
            "cardPic":"",
            "cardType":1,
            "createTime":"2020-06-05 15:03:30",
            "currentResidence":"123123",
            "dbName":"",
            "domicile":"123",
            "eventId":"12ff5896e81b4d9b9009ff8c1751a928",
            "id":"54abc9a872d546ca96b562f83c90023b",
            "inputPic":"",
            "name":"12312",
            "phone":"123",
            "roadId":2,
            "roadName":"双港街道",
            "status":1,
            "temperature":123.0,
            "type":null
          }
        ],
        "petitionPeopleType":null,
        "petitionPhone":"123",
        "petitionType":1,
        "queuesNumber":null,
        "rbacToken":"",
        "readUserId":"",
        "recordId":"",
        "remark":"",
        "repetition":0,
        "reportId":"zx1",
        "returnReason":"",
        "roadId":16,
        "seetSource":"",
        "sex":null,
        "sourceId":"",
        "sourceType":112,
        "status":1,
        "teamWorkTime":"2020-06-05 15:03:30",
        "teamworkType":4,
        "temperature":null,
        "title":"202006050001",
        "updateTime":"2020-06-05 15:03:30",
        "waitNum":null,
        "x":0.620497,
        "y":88.967027,
        "yqClassifys":"",
        "yqClassifysContent":""
      }
    }
  },
  // 支持值为 Object 和 Array
  'GET /api/getList': {
    success: 1,
    errorCode: null,
    message: '',
    data: {
      total: 4,
      list: [
        {
          incidentAddress: '909090',
          eventNumber: '202006050038',
          incidentContent: '90909',
          sex: null,
          dealTypeName: '诉讼业务1',
          earlyWarningTime: '2020-06-05 11:11:18',
          updateTime: '2020-06-05 11:11:18',
          remark: '909090',
          title: '202006050038',
          eventTypes: null,
          recordId: '12aa155abdb64fc4b0c20516f907a44c',
          cardId: '23423423',
          petitionPeople: '9090909090',
          petitionPhone: '234234',
          id: '439c99cf7d394d858c84299e6575b751',
          platformName: '诉讼服务平台',
          handlePlatCenterName: '诉讼服务平台',
          event_status: '已指派',
        },
        {
          incidentAddress: '423423',
          eventNumber: '202006050037',
          incidentContent: '423424',
          sex: null,
          dealTypeName: '诉讼业务1',
          earlyWarningTime: '2020-06-05 11:09:12',
          updateTime: '2020-06-05 11:09:13',
          remark: null,
          title: '202006050037',
          eventTypes: null,
          recordId: '1bfa13b6538e4f07a77fdc719d2a1008',
          cardId: '234234',
          petitionPeople: '32424',
          petitionPhone: '23424',
          id: 'b43771dcdb994bca8d3be975d249df83',
          platformName: '诉讼服务平台',
          handlePlatCenterName: '诉讼服务平台',
          event_status: '已指派',
        },
        {
          incidentAddress: '233423',
          eventNumber: '202006050036',
          incidentContent: '42342423',
          sex: null,
          dealTypeName: '诉讼业务1',
          earlyWarningTime: '2020-06-05 11:06:22',
          updateTime: '2020-06-05 11:07:08',
          remark: null,
          title: '202006050036',
          eventTypes: null,
          recordId: 'e91a792f4d4743df9a19afe61fb7228e',
          cardId: '234',
          petitionPeople: '23423',
          petitionPhone: '4234',
          id: 'a06afe505f1744ce9df9644545dced79',
          platformName: '诉讼服务平台',
          handlePlatCenterName: '诉讼服务平台',
          event_status: '已指派',
        },
        {
          incidentAddress: '2',
          eventNumber: '202006040035',
          incidentContent: '2',
          sex: null,
          dealTypeName: '诉讼业务1',
          earlyWarningTime: '2020-06-04 15:02:37',
          updateTime: '2020-06-04 15:04:47',
          remark: '2',
          title: '202006040035',
          eventTypes: null,
          recordId: '635a9160b6ee4ed9bed5f4d3778afdfe',
          cardId: '2',
          petitionPeople: 'xyggg',
          petitionPhone: '2',
          id: 'd5f4d80d240142a5ad9187a4d32b35da',
          platformName: '诉讼服务平台',
          handlePlatCenterName: '诉讼服务平台',
          event_status: '已指派',
        },
      ],
    },
  },
};
