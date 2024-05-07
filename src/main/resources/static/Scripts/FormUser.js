import{displayErrorMessage, displayServerResponse} from "./utils.js";
import {URLPOSTREGISTER} from "./constants.js";

document.addEventListener('DOMContentLoaded', formUser);

let numbersCalls=[];

function addEventAddNumber(){
    document.getElementById("plus-button").addEventListener("click", e=>{
        numbersCalls.push(document.getElementById("entry-number").value);
        document.getElementById("entry-number").value="";
    });
}

async function formUser(){

    const errorMessageDiv = document.getElementById('errorMessage');
    const serverResponseDiv = document.getElementById('serverResponse');
    addEventAddNumber();
    document.getElementById('formUser').addEventListener('submit', async function (event) {
        event.preventDefault();

        errorMessageDiv.style.display = 'none';
        serverResponseDiv.style.display = 'none';

        const formDataJson = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            trunk: document.getElementById('trunk').value,
            formatCall: numbersCalls
        };

        const formDataJsonString = JSON.stringify(formDataJson);

        console.log (formDataJsonString);

        console.log(localStorage.getItem('token'))

        try {
            const response = await fetch(URLPOSTREGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formDataJsonString
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(errorMessage);
                displayErrorMessage(errorMessage);
            }

            const data = await response.text();
            displayServerResponse(data);
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error:', error);
        }
         finally {
        numbersCalls.splice(0, numbersCalls.length);
    }

    })

}


