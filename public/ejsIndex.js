$('.user').on('click', async (event)=>{
  try {
    var id = $(event.currentTarget).attr('userid')
    const res = await $.ajax({
      type:'GET',
      url:'/student/' + id
    })
    console.log(8, res)
    $(event.currentTarget).html(res)
  } catch (error) {
    console.log(error);
  }
})