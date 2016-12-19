import { DataStore } from 'js-data';
import { SqlAdapter } from 'js-data-sql';
import config from './config'

export default class Repository {
  store: DataStore;
  sqlAdapter: SqlAdapter;
  tableName: string;

  constructor(tableName) {
    this.store = new DataStore();
    this.tableName = tableName;
    this.sqlAdapter = new SqlAdapter({
      knexOpts: {
        client: config.client,
        connection: config.connection
      }
    });

    this.store.registerAdapter('sql', this.sqlAdapter, {'default': true});
    this.store.defineMapper(this.tableName);

  }

  async add(body) {
    return this.store.create(this.tableName, body);
  }

  async getById(id) {
    return this.store.find(this.tableName, id);
  }

  async updateById(id, data) {
    return this.store.update(this.tableName, id, data);
  }

  async deleteById(id) {
    return this.store.destroy(this.tableName, id);
  }
}
