import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export const TodoList = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  function getData() {
    axios
      .get("http://localhost:8080/todo")
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (id) => {
    // console.log(e)
    axios
      .delete(`http://localhost:8080/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Product has been Deleted");
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (id) => {
    axios
      .patch(`http://localhost:8080/edit/${id}`, { title: newTitle })
      .then((res) => {
        if (res.status === 200) {
          alert("Task has been updated");
          getData();
          setEditingId(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleStatus = (id, newStatus) => {
    axios
      .patch(`http://localhost:8080/edit/${id}`, { status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          // alert("Status has been updated");
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    getData();
  }, []);

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
            return (
              <Tr key={ele._id}>
                <Td>
                  {editingId === ele._id ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  ) : (
                    ele.title
                  )}
                </Td>
                {/* <Td>{ele.status ? "True" : "False"}</Td> */}
                <Td>
                <Td>
  {ele.status ? (
    <span
      style={{ cursor: "pointer", color: "green" }}
      onClick={() => handleToggleStatus(ele._id, false)}
    >
      ✓
    </span>
  ) : (
    <span
      style={{ cursor: "pointer", color: "red" }}
      onClick={() => handleToggleStatus(ele._id, true)}
    >
      ✗
    </span>
  )}
</Td>

</Td>


                <Td>
                  {editingId !== ele._id && (
                    <Button
                      background={"green"}
                      variant={"ghost"}
                      onClick={() => {
                        setEditingId(ele._id);
                        setNewTitle(ele.title);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {editingId === ele._id && (
                    <Button
                      background={"green"}
                      variant={"ghost"}
                      onClick={() => handleUpdate(ele._id)}
                    >
                      Update
                    </Button>
                  )}
                </Td>
                <Td>
                  <Button
                    background={"red"}
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            );
          })}
          {/* <Tr></Tr> */}
        </Tbody>
      </Table>
    </>
  );
};
