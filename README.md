# 🎓 Calculadora de Turma Escolar

Aplicativo web que calcula em qual turma/ano escolar uma criança deve estar, com base na data de nascimento e na data de corte de **31/03** (ano base 2026).

---

## 🗂 Estrutura do projeto

```
projectCalcTurma/
├── backend/
│   ├── server.js       # API Express
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── styles.css
```

---

## 🚀 Como rodar localmente

### 1. Backend

```bash
cd backend
npm install
npm start
```

O servidor sobe em **http://localhost:3001**

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A interface fica disponível em **http://localhost:5173**

---

## 🔌 Endpoint da API

```
GET /api/calcular-turma?dataNascimento=YYYY-MM-DD
```

**Resposta (encontrado):**
```json
{
  "encontrado": true,
  "etapa": "Pré-Escola",
  "turma": "Pré II",
  "idadeAlvo": "5 anos",
  "intervalo": "01/04/2020 a 31/03/2021"
}
```

**Resposta (fora de intervalo):**
```json
{
  "encontrado": false,
  "mensagem": "A data informada está fora da tabela de referência do ano base 2026."
}
```

---

## 📋 Tabela de referência (2026)

| Turma       | Etapa              | Intervalo de nascimento        |
|-------------|--------------------|-------------------------------|
| Berçário    | Creche             | 01/04/2025 — 02/02/2026       |
| Maternal I  | Creche             | 01/04/2024 — 31/03/2025       |
| Maternal II | Creche             | 01/04/2023 — 31/03/2024       |
| Maternal III| Creche             | 01/04/2022 — 31/03/2023       |
| Pré I       | Pré-Escola         | 01/04/2021 — 31/03/2022       |
| Pré II      | Pré-Escola         | 01/04/2020 — 31/03/2021       |
| 1º Ano      | Ensino Fundamental | 01/04/2019 — 31/03/2020       |
| 2º Ano      | Ensino Fundamental | 01/04/2018 — 31/03/2019       |
| 3º Ano      | Ensino Fundamental | 01/04/2017 — 31/03/2018       |
| 4º Ano      | Ensino Fundamental | 01/04/2016 — 31/03/2017       |
| 5º Ano      | Ensino Fundamental | 01/04/2015 — 31/03/2016       |
