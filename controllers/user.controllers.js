const fs = require("fs");
const userController = {};

// create new student document with name and age with unique id. HINT: utilize generateRandomHexString()
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
  console.log("updating file");

  try {
    let newContent = req.body;

    const crypto = require("crypto");
    let id = crypto.randomBytes(20).toString('hex');
    console.log(id);
    newContent.id = id;
    
    //read the current file
    const JSONcurrent = fs.readFileSync('db.json', 'utf8');
    let current = JSON.parse(JSONcurrent);
    current.push(newContent);
    
    let JSONcontent = JSON.stringify(current);
    fs.writeFileSync('db2.json', JSONcontent);
    const jsonFile = fs.readFileSync('db2.json', 'utf8');
    const result = JSON.parse(jsonFile);
    return res.status(200).send({ result });
  } catch (error) {
    return next(error);
  }

};

userController.updateInfoHandler = (req, res, next) => {

  try {
  const result = fs.readFileSync('db2.json', 'utf8');
  const data = JSON.parse(result);
  let getData = data.filter(value => { return value.id === req.params.id });

  const newName = req.body.name;
  getData[0].name = newName;

  const newAge = req.body.age;
  getData[0].age = newAge;

  let newContent = getData[0];

  // read and push
  const JSONcurrent = fs.readFileSync('db2.json', 'utf8');
    let current = JSON.parse(JSONcurrent);
    current.push(newContent);
    
    let JSONcontent = JSON.stringify(current);
    fs.writeFileSync('db2.json', JSONcontent);
    const jsonFile = fs.readFileSync('db2.json', 'utf8');
    const newResult = JSON.parse(jsonFile);
    return res.status(200).send({ newResult });
  } catch (error) {
    return next(error);
  }

};

userController.deleteMatchName = (req, res, next) => {
  console.log("trying to delete");

  const { id } = req.params;

  //read the file => return JSON
  const database = fs.readFileSync('db2.json', 'utf8');
  //translate to JS object
  let jsObject = JSON.parse(database);
  //remove all name match "aaaa"
  jsObject = jsObject.filter((e) => e.id !== id);
  //then translate to JSON
  let newData = JSON.stringify(jsObject);
  //then write to db.json
  fs.writeFileSync("db2.json", newData);
  //console.log(newData);
  return res.send("success delete");

};

userController.readAllData = (req, res, next) => {
    console.log(req.query)

    let rawdata = fs.readFileSync('db.json', "utf8");
    let data = JSON.parse(rawdata);
    if (req.query === undefined) {
        return res.status(200).send(data);
    } else if (Object.keys(req.query).length > 0) {
        let getData = data.filter(value => {return (value.name === req.query.name || value.age === parseInt(req.query.age))});
        if (req.query.hasOwnProperty("limit")) {
            let limit = req.query.limit;
            let limitRes = getData.slice(0, limit);
            res.send(`Found: ${limitRes.length}, ${limitRes}`)
        }
        res.status(200).send(getData);
        }

};

module.exports = userController;