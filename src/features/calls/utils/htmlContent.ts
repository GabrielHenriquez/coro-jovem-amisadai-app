const htmlContent = `<html lang="pt-BR">

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
            <h2>Chamada - Coro Jovem Amisadai (20/04/2025)</h2>
            <p><strong>Tipo de chamada:</strong> Escala | <strong>Culto:</strong> Pregação</p>
        </div>

        <div class="info-grid">
            <div><strong>Data:</strong> 20/04/2025</div>
            <div><strong>Horário:</strong> 19:30H</div>
            <div><strong>Escalado:</strong> Não informado</div>
            <div><strong>Local:</strong> IEADPE - Casa Amarela</div>
            <div><strong>Chamada por:</strong> GABRIEL HENRIQUE</div>
            <div><strong>Músicas:</strong> SÓ O SENHOR É DEUS, DEUS DO MEU LOUVOR</div>
        </div>


        <div class="section-title">Chamada</div>

        <div class="areaList">

            <div class="attendance-table">
                <div class="table">
                    <h3>Presentes (39)</h3>
                    <ul>
                       <li><span>Edeilson Lucas</span> <span class="role">(Baixo)</span></li>
                      <li><span>Edson Timóteo</span> <span class="role">(Baixo)</span></li>
                      <li><span>Fabio Vicente</span> <span class="role">(1º Tenor)</span></li>
                      <li><span>Jair Santana</span> <span class="role">(2º Tenor)</span></li>
                      <li><span>Josué Calebe</span> <span class="role">(Baixo)</span></li>
                      <li><span>Josué Ribeiro</span> <span class="role">(Baixo)</span></li>
                      <li><span>João Vitor</span> <span class="role">(2º Tenor)</span></li>
                      <li><span>Lucas Eberte</span> <span class="role">(Baixo)</span></li>
                      <li><span>Manassés Franscisco</span> <span class="role">(1º Tenor)</span></li>
                      <li><span>Matheus Nascimento</span> <span class="role">(1º Tenor)</span></li>
                      <li><span>Nivaldo correia</span> <span class="role">(2º Tenor)</span></li>
                      <li><span>Rafael Leite</span> <span class="role">(Baixo)</span></li>
                      <li><span>Ryã Guilherme</span> <span class="role">(Barítono)</span></li>
                      <li><span>Silvio Araujo</span> <span class="role">(Baixo)</span></li>
                      <li><span>Vinícius Guilherme</span> <span class="role">(1º Tenor)</span></li>
                      <li><span>Ana Carolina</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Carla Carneiro</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Carmem Lucia</span> <span class="role">(2º Soprano)</span></li>
                      <li><span>Ellen caroline</span> <span class="role">(Contralto)</span></li>
                      <li><span>Esther Silva Melo</span> <span class="role">(Contralto)</span></li>
                      <li><span>Helena Gabrielle Gomes</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Jamile Felix</span> <span class="role">(2º Soprano)</span></li>
                      <li><span>Juliana Cecilia</span> <span class="role">(Contralto)</span></li>
                      <li><span>Juliane Larissa</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Kellyta Martins</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Larissa Carla</span> <span class="role">(Contralto)</span></li>
                      <li><span>Luiza Ester</span> <span class="role">(2º Soprano)</span></li>
                      <li><span>Manuele Dias</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Manuella souza</span> <span class="role">(Contralto)</span></li>
                      <li><span>Mykaella Raissa</span> <span class="role">(Contralto)</span></li>
                      <li><span>Ornela Berthiê</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Rayssa Conceição</span> <span class="role">(Contralto)</span></li>
                      <li><span>Stefania Silva Melo</span> <span class="role">(2º Soprano)</span></li>
                      <li><span>Stefany Silva Melo</span> <span class="role">(Contralto)</span></li>
                      <li><span>Talita Florentino</span> <span class="role">(1º Soprano)</span></li>
                      <li><span>Tamandara da Silva</span> <span class="role">(Contralto)</span></li>
                      <li><span>Thaiza Rodrigues</span> <span class="role">(Contralto)</span></li>
                      <li><span>Thayane Florentino</span> <span class="role">(Contralto)</span></li>
                      <li><span>Thays Florentino</span> <span class="role">(2º Soprano)</span></li>
                    </ul>
                </div>

                <div class="table">
                    <h3>Ausentes (13)</h3>
                    <ul>
                        <li><span>Diogo Vinícius</span> <span class="role">(1º Tenor)</span></li>
                        <li><span>Emanuel Victor</span> <span class="role">(Baixo)</span></li>
                        <li><span>Gabriel Henrique Soares</span> <span class="role">(2º Tenor)</span></li>
                        <li><span>Jackson Avelino</span> <span class="role">(2º Tenor)</span></li>
                        <li><span>Miguel Luiz</span> <span class="role">(Baixo)</span></li>
                        <li><span>Pedro Augusto</span> <span class="role">(1º Tenor)</span></li>
                        <li><span>Acsa Cristina</span> <span class="role">(2º Soprano)</span></li>
                        <li><span>Ana Beatriz</span> <span class="role">(1º Soprano)</span></li>
                        <li><span>Elaine Apolinário</span> <span class="role">(Contralto)</span></li>
                        <li><span>Jamile Vitória Rosa da Silva</span> <span class="role">(2º Soprano)</span></li>
                        <li><span>Lays Apolinário</span> <span class="role">(Contralto)</span></li>
                        <li><span>Maria Júlia Muniz de Luna</span> <span class="role">(1º Soprano)</span></li>
                        <li><span>Maria Vitória Edinger</span> <span class="role">(2º Soprano)</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
`;

export default htmlContent;
