{
    
    
    let nam=document.getElementById("myusername").innerText;
    let newPostForm=$("#new-post-form");

    //method to submit a form data for new post using AJAX
newPostForm.submit(function(e){
    e.preventDefault();
$.ajax({
    type:"post",
    url:"/post/create",
    data:newPostForm.serialize(),
    success:function(data){
        console.log(data.data.post);
 let newpost= createpost(data.data.post);
console.log(newpost);
$("#postinserthere").prepend(newpost);

alertshow(data.message);

deletepost();

    },error:function(error){
        console.log(error.responseText);
    }
})

})


//method to create a post in a dom

function createpost(data){
    return $(`      
    <div class="card mt-2" style="width: 30rem;" id="${data._id}">
        <div class="card-body">
          <h5 class="card-title"> ${nam}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${data.email}</h6>
          <p class="card-text">${data.content} </p>
       
          <a href="/post/destroy/${data._id}" class="card-link">Delete</a>
         
          <a href="#" class="card-link">Comment</a>
        </div>
<div class="comment-section">
    <div class="container">
<form action="/comment/create" method="POST">
    <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
        <textarea class="form-control" name="content" id="exampleFormControlTextarea1" rows="3" required></textarea>
    <input type="hidden" name="post_id" value="${data._id}" > 
    
    </div>
      <button class="btn btn-primary" type="submit" >ADD</button>
</form>
</div>
</div>
</div>
`);



}
//delete the post

function deletepost(){
console.log("hello ji")
    let deletebtn=$(".card-link");
    
    deletebtn.click(function(e){
        e.preventDefault();
      
        let url=$(e.target).prop('href');
        console.log(url);

$.ajax({
    type:"get",
    url:url,
    success:function(data){
     $(`#${data.data.post_id}`).remove();
    alertshow(data.message)},error:function(errordata){

    }
})

    })

}







function alertshow(message){

        new Noty({
           theme:"relax",
           text:message,
           type:"success",
           layout:"topRight",
           timeout:1500
        }).show();
     
   
}



deletepost();


}