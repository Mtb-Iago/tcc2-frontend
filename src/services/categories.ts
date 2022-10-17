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

}