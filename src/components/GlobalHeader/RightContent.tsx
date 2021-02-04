import { Tooltip, Tag,message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch_';
import SelectLang from '../SelectLang';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import UserInfo from './UserInfo';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout,dispatch } = props;
  const [userName, seTUserName] = useState('');
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  dispatch({
    type: `common/requestData`,
    method:"get",
    name:"userInfo",
    url: "/rbac/login/getLoginInfoByRbacToken",
    payload: {
 },
    callback:(res: object)=>{
    }
  });

  return (
    <div className={className}>

      {/* <NoticeIconView /> */}
      {/* <Avatar menu /> */}
      <UserInfo/>
      {/* {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )} */}
    </div>
  );
};

export default connect(({ settings}: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
