// 默认运行时配置
import { getUrlParams } from '@/utils/utils';

if(!Window.rbacToken || window.location.href.indexOf("rbacToken")>0){
 
    Window.rbacToken = getUrlParams("rbacToken")
}
