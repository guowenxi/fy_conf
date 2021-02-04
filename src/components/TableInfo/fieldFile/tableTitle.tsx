import React, {  } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { Iconf} from '../TableInfo';
import { wrapContext } from '../TableInfo';

// let TableTitle = styled(AInput)`
//   && {
//     height:100%;
//     padding: 1vh;
//   }
// `;

interface IconfInput extends Iconf {
  placeholder?: string;
}
interface Iinput {
  dispatch?: Dispatch;
  conf: IconfInput;
  name: string;
}

const TableTitle: React.FC<Iinput> = (props) => {
  const _: any = props.conf;

  return (
    <wrapContext.Consumer>
      {(_data) => {
        return (
          <div>
            <div></div>
            {_.defaultValue}
          </div>
        );
      }}
    </wrapContext.Consumer>
  );
};
export default connect(({}) => ({}))(TableTitle);
