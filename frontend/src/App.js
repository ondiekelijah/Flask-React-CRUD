import { useState ,useEffect} from 'react';
import './App.css';
import ArticleList from './Components/ArticleList'
import Form from './Components/Form'

function App() {

  const [articles, setArticles] = useState([]);
  const [editedArticle, setEditedArticle] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:5000/articles',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setArticles(response))
    .catch(error => console.log(error))

  },[])

  const editArticle = (article)=>{
    setEditedArticle(article)
  }

  const updatedData=(article)=>{
    const new_article = articles.map(my_article=>{
      if(my_article.id == article.id){
        return article
      } else{
        return my_article
      }
    })
    setArticles(new_article)
  }



  return (
    <div className="App container">
      <h1>React and Flask</h1>

      <ArticleList articles={articles} editArticle={editArticle}/>
      { editedArticle ? <Form article = {editedArticle} updatedData={updatedData} />: null}
      
    </div>
  );
}

export default App;
