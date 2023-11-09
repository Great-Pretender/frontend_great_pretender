interface Setor {
    id: number,
    nome: string
}
interface Servico {
    id : number,
    nome : string,
    descricao: string,
    risco : string,
    duracao_dias : string,
    custo : number,
    setor: Setor
}