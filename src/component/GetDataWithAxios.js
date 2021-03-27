import React, { useEffect, useState } from "react";
import {Table, Image, Button} from 'react-bootstrap';
import axios from "axios";

const GetDataWithAxios = () => {

  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [per_page, setPerPage] = useState(0);
  const [total_pages, setTotalPages] = useState(0);
  const getPostList = () => {
    axios.get("https://reqres.in/api/users?page=2").then(res => {
      setList(res.data.data);
      setPage(res.data.page);
      setPerPage(res.data.per_page);
      setTotalPages(res.data.total_pages);
    })
  }

  useEffect(() => {
   getPostList();
  },[])

  const handleRemove = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      const del_list = list.filter(list=> list.id !== id);
      setList(del_list);
    })
  }

  return(
    <>
      <h1 className="text-center text-primary">Page List</h1>
      <Table striped bordered hover variant="white" className="mt-1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Page</th>
              <th>Per page</th>
              <th>Total pages</th>
              <th>Avatar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             {list.map((item, index) => {
               return(
                <tr key={String(index)}>
                  <td>{item.id}</td>
                  <td>{page}</td>
                  <td>{per_page}</td>
                  <td>{total_pages}</td>
                  <td>
                    <Image src={item.avatar} className="rounded-circle"/>
                  </td>
                  <td>
                    <Button className="btn btn-danger rounded-circle" onClick={() => handleRemove(item.id)}>
                       <i className="fas fa-trash"/>
                    </Button>
                  </td>
                </tr>
               )
             })
            }
          </tbody>
      </Table>
    </>
  )
}
  
export default GetDataWithAxios;
  