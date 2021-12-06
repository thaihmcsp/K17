$.ajax({
  type: "GET",
  url: "/student",
  data: { asdasd: "asdas" },
})
  .then(function (data) {
    console.log(data);
    let greeting = `
    <p> xin chao ${data[0].name} </p>
    `;

    $("body").append(greeting);
  })
  .catch(function (err) {
    console.log(err);
  });
