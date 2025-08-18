import { formatDateToBR } from "@utils/date";
import { IEvent } from "../domain/entities/Events";

const htmlContent = (event: IEvent) => {
  const musics = event?.musics?.map(({ music }) => music).join(", ");

  return `<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Chamada - Coro Jovem Amisadai</title>
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
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .areaImg {
            text-align: center;
            background-color: #465741;
            padding: 15px;
        }

        .header img {
            max-width: 160px;
        }

        h2 {
            margin-bottom: 5px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px 30px;
            font-size: 14px;
            margin: 0 auto 25px auto;
            max-width: 700px;
        }

        .info-grid div {
            margin-bottom: 4px;
        }

        .section-title {
            font-weight: bold;
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            text-align: center;
        }

        .attendance-table {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .table {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;
            max-height: none;
            /* garante que não limite a altura */
        }

        .table h3 {
            margin-top: 0;
            font-size: 18px;
            text-align: center;
        }

        .areaList {
            padding: 10px 30px 20px 30px;
        }

        .table ul {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: none;
            overflow: visible;
        }

        .table li {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 2px 8px;
            font-size: 15px;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
        }

        .role {
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="areaImg">
                <img src="https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/logo.png?alt=media&token=0db0da4f-cc6a-4941-af04-f48e6367cab0">
            </div>
            <h2>Chamada - Coro Jovem Amisadai (${formatDateToBR(
              event?.date
            )})</h2>
            <p><strong>Tipo de chamada:</strong> ${
              event?.type
            } | <strong>Culto:</strong> ${event?.cult}</p>
        </div>

        <div class="info-grid">
            <div><strong>Data:</strong> ${formatDateToBR(event?.date)}</div>
            <div><strong>Horário:</strong> ${event?.hour}</div>
            <div><strong>Escalado:</strong> ${
              event?.namePreacher ?? "Não informado"
            }</div>
            <div><strong>Local:</strong> ${
              event?.type === "Saída" && event?.local
                ? event?.local
                : "IEADPE - Casa Amarela"
            }</div>
            <div><strong>Chamada por:</strong> ${event?.scheduleBy}</div>
            <div><strong>Músicas:</strong> ${musics}</div>
        </div>


        <div class="section-title">Chamada</div>

        <div class="areaList">

            <div class="attendance-table">
                <div class="table">
                    <h3>Presentes (${event?.components?.length})</h3>
                    <ul>
                        ${event?.components
                          ?.map(
                            (component) =>
                              `<li><span>${component?.name}</span> <span class="role">(${component?.suit})</span></li>`
                          )
                          .join("")}
                    </ul>
                </div>

                <div class="table">
                    <h3>Ausentes (${event?.missingComponents?.length})</h3>
                    <ul>
                        ${event?.missingComponents
                          ?.map(
                            (component) =>
                              `<li><span>${component?.name}</span> <span class="role">(${component?.suit})</span></li>`
                          )
                          .join("")}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
`;
};

export default htmlContent;
