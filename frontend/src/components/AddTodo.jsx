import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState } from 'react'

export const AddTodo = () => {
    const [task,setTask] = useState("")
    const handleSubmit = ()=>{
        axios.post("http://localhost:8080/addtask",{
           title:task,
           status:false
        })

    }
    return (
        <VStack as="form" spacing={4} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Task</FormLabel>
            <Input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit">Add Todo</Button>
        </VStack>
      );
}
