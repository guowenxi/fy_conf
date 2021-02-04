import React from 'react';
import type { Icommon } from '@/models/common';
import type { Iselect } from '@/models/select';
import { connect } from 'umi';
import styled from 'styled-components';
import type { AProps } from '@/globalTyping';

import { permissionContext } from '../../layouts/BasicLayout';

interface Props extends AProps {
  common: any;
  select: any;
}
const AIframe = styled.iframe`
  width:100%;
  height:100%;
  border:none;
  position:absolute;
  left:0;
  top:0;
  padding:1vh;
`;
const table: React.FC<Props> = () => {
  return (
    <permissionContext.Consumer>
      {(_data) => {
        return <AIframe src={_data.iframeUrl}></AIframe>;
      }}
    </permissionContext.Consumer>
  );
};

export default connect(({ common, select }: { common: Icommon; select: Iselect }) => ({
  common,
  select,
}))(table);
