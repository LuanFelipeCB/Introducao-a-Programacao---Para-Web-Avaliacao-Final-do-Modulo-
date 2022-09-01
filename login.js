let formularioLoginHTML = document.getElementById('formularioLogin')
let usuarioLoginHTML = document.getElementById('usuarioLogin')
let senhaLoginHTML = document.getElementById('senhaLogin')




formularioLoginHTML?.addEventListener('submit', (ev) => {
    ev.preventDefault()

    logar();
})

function logar() {
    let cadastroDeUsuarios = buscarStorage()

    let usuarioEncontrado = cadastroDeUsuarios.find((usuario) => usuario.nome === usuarioLoginHTML.value && usuario.senha === senhaLoginHTML.value)

    if (!usuarioEncontrado) {
        alert(" e-mail e/ou senha incorretos, tente novamente.")
        formularioLoginHTML.reset()
        return
    }
    localStorage.setItem('usuarioLogado', usuarioEncontrado.nome)

    window.location.href = 'recados.html'

}

function buscarStorage() {
    return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || '[]') //trocar essa chave
}