const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * Gera a tabela de turmas dinamicamente com base no ano atual do sistema.
 * A data de corte é sempre 31/03 de cada ano.
 * Cobre do Berçário até a 3ª Série do Ensino Médio.
 */
function gerarTabelaTurmas(anoBase) {
  return [
    // ── Creche ────────────────────────────────────────────────
    {
      etapa: "Creche",
      turma: "Berçário",
      idadeAlvo: "4 meses a 1 ano",
      inicio: `${anoBase - 1}-04-01`,
      fim: `${anoBase}-02-02`,
    },
    {
      etapa: "Creche",
      turma: "Maternal I",
      idadeAlvo: "1 ano",
      inicio: `${anoBase - 2}-04-01`,
      fim: `${anoBase - 1}-03-31`,
    },
    {
      etapa: "Creche",
      turma: "Maternal II",
      idadeAlvo: "2 anos",
      inicio: `${anoBase - 3}-04-01`,
      fim: `${anoBase - 2}-03-31`,
    },
    {
      etapa: "Creche",
      turma: "Maternal III",
      idadeAlvo: "3 anos",
      inicio: `${anoBase - 4}-04-01`,
      fim: `${anoBase - 3}-03-31`,
    },
    // ── Pré-Escola ────────────────────────────────────────────
    {
      etapa: "Pré-Escola",
      turma: "Pré I",
      idadeAlvo: "4 anos",
      inicio: `${anoBase - 5}-04-01`,
      fim: `${anoBase - 4}-03-31`,
    },
    {
      etapa: "Pré-Escola",
      turma: "Pré II",
      idadeAlvo: "5 anos",
      inicio: `${anoBase - 6}-04-01`,
      fim: `${anoBase - 5}-03-31`,
    },
    // ── Ensino Fundamental I ──────────────────────────────────
    {
      etapa: "Ensino Fundamental",
      turma: "1º Ano",
      idadeAlvo: "6 anos",
      inicio: `${anoBase - 7}-04-01`,
      fim: `${anoBase - 6}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "2º Ano",
      idadeAlvo: "7 anos",
      inicio: `${anoBase - 8}-04-01`,
      fim: `${anoBase - 7}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "3º Ano",
      idadeAlvo: "8 anos",
      inicio: `${anoBase - 9}-04-01`,
      fim: `${anoBase - 8}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "4º Ano",
      idadeAlvo: "9 anos",
      inicio: `${anoBase - 10}-04-01`,
      fim: `${anoBase - 9}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "5º Ano",
      idadeAlvo: "10 anos",
      inicio: `${anoBase - 11}-04-01`,
      fim: `${anoBase - 10}-03-31`,
    },
    // ── Ensino Fundamental II ─────────────────────────────────
    {
      etapa: "Ensino Fundamental",
      turma: "6º Ano",
      idadeAlvo: "11 anos",
      inicio: `${anoBase - 12}-04-01`,
      fim: `${anoBase - 11}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "7º Ano",
      idadeAlvo: "12 anos",
      inicio: `${anoBase - 13}-04-01`,
      fim: `${anoBase - 12}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "8º Ano",
      idadeAlvo: "13 anos",
      inicio: `${anoBase - 14}-04-01`,
      fim: `${anoBase - 13}-03-31`,
    },
    {
      etapa: "Ensino Fundamental",
      turma: "9º Ano",
      idadeAlvo: "14 anos",
      inicio: `${anoBase - 15}-04-01`,
      fim: `${anoBase - 14}-03-31`,
    },
    // ── Ensino Médio ──────────────────────────────────────────
    {
      etapa: "Ensino Médio",
      turma: "1ª Série",
      idadeAlvo: "15 anos",
      inicio: `${anoBase - 16}-04-01`,
      fim: `${anoBase - 15}-03-31`,
    },
    {
      etapa: "Ensino Médio",
      turma: "2ª Série",
      idadeAlvo: "16 anos",
      inicio: `${anoBase - 17}-04-01`,
      fim: `${anoBase - 16}-03-31`,
    },
    {
      etapa: "Ensino Médio",
      turma: "3ª Série",
      idadeAlvo: "17 anos",
      inicio: `${anoBase - 18}-04-01`,
      fim: `${anoBase - 17}-03-31`,
    },
  ];
}

/**
 * Formata data de "YYYY-MM-DD" para "DD/MM/YYYY"
 */
function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
}

// GET /api/calcular-turma?dataNascimento=YYYY-MM-DD
app.get("/api/calcular-turma", (req, res) => {
  // ⬇️ Ano base lido a cada requisição — sempre reflete o ano atual do sistema
  const anoBase = new Date().getFullYear();
  const tabelaTurmas = gerarTabelaTurmas(anoBase);

  const { dataNascimento } = req.query;

  // Validação
  if (!dataNascimento) {
    return res.status(400).json({
      encontrado: false,
      mensagem: "O parâmetro dataNascimento é obrigatório.",
    });
  }

  const dataInput = new Date(dataNascimento + "T00:00:00");

  if (isNaN(dataInput.getTime())) {
    return res.status(400).json({
      encontrado: false,
      mensagem: "Data de nascimento inválida. Use o formato YYYY-MM-DD.",
    });
  }

  // Busca o intervalo correspondente
  const encontrado = tabelaTurmas.find((item) => {
    const inicio = new Date(item.inicio + "T00:00:00");
    const fim = new Date(item.fim + "T00:00:00");
    return dataInput >= inicio && dataInput <= fim;
  });

  // Formata a tabela para retornar ao front-end
  const tabelaFormatada = tabelaTurmas.map((item) => ({
    etapa: item.etapa,
    turma: item.turma,
    idadeAlvo: item.idadeAlvo,
    inicio: formatarData(item.inicio),
    fim: formatarData(item.fim),
  }));

  if (!encontrado) {
    return res.json({
      encontrado: false,
      anoBase,
      tabela: tabelaFormatada,
      mensagem: `A data informada está fora da tabela de referência do ano base ${anoBase}.`,
    });
  }

  return res.json({
    encontrado: true,
    anoBase,
    tabela: tabelaFormatada,
    etapa: encontrado.etapa,
    turma: encontrado.turma,
    idadeAlvo: encontrado.idadeAlvo,
    intervalo: `${formatarData(encontrado.inicio)} a ${formatarData(encontrado.fim)}`,
  });
});

// Rota raiz para verificar disponibilidade
app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "API Calculadora de Turma Escolar" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
  console.log(`📅 Ano base inicial: ${new Date().getFullYear()}`);
});
