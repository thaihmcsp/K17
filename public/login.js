async function login() {
  try {
    const username = $("#username").val();
    const password = $("#password").val();
    let res = await $.ajax({
      url: "/student/login",
      type: "POST",
      data: { username, password },
    });

    if (res.status === 200) {
      setCookie("UID", res.idUser, 30);
      window.location.href = "/show";
    } else {
      $(".noti").html(res.mess);
    }
  } catch (error) {
    console.log(error);
  }
}

$.ajax({
  type: "GET",
  url: "/checkLogin",
}).then((data) => {
  if (data.status === 200) {
    window.location.href = "/";
  }
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
