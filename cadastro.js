let recadosHTML = document.getElementById('recados')
let formularioCadastroHTML = document.getElementById('formularioCadastro')
let dadosUsuario = buscarRegistrosStorage();


//PRECISO DESSA FUNÇÃO PRA CRIAR OS RECADOS, MAS NÃO PRECISO NESSA PÁGINA??? PODE SER USADA PRA CRIAR O ID?
document.addEventListener('DOMContentLoaded', () => {
  for(const registrosDeUsuarios of dadosUsuario) {
//RECADOS
  }
})


formularioCadastroHTML.addEventListener('submit', (e) => {

  e.preventDefault();

  let nomeDeUsuarioHTML = document.getElementById('nomeDeUsuario');
  let senhaCadastroHTML = document.getElementById('senhaCadastro');
  let senhaVerificaHTML = document.getElementById('senhaVerifica');

  let validaUsuarioExistente = dadosUsuario.some((registro) => registro.nome === nomeDeUsuarioHTML.value)

  if(validaUsuarioExistente){
    alert("Usuário já existe, tente novamente")
    return
  }

  const senhasIguais = validarSenhas(senhaCadastroHTML.value, senhaVerificaHTML.value);

  if (senhasIguais) {  
    let registroUsario = {
      nome: nomeDeUsuarioHTML.value,
      senha: senhaCadastroHTML.value,
      recados: []
    }

    dadosUsuario.push(registroUsario)

    alert(`Conta criada com sucesso`)
    formularioCadastroHTML.reset();
  }

  salvaRegistrosStorage(dadosUsuario)

});


function validarSenhas(senhaCadastroHTML, senhaVerificaHTML) {

  if (senhaCadastroHTML !== senhaVerificaHTML) {
    alert("Não são iguais")
    return false
  }
  return true
}

function salvaRegistrosStorage(dadosUsuario) {
  localStorage.setItem('cadastroDeUsuarios', JSON.stringify(dadosUsuario))
}

function buscarRegistrosStorage() {
  return JSON.parse(localStorage.getItem('cadastroDeUsuarios') ?? '[]')
}

function criaRecados(){
    const section = document.getElementById('section')
  } 
