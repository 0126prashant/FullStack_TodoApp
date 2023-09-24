import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

export const TodoList = () => {
  const [data,setData] = useState([])
   function getData(){ 
    axios.get("http://localhost:8080/todo")
    .then((res)=>{
      // console.log(res.data)
      setData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  
  }

  const handleDelete = (id)=>{
    // console.log(e)
    axios.delete(`http://localhost:8080/delete/${id}`)
    .then((res)=>{
      if(res.status === 200){
        alert("Product has been Deleted")
        getData()
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <h2>TodoList</h2>
    <Table>
     
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th>Status</Th>
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
      {data.map((ele) => {
            console.log(ele)
            return(
              <Tr key={ele._id}>
              <Td>{ele.title}</Td>
              <Td>{ele.status ? "True" : "False"}</Td>
              <Td><Button background={"green"} variant={"ghost"} >Edit</Button></Td>
              <Td><Button background={"red"} onClick={()=>handleDelete(ele._id)}>Delete</Button></Td>
            
              </Tr>
            )
            
          })}
        {/* <Tr></Tr> */}
      </Tbody>
    </Table>
    </>
  )
}
