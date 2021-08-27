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
      if(my_article.id === article.id){
        return article
      } else{
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () =>{
    setEditedArticle({title:'',body:''})
  }

  const insertedArticle = (article) =>{
    const new_articles = [...articles,article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) =>{
    const new_articles = articles.filter(myarticle=>{
      if(myarticle.id === article.id){
        return false;
      }
      return true
    })

    setArticles(new_articles)
  }

  return (
    <div className="App container m-3">
    <div className="row">
      <div className="col">
      <h2>React and Flask</h2>
      </div>
      <div className="col">
          <button 
          className="btn btn-primary"
          onClick={openForm}
          >
          Insert an article</button>
      </div>

    </div>

      <ArticleList 
      articles={articles} 
      editArticle={editArticle}
      deleteArticle={deleteArticle}
      />

      { editedArticle ? 
      <Form 
      article = {editedArticle} 
      updatedData={updatedData}
      insertedArticle={insertedArticle}
      />
      : null }
      
    </div>
  );
}

export default App;
