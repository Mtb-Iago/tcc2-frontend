import Auth from "./auth-header"

export default {
  async listCategories(){
    const response = await fetch(
      "http://localhost:8001/api/category/list-category/",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => {
      return res.json()
    }).catch((error) => {
      console.log(error);
    })

    return response
  },
  async insertCategories(){

    const token = Auth.get_token()
    const response = await fetch(
      "http://localhost:8001/api/category/list-category/",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    ).then((res) => {
      return res.json()
    }).catch((error) => {
      console.log(error);
    })

    return response
  }

}