import React,{useState,useEffect} from 'react';
import APIService from '../Components/APIService'

const Form = (props) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(()=>{
      setTitle(props.article.title)
      setBody(props.article.body)
    },[props.article])

    const updateArticle = () =>{
      APIService.UpdateArticle(props.article.id,{title,body})
      .then(response => props.updatedData(response))
      .catch(error => console.log(error))

    }

    const insertArticle = () =>{
      APIService.InsertArticle({title,body})
      .then(response => props.insertedArticle(response))
      .catch(error => console.log(error))
    }


  return (
    <div>
    	{props.article ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
          type="text"
          className="form-control" 
          placeholder ="Enter title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />
          <label htmlFor="body" className="form-label">Body</label>
          <textarea 
          className="form-control" 
          placeholder ="Enter body" 
          rows='6'
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          >
          </textarea>

          {
            props.article.id ?
            <button 
            className="btn btn-primary mt-2"
            onClick={updateArticle}
            >
            Update</button>
            :
            <button 
            className="btn btn-primary mt-2"
            onClick={insertArticle}
            >
            Publish article</button>

          }
        
          

        </div>
        ):null }
    </div>
  )
}

export default Form;