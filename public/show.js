$.ajax({
  url: "/student",
  type: "GET",
})
  .then(function (data) {
    let buttonCount = Math.ceil(data.length / 3);
    $(".buttonList").append(
      `
      <button class='prev'>prev</button>
      `
    );
    for (let i = 0; i < buttonCount; i++) {
      $(".buttonList").append(
        `
        <button onclick='getData(${i + 1}, ${buttonCount} )'>${i + 1}</button>
        `
      );
    }
    $(".buttonList").append(
      `
      <button class='next' onclick='getData(2)'>next</button>
      `
    );

    getData(1, buttonCount);
  })
  .catch(function (err) {
    console.log(err);
  });

function getData(page, maxPage) {
  $.ajax({
    url: "/student/page?page=" + page,
    type: "GET",
  })
    .then(function (data) {
      console.log(37, page, maxPage);

      if (page < maxPage) {
        $(".next").attr("onclick", `getData(${page + 1}, ${maxPage} )`);
      } else {
        $(".next").attr("onclick", `getData(${maxPage}, ${maxPage} )`);
      }

      if (page > 1) {
        $(".prev").attr("onclick", `getData(${page - 1}, ${maxPage} )`);
      } else {
        $(".prev").attr("onclick", `getData(${1}, ${maxPage} )`);
      }

      let div = ``;
      for (let i = 0; i < data.length; i++) {
        div += `<div>${data[i].username}</div>`;
      }
      $(".listData").html(div);
    })
    .catch(function (err) {
      console.log(err);
    });
}
