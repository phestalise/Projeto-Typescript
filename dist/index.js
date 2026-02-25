const cardiologia = {
    id: 1,
    nome: "Cardiologia",
};
const medico1 = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
};
const paciente1 = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
};
function criarConsulta(id, medico, paciente, data, valor) {
    return {
        id,
        medico,
        paciente,
        data,
        valor,
        status: "agendada",
    };
}
function confirmarConsulta(consulta) {
    return Object.assign(Object.assign({}, consulta), { status: "confirmada" });
}
function cancelarConsulta(consulta) {
    if (consulta.status === "realizada") {
        return null;
    }
    return Object.assign(Object.assign({}, consulta), { status: "cancelada" });
}
function exibirConsulta(consulta) {
    const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(), 350);
const consulta2 = Object.assign(Object.assign({}, consulta1), { id: 2, status: "realizada" });
const consulta3 = Object.assign(Object.assign({}, consulta1), { id: 3, status: "cancelada" });
const consultas = [consulta1, consulta2, consulta3];
function listarConsultasPorStatus(consultas, status) {
    return consultas.filter((c) => c.status === status);
}
function listarConsultasFuturas(consultas) {
    const hoje = new Date();
    return consultas.filter((c) => c.data > hoje);
}
function calcularFaturamento(consultas) {
    return consultas
        .filter((c) => c.status === "realizada")
        .reduce((total, c) => total + c.valor, 0);
}
console.log("=== CONSULTAS REALIZADAS ===");
listarConsultasPorStatus(consultas, "realizada").forEach((c) => console.log(exibirConsulta(c)));
console.log("Faturamento total:");
console.log(calcularFaturamento(consultas).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
}));
export {};
