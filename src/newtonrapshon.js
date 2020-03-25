import { Layout, Menu, Breadcrumb } from 'antd';
import React,{Component} from 'react';
import { Input, Table ,Button} from 'antd';
import{ compile,derivative} from 'mathjs';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios'

var dataTable = []
var dataG =[]


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


class newtonrapshon extends Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        xl: 0,
        xr: 0,
        showOutput: false,
        showGraph: false,
    }
    this.myChange = this.myChange.bind(this);
    this.newtonraphson = this.newtonraphson.bind(this);
}

  newtonraphson(xold) {
    var fx = this.state.fx;
    var xnew = 0;
    var sum = parseFloat(0.000000);
    var n=0;
    var data  = []
    data['x'] = []
    data['error'] = []
    do{ 
        xnew = xold - (this.func(xold)/this.funcDiff(xold));
        sum = this.error(xnew, xold)
        data['x'][n] =  xnew.toFixed(6);
        data['error'][n] = Math.abs(sum).toFixed(6);
        n++;  
        xold = xnew;
    }while(Math.abs(sum)>0.000001);
    this.createTable(data['x'], data['error']);
    this.setState({
        showOutputCard: true,
        showGraph: true
    })
  }
  func(X) {
    var exp = compile(this.state.fx);
    let scope = {x:parseFloat(X)};
    return exp.eval(scope);        
  }
  error(xnew, xold) {
    return Math.abs((xnew-xold) / xnew);
  }
  funcDiff(X) {
    var expr = derivative(this.state.fx, 'x');
    let scope = {x:parseFloat(X)};
    return expr.eval(scope); 
}
createTable(x, error) {
  for (var i=0 ; i<x.length ; i++) {
      dataTable.push({
          iteration: i+1,
          x: x[i],
          error: error[i]
      });
      dataG.push({
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
 componentDidMount(){
  axios.get("http://192.168.99.100:3001/api/getnewton").then(res=>{
      console.log(res.data)
      console.log(res.data.data.FX)
      this.setState({fx: res.data.data[0].fx});
      this.setState({x: res.data.data[0].x});
      console.log(res.data.data[0].FX)
      console.log(res.data.data[0].X)
  })
}
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>

<div
                            onChange={this.myChange}
                            style={{ marginLeft: 240, marginTop: 50, width: 280 }}

                        >
                          <h2>newtonraphson</h2> 
                            <h2>Equation</h2><Input size="large" name= "fx" style={{ width: 400 ,}}></Input>
                            <h2>X</h2>
                            <Input size="large" name="x" style={{ width: 400 }}></Input>
                            <Button onClick={() => this.newtonraphson(parseFloat(this.state.x))
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
                                <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataTable} pagination={{ pageSize: 10 }} >

                                </Table>
                            </div>
                        }
                        {this.state.showGraph &&
                        <div>
                           
                                <LineChart
                                    width={950}
                                     height={400}
                                    data={dataG}
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
export default newtonrapshon; 
