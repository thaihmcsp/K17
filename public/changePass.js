function openInput() {
  const username = $("#username").val();
  const password = $("#password").val();
  $.ajax({
    type: "GET",
    url: "/student/find?username=" + username + "&password=" + password,
  }).then(function (data) {
    if (data) {
      console.log(data);
      $(".input").html(
        `
        <input type="text" id='newPass'> 
        <button id='changePass'>Xac nhan</button>
        `
      );

      $("#changePass").on("click", function () {
        const newPass = $("#newPass").val();
        $.ajax({
          type: "PUT",
          url: "/student/" + data._id + "?newPass=" + newPass,
        })
          .then(function (data) {
            console.log(data);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    } else {
      $(".input").html("sai username, password");
    }
  });
}
