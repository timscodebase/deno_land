import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);

import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

const todoDB = await createRxDatabase({
  name: 'tododb',
  storage: getRxStorageDexie()
});