import Auth from "./auth-header"

export default {
  async listPosts(id_category?: any) {

    const data_request = {
      id_category: id_category
    }
    const token = Auth.get_token()
    const response = await fetch(
      "http://localhost:8001/api/posts/list-posts/",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_request)
      }
    ).then((res) => {
      return res.json()
    }).catch((error) => {
      console.log(error);
    })

    return response
  },
  async insertPosts() {

    const token = Auth.get_token()
    const response = await fetch(
      "http://localhost:8001/api/posts/insert-posts/",
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