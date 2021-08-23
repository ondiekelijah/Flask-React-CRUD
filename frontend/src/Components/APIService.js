
export default class APIService{
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



}
