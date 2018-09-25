package com.consol.citrus.samples.todolist;

import com.consol.citrus.dsl.testng.TestNGCitrusTestRunner;
import org.testng.annotations.Test;

import com.consol.citrus.annotations.CitrusTest;
import com.consol.citrus.dsl.testng.TestNGCitrusTestDesigner;
import com.consol.citrus.http.client.HttpClient;
import com.consol.citrus.message.MessageType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

public class TodoAppIT extends TestNGCitrusTestRunner {

    @Autowired
    private HttpClient todoClient;

    @Test
    @CitrusTest
    public void testGet() {
        http(http -> http.client(todoClient)
                .send()
                .get("/api/todolist/"));

        http(http -> http.client(todoClient)
                .receive()
                .response(HttpStatus.OK));
    }

    @Test
    @CitrusTest
    public void testTodoLifecycle() {
        variable("todoId", "citrus:randomUUID()");
        variable("todoName", "citrus:concat('todo_', citrus:randomNumber(4))");
        variable("todoDescription", "Description: ${todoName}");

        http(http -> http.client(todoClient)
                .send()
                .post("/api/todolist")
                .messageType(MessageType.JSON)
                .contentType("application/json")
                .payload("{ \"id\": \"${todoId}\", " +
                        "\"title\": \"${todoName}\", " +
                        "\"description\": \"${todoDescription}\", " +
                        "\"done\": false}"));

        http(http -> http.client(todoClient)
                .receive()
                .response(HttpStatus.OK)
                .messageType(MessageType.PLAINTEXT)
                .payload("${todoId}"));

        http(http -> http.client(todoClient)
                .send()
                .get("/api/todo/${todoId}")
                .accept("application/json"));

        http(http -> http.client(todoClient)
                .receive()
                .response(HttpStatus.OK)
                .messageType(MessageType.JSON)
                .validate("$.id", "${todoId}")
                .validate("$.title", "${todoName}")
                .validate("$.description", "${todoDescription}")
                .validate("$.done", false));

        http(http -> http.client(todoClient)
                .send()
                .delete("/api/todo/${todoId}")
                .accept("application/json"));

        http(http -> http.client(todoClient)
                .receive()
                .response(HttpStatus.OK));
    }
}
