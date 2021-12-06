let fs = require("fs"); // fileSystem

var readStream = fs.createReadStream("./test/text2");
var writeStream = fs.createWriteStream("./test/text5");

readStream.pipe(writeStream);

console.log(writeStream);


// unlink     xóa file
// unlinkSync
// appendFile thêm nội dung
// appendFileSync
// readFile   đọc nội dung file
// readFileSync
