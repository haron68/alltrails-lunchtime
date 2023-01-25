import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { useDispatch } from 'react-redux'

import { searchRestaurants, setSearchText } from '../../store/mapSlice'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TextInput } from 'flowbite-react'
import { debounce } from 'lodash'

type Props = {}

const SearchMapInput: FC<Props> = () => {
  const dispatch = useDispatch()

  const search = (val: string) => {
    dispatch<any>(searchRestaurants(val))
    dispatch(setSearchText(val))
  }

  const onChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    search(val)
  }, 300)

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code == 'Enter') {
      // @ts-ignore
      const val = e.target.value
      search(val)
    }
  }

  return (
    <TextInput
      sizing='sm'
      icon={MagnifyingGlassIcon}
      placeholder='Search restaurants'
      onChange={onChange}
      onKeyDown={onEnterPress}
    />
  )
}

export default SearchMapInput
