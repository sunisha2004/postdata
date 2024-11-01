const url = window.location.href;
const urlParams = new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function showPost(){
    const res=await fetch(`http://localhost:3002/api/showPost/${id}`)
    const data=await res.json()
    console.log(data.post);

    document.getElementById("post-caption").textContent = `Caption: ${data.post.caption}`;
    document.getElementById("post-description").textContent = `Description: ${data.post.description}`;
    console.log(data.post.image[0]);
    
    document.getElementById("img-preview").src=data.post.image[0]

    const imagesContainer = document.getElementById("images-container");

    data.post.image.forEach((imageSrc, index) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `Image ${index + 1}`;
        img.className = "post-image";
        img.addEventListener("mouseover", () => showPreview(imageSrc));
        imagesContainer.appendChild(img);
    });   
    // document.getElementById('div-btn').innerHTML=`
    //     <button class="edit-btn" onclick="editPost()">Edit</button>
    //     <button class="del-btn" onclick="delPost()">Delete</button>
    // `
}
showPost()

function showPreview(imageSrc) {
    document.getElementById("img-preview").src=imageSrc
}

function editPost() {
    window.location.href=`../pages/editPost.html?id=${id}`
}

function delPost() {
    fetch(`http://localhost:3002/api/deletePost/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
        console.log(res);
        if(res.status == 201) {
            alert("success");
            window.location.href="../pages/profile.html"
        }
        else{
            alert("error");
        }
    });
}