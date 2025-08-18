import { formatDateToBR } from "@utils/date";

export interface MissingComponent {
  name: string;
  id: string;
  gender: string;
  suit: string;
}

export interface MissingComponentWithCount {
  component: MissingComponent;
  count: number;
}

export interface MissingComponentsData {
  month: string;
  year: string;
  eventsLength: number;
  totalMissing: number;
  soprano: MissingComponentWithCount[];
  contralto: MissingComponentWithCount[];
  tenor: MissingComponentWithCount[];
  baixo: MissingComponentWithCount[];
}

const missingComponentsHtmlContent = (data: MissingComponentsData) => {
  return `<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Componentes Faltosos - Coro Jovem Amisadai</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #FFFFFF;
            margin: 0;
            height: auto;
            color: #000000;
        }

        .container {
            max-width: 900px;
            margin: auto;
            background: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 30px;
        }

        .areaImg {
            text-align: center;
            background-color: #465741;
            padding: 15px;
            border-radius: 8px 8px 0 0;
        }

        .header img {
            max-width: 160px;
            height: auto;
        }

        h2 {
            margin: 15px 0 5px 0;
            font-size: 24px;
        }

        .header-info {
            margin-top: 10px;
            font-size: 18px;
            color: #333;
        }

        .header-info strong {
            color: #2d5a2d;
        }

        .section-title {
            font-weight: bold;
            font-size: 18px;
            margin: 25px 0 15px 0;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 8px;
            text-align: center;
            color: #2d5a2d;
        }

        /* --- FORÇA 2 COLUNAS (fallback flex) --- */
        .naipes-grid {
            display: flex;              /* fallback para engines sem grid */
            flex-wrap: wrap;            /* permite quebrar para a "2ª linha" */
            gap: 20px;
            margin: 20px 0;
        }
        .naipe-column {
            width: calc(50% - 10px);    /* 2 colunas fixas */
            box-sizing: border-box;
            min-width: 0;               /* impede min-content de estourar o grid/flex */
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;

            /* evita quebra de página no meio da coluna no PDF */
            break-inside: avoid;
            page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
        }

        /* --- Upgrade para GRID quando suportado --- */
        @supports (display: grid) {
            .naipes-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 colunas fixas */
                gap: 20px;
            }
            .naipe-column { width: auto; }
        }

        .naipe-column h3 {
            margin-top: 0;
            font-size: 18px;
            text-align: center;
            color: #2d5a2d;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 8px;
        }

        .naipe-column ul {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: none;
            overflow: visible;

            /* garante que nomes longos não "empurrem" a largura */
            word-break: break-word;
            overflow-wrap: anywhere;
        }

        .naipe-column li {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 2px 8px;
            font-size: 15px;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
        }

        .component-name { color: #000000; }
        .fault-count {
            color: #ff6b6b;
            font-weight: bold;
            white-space: nowrap; /* deixa o número + "faltas" juntinhos */
        }

        .empty-naipe {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 6px;
            border: 1px dashed #dee2e6;
        }

        .summary {
            background-color: #e8f5e8;
            padding: 16px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
            border: 1px solid #4CAF50;
        }

        .summary h3 {
            margin: 0 0 15px 0;
            color: #2d5a2d;
            font-size: 20px;
        }

        .summary p {
            margin: 8px 0;
            font-size: 16px;
            line-height: 1.5;
        }

        /* --- Impressão: força 2 colunas no PDF --- */
        @media print {
            .naipes-grid {
                display: grid !important;
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 16px !important;
            }
            .naipe-column {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            .container {
                box-shadow: none;
                background: #fff;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="areaImg">
                <img src="https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/logo.png?alt=media&token=0db0da4f-cc6a-4941-af04-f48e6367cab0">
            </div>
            <h2>Relatório de Faltas - ${data.month} de ${data.year}</h2>
            <p class="header-info">
                <strong style="font-size: 18px;">Data do Relatório:</strong> ${(() => {
                  try {
                    const today = new Date().toISOString().split("T")[0];
                    return formatDateToBR(today);
                  } catch (error) {
                    return "Data atual";
                  }
                })()}
            </p>
        </div>

        <div class="summary">
            <h3>Resumo Geral</h3>
            <p><strong>Chamadas no período:</strong> ${data.eventsLength}</p>
            <p><strong>Total de Componentes Faltosos:</strong> ${
              data.totalMissing
            }</p>
            <p><strong>Soprano:</strong> ${data.soprano.length} |
               <strong>Contralto:</strong> ${data.contralto.length} |
               <strong>Tenor:</strong> ${data.tenor.length} |
               <strong>Baixo:</strong> ${data.baixo.length}</p>
            <p><strong>Total de Faltas Registradas:</strong> ${
              data.soprano.reduce((sum, item) => sum + item.count, 0) +
              data.contralto.reduce((sum, item) => sum + item.count, 0) +
              data.tenor.reduce((sum, item) => sum + item.count, 0) +
              data.baixo.reduce((sum, item) => sum + item.count, 0)
            }</p>
        </div>

        ${
          data.totalMissing > 0
            ? `
        <div class="section-title">Componentes Faltosos (Ordenados por Maior Quantidade de Faltas)</div>

        <div class="naipes-grid">
            <div class="naipe-column">
                <h3>Soprano (${data.soprano.length})</h3>
                ${
                  data.soprano.length > 0
                    ? `<ul>${data.soprano
                        .map(
                          (item) =>
                            `<li><span class="component-name">${
                              item.component.name
                            }</span>
                             <span class="fault-count">${item.count} ${
                              item.count === 1 ? "falta" : "faltas"
                            }</span></li>`
                        )
                        .join("")}</ul>`
                    : '<div class="empty-naipe">Nenhum componente faltoso</div>'
                }
            </div>

            <div class="naipe-column">
                <h3>Contralto (${data.contralto.length})</h3>
                ${
                  data.contralto.length > 0
                    ? `<ul>${data.contralto
                        .map(
                          (item) =>
                            `<li><span class="component-name">${
                              item.component.name
                            }</span>
                             <span class="fault-count">${item.count} ${
                              item.count === 1 ? "falta" : "faltas"
                            }</span></li>`
                        )
                        .join("")}</ul>`
                    : '<div class="empty-naipe">Nenhum componente faltoso</div>'
                }
            </div>

            <div class="naipe-column">
                <h3>Tenor (${data.tenor.length})</h3>
                ${
                  data.tenor.length > 0
                    ? `<ul>${data.tenor
                        .map(
                          (item) =>
                            `<li><span class="component-name">${
                              item.component.name
                            }</span>
                             <span class="fault-count">${item.count} ${
                              item.count === 1 ? "falta" : "faltas"
                            }</span></li>`
                        )
                        .join("")}</ul>`
                    : '<div class="empty-naipe">Nenhum componente faltoso</div>'
                }
            </div>

            <div class="naipe-column">
                <h3>Baixo (${data.baixo.length})</h3>
                ${
                  data.baixo.length > 0
                    ? `<ul>${data.baixo
                        .map(
                          (item) =>
                            `<li><span class="component-name">${
                              item.component.name
                            }</span>
                             <span class="fault-count">${item.count} ${
                              item.count === 1 ? "falta" : "faltas"
                            }</span></li>`
                        )
                        .join("")}</ul>`
                    : '<div class="empty-naipe">Nenhum componente faltoso</div>'
                }
            </div>
        </div>
        `
            : `
        <div class="section-title">Nenhum Componente Faltoso</div>
        <div class="summary">
            <p>Parabéns! Não há componentes faltosos registrados para este mês.</p>
        </div>
        `
        }

        <div class="summary">
            <p><em>Este relatório foi gerado automaticamente pelo sistema do Coro Jovem Amisadai</em></p>
        </div>
    </div>
</body>
</html>
`;
};

export default missingComponentsHtmlContent;
