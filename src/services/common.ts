import request from '@/utils/request';
import { G } from "@/global"

const {rootUrl } = G;


// 简单的通用请求方式
export async function requestData(data: any,url: string,method: string) {
  const opt: {method: string,params? : any,data? : any} = {
    method
  }
  method.toUpperCase()==='GET' ? opt.params = data : opt.data = data ;
  // method.toUpperCase()==='POST' ? opt.headers = { 
  //   'Content-Type': 'application/x-www-form-urlencoded' ,
  //   'Accept' :'application/json, text/plain, */*'
  // }   : null  ;
  const _url  = url.indexOf("http")>=0 ? url : rootUrl + url;
  return request(_url,opt);
}