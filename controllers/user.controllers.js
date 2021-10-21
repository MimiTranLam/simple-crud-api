const fs = require("fs");
const userController = {};

userController.readAllData = (req, res, next) => {
    console.log("finding student");

    let rawdata = fs.readFileSync('db.json', "utf8");
    let data = JSON.parse(rawdata);
    if (req.query === undefined) {
        return res.status(200).send(data);
    } else if (Object.keys(req.query).length > 0) {
        let getData = data.filter(value => {return (value.name === req.query.name || value.age === parseInt(req.query.age))});
        if (req.query.hasOwnProperty("limit")) {
            let limit = req.query.limit;
            let limitRes = getData.slice(0, limit);
            // res.send(`Found: ${limitRes.length}, ${JSON.stringify(limitRes)}`)
            return res.send({data: limitRes});
        }
        return res.status(200).send(getData);
        }

};

// create new student document with name and age with unique id. HINT: utilize generateRandomHexString()
userController.createPostHandler = (req, res, next) => {
  console.log("creating a file");

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
  console.log("adding new student, creating id and updating database");

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
  console.log("finding student by id and updating info");

  try {
    // find the student with this id
    const result = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(result);
    let getData = data.filter(value => { return value.id === req.params.id });

    // making new name and age according to req.body content
    const newName = req.body.name;
    getData[0].name = newName;
    const newAge = req.body.age;
    getData[0].age = newAge;

    // read old database db.json
    const JSONcurrent = fs.readFileSync('db.json', 'utf8');
    let current = JSON.parse(JSONcurrent);

    // find id match in current db.json and replace with new info, while keeping the same index
    const getMatchIndex = current.findIndex((x) => {
      return x.id === req.params.id;
    });
    let updateContent = getData[0];
    let newContent = current.splice(getMatchIndex, 1, updateContent);
    
    // write into db2.json
    let JSONcontent = JSON.stringify(current);
    fs.writeFileSync('db2.json', JSONcontent);
    const jsonFile = fs.readFileSync('db2.json', 'utf8');
    const newResult = JSON.parse(jsonFile);
    return res.status(200).send({ current });
  } catch (error) {
    return next(error);
  }

};

userController.deleteMatchName = (req, res, next) => {
  console.log("finding student by id and deleting student info");

  const { id } = req.params;

  const database = fs.readFileSync('db2.json', 'utf8');
  let jsObject = JSON.parse(database);
  jsObject = jsObject.filter((e) => e.id !== id);
  let newData = JSON.stringify(jsObject);
  fs.writeFileSync("db2.json", newData);

  return res.send("success delete");

};

module.exports = userController;