import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from '../src/app/context/context';

import HomePage from './screens/HomePage';
import ArticleSctreen from './screens/ArticleSctreen';

import './App.css';
import './input.css';

const App: React.FC = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState();
  
  const handleSelect = (selected) => {
    if (selected > 0) {
      const grouped = news.filter(i => {
        const currentDate = new Date();
        const articleDate = new Date(i.publishedAt);
        const timeDiffInMillis = currentDate.getTime() - articleDate.getTime();
        const daysDiff = timeDiffInMillis / (1000 * 60 * 60 * 24); 
        return daysDiff <= +selected;
      });
      
      setFilteredNews(grouped);
    };
  }

  const handleInputChange = (query) => {
    if (query !== '') {
      const filtered = news.filter(i => (i.title.toLowerCase().includes(query.toLowerCase())));
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    };
  };

  // Загрузка новостей из API

  const loadingNews = async (source) => {

    const resultApiNews = (url) => {
      axios.get(url).then(res => {
        setNews(res.data.articles);
      })
    }
    // console.log(source);

    // NewsApi
    if (source === 'NewsApi') {
      const url = 'https://newsapi.org/v2/everything?' +
      'q=apple' +
      '&from=2023-08-02&to=2023-08-02' +
      '&sortBy=popularity' +
      '&apiKey=b96ea1347821468e966eefa845c14e9e';

      resultApiNews(url);
    }
    
    // GNews
    if (source === 'GNews') {
      let apikey = '2d1ba0119258a452fa33e2b4108f59bd';
      let category = 'general';
      let country = 'Any'
      let url = 
        'https://gnews.io/api/v4/top-headlines?category='
        + category
        + `&lang=en&country=${country}&max=100&apikey=`
        + apikey;
    
      resultApiNews(url);
    }
    
    // // NEWSDATA
    // if (source === 'NEWSDATA') {
    //   let apikey = 'pub_273605f5c28a87c8f8306b9ff5564517c18f8';
    //   let category = 'general';
    //   let country = 'Any'
    //   let url = 
    //     'https://newsdata.io/api/1/news?'
    //     + `apikey=${apikey}`
    //     + '=pizza';

    //   axios.get(url).then(res => {
    //     setFilteredNews(res.data.articles);
    //   })
    // }

    // // reuters-business-and-financial-new
    // if (source === 'RapidApi') {
    //   const options = {
    //     method: 'GET',
    //     url: 'https://reuters-business-and-financial-news.p.rapidapi.com/article-date/01-04-2021',
    //     headers: {
    //       'X-RapidAPI-Key': '22677b8085msh9c3018bf391bf8ep181efajsn60001bbff44c',
    //       'X-RapidAPI-Host': 'reuters-business-and-financial-news.p.rapidapi.com'
    //     }
    //   };

    //   axios.get(options).then(res => {
    //     setFilteredNews(res.data.articles);
    //   })
    // }
  }

  useEffect(() => {
    loadingNews('NewsApi');
  }, []);

  useEffect(() => {
    setFilteredNews(news);
  }, [news]);
 
  return (
    <Context.Provider value={{
      filteredNews,
      handleInputChange,
      handleSelect,
      loadingNews,
    }}
    >
      <div className="app">

      {/* Routes */}

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleSctreen news={news} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>

      </div>

    </Context.Provider>

  )
}

export default App;

