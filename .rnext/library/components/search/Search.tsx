import React, { useState, useEffect, useCallback } from 'react';
import style from './search.module.scss';
import { Input, Button } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { InputProps, SearchProps } from 'antd/lib/input';
import classnames from 'classnames';

const { Search: AntdSearch } = Input;

interface AdvancedSearchProps {
  // 高级搜索方法
  advancedSearch?: () => void;
  advancedReset?: () => void;
}

const Search = (props: InputProps & SearchProps & AdvancedSearchProps) => {

  const [isVisible, setIsVisible] = useState(false);

  let className = classnames(style.searchDefaultWidth, props.className);

  useEffect(() => {
    document.addEventListener('click', () => setIsVisible(false));
  }, [])

  const stopPropagation = useCallback((e) => {
    e.nativeEvent.stopImmediatePropagation();
  }, [])

  const showSearchModal = useCallback((e) => {
    setIsVisible((bool) => !bool);
    e.nativeEvent.stopImmediatePropagation();
  }, [])

  const advancedSearch = useCallback(() => {
    setIsVisible(false);
    props.advancedSearch && props.advancedSearch();
  }, [props])

  const advancedReset = useCallback((e) => {
    setIsVisible(false);
    e.nativeEvent.stopImmediatePropagation();
    props.advancedReset && props.advancedReset();
  }, [props])

  const dealComp = useCallback((cmp) => {
    return cmp
      ? <><SyncOutlined className={style.resetIcon} title='重置' onClick={advancedReset} /><span className={style.searchSuffix} onClick={showSearchModal}>高级</span></>
      : <span />;
  }, [showSearchModal, advancedReset])

  return (
    <div className={style.searchComp}>
      <AntdSearch
        placeholder='input search text'
        enterButton
        size='middle'
        {...props}
        suffix={dealComp(props.suffix)}
        className={className}
      />
      <div onClick={stopPropagation} className={classnames(style.searchForm, { [style.showAdvanceModal]: isVisible })}>
        {props.suffix}
        <Button type='primary' block icon={<SearchOutlined />} onClick={advancedSearch}>Search</Button>
      </div>
    </div>
  )
}

export default Search
