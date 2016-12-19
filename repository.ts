import {DataStore} from 'js-data';
import {SqlAdapter} from 'js-data-sql';

export default class Repository {
  store: DataStore;
  sqlAdapter: SqlAdapter;
  tableName: string;

  constructor(tableName) {
    this.store = new DataStore();
    this.tableName = tableName;
    // todo: get it from config
    this.sqlAdapter = new SqlAdapter({
      knexOpts: {
        client: 'mysql',
        connection: {
          host: 'localhost',
          user: 'newuser',
          password: 'password',
          database: 'posts',
          port: '3306'
        }
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
