
export interface AProps {
  /**
   * 全局状态保存仓库
   */
  common?: any;
  /**
   * 选择框请求来的数据保存仓库
   */
  select?: any;
}
export interface AColumns{
    title: string,
    key: string,
    align?: "left" | "center" | "right" | undefined ,
    dataIndex: string,
    className: string,
    width: string,
    render: any
  }
export interface ASocket {
  /**
   * sokect请求类型
   */
  type: string | 'webSocket_init',
  /**
   * sokect请求
   */
  data: {
    /**
     * sokect请求名
     */
    name: string,
    /**
     * sokect请求地址
     */
    ws: string
  }
}
