import styled from 'styled-components';
import { Menu } from 'antd';

export const HeaderListItem =styled.div<{ checkName?: boolean } >`
margin:0 2vh;
font-size:17px;
cursor: pointer;
position: relative;
  color:${props => props.checkName ? '#fff' : '#eee'};
  .title{
  }
  &:after{
    display:${props => props.checkName ? 'block' : 'none'};
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 1vh solid transparent;
    border-bottom-color: #fff;
  }
`;
export const SiderListItem =styled(Menu.Item)<{ check_name?: string | boolean ,show_item?: boolean} >`
  /* display:${props => props.show_item ? 'block' : 'none'}; */
  /* background:${props => props.check_name == 'true' ? 'rgba(0,0,0,0.1)' : ''}; */
`;