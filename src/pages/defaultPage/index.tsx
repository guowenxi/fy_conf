import React, { useState } from 'react';
import { Table, Form, Modal, Spin, Button, Drawer, message } from 'antd';
import type { Icommon } from '@/models/common';
import { connect } from 'umi';
import styled from 'styled-components';
import SearchMore from '@/components/SearchMore/SearchMore';
import { useAntdTable, useDynamicList } from 'ahooks';
import type { PaginatedParams } from 'ahooks/lib/useAntdTable';
import commonStyle from '@/common.less';
import { TopBtnWrap, ButtonBox } from '@/globalStyled';
import type {  Dispatch } from 'umi';

import styles from './style.less';
import { filterKeys } from '@/utils/utils';
import TableInfo from '@/components/TableInfo/TableInfo';
import type { AProps } from '@/globalTyping';
import TABLEJSON from './TABLEJSON.json';
import columns from './columns.json';
import { G } from '@/global';

const { Column } = Table;
const { rootUrl, rbacToken } = G;
const TableMoreBox = styled.div`
  .time-line-box {
    margin-top: 1vh;
  }
  .ant-spin-nested-loading {
    position: relative;
    height: 100%;
    .ant-spin-container {
      position: absolute;
      top: 0;
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;
      .fy-common-bottom-box {
        display: flex;
        flex-flow: column;
        height: 100%;
      }
      .ant-table-wrapper {
        flex: 1;
        height: 85%;
        .ant-table {
          flex: 1;
          height: 85%;
          .ant-table-container {
            height: 100%;
            overflow-y: auto;
          }
        }
      }
      .ant-pagination {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

interface _Props extends AProps{
  dispatch: Dispatch;
}
const table = (props: _Props) => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [DETAIL, setDETAIL] = useState({}); /* 表格详情 */
  const [DetailId, setDetailId] = useState('');
  const [SELECTROWKEYS, setSELECTROWKEYS] = useState([]); // 列表多选框
  const [exportObj, setexportObj] = useState({});
  const { list, replace } = useDynamicList<any>([]);
  const [rowSelectedData, setRowSelectedData] = useState<Record<string, any>>({}); // 表格选中样式

  // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props });

  // 获取对应的TABLEJSON
  const getTABLEJSON = (idx: number) => {
    return TABLEJSON[idx];
  };
  // 列表加载数据的方法
  //---------------
  const getTableData = (
    { current, pageSize }: PaginatedParams[0],
    formData: Object,
  ): Promise<any> => {
    const obj = filterKeys(formData);
    setexportObj(obj);
    return new Promise((resolve) => {
      dispatch({
        type: 'common/requestData',
        method: 'GET',
        url: columns.url,
        payload: {
          pageNo: current,
          pageSize,
          ...filterKeys(formData),
        },
        callback: (_data: any) => {
          const { list } = _data;
          resolve({
            list,
            total: _data.total,
          });
        },
      });
    });
  };
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  //---------------
  /* 行选中 */
  const onRowAction = (record: Record<string, any>, index?: number): any => {
    return {
      onClick: (e: any) => {
        setRowSelectedData(record);
        // setDawerVisible(true)
        rowSelect(record);
      },
    };
  };
  const { submit, reset } = search;
  /* 导出 */
  const exportManagement = () => {
    console.log(exportObj, 'exportObj');
    let url_ = `?rbacToken=${rbacToken}&pageSize=10`;
    for (const key in exportObj) {
      if (exportObj[key]) {
        url_ += `&${key}=${exportObj[key]}`;
      }
    }
    console.log(url_);
    const url = `${rootUrl}/dataView/sgi/exportSgiEventDetail${url_}`;
    window.location.href = url;
  };
  // 详情
  const rowSelect = (record: any) => {
    return {
      onClick: () => {
        dispatch({
          type: 'common/requestData',
          method: 'GET',
          url: '/dataView/sgi/selectEventDetail',
          payload: {
            id: record.id,
          },
          callback: (_data) => {
            setDETAIL(_data);
          },
        });
        setDetailId(record.id);
      },
    };
  };
  // 新增编辑 提交
  // 删除
  const onDelete = () => {
    Modal.confirm({
      title: '删除',
      icon: '',
      content: '是否删除当前选中的数据',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        let idString: string = '';
        SELECTROWKEYS.map((item: any) => {
          idString = `${idString + item},`;
        });
        dispatch({
          type: 'common/requestData',
          method: 'GET',
          url: '/jh_security/jhManage/deleteFleetInfo',
          payload: {
            id: idString,
          },
          callback: (_data) => {
            message.success('删除成功');
            reset();
          },
        });
      },
    });
  };

  return (
    <TableMoreBox className={commonStyle['right-main-box']}>
      <Spin spinning={false}>
        <div className={`${commonStyle['top-box']}`}>
          <TopBtnWrap className="btn-box">
            <Button onClick={exportManagement} type="primary" danger className="topBtn">
              导出
            </Button>
            {SELECTROWKEYS.length > 0 ? (
              <Button onClick={onDelete} type="primary" danger className="topBtn">
                删除
              </Button>
            ) : null}
          </TopBtnWrap>
          <SearchMore
            type={columns.searchListType}
            form={form}
            searchList={columns.searchList}
            submit={submit}
            reset={reset}
          ></SearchMore>
        </div>
        <div className={commonStyle['bottom-box']}>
            <Table
              rowKey="id"
              {...tableProps}
              // 如果要对列表进行多选的时候可以打开
              rowSelection={
                columns.checkBox
                  ? {
                      type: 'checkbox',
                      columnWidth:'5%',
                      selectedRowKeys: SELECTROWKEYS,
                      onChange: (selectedRowKeys: any) => {
                        setSELECTROWKEYS(selectedRowKeys);
                      }
                    }
                  : undefined
              }
              // 如果当前行可选中则放开
              onRow={onRowAction}
              className={`virtual-table  ${styles['scroll-table-box']}`}
              rowClassName={(record: Record<string, any>) =>
                record.id === rowSelectedData.id ? styles['select-bg-color'] : ''
              }
            >
              {columns.tableColumns
                ? columns.tableColumns.map((i: any,idx: number) => {
                    return (
                      <Column
                      key={idx}
                        {...i}
                        onCell={(): any => ({ width: i.width })}
                        onHeaderCell={(): any => ({ width: i.width })}
                      ></Column>
                    );
                  })
                : null}
              {columns.operation && !!columns.operation.length ? (
                <Column
                  title="操作"
                  width="30%"
                  render={(text: any, record: any) => {
                    return (
                      <ButtonBox>
                        {!!columns.operation.length &&
                          columns.operation.map((item: any, idx: number) => {
                            return (
                              <a
                              key={idx}
                                onClick={() => {
                                  replace(idx, true);
                                  // setVISIBLE(true)
                                  setDETAIL(record);
                                }}
                              >
                                {item.name}
                              </a>
                            );
                          })}
                      </ButtonBox>
                    );
                  }}
                ></Column>
              ) : null}
            </Table>
          </div>

          {columns.operation.map((item: any, idx: number) => (
            <Drawer
              key={idx}
              title="详情"
              placement="right"
              width={item.drawerWidth ? `${item.drawerWidth}vw` : '56vw'}
              closable={true}
              onClose={() => {
                replace(idx, false);
              }}
              visible={list[idx]}
              destroyOnClose={true}
            >
              <TableInfo
                border="true"
                data={getTABLEJSON(idx)}
                detail={DETAIL}
                state={'disabled'}
                onCancel={() => {
                  replace(idx, false);
                }}
              ></TableInfo>
            </Drawer>
          ))}

      </Spin>
    </TableMoreBox>
  );
};

export default connect(({ common, select }: { common: Icommon; select: any }) => ({
  common,
  select,
}))(table);
