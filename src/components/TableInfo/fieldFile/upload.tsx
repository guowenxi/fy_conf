import React, { useState, useEffect, useMemo, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import type { Dispatch } from 'umi';
import { Link, connect } from 'umi';
import { Upload as AUpload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Iconf} from '../TableInfo';
import { wrapContext } from '../TableInfo';
import { ShowData } from './_css_comm';
import { Form } from 'antd';
import { G } from '@/global';

const { rootUrl } = G;

const MUpload = styled(AUpload)``;
const WrapBox = styled.div`
  && {
    border: 1px solid #d9d9d9;
    padding: 1vh;
    height: 100%;
  }
`;
interface IconfInput extends Iconf {
  placeholder?: string;
}
interface Iinput {
  dispatch?: Dispatch;
  conf: IconfInput;
  name: string;
  rules: any;
}

const Input: React.FC<Iinput> = (props) => {
  const _: any = props.conf;
  const {name} = props;
  const [FILELIST, setFILELIST] = useState<any>([]);
  const [PROPS, setPROPS] = useState({});
  const theme: any = useContext(wrapContext);
  const filterData = function (data: any) {
    let _data: any = [];
    switch (typeof data) {
      case 'string':
        _data == '' ? _data = []  : _data = data.split(',');
        break;
      case 'object':
        _data= data;
        break;
      default:
        _data = [];
        break;
    }
    if(_data.length > 0){
      return _data.map(function (item: any, idx: number) {
        return {
          uid: item.id ? item.id : item ,
          name: item.originalName ? item.originalName : '',
          status: 'done',
          fileType:item.contentType ? item.contentType : "",
          url: `${rootUrl}/rbac/file/download/${item.id ? item.id : item}`,
        }
      })
    }
      return _data;
    
  };
  useEffect(() => {
    const formData = theme.form.getFieldValue(name);
    const data = filterData(formData);  
    // 暂时因为数据会回显 导致这个获取到的data是文件的data, 所以暂时这样做判断


    setFILELIST(data);
    setPROPS({
      name: 'file',
      action: rootUrl + _.uploadUrl,
      // listType: 'picture-card',
      headers: {
        // authorization: 'authorization-text',
      },
      data: {
        // rbacToken:rbacToken
      },
      onRemove(item: any) {},
      onChange(info: any) {
        const files: any = info.fileList;
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done' || info.file.status === 'removed') {
          theme.form.setFieldsValue({
            [name]: files,
          });
        } else if (info.file.status === 'error') {
          // message.error(`${info.file.name} file upload failed.`);
        }
        setFILELIST([...files]);
      },
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
      },
    });
  }, []);

  return (
    <wrapContext.Consumer>
      {(_data) => {
        return (
          <Form.Item name={name} rules={props.rules}>
            <WrapBox>
              <MUpload {...PROPS} fileList={FILELIST}
              disabled={_data.state === 'disabled'}
              >
                {_data.state == 'edit' || _data.state == 'new' ? (
                  <Button>
                    <UploadOutlined /> 上传文件
                  </Button>
                ) : null}
              </MUpload>
            </WrapBox>
          </Form.Item>
        );
      }}
    </wrapContext.Consumer>
  );
};
export default connect(({}) => ({}))(Input);
