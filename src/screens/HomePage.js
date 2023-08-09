import React, { useContext } from 'react';

import ArticleListItem from '../components/ArticleListItem';
import Navbar from '../components/Navbar';

import { Context } from '../../src/app/context/context';


function HomePage() {
  const { filteredNews } = useContext(Context);

  return (
    <div className="flex flex-col">
      
      {/* Navbar */}

      <div className="w-full">
        <Navbar />
      </div>

      {/* Posts */}

      <div className="flex flex-col w-full">

      {filteredNews && (
        filteredNews.map(article => (
          <ArticleListItem key={article.url} article={article} />
        ))
      )}

      </div>
      
    </div>
  )
}

export default HomePage