import React from 'react';
import { Tabs as ATabs } from 'antd';

const { TabPane } = ATabs;




interface Props {
  data: any,
  onClick: Function;
  checkIndex ?:string;
}
const Tabs: React.FC<Props> = (props) => {
  const { data,checkIndex} = props;


  const callback =(data: any)=>{
    try{
      props.onClick(data);
    }catch(err){
        console.error("onClick is undefined")
    }

  }

  return (
    <ATabs defaultActiveKey={checkIndex} onChange={callback}>
      {
        Array.isArray(data)?data.map((item: { name: React.ReactNode; id: string | number | undefined; })=>{
          return <TabPane tab={item.name} key={item.id}>
        </TabPane>
        }):null
      }
  </ATabs>
  );
};

export default Tabs;
