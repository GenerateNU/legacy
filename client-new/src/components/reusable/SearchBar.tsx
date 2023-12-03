import { Input } from 'native-base';

import React, { useEffect } from 'react';

type SearchBarProps<T> = {
  isPending: boolean;
  inputSearch: string;
  keys: string[];
  updateSearchValue: (text: string) => void;
  filterItems: (itemsList: T[], keys: string[]) => T[];
  filteringType: T[];
  updateFilteredValues: (filteredValues: T[]) => void;
};

export default function SearchBar<T>(props: SearchBarProps<T>) {
  let debounceTimer;

  useEffect(() => {
    const debounce = (func, delay) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        func();
      }, delay);
    };

    const filteredTasks = props.filterItems(props.filteringType, props.keys);
    props.updateFilteredValues(filteredTasks);

    debounce(() => {
      const filteredTasks = props.filterItems(props.filteringType, props.keys);
      props.updateFilteredValues(filteredTasks);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [props.inputSearch, props.filteringType]);

  return (
    <Input
      placeholder="Search"
      size="md"
      isDisabled={props.isPending ? true : false}
      width={'100%'}
      backgroundColor={'#F2F2F2'}
      borderRadius={'10px'}
      paddingLeft={'10px'}
      paddingRight={'10px'}
      marginBottom={'20px'}
      value={props.inputSearch}
      onChangeText={(text) => props.updateSearchValue(text)}
    />
  );
}
