//给bottom组件传递数据
import pubsub from 'pubsub-js'

function bottomNum(todos) {
    let doneNum = 0;
    let allNum = todos.length;
    todos.forEach((todo) => {
        if(todo.done) {
            doneNum++;
        }
    });
    let progressNum = [doneNum,allNum];
    //把这个数组传递给bottom组件
    pubsub.publish('progress',progressNum);
}