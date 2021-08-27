
export default class APIService{
	// Update an article
	static UpdateArticle(id,body){
		return fetch(`http://localhost:5000/articles/update/${id}/`,{
      		'method':'PUT',
      		 headers : {
      		'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
	.then(response => response.json())
	.catch(error => console.log(error))
	}


	// Insert an article
	static InsertArticle(body){
		return fetch(`http://localhost:5000/add`,{
      		'method':'POST',
      		 headers : {
      		'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
	.then(response => response.json())
	.catch(error => console.log(error))
	}

	// Delete an article
	static DeleteArticle(id){
		return fetch(`http://localhost:5000/articles/delete/${id}/`,{
      		'method':'DELETE',
      		 headers : {
      		'Content-Type':'application/json'
      },
    })

}
}
