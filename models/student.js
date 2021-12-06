const mongoose = require("./dbConnect");
// const ClassModel = require("./class");
// const SubjectModel = require("./subject");
// const TeacherModel = require("./teacher");

const StudentSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    avatar: String,
    name: String,
    role: String,
    class: { type: String, ref: "classInfo" },
    subject: [
      {
        subjectID: { type: String, ref: "subject" },
        mark: Number,
      },
    ],
  },
  { collection: "student" }
);

//  tạo công cụ tương tác với bảng data này
const StudentModel = mongoose.model("student", StudentSchema);

module.exports = StudentModel;

// StudentModel.create({
//   username: "thaihm",
//   password: "nodemy",
//   name: "Thai",
//   role: "student",
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
