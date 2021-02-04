/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import type { Icommon } from '@/models/common';
import type { BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import React, { useState, useMemo } from 'react';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
// import { GithubOutlined } from '@ant-design/icons';
import RightContent from '@/components/GlobalHeader/RightContent';
import { useList } from 'react-use';
import { Layout, Menu } from 'antd';

import { defaultLoadData } from '@/utils/utils';
import styles from './BaseLayout.less';
import { HeaderListItem, SiderListItem } from './WrapperLayout';
import { useWhyDidYouUpdate } from 'ahooks';
import c from '@/../config/config.json';

const { Header, Content, Sider } = Layout;
export interface BasicLayoutProps extends ProLayoutProps {
  settings: Settings;
  dispatch: Dispatch;
}

interface IuserInfo {
  name: string;
  duty: string;
}

export const permissionContext = React.createContext({ permission: '', iframeUrl: '' });

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { dispatch, children } = props;
  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props });
  // 定义可变参数

  const [headerIndex, set_headerIndex] = useState<number | string | null>('0');
  const [sideIndex, set_sideIndex] = useState<number | string | null>('0');
  const [iframeUrl, set_iframeUrl] = useState<string>('');

  const [permissionList, set_permissionList] = useState<any>([]);
  const [permissionItem, set_permissionItem] = useState<any>([]);

  const [] = useList();

  const userInfo: IuserInfo = { name: '', duty: '' };

  const getRestOfMenu = () => {
    dispatch({
      type: 'common/requestData',
      method: 'GET',
      url: c.ROUTERLIST_URL.url,
      payload: {
        ...c.ROUTERLIST_URL.payload
      },
      callback: (_data: any) => {
        console.log(
          `headerIndex=${sessionStorage.getItem(
            'headerIndex',
          )} , sideIndex=${sessionStorage.getItem('sideIndex')}`,
        );
        defualtRouter(_data);
      },
    });
  };

  const defualtRouter = (data: any) => {
    // 默认跳转路由
    // 如果默认sessionStorage不存在则赋值为0;
    if (
      sessionStorage.getItem('headerIndex') == null ||
      sessionStorage.getItem('sideIndex') == null
    ) {
      sessionStorage.setItem('headerIndex', '0');
      sessionStorage.setItem('sideIndex', '0');
    } else {
      set_headerIndex(sessionStorage.getItem('headerIndex'));
      set_sideIndex(sessionStorage.getItem('sideIndex'));
    }
    // 保存权限list
    set_permissionList(data);
    const defaultTempList =
      data[String(sessionStorage.getItem('headerIndex'))].tempList[String(sessionStorage.getItem('sideIndex'))];
    set_permissionItem(defaultTempList);
    // 判断是否跳转iframe
    if (defaultTempList.type === 'iframe') {
      set_iframeUrl(c.STATICLIST[0].tempList[0].path);
      history.push(`/iframe`);
    } else {
      history.push(`/${defaultTempList.name.replace(':', '_')}`);
    }
  };

  // 默认加载?
  useMemo(() => {
    // 目前已解决加载一次问题
    // 默认加载列表组 一次性请求所有列表数据
    defaultLoadData(dispatch);
    c.STATICLIST
      ? (set_permissionList(c.STATICLIST), defualtRouter(c.STATICLIST))
      : getRestOfMenu();
  }, []);

  return (
    <permissionContext.Provider value={{ permission: permissionItem, iframeUrl }}>
      <Layout className={styles.baseLayout} id="body-main">
        <Header className={styles.header}>
          <div className={styles.logo}>
            {/* <img className={styles.icon} src={logo} /> */}
            <div className={`${styles.title} vertical`}>
              {`${c.HEADTITLE}`} {c.HEADSUBTITLE != '' ? ` |` : ''}
            </div>
            <span className={`${styles.sub} vertical`}>{`${c.HEADSUBTITLE}`}</span>
          </div>
          {permissionList.map((item: any, idx: number) => {
            return (
              <HeaderListItem
                key={idx}
                checkName={idx == headerIndex}
                onClick={() => {
                  set_headerIndex(idx);
                  set_sideIndex(0);
                  sessionStorage.setItem('headerIndex', idx.toString());
                  sessionStorage.setItem('sideIndex', '0');
                  permissionList[idx].tempList[0].type == 'iframe'
                    ? (set_iframeUrl(permissionList[idx].tempList[0].path), history.push(`/iframe`))
                    : history.push(`/${permissionList[idx].tempList[0].name.replace(':', '_')}`);
                }}
              >
                {/* <Badge count={25} /> */}
                <div className="title">{item.displayName}</div>
              </HeaderListItem>
            );
          })}
          <RightContent name={userInfo.name} duty={userInfo.duty} />
        </Header>
        <Layout className={styles.mainBox}>
          <Sider>
            <Menu
              theme="light"
              mode="inline"
              className="menu-box"
              selectedKeys={[String(sideIndex)]}
            >
              {permissionList[String(headerIndex)] &&
                permissionList[String(headerIndex)].tempList.map((item: any, idx: number) => {
                  return (
                    <SiderListItem
                      key={idx}
                      onClick={() => {
                        set_permissionItem(item.tempList);
                        set_sideIndex(idx);
                        sessionStorage.setItem('sideIndex', idx.toString());
                        item.type == 'iframe'
                          ? (set_iframeUrl(item.path), history.push(`/iframe`))
                          : history.push(`/${item.name.replace(':', '_')}`);
                      }}
                      check_name={idx == sideIndex ? 'true' : 'false'}
                      className="left-title"
                    >
                      {/* <Badge count={25}  /> */}
                      {/* <Link to={`/${item.name}`}>{item.displayName}</Link> */}
                      {item.displayName}
                    </SiderListItem>
                  );
                })}
            </Menu>
          </Sider>
          <Content className={styles.mainContent}>
            <Content className={styles.contentBox}>{children}</Content>
          </Content>
        </Layout>
      </Layout>
    </permissionContext.Provider>
  );
};

export default connect(({ common }: { common: Icommon }) => ({
  common,
}))(BasicLayout);
