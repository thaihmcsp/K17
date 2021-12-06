$.ajax({
  url: "/checkLogin",
  type: "GET",
})
  .then((data) => {
    if (data.status !== 200) {
      window.location.href = "/login";
    }
  })
  .catch((err) => {
    console.log(err);
  });

async function logout() {
  try {
    const data = await $.ajax({
      url: "/student/logout",
      type: "POST",
    });
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
}
