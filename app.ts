import * as express from "express";
import * as bodyParser from 'body-parser';
import Repository from './repository';
import config from './config'

const app = express();
const repository = new Repository(config.table);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.route('/posts')
  .post(async function (req, res) {
    res.send(await repository.add(req.body));
  });

app.route('/posts/:id')
  .get(async function (req, res) {
    res.send(await repository.getById(req.params.id));
  })
  .put(async function (req, res) {
    res.send(await repository.updateById(req.params.id, req.body));
  })
  .delete(async function (req, res) {
    res.send(await repository.deleteById(req.params.id));
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});