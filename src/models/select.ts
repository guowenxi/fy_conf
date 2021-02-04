import * as homeApi from '@/services/select';
import { message } from 'antd/lib/index';
import type { Reducer, Effect } from 'umi';
import { G } from "@/global"

const {rbacToken } = G;

const Message = message;

export interface ts_emergencyTeamItem {
  id: string;
  groupName?: string;
}
export interface Iselect {
  namespace: 'select';
  state: Record<string, Record<string, any>[]>;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer>;
}

const select: Iselect = {
  namespace: 'select',
  state: {},
  effects: {
    // 获取列表
    *requestData(_, { call, put, select }) {
      try {
        const { success, data, message } = yield call(
          homeApi[_.name] ? homeApi[_.name] : homeApi.requestData,
          { ..._.payload, rbacToken },
          _.url,
          _.method ? _.method : 'GET',
        );
        if (success == 1) {
          let _data = [];
          if (_.filter) {
            _data = _.filter(data);
          } else {
            _data = data;
          }
          yield put({
            type: 'save',
            payload: {
              [_.name]: _data,
            },
          });
          // _.callback(data);
        } else {
          Message.error(message);
        }
      } catch (err) {}
    },
    // 获取列表集,用于减少dom渲染次数
    *requestDataList(_, { call, put, select }) {
      // 获取请求对象
      try {
        const _list: object[] = [];
          const res_list = {};
        _.list &&
          _.list.map((it: any, idx: number) => {
            _list.push(
              call(
                homeApi[it.name] ? homeApi[it.name] : homeApi.requestData,
                { ...it.payload, rbacToken },
                it.url,
                it.method ? it.method : 'GET',
              ),
            );
          });
        // 对请求对象进行阻塞
        const re_list = yield _list;
        re_list.map(function (it: any, i: number) {
          const t = _.list[i];
          if (it.success == 1) {
            res_list[t.name] = t.filter ? t.filter(it.data) : it.data;
          } else {
            Message.error(it.message);
          }
        });
        yield put({
          type: 'save',
          payload: {
            ...res_list,
          },
        });
        // _.callback(_list);
      } catch (err) {}
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    shallowSave(state, { payload }) {
      /* let s = state;
      Object.keys(payload).forEach(key=>{
        s[key]=payload[key]
      })
      return s ; */
      return Object.assign(state, payload);
    },
  },
};

export default select;
