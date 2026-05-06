import React from 'react';
import './NutritionalTable.css';

const NutritionalTable = ({ data }) => {
  if (!data) return null;

  return (
    <div className="nutritional-table">
      <div className="nt-header">
        <h3>INFORMAÇÃO NUTRICIONAL</h3>
        <p>Porção: {data.porcao}</p>
      </div>
      <table className="nt-body">
        <thead>
          <tr>
            <th>Quantidade por porção</th>
            <th>%VD (*)</th>
          </tr>
        </thead>
        <tbody>
          {data.calorias && (
            <tr>
              <td><strong>Valor Energético</strong></td>
              <td>{data.calorias}</td>
              <td>-</td>
            </tr>
          )}
          {data.proteina && (
            <tr>
              <td>Proteínas</td>
              <td>{data.proteina}</td>
              <td>{parseInt(data.proteina) ? Math.round((parseInt(data.proteina) / 50) * 100) + '%' : '-'}</td>
            </tr>
          )}
          {data.carboidrato && (
            <tr>
              <td>Carboidratos</td>
              <td>{data.carboidrato}</td>
              <td>{parseInt(data.carboidrato) ? Math.round((parseInt(data.carboidrato) / 300) * 100) + '%' : '-'}</td>
            </tr>
          )}
          {data.gordurasTeste && (
            <tr>
              <td>Gorduras Totais</td>
              <td>{data.gordurasTeste}</td>
              <td>{parseInt(data.gordurasTeste) ? Math.round((parseInt(data.gordurasTeste) / 65) * 100) + '%' : '-'}</td>
            </tr>
          )}
          {data.sodio && (
            <tr>
              <td>Sódio</td>
              <td>{data.sodio}</td>
              <td>{parseInt(data.sodio) ? Math.round((parseInt(data.sodio) / 2400) * 100) + '%' : '-'}</td>
            </tr>
          )}
          {data.creatina && (
            <tr>
              <td>Creatina</td>
              <td>{data.creatina}</td>
              <td>-</td>
            </tr>
          )}
          {data.bcaa && (
            <tr>
              <td>BCAA</td>
              <td>{data.bcaa}</td>
              <td>-</td>
            </tr>
          )}
          {data.glutamina && (
            <tr>
              <td>Glutamina</td>
              <td>{data.glutamina}</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="nt-footer">
        <p>(*) % Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.</p>
        <p>Não contém quantidades significativas de gorduras saturadas, gorduras trans, e fibra alimentar.</p>
      </div>
    </div>
  );
};

export default NutritionalTable;


