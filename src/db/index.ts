import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);
import "fake-indexeddb/auto";
import Dexie from "dexie";

import { todoSchema } from '../db/scheme.ts'
export { todoSchema };

import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

const db = await createRxDatabase({
  name: 'todos',
  storage: getRxStorageDexie(),
});

function uuidv7() {
    // random bytes
    const value = new Uint8Array(16);
    crypto.getRandomValues(value);

    // current timestamp in ms
    const timestamp = BigInt(Date.now());

    // timestamp
    value[0] = Number((timestamp >> 40n) & 0xffn);
    value[1] = Number((timestamp >> 32n) & 0xffn);
    value[2] = Number((timestamp >> 24n) & 0xffn);
    value[3] = Number((timestamp >> 16n) & 0xffn);
    value[4] = Number((timestamp >> 8n) & 0xffn);
    value[5] = Number(timestamp & 0xffn);

    // version and variant
    value[6] = (value[6] & 0x0f) | 0x70;
    value[8] = (value[8] & 0x3f) | 0x80;

    return value;
};

export const todosDB = await createRxDatabase({
  name: 'todosdb',
  storage: getRxStorageDexie()
});

await todosDB.addCollections({
  todos: {
    schema: todoSchema
  }
});

export const createTodo = async (task: string) => {
  const id = uuidv7();
  const timestamp = new Date().toISOString();
  const todo = {
    id,
    name: task,
    done: false,
    timestamp
  }
  // const stringifiedTodo = JSON.stringify(todo);

  // console.log("Todo: ", {id, task});
  // setLocalStorageItem("todos", stringifiedTodo);

  await todosDB.todos.insert({
    id,
    name: task,
    done: false,
    timestamp
  });
}