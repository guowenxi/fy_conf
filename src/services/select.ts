import request from '@/utils/request';

import { G } from "@/global"

const {rootUrl } = G;

interface data {

}
// 简单的通用请求方式
export async function requestData(data: data,url: string,method: string) {
    const opt: {method: string,params? : any,data? : any} = {
      method
    }
  method.toUpperCase()==='GET' ? opt.params = data : opt.data = data ;
  const _url  = url.indexOf("http")>=0 ? url : rootUrl + url;
  return request(_url,opt);
}

export async function getCentrelAndTypeList(data: data) {

  return request(`${rootUrl}fyUnificationReceive/dealPlatform/getCentrelAndTypeList`,{
    method: 'GET',
    params:data,
  });
}

export async function getTypeListByPId(data: data) {

  return request(`${rootUrl}fyUnificationReceive/dealPlatform/getTypeListByPId`,{
    method: 'GET',
    params:data,
  });
}
