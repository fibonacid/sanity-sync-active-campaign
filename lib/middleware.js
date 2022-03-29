import multiparty from "multiparty";

export const formDataMiddleware = async (req, res, next) => {
  const form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    req.body = fields;
    req.files = files;
    next();
  });
};
