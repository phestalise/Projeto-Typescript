import { Especialidade } from "./types/especialidade";
import { Paciente } from "./types/paciente";
import { StatusConsulta } from "./types/statusConsulta";
import { Medico } from "./interfaces/medico";
import { Consulta } from "./interfaces/consulta";


const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};

const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return { ...consulta, status: "confirmada" };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return { ...consulta, status: "cancelada" };
}

function exibirConsulta(consulta: Consulta): string {
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

const consulta2: Consulta = {
  ...consulta1,
  id: 2,
  status: "realizada",
};

const consulta3: Consulta = {
  ...consulta1,
  id: 3,
  status: "cancelada",
};

const consultas: Consulta[] = [consulta1, consulta2, consulta3];

function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((c) => c.status === status);
}

function listarConsultasFuturas(
  consultas: Consulta[]
): Consulta[] {
  const hoje = new Date();
  return consultas.filter((c) => c.data > hoje);
}

function calcularFaturamento(
  consultas: Consulta[]
): number {
  return consultas
    .filter((c) => c.status === "realizada")
    .reduce((total, c) => total + c.valor, 0);
}
console.log("=== CONSULTAS REALIZADAS ===");
listarConsultasPorStatus(consultas, "realizada").forEach((c) =>
  console.log(exibirConsulta(c))
);

console.log("Faturamento total:");
console.log(
  calcularFaturamento(consultas).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
);