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
  async insertPosts(id_post: number, new_status_post: boolean) {

    const token = Auth.get_token()

    const data = {
      "id_post": id_post,
      "accept_post": new_status_post ? true : 0
    }
    const response = await fetch(
      "http://localhost:8001/api/posts/update-status-post/",
      {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      }
    ).then((res) => {
      return res.json()
    }).catch((error) => {
      console.log(error);
    })

    return response
  }

}