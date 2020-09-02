const fs = require("fs");
const YAML = require('yaml');

fs.readFile('data.yaml', 'utf8', (err, data) => {
  if (err) throw err;
  //console.log(data);
  var yamldata = YAML.parse(data);
  console.log(yamldata.project.title);

  var jsondata = JSON.stringify(yamldata);
  console.log(jsondata);

  fs.writeFile('data.json', jsondata, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});