import React, { Component } from 'react';
import './App.css';
import { Card, Input, Button, Table, Layout } from 'antd';
import { range, compile, derivative } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios' ;

var dataInTable = []
var dataA = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
var fx = " ";
class Onepoint extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.myChange = this.myChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    onepoint(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []

        do {
            xnew = this.func(xold);
            epsilon = this.error(xnew, xold)
            data['x'][n] = xnew.toFixed(6);
            data['error'][n] = Math.abs(epsilon).toFixed(6);
            n++;
            xold = xnew;

        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
            dataA.push({
                x: x[i],
                y: this.func(x[i]).toFixed(6),
            });
        }

    }
    myChange(event){
      this.setState({
      [event.target.name]: event.target.value
      });
      }
    componentDidMount() {
        axios.get("http://192.168.99.100:3001/api/getonepoint").then(res => {
            console.log(res.data)
            console.log(res.data.data.fx)
            this.setState({ fx: res.data.data[0].fx });
            this.setState({ x0: res.data.data[0].x0 });
        })
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Onepoint</h2>
                <div
                            onChange={this.myChange}
                            style={{ marginLeft: 240, marginTop: 50, width: 280 }}

                        >
                          <h2>Onepoint</h2> 
                            <h2>Equation</h2><Input size="large" name= "fx" style={{ width: 400 ,}}></Input>
                            <h2>X</h2>
                            <Input size="large" name="x0" style={{ width: 400 }}></Input>
                            <Button onClick={() => this.onepoint(parseFloat(this.state.x0))
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                                <Button onClick={() => this.componentDidMount()
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>ADDData</Button>
                                
                       </div>
                {this.state.showOutputCard &&
                    <div
                        title={"Output12"}
                        bordered={true}
                        style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                        id="output12"
                    >
                        <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataInTable} pagination={{ pageSize: 10 }} >

                        </Table>
                    </div>
                }
                {this.state.showGraph &&
                    <div>

                        <LineChart
                            width={950}
                            height={400}
                            data={dataA}
                            margin={{ top: 30, bottom: 10 }}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis
                                type="number"
                                dataKey="y"
                                domain={["auto", "auto"]}
                                allowDataOverflow="true"
                            />
                            <Tooltip />
                            <Legend />
                            <Line type="linear" dataKey="y" stroke="#8884d8" />
                        </LineChart>

                    </div>
                }
            </Layout>
        );
    }
}
export default Onepoint; 