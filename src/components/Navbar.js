import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../app/context/context';

import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  const { handleInputChange, handleSelect, loadingNews } = useContext(Context);
  const [query, setQuery] = useState('');
  const [selected, setSelect] = useState(0);
  const [source, setSource] = useState('NewsApi');

  return (
    <div className="flex items-center space-between gap-5 p-2 border border-gray-500">
      
      {/* Container for filter */}

      <div className="flex gap-4 items-center">

        {/* Logo */}

        <Link className="" to={`/`}>
          <img className="w-10 m-2 bg-gray-500 rounded p-1" src="../images/logo1.png" alt="article images" />
        </Link>

        {/* Source */}

        <select
          className="bg-gray-500 w-25 h-10"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            loadingNews(e.target.value)
          }}
        >
          <option value={'NewsApi'}>NewsApi</option>
          <option value={'GNews'}>GNews</option>
          {/* <option value={'NEWSDATA'}>NEWSDATA</option>
          <option value={'RapidApi'}>RapidApi</option> */}
        </select>

        {/* <Filter /> */}
        <select
          className="bg-gray-500 w-25 h-10"
          value={selected}
          onChange={(e) => {
            setSelect(e.target.value);
            handleSelect(e.target.value)
          }}
        >
          <option value={100}>All News</option>
          <option value={7}>Week News</option>
          <option value={30}>Month News</option>
          <option value={90}>3 month News</option>
        </select>

      </div>
      
      {/* Search */}

      <div className='flex items-center justifyContent-center gap-2 bg-gray-500 h-10'>
        <SearchIcon />
        <input
          className='w-[80%] p-1 rounded bg-gray-500'
          placeholder="Search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleInputChange(e.target.value);
          }}
          inputprops={{ 'aria-label': 'search' }}
          />
      </div>

    </div>
  )
}

export default Navbar
