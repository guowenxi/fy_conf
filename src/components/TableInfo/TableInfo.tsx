import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './item';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Button, Space } from 'antd';
import { connect } from 'umi';
import { useEventEmitter } from 'ahooks';
import moment from 'moment/moment';
import { FormView } from './fieldFile/_css_comm';

{
  /* <wrapContext.Provider value={{ state, form, focus$, event$ }}> */
}

export const wrapContext = React.createContext<any>({ state: '' });
export const WrapBox = styled(Scrollbars)<{
  minHeight?: string;
  itemWidth?: string;
  border?: boolean;
}>`
  box-shadow: ${(props) => (props.border ? `0 0 0 1px #ccc` : `0`)};
`;

export const CssContentItem = styled(ContentItem)<{ toggle?: boolean }>`
  display: ${(props) => (props.toggle ? 'none' : 'flex')};
`;
const TableTitle = styled.div<{ lineColor?: string }>`
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0 3vh;
  position: relative;
  text-indent: 10px;
  display: flex;
  &:before {
    position: absolute;
    top: 50%;
    left: 1vh;
    width: 5px;
    height: 40%;
    background: ${(props) => (props.lineColor ? props.lineColor : `#000`)};
    transform: translateY(-50%);
    content: '';
  }
`;

export interface Iconf {
  disabled: boolean;
  size?: 'large' | 'middle' | 'small';
  style: {
    width: string;
  };
}
interface Iprops {
  defaultValue: string;
}
export interface Ifield {
  col?: 7;
  type: 'input' | 'inputNumber' | any;
  props: Iprops;
  name?: string;
}

export interface IitemData {
  costomNode?: any;
  name?: string;
  width?: string;
  height?: string;
  label: {
    name: string;
    col?: number;
    style: Record<string, any>;
  };
  style?: Record<string, any>;
  field: Ifield;
  rules: [
    {
      required: boolean;
      message: string;
    },
  ];
}
interface TitleIitemData extends IitemData {
  type: string;
  lineColor: string;
  text: string;
  className: string;
  toggle: boolean;
}

interface TableList {
  name: string;
  type: 'link' | 'text' | 'default' | 'ghost' | 'primary' | 'dashed' | undefined;
  click: (arg: any) => void;
}
interface TableInfoProps {
  data: IitemData[] | any;
  state: 'new' | 'edit' | 'default' | 'disabled' | '';
  onValuesChange?: (changedValues: any, allValues: any) => void;
  onSubmit: (arg: any) => void;
  onCancel: (arg: any) => void;
  form: Record<string, any>;
  buttons: TableList[];
  border: boolean;
  detail: any;
  children?: any;
}

const TableInfo = (props: TableInfoProps) => {
  const { children, detail, data, state, buttons, border, onSubmit, onCancel } = props;
  const focus$ = useEventEmitter();
  const event$ = useEventEmitter();
  const [DATALIST, setDATALIST] = useState(data);
  function fiterData(data: any, key: any) {
    // 如果是时间字段 则进行时间字段过滤
    if (Date.parse(data) && isNaN(data) && key.toUpperCase().indexOf('TIME') >= 0) {
      return moment(data);
    }
    return data;
  }
  const setDefualtVal = (info: {}) => {
    // 如果info是空值则返回
    if (Object.keys(info).length === 0) return;
    const list: any = [];
    // 对数据进行重组
    function formatData(data: Record<string, any>, pkey?: string | undefined) {
      for (const key in data) {
        if (data[key] === null) {
          list[key] = data[key];
        } else if (typeof data[key] !== 'object' || data[key].constructor !== Object) {
          // 如果有父级则进行.进行标记
          if (pkey) {
            // 先将数据过滤 如果有附带子集的数据 则改成"xx.xx"格式
            list[`${pkey}.${key}`] = fiterData(data[key], key);
          } else {
            // 默认的字段过滤
            list[key] = fiterData(data[key], key);
          }
        } else {
          formatData(data[key], key);
        }
      }
    }
    formatData(info);

    if (list.hasOwnProperty('longitude')) {
      form.setFields([
        {
          name: 'lnglat',
          value: [list.longitude, list.latitude],
        },
      ]);
    } else if (list.hasOwnProperty('x')) {
      form.setFields([
        {
          name: 'lnglat',
          value: [list.x, list.y],
        },
      ]);
    }

    form.setFieldsValue(list);
  };
  const [form] = Form.useForm();

  focus$.useSubscription((data: any) => {
    switch (data.type) {
      case 'toggle':
        const _list: any[] = [];
        DATALIST.map(function (item: {
          name: any;
          toggle: boolean;
          field: { props: { requiredStatus: null | undefined } };
          rules: { required: boolean }[];
        }) {
          if (data.relateNames.indexOf(item.name) >= 0) {
            item.toggle = !item.toggle;

            if (!item.toggle) {
              if (
                item.field.props.requiredStatus != undefined ||
                item.field.props.requiredStatus != null
              ) {
                item.rules[0].required = item.field.props.requiredStatus;
              }
            } else {
              item.rules[0].required = false;
            }
          }
          _list.push(item);
        });
        setDATALIST(_list);
        break;
      case 'onChange':
        event$.emit(data);
        break;
    }
  });

  useEffect(() => {
    // 如果有detail 则认为是带默认值的,进行数据过滤处理并赋值
    if (Object.keys(detail).length && state !== 'new') {
      setDefualtVal(detail);
    } else {
      form.resetFields();
    }
  }, [detail]);

  const onFinish = (data: any) => {
    onSubmit(data);
  };

  const cancel = (data: any) => {
    onCancel(data);
  };

  // 默认过滤初始值
  const initialValues_fn = (data: IitemData[]) => {
    const list: IitemData[] = [];
    data.forEach((item: any) => {
      item.field ? (list[item.name] = item.field.props.defaultValue) : null;
    });
    return list;
  };
  // 回调传出form的值改变
  function onValuesChange(): void {
    // props.onValuesChange(changedValues, allValues);
  }

  return (
    <wrapContext.Provider value={{ state, form, focus$, event$ }}>
      <FormView
        form={form}
        onFinish={onFinish}
        initialValues={initialValues_fn(data)}
        onValuesChange={onValuesChange}
      >
        <WrapBox border={border}>
          {DATALIST.map((item: TitleIitemData, idx: string | number | undefined) => {
            if (item.type === 'title') {
              return <TableTitle lineColor={item.lineColor}>{item.text}</TableTitle>;
            }
            return (
              <CssContentItem
                key={idx}
                className={item.className}
                _item={item}
                toggle={item.toggle}
              ></CssContentItem>
            );
          })}
          {children}
        </WrapBox>
        <Space className="sub-button-box">
          {buttons &&
            buttons.map((item) => {
              return (
                <Button
                  htmlType="submit"
                  type={item.type ? item.type : 'primary'}
                  onClick={item.click.bind(form)}
                >
                  {item.name}
                </Button>
              );
            })}
          {onSubmit && (
            <Button htmlType="submit" type="primary">
              确定
            </Button>
          )}
          {onCancel && (
            <Button type="primary" onClick={cancel}>
              取消
            </Button>
          )}
        </Space>
      </FormView>
    </wrapContext.Provider>
  );
};

export default connect(({}) => ({}))(TableInfo);
