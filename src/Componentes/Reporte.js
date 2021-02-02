import React, { useState, useEffect } from "react";
import { Table, Form, Col, Button } from "react-bootstrap";
import './Reporte.css'
import axios from "axios";
import ExportExcel from 'react-export-excel';

//Archivo de excel
const ExcelFile = ExportExcel.ExcelFile;
//Hoja de excel
const ExcelSheet = ExportExcel.ExcelSheet;
//Columna de excel
const ExcelColumn = ExportExcel.ExcelColumn;

function Reporte() {

    const [personas, setPersonas] = useState([]);
    const listar = async () => {
        let vector = [];
        try {
            const consulta = await axios.get("http://localhost:3020/personas/");
            consulta.data.data.forEach((doc) => {
                //console.log(doc.data().Nombres)
                console.log("entra");
                let obj = {
                    TipoID: doc.tipoIdentificacion,
                    Id: doc.identificacion,
                    Email: doc.email,
                    Nombres: doc.nombres,
                    Apellidos: doc.apellidos,
                    Fecha: doc.fechaIngreso,
                };
                vector.push(obj);
            });
            setPersonas(vector);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listar();
    }, []);


    const [select, setSelect] = useState("");

    const filtrar = async () => {
        let vector = [];
        const consulta = await axios.get("http://localhost:3020/personas/filtro", {
            params: {
                seleccion: select
            }
        });
        consulta.data.data.forEach((doc) => {
            //console.log(doc.data().Nombres)
            let obj = {
                TipoID: doc.tipoIdentificacion,
                Id: doc.identificacion,
                Email: doc.email,
                Nombres: doc.nombres,
                Apellidos: doc.apellidos,
                Fecha: doc.fechaIngreso,
            };
            vector.push(obj);
        });
        setPersonas(vector);
        return 0
    }

    const filtro = (e) => {
        setSelect(e.target.value);
    }

    return (
        <Form>
            <Form.Label className="label">Reporte</Form.Label>
            <Form.Row>
                <Form.Group as={Col} controlId="Filtro">
                    <Form.Control className="filtro" name="Filtro" as="select" defaultValue="Filtro" onChange={filtro}>
                        <option value="Filtro" disabled hidden>Seleccione un filtro</option>
                        <option value="tipoIdentificacion">Tipo de identificación</option>
                        <option value="identificacion">Número de identificación</option>
                        <option value="nombres">Nombres</option>
                        <option value="apellidos">Apellidos</option>
                        <option value="email">Email</option>
                        <option value="fechaIngreso">Fecha</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="boton">
                    <Button onClick={filtrar} className="button">Filtrar</Button>
                </Form.Group>
                <Form.Group>
                    <ExcelFile element={<Button className="button2" onClick={""}>Exportar a Excel</Button>} filename="Reporte de personas registradas">
                        <ExcelSheet data={personas} name="Reporte registros">
                            <ExcelColumn label="Tipo de identificación" value="TipoID" style={{ width: '25px' }} />
                            <ExcelColumn label="Identificación" value="Id" style={{ width: '25px' }} />
                            <ExcelColumn label="Nombres" value="Nombres" style={{ width: '25px' }} />
                            <ExcelColumn label="Apellidos" value="Apellidos" style={{ width: '25px' }} />
                            <ExcelColumn label="Email" value="Email" style={{ width: '25px' }} />
                            <ExcelColumn label="Fecha de ingreso" value="Fecha" style={{ width: '25px' }} />
                        </ExcelSheet>
                    </ExcelFile>
                </Form.Group>
            </Form.Row>


            <Table className="tabla" align="center" striped bordered hover >
                <thead>
                    <tr>
                        <th>Tipo de identificación</th>
                        <th>Número de identificación</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Fecha de ingreso a la plataforma</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr>
                            <td>{persona.TipoID}</td>
                            <td>{persona.Id}</td>
                            <td>{persona.Nombres}</td>
                            <td>{persona.Apellidos}</td>
                            <td>{persona.Email}</td>
                            <td>{persona.Fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
    )
}

export default Reporte;