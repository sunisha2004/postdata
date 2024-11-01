async function getdata() {

    const token = localStorage.getItem("token")
    
    if(token){

    const res = await fetch("http://localhost:3002/api/getdata",{
        headers:{"authorization":`Bearer ${token}`}
    });

    const dt=await res.json();
    console.log(dt);
    document.getElementById("user").textContent=dt.usr.user
    document.getElementById("profile-pic").src=dt.usr.pic
    document.getElementById('logbt').style.display="none"


    let str=[]
    // console.log(dt.data[1].caption);
    dt.data.map((data)=>{
      str+=`
       <a href="./pages/globalPost.html?id=${data._id}">
                <div class="card">
                    <div><img
                            src="${data.image[0]}"
                            alt height="250" width="200"></div>
                    <div>${data.caption} </div>
                </div>
            </a>`
    })
    document.getElementById("main").innerHTML=str
    
}
else{
    alert("you are not logined")
  
}
}
getdata()





function login(){
    window.location.href='../pages/login.html'
}

function detail(){
    window.location.href='../pages/detail.html'
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  
  function logoutacc() {
    localStorage.removeItem("token")
    alert("Logout Successfully")
   location.reload()
  }