import c from '@/../config/config.json';

export class G {
  /**
   * 高德地图的key
   */
    public static amapkey: string = process.env.AMAP_KEY  || "";
    /**
     * 全局地图中心点
     */
    public static mapCenter: any = process.env.AMAP_KEY;
    /**
     * 请求地址根目录,会根据环境配置
     */
    public static rootUrl: string = process.env.UMI_ENV == 'development' ?  c.DEV_URL : c.BUILD_URL;
    /**
     * 调试环境token
     */
    public static rbacToken: string =  c.RBACTOKEN;
    /**
     * 登录跟登出导向的地址
     */
    public static loginUrl: string =  c.LOGIN_URL;
  }

// 初始化记载数据层面也在此