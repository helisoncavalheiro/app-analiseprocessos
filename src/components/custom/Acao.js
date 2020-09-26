const React = require('react');
const { Card, Badge } = require("react-bootstrap")


export default function Acao(props) {
    let acao = props.data;
    return (
        <div className="col-sm-12 mt-4">
            <Card border={(acao.ativo ? "primary" : "warning")}>
                <Card.Header>
                    <div style={{ fontSize: '18px' }}>
                        <span className="pr-2">Nome:</span>
                        <span className="font-weight-bold">
                            {acao.texto}
                        </span>

                    </div>
                </Card.Header>

                <Card.Body>
                    <Card>
                        <Card.Body>
                            <span className="mb-2" style={{ margin: '0px 2px', fontSize: '18px' }}>Workflow: </span>
                            <span className="bg-disabled" style={{ fontSize: '16px' }}>
                                <span style={{ paddingRight: '5px' }}>
                                    {acao.origem.id + ' - ' + acao.origem.name}
                                </span>
                                <i className="fas fa-chevron-right" ></i>
                                <span style={{ paddingLeft: '5px' }}>
                                    {acao.destino.id + ' - ' + acao.destino.name}
                                </span>
                            </span>


                            {
                                acao.atribuir ? (
                                    <span className="pl-2" style={{ fontSize: '20px' }}>
                                        <Badge variant="primary">Atribuível para:
                                            {acao.atribuiveis.map(papel => { return papel.id + ' - ' + papel.name })}</Badge>
                                    </span>
                                )
                                    : ""
                            }

                        </Card.Body>
                    </Card>
                    <Card className="mt-2">
                        <Card.Body>
                            <span style={{ margin: '0px 2px', fontSize: '18px' }}>Papéis: </span>

                            {
                                acao.disponivelPara.map(papel => {
                                    return (
                                        <span className="bg-disabled" style={{ fontSize: '16px' }}>
                                            {papel.id + ' - ' + papel.name}
                                        </span>)
                                })}
                        </Card.Body>
                    </Card>

                </Card.Body>

            </Card>
        </div>
    )

}