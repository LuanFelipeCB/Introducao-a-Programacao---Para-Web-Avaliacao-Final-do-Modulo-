let descricaoHTML = document.getElementById('descricao')
let detalhamentoHTML = document.getElementById('detalhamento')
let formularioRecadosHTML = document.getElementById('formularioRecados')
let tabelaDeRecadosHTML = document.getElementById('tabelaDeRecados')
let registroUsuarioOnline

document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado')

    if (!usuarioLogado) {
        alert("É preciso estar logado para acessar essa página!")
        window.location.href = 'login.html'
    }

    let listagemDeUsuarios = buscaTodosRegistros()


    registroUsuarioOnline = listagemDeUsuarios.find((usuario) => usuario.nome === usuarioLogado)
    registroUsuarioOnline.recados.forEach((recado) => mostraRecados(recado))

})

function buscaTodosRegistros() {
    return JSON.parse(localStorage.getItem('cadastroDeUsuarios') || '[]') //trocar essa chave
}

formularioRecadosHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    escreverRecado()

})

function escreverRecado() {

    var i = localStorage.getItem('ordem');
    var l = ++i
    var k = localStorage.setItem('ordem', l);

    let recado = {
        ordem: i,
        descricao: descricaoHTML.value,
        detalhamento: detalhamentoHTML.value
    }

    registroUsuarioOnline.recados.push(recado)
    atualizaRegistroUsuarioOnline(registroUsuarioOnline)
    mostraRecados(recado)
}

function atualizaRegistroUsuarioOnline(registrosAtualizados) {
    let listagemDeUsuarios = buscaTodosRegistros()
    posicaoUsuarioEncontrado = listagemDeUsuarios.findIndex((usuario) => usuario.nome === registrosAtualizados.nome)

    listagemDeUsuarios[posicaoUsuarioEncontrado] = registrosAtualizados

    atualizaRegistrosStorage(listagemDeUsuarios)
}

//function atualizaRegistrosStorage(dadosUsuario) {
 //   localStorage.setItem('cadastroDeUsuarios', JSON.stringify(dadosUsuario))
//}

function atualizaRegistrosStorage(dadosUsuario) {
    localStorage.setItem('cadastroDeUsuarios', JSON.stringify(dadosUsuario))
}

function mostraRecados(umRecado) {
    let linha = document.createElement('tr')
    linha.classList.add('itensTabela')
    linha.setAttribute('id', umRecado.ordem)

    //linha.setAttribute('id', recado.descricao)
   // linha.setAttribute('id', recado.detalhamento)

    let colunaOrdem = document.createElement('td')
    colunaOrdem.innerHTML = umRecado.ordem

    let colunaDescricao = document.createElement('td')
    colunaDescricao.innerHTML = umRecado.descricao

    let colunaDetalhamento = document.createElement('td')
    colunaDetalhamento.innerHTML = umRecado.detalhamento
    colunaDetalhamento.setAttribute('id', 'detalhamento')

    let colunaBotoes = document.createElement('td')

    let botaoEditar = document.createElement('button')
    botaoEditar.innerHTML = 'Editar'
    botaoEditar.addEventListener('click', () => {
        editarRecado(umRecado.ordem)
    })

    let botaoApagar = document.createElement('button')
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.addEventListener('click', () => {
        apagarRecado(umRecado.ordem)
    })

    colunaBotoes.appendChild(botaoEditar)
    colunaBotoes.appendChild(botaoApagar)
    linha.appendChild(colunaOrdem)
    linha.appendChild(colunaDescricao)
    linha.appendChild(colunaDetalhamento)
    linha.appendChild(colunaBotoes)
    tabelaDeRecadosHTML.appendChild(linha)

}

function editarRecado(posicaoOrdem) {
    let ordemDoRecado = registroUsuarioOnline.recados.findIndex((esteRecado) => esteRecado.ordem === posicaoOrdem)
    let linha = document.getElementById(posicaoOrdem)

    console.log(linha)
     
     let novoDetalhamento = prompt("Digite o novo detalhamento")
     let tr = document.getElementById(posicaoOrdem)
     console.log('tr')
     console.log(tr.children)
     
     let td = tr.children[2]
     console.log(td)
  //   console.log(td)
     td.textContent = novoDetalhamento



 //    registroUsuarioOnline.recados.splice(detalhamento, 1, novoDetalhamento)
 //    atualizaRegistroUsuarioOnline(registroUsuarioOnline)

   // var i = localStorage.getItem('ordem');
  //  var l = ++i
   // var k = localStorage.setItem('ordem', l);
}


function apagarRecado(posicaoOrdem) {
    let ordemDoRecado = registroUsuarioOnline.recados.findIndex((esteRecado) => esteRecado.ordem === posicaoOrdem)
    let linha = document.getElementById(posicaoOrdem)

    console.log(ordemDoRecado)
    console.log(linha)


    let confirmaExclusao = confirm(`Tem certeza que deseja excluir o recado ${posicaoOrdem} ?`)
    console.log(confirmaExclusao)
    if(confirmaExclusao){
        linha.remove();
        console.log(linha)
        registroUsuarioOnline.recados.splice(ordemDoRecado, 1)
        atualizaRegistroUsuarioOnline(registroUsuarioOnline)
    }else{
        alert("Operação não efetuada com sucesso")
    }
}