const fs = require("fs");
const userController = {};

userController.createPostHandler = (req, res, next) => {
  console.log("creating a file");
  console.log(req.body);
  const content = req.body;
  try {
    const jsonContent = JSON.stringify(content);
    fs.writeFileSync('db.json', jsonContent);
    const result = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(result);
    return res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

userController.updateHandler = (req, res, next) => {
  console.log("updating thing");
  console.log(req.body);
  try {
    let newContent = req.body;

    //read the current file
    const JSONcurrent = fs.readFileSync('db.json', 'utf8');
    let current = JSON.parse(JSONcurrent);
    console.log(current);
    current.data.push(newContent);
    
    let JSONcontent = JSON.stringify(current);
    fs.writeFileSync("db.json", JSONcontent);
    const jsonFile = fs.readFileSync('db.json', 'utf8');
    const result = JSON.parse(jsonFile);
    return res.status(200).send({ result });
  } catch (error) {
    return next(error);
  }
};

userController.deleteMatchName = (req, res, next) => {
  console.log("trying to delete");
  const { name } = req.params;

  //read the file => return JSON
  const database = fs.readFileSync('db.json', 'utf8');
  //translate to JS object
  const jsObject = JSON.parse(database);
  //remove all name match "aaaa"
  jsObject.data = jsObject.data.filter((e) => e.name !== name);
  //then translate to JSON
  const newData = JSON.stringify(jsObject);
  //then write to db.json
  fs.writeFileSync("db.json", newData);
  return res.send("success delete");
};

userController.readAllData = (req, res, next) => {
  return res.send("success get");
};

module.exports = userController;