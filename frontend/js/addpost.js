const token = localStorage.getItem("token")
document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    // image=document.getElementById('preview-grid').value
    caption=document.getElementById('caption').value
    description=document.getElementById('description').value 
    
    console.log(pic,caption,description);

    const res2= await fetch('http://localhost:3002/api/addpost',{
        method:"POST",
        headers:{"Content-Type":"application/json","authorization":`Bearer ${token}`},
        body:JSON.stringify({pic,caption,description})
    })
    console.log(res2);
    
});
let pic = [];

async function picture() {
    const files = document.getElementById('file-input').files;
     

    const previewContainer = document.getElementById('preview-grid'); 
    previewContainer.innerHTML = "";

    for (const file of files) {
        const base64Image = await convertBase64(file);
        pic.push(base64Image);

        const imgElement = document.createElement("img");
        imgElement.src = base64Image;
        imgElement.style.width = "100px"; 
        imgElement.style.margin = "5px"; 

        previewContainer.appendChild(imgElement);
    }
    console.log(pic); 
}




function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file); 
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

function postdata(){
    window.location.href='../pages/detail.html'
}