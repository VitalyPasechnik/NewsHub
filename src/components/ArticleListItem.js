import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LinkIcon from '@mui/icons-material/Link';


function ArticleListItem({ article }) {
  const formattedDate = moment().from(article.publishedAt);

  return (

    // ShortArticleCard

    <Link
      className="w-full px-3"
      to={`/article/${article.publishedAt}`}
    >
      <div className="
        flex gap-2 p-2
        text-l text-gray-300
        border-b-2 border-gray-600
        hover:bg-gray-800
      "
      >
        <p className="text-sm text-gray-500 hover:text-orange-300">{formattedDate}</p>
        <p className="text-gray-300 hover:text-orange-300">{article.title}</p>
        <p className="text-s text-gray-500  hover:text-orange-300"><LinkIcon width={20} />{article.source.name}</p>
        </div>
    </Link>
  )
}

export default ArticleListItem
