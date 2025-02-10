import { createToaster } from "./toaster.js";

const sendMessage = async(event) => {
    event.preventDefault();
    const form = document.forms[0];

    const email = form.elements['email'].value;
    const name = form.elements['name'].value;
    const message = form.elements['message'].value;

    const divSpinner = form.querySelector('.sendBtn');
    const spinnerContainer = divSpinner.querySelector('.spinner_container');


    if (!name || !email || !message) {
        const sendMessageBtn = document.forms[0].querySelector('.sendBtn');
        // sendMessageBtn.classList.add('ignore')
        createToaster("Please complete the fields")
        // alert('Please complete the fields');
        // return
    }
    else{
        console.log({name, email, message})
        spinnerContainer.style.display = 'block'
        const formdata = {name, email, message}
        try{
            const response = await fetch('/send-email', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json',
                    
                },
                body: JSON.stringify(formdata)
            })
            const result = await response.json();
            createToaster(result?.message)
        }
        catch(err){
            console.error(err)
        }
        finally{
            form.elements['name'].value = "";
            form.elements['email'].value = "";
            form.elements['message'].value = "";
            spinnerContainer.style.display = 'none';
            sendMessageBtn.classList.add('ignore');
        }
    }
   
}

export { sendMessage }