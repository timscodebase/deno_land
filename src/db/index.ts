import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);

import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

export const todosDB = await createRxDatabase({
  name: 'todosdb',
  storage: getRxStorageDexie()
});

await todosDB.addCollections({
  todos: {
    schema: todoSchema
  }
});

import { todoSchema } from '../db/scheme'
export { todoSchema };