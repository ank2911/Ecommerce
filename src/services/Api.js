import axios from "axios"

export const data=axios.get('https://dummyjson.com/products')
.then((res)=>(res.data.products))
.catch((err)=>console.log(err))

