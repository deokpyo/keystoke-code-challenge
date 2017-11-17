import superagent from "superagent";

export default {
  get: (endpoint, params, callback) => {
    superagent
      .get(endpoint)
      .query(params)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        const confirm = response.body.confirm;
        if (confirm != "success") {
          callback({ message: response.body.message }, null);
          return;
        }
        callback(null, response.body);
      });
  },
  post: (endpoint, params, callback) => {
    superagent
      .post(endpoint)
      .send(params)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        const confirm = response.body.confirm;
        if (confirm != "success") {
          callback({ message: response.body.message }, null);
          return;
        }
        callback(null, response.body);
      });
  },
  put: (endpoint, params, callback) => {
    superagent
      .put(endpoint)
      .send(params)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) {
          callback(err, null);
          return;
        }
        const confirm = response.body.confirm;
        if (confirm != "success") {
          callback({ message: response.body.message }, null);
          return;
        }
        callback(null, response.body);
      });
  }
};
