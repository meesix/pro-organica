import React from "react";
import './style.css';

const LanguageSelector = ({locale, page}) => {


  let pathIndex = 1;
  if (locale !== 'en-GB') {
    pathIndex = 2
  } 

  let currentPage = page.split('/')[pathIndex] || '';
  
  return (
        <div className="Internationalization">
                        <a href={`${locale==='en-GB'?'/uk-UA/':'/'}${currentPage}`}>
                            {locale==='en-GB'?'UA':'EN'}
                        </a>
                        <div className="Internationalization__Sep">|</div>
                        <div className="Internationalization__Visit">
                            {locale==='en-GB'?'Visit':''} <a href= "https://proorganica.co.uk/">Proorganica.co.uk → </a>
                        </div>
        </div>
    );
};

export default LanguageSelector;
