import { ChangeEvent, FC } from 'react'
import { useDispatch } from 'react-redux'

import { searchRestaurants, setSearchText } from '../../store/mapSlice'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TextInput } from 'flowbite-react'
import { debounce } from 'lodash'

type Props = {}

const SearchMapInput: FC<Props> = () => {
  const dispatch = useDispatch()
  const onSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    dispatch<any>(searchRestaurants(val))
    dispatch(setSearchText(val))
  }, 300)

  return (
    <TextInput
      sizing='sm'
      icon={MagnifyingGlassIcon}
      placeholder='Search restaurants'
      onChange={onSearch}
    />
  )
}

export default SearchMapInput
