const bcrypt = require("bcrypt");

// hash: mã hóa password

bcrypt
  .hash("123456", 15)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// compare

// bcrypt
//   .compare(
//     "123457",
//     "$2b$15$Ohvlgbf1ZvDfJjJ2YvZfi.pnbrp/8ltEtWiSdWho6LdLJqNXfSFy2"
//   )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));
