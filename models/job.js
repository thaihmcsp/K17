const mongoose = require("./dbConnect");
const JobSchema = mongoose.Schema(
  {
    jobName: String,
    status: String,
    idStudent: {
      type: String,
      ref: "student",
    },
  },
  { collection: "job" }
);

const JobModel = mongoose.model("job", JobSchema);
