import * as homeApi from '@/services/common';
// import {load_premission} from '@/services/common';
import { message } from 'antd/lib/index';
import type { Reducer ,Subscription } from 'umi';
import * as service from '@/services/socket';
import type { ASocket } from '@/globalTyping';

import { G } from "@/global"

const {rbacToken} = G;
const Message = message;

interface Istate {
  list_data: Record<string, any>[];
  pagination?: {
    CURRENT: number | string;
    TOTAL: number;
    PAGESIZE: number;
  };
  rightDetailBoxState: boolean;
  smallPopupState: boolean;
  premissionList: Record<string, any>[];
  selUserState: boolean;
  belongTime: string /* 排班时间 */;
  // 镇街列表
  roadList: Record<string, any>[];

  // 设置any类型
  [k: string]: any;
}

export interface Icommon {
  namespace: 'common';
  state: Istate;
  effects: {
    requestData: any,
  };
  reducers: {
    save: Reducer;
    webSocket_init: any;
  };
  subscriptions: {
    setup: Subscription,
    socket: Subscription
  }
}

const common: Icommon = {
  namespace: 'common',
  state: {
    userInfo: [],
    list_data: [],
    rightDetailBoxState: false,
    smallPopupState: false,
    premissionList: [] /* 权限 */,
    selUserState: false,
    belongTime: '' /* 排班时间 */,
    // 镇街列表
    roadList: [],
  },
  effects: {
    // 获取数据的方法
    *requestData(_: any, { call , put  }: any) {
      try {
        const { success, data, message } = yield call(
          homeApi.requestData,
          { ..._.payload, rbacToken },
          _.url,
          _.method ? _.method : 'GET',
        );
        if (success === 1) {
          if (_.name) {
            yield put({
              type: 'save',
              payload: {
                [_.name]: data || [],
              },
            });
          }
          if (_.callback) _.callback(data);
          return data;
        }
        Message.error(message);
        // return Promise.reject(new Error(message))
      } catch (err) {
        // Message.error(err.message)
        // return Promise.reject(err)
      }
    },
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    webSocket_init(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(({  }) => {});
    },
    socket({ dispatch }) {
      // socket相关
      return service.listen((data: ASocket ) => {
        switch (data.type) {
          case 'init':
            dispatch({
                type: 'webSocket_init',
                payload: {
                  [data.data.name] : data.data.ws
                }
            });
            break;
        }
      });
    },
  },
};
export default common;
