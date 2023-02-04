const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


checkLogged();

//LOGAR NO SISTEMA*********************************************************************************************
document.getElementById("login-form").addEventListener("submit",function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Verifique o usuário ou a senha inserida.");
        return;
    }
    if(account){
        if(account.password !== password){
            alert("Verifique o usuário ou a senha inserida.");
            return;
        }
        window.location.href = "home.html";
    }
    saveSession(email, checkSession);
 
});

//CRIAR CONTA**************************************************************************************************
document.getElementById("create-form").addEventListener("submit",function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.lengh < 5){
        alert("Preencha o campo com um email válido.");
        return;
    }

    if(password.lengh < 5){
        alert("Utilize no mínimo 5 caracteres.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    myModal.hide();
    alert("Conta criada com sucesso!");
});

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); 
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}

function saveSession (data, saveSession){
    if(true){
        localStorage.setItem("session", data); //O localStorage serve pra salvar as informações que queremos que permaneçam na aplicação, se fecharmos o site, fica salvo, não se perde
    }
    sessionStorage.setItem("logged, data"); // O sessionStorage usamos para salvar na seção, não fica salvo depois que fecha o site, é perdido
}

function checkLogged(){
    if(session){
        session.setItem("logged", session);
        logged = session;
    }
    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html"; 
    }
}