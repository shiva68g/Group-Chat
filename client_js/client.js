
const socket = io();

let name;
let textarea = document.getElementById('textarea_message');
	
let message_area = document.getElementsByClassName('message_area')
do{
    name = prompt("Enter your name");
   
}while(!name)
 
if(name){
  socket.emit('join' , name)
  let message_area = document.getElementsByClassName('message_area')
   let div = document.createElement('div')
	  let innerdata = `
          <div>
            <p class="text-center"> ${name} joined the chat </p>
          </div>
    `
    div.innerHTML = innerdata
    message_area[0].appendChild(div);
    scrollup()
}



textarea.addEventListener('keypress' , e=>{
	 if (e.key === 'Enter') {
       sentmessage(e.target.value.trim())
       e.traget.value = '';
    }
	 
})

function sentmessage(msg){
	let data = {
		user : name,
		message : msg
	}
	appendmessage(data , "outgoing" )
	socket.emit('message' , data)
}

function appendmessage(msg , type){

  let div = document.createElement('div')	
  let classname = type
  div.classList.add(classname , 'message')
  let innerdata
   if(classname == "outgoing"){
   	    innerdata = `
   	     <h5 class="text-end name-right">
   	     ${msg.user}
   	     </h5>
         <p class="text-end  message-right bg-secondary text-light">
         ${msg.message}
         </p>`
  	}
    else{
    	innerdata = `
           <h5 class="tex-start name-left">
           ${msg.user}
           </h5>
           <p class="tex-start  message-left bg-primary text-light">
            ${msg.message}
           </p>
    `
    }
  div.innerHTML = innerdata;
  message_area[0].appendChild(div);

  scrollup()
  
}



socket.on('message' , (msg)=>{
	 appendmessage(msg , "incomming")
})

socket.on('join' , (msg)=>{
	  let message_area = document.getElementsByClassName('message_area')
	  let div = document.createElement('div')
	  let innerdata = `
          <div>
            <p class="text-center"> ${msg} joined the chat </p>
          </div>
     `
     div.innerHTML = innerdata
    message_area[0].appendChild(div);
    scrollup()
})


function scrollup(){
	  message_area[0].scrollTop =  message_area[0].scrollHeight
}