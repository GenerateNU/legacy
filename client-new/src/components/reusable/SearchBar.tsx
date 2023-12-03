import { Input, IInputProps } from 'native-base';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';

type SearchBarProps<T> = {
  isPending: boolean;
  inputSearch: string;
  keys: string[];
  updateSearchValue: (text: string) => void;
  filterItems: (itemsList: T[], keys: string[]) => T[];
  filteringType: T[];
  updateFilteredValues: (filteredValues: T[]) => void;
  style?: ViewStyle;
} & IInputProps;

export default function SearchBar<T>(props: SearchBarProps<T>) {
  let debounceTimer;

  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
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
      value={props.inputSearch}
      onChangeText={(text) => props.updateSearchValue(text)}
      style={props.style}
      {...props}
    />
  );
}
