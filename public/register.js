async function register() {
  var form = $(".form")[0];
  var data = new FormData(form);

  const res = await $.ajax({
    url: "/profile",
    type: "POST",
    data: data,
    processData: false,
    contentType: false,
  });
  console.log(res);
  // const username = $("#username").val();
  // const password = $("#password").val();
  // const confirm_password = $("#confirm_password").val();
  // if (password === confirm_password) {
  //   $.ajax({
  //     type: "POST",
  //     url: `/student`,
  //     data: {
  //       username: username,
  //       password: password,
  //     },
  //   })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // } else {
  //   console.log("nhap mk chua khop ");
  // }
}
