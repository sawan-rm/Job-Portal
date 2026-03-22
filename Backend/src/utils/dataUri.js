const DataUriParser = require("datauri/parser");
const path = require('path');

const getDataUri = (file) => {
    if(!file)
        return null;
    
    const pareser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return pareser.format(extName, file.buffer);
}

module.exports = getDataUri;