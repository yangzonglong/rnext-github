import React, { memo, useState, useMemo, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { Table as AntdTable, Tooltip } from 'antd';
import { getList } from './api';
import { TableProps, ColumnProps, SizeProps, TableRefProps } from './interface';
import { formatRenderText, handleTablePageSize, getScroll } from './util';
import styles from './table.module.scss';
import ResizeableTitle from './ResizeableTitle';

const DEFAULT_ROWKEY = 'id';
const components = { header: { cell: ResizeableTitle } };

function Table<RecordType extends object = any>(props: TableProps<RecordType>, ref: React.Ref<TableRefProps>) {

  const { columns, url, extra, query, rowKey, rowSelectionType, dataSource: appointDataSource } = props;

  const boxRef = useRef<HTMLDivElement>(null);
  const pageSize = useRef(0);
  const beforeQuery = useRef(query);
  const selectedRows = useRef<RecordType[]>([]);

  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const [scroll, setScroll] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState<string[]>([]);
  const [columnsWidth, setColumnsWidth] = useState({});

  const getListServer = useCallback((page: number, query?: object) => {
    if (!url) return;
    setLoading(true);
    getList(url, page, pageSize.current, sorter, query || {}).then(({ rows, count }) => {
      setDataSource(rows);
      setCount(count);
      setLoading(false);
    })
  }, [url, sorter]);

  useImperativeHandle(ref, () => ({
    getSelectedRows: () => selectedRows.current,
    onRefresh: () => {
      if (page !== 1) return setPage(1);
      getListServer(page, query)
    }
  }));

  useEffect(() => {
    const width = boxRef.current?.offsetWidth || 0;
    const height = boxRef.current?.offsetHeight || 0;
    const exceed = appointDataSource && (appointDataSource.length > pageSize.current);
    const scroll = getScroll(width, height, !!exceed, columns);
    setScroll(scroll);
  }, [columns, appointDataSource]);

  useEffect(() => {

    const offsetHeight = boxRef.current?.offsetHeight || 0;
    pageSize.current = handleTablePageSize(offsetHeight);

    if (beforeQuery.current !== query) { // query change
      beforeQuery.current = query;
      if (page !== 1) return setPage(1);
    }

    getListServer(page, query)
  }, [url, page, query, getListServer]);

  const onChangeTable = useCallback((pagination, filters, sorter) => {
    if (!sorter.field) return setSorter([]);
    const order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    setSorter([sorter.field, order])
  }, []);

  const render = useCallback((text: string, record: RecordType, index, column) => {
    const render = column.render || extra?.find(item => item.dataIndex === column.dataIndex)?.render;
    let handleValue: any = text;
    if (render) handleValue = render(text, record, index);
    if(column.format) handleValue = formatRenderText(handleValue, column.format);
    return column.tooltip ? <Tooltip title={handleValue}><span>{handleValue}</span></Tooltip> : handleValue
  }, [extra]);

  const onResize = useCallback((column: ColumnProps<RecordType>) => {
    return (e: React.BaseSyntheticEvent, { size }: { size: SizeProps }) => {
      if (!column.dataIndex) return;
      setColumnsWidth({ ...columnsWidth, [column.dataIndex as string]: size.width })
    }
  }, [columnsWidth]);

  const handleColumns = useMemo(() => {
    return columns.map((item: ColumnProps<RecordType>) => {
      const dataIndex = item.dataIndex as string;
      const title = item.title || window.$app.t(dataIndex);
      return {
        ...item, title, width: columnsWidth[dataIndex] || item.width,
        render: (text: string, record: RecordType, index: number) => render(text, record, index, item),
        sorter: item.sorter,
        onHeaderCell: (column: ColumnProps<RecordType>) => {
          return { width: column.width, onResize: onResize(column) }
        }
      }
    })
  }, [columns, render, onResize, columnsWidth]);

  const onChangePage = useCallback((page: number) => setPage(page), []);

  const pagination = useMemo(() => ({
    total: count,
    pageSize: pageSize.current,
    showTotal: (total: number) => `${total} total`,
    onChange: onChangePage,
    size: 'default' as any,
    hideOnSinglePage: true,
    showSizeChanger: false
  }), [count, onChangePage]);

  const rowSelection = useMemo(() => ({
    type: rowSelectionType,
    onChange(selectedRowKeys: (number | string)[], _selectedRows: RecordType[]) {
      selectedRows.current = _selectedRows;
    }
  }), [rowSelectionType]);

  const handleOnRow = useCallback((record) => {
    return {
      onDoubleClick: props.onDoubleClick?.bind(null, record),
      ...props.onRow
    }
  }, [props.onRow, props.onDoubleClick]);

  const handleDataSource = useMemo(() => {
    return appointDataSource || dataSource
  }, [appointDataSource, dataSource]);

  return (
    <div ref={boxRef} className={styles.tableBox}>
      <AntdTable
        onRow={handleOnRow}
        rowKey={rowKey || DEFAULT_ROWKEY}
        rowSelection={rowSelectionType ? rowSelection : undefined}
        components={components}
        onChange={onChangeTable}
        loading={loading}
        scroll={props.scroll || scroll}
        bordered
        size='small'
        columns={handleColumns as any}
        dataSource={handleDataSource}
        pagination={appointDataSource ? false : pagination} />
    </div>
  )
}

export default memo(forwardRef(Table));