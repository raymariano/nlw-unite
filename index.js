
let participantes = [
      {
          nome: "Diego Fernandes",
          email: "diego@gmail.com",
          dataInscricao: new Date(2024, 2, 1, 19, 23),
          dataCheckIn: new Date(2024, 2, 1, 20, 20)
      },
      {
          nome: "Mayk Brito",
          email: "mayk@gmail.com",
          dataInscricao: new Date(2024, 1, 2, 19, 20),
          dataCheckIn: null
      },
      {
          nome: "Ana Silva",
          email: "ana@gmail.com",
          dataInscricao: new Date(2024, 0, 3, 18, 10),
          dataCheckIn: null
      },
      {
          nome: "Carlos Oliveira",
          email: "carlos@gmail.com",
          dataInscricao: new Date(2024, 2, 4, 15, 45),
          dataCheckIn: new Date(2024, 2, 4, 16, 10)
      },
      {
          nome: "Maria Santos",
          email: "maria@gmail.com",
          dataInscricao: new Date(2024, 1, 5, 14, 30),
          dataCheckIn: null
      },
      {
          nome: "João Pereira",
          email: "joao@gmail.com",
          dataInscricao: new Date(2024, 0, 6, 12, 20),
          dataCheckIn: null
      },
      {
          nome: "Juliana Souza",
          email: "juliana@gmail.com",
          dataInscricao: new Date(2024, 2, 7, 10, 0),
          dataCheckIn: new Date(2024, 2, 7, 10, 30)
      },
      {
          nome: "Fernando Almeida",
          email: "fernando@gmail.com",
          dataInscricao: new Date(2024, 1, 8, 8, 45),
          dataCheckIn: null
      },
      {
          nome: "Patrícia Lima",
          email: "patricia@gmail.com",
          dataInscricao: new Date(2024, 0, 9, 6, 30),
          dataCheckIn: new Date(2024, 0, 9, 7, 15)
      },
      {
          nome: "Rafaela Costa",
          email: "rafaela@gmail.com",
          dataInscricao: new Date(2024, 2, 10, 5, 15),
          dataCheckIn: new Date(2024, 2, 10, 6, 0)
      }

]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    // condicional
    if(participante.dataCheckIn == null) {
       dataCheckIn = `
       <button
        data-email="${participante.email}"
         onclick="fazerCheckIn(event)"
       >
       Confirmar check-in
       </button>
       `
    }
    
    return `
    <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
       ${participante.email}
      </small>
    </td>
   <td>${dataInscricao}</td>
   <td>${dataCheckIn}</td>
   
   </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""

    for(let participante of participantes) {
     output = output + criarNovoParticipante(participante)
    }

   // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
   event.preventDefault()

   const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

// verificar se o participante já existe
const participanteExiste = participantes.find(
    (p) =>  p.email == participante.email
    
) 

if(participanteExiste) {
   alert('Email já cadastrado!') 
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
   // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

   // encontrar o participante dentro da lista 
   const participante = participantes.find((p) =>  p.email == event.target.dataset.email
   )
   
   // atualizar o check-in do participante 
   participante.dataCheckIn = new Date()
   // atualizar a lista de participantes
   atualizarLista(participantes)
}