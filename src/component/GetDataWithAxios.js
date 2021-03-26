import React, { useEffect, useState } from "react";
import {Table,Button} from 'react-bootstrap';
import axios from "axios";

const GetDataWithAxios = () => {

  const [posts, setPosts] = useState([]);

  const getPostList = () => {
    axios.get("http://fakeapi.jsonparseronline.com/posts").then(res => {
     setPosts(res.data);
     console.log(res.data);
    })
  }

  useEffect(() => {
   getPostList();
  },[])

  const removePostList = (id) => {
    const del_list = posts.filter(post => id !== post.id);
    setPosts(del_list);
  }

  return(
    <>
      <h1 className="text-center text-primary">Post List</h1>
      <Table striped bordered hover variant="white" className="mt-1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Like</th>
              <th>Hit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item,index) => {
              return(
                <tr key={String(index)}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.likes}</td>
                  <td>{item.hits}</td>
                  <td>
                    <Button variant="danger" onClick={() => removePostList(item.id)} className="rounded-circle">
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
  