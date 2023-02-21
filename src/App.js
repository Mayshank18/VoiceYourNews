import React,{useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumber from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'

const alanKey='c0a30d1ea0ca69b9a6aaa5849a2242c32e956eca572e1d8b807a3e2338fdd0dc/stage';

const App=()=> {
  const [newsArticles,setNewsArticles]=useState([]);
  const [activeArticle,setActiveArticle]=useState(-1);
  const classes=useStyles();
  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand: ({command, articles,number})=>{
        if(command==='newsHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if(command==='highlight'){
          setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
        }
        else if(command==='open'){
          const parsedNumber=number.length>2?wordsToNumber(number,{fuzzy:true}):number;
          const article=articles[parsedNumber-1];

          if(parsedNumber>20){
            alanBtn().playText('Please try that again')
          }
          else if(article){
            window.open(article.url,'_blank');
            alanBtn().playText('Opening....');
          }
        }
      }
    })
  },[])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOJCpK_OWE2eTj93RJ_TsLfJljUZgD_LEjg&usqp=CAU" className={classes.alanLogo} alt="Logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
