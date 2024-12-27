type ResultsProps = {
  results: any;
};

export default function Results({ results }: ResultsProps) {
  if (!results) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold">Resultados da Análise</h2>
      <p className="mt-2">
        <strong>Erros:</strong> {results.violations.length}
      </p>
      <p>
        <strong>Avisos:</strong> {results.incomplete.length}
      </p>

      {results.violations.length > 0 && (
        <>
          <h3 className="mt-4 text-md font-semibold text-red-700">Detalhes dos Erros</h3>
          <div className="mt-2 space-y-4">
            {results.violations.map((violation: any, index: number) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <strong className="text-red-700">{violation.description}</strong>
                </div>
                <p className="mt-2 text-sm text-gray-600">{violation.help}</p>
                <div className="mt-2 space-y-2">
                  {violation.nodes.map((node: any, nodeIndex: number) => (
                    <div key={nodeIndex} className="text-sm">
                      <div className="font-mono bg-gray-200 p-2 rounded">
                        {node.html}
                      </div>
                      {node.failureSummary && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Problema:</strong> {node.failureSummary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {results.incomplete.length > 0 && (
        <>
          <h3 className="mt-4 text-md font-semibold text-yellow-700">Detalhes dos Avisos</h3>
          <div className="mt-2 space-y-4">
            {results.incomplete.map((incomplete: any, index: number) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <strong className="text-yellow-700">{incomplete.description}</strong>
                </div>
                <p className="mt-2 text-sm text-gray-600">{incomplete.help}</p>
                <div className="mt-2 space-y-2">
                  {incomplete.nodes.map((node: any, nodeIndex: number) => (
                    <div key={nodeIndex} className="text-sm">
                      <div className="font-mono bg-gray-200 p-2 rounded">
                        {node.html}
                      </div>
                      {node.failureSummary && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Problema:</strong> {node.failureSummary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
