async function getuserdata() {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3002/api/getuserdata", {
        headers: { "authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    id = data.usr._id
    console.log(id);
    console.log(data.usr);
    console.log(data.post);

    // document.getElementById("name").textContent=data.usr.user
    // document.getElementById("email").textContent=data.usr.email
    // document.getElementById("phone").textContent=data.usr.phone
    // document.getElementById("img").src=data.usr.pic

    document.getElementById('user-details').innerHTML = `
     
                <div class="user-info">
                    <img src="${data.usr.pic}" alt="User Profile" class="profile-img" id="img">
                    <h2 class="user-name" id="name">${data.usr.name}</h2>
                    <h2 class="email" id="email">${data.usr.email}</h2>
                    <h2 id="phone" id="phone">${data.usr.phone}</h2>

                </div>
            `





let str = [];
data.post.forEach((dt) => {
    const imageUrl = dt.image && dt.image.length > 0 ? dt.image[0] : 'default-image.jpg'; 
    str += `
        <a href="../pages/showpost.html?id=${dt._id}">
            <div class="image"><img src="${imageUrl}" alt="#" height="150px" width="150px"></div>
            <div class="caption">${dt.caption}</div>
        <div class="description">${dt.description}</div>
        </a>
        `;
});
document.getElementById('post').innerHTML = str;

if (data.post.length === 0) {
    document.getElementById('post').innerHTML = `<h3>No post yet</h3>`;
}


}
getuserdata()

function addpost() {
    window.location.href = '../pages/addpost.html'
}
function home() {
    window.location.href = '../pages/index.html'
}

function logoutacc() {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    location.reload()
    window.location.href = '../pages/index.html'
}

function deletedata(){
    fetch(`http://localhost:3002/api/deleteuser/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
        console.log(res);
        if(res.status == 201){
            alert("success");
            localStorage.removeItem("token")
            window.location.href="../pages/index.html"
        }else{
            alert("Failed..")
        }
        
    })

}