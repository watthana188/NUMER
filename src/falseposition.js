import { Layout } from 'antd';
import React,{Component} from 'react';
import { Input, Table ,Button} from 'antd';
import{ compile} from 'mathjs';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios'

var dataTable = []
var dataG = []
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "XL",
    dataIndex: "xl",
    key: "xl"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "xr"
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
class falseposition extends Component {
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
    this.falseposition = this.falseposition.bind(this);
}
  falseposition(xl, xr) {
    var fx = this.state.fx;
    xl = parseFloat(this.state.xl)
    xr = parseFloat(this.state.xr)
    var increaseFunction = false;
    var xm = 0;
    var sum = parseFloat(0.000000);
    var n=0;
    var data  = []
    data['xl'] = []
    data['xr'] = []
    data['x'] = []
    data['error'] = []
    if (this.func(xl) < this.func(xr)) {
        increaseFunction = true;
    }
    do{ 
        xm = ((xl*this.func(xr) - xr*this.func(xl))/(this.func(xr)-this.func(xl)));
        if (this.func(xm) * this.func(xr) < 0) {
          if (this.func(xm) * this.func(xl) > 0) {
          sum = this.error(xm, xl);
          xl = xm;}
      }
      else {
          if (this.func(xm) * this.func(xl) < 0) {
          sum = this.error(xm, xr);
           xr = xm;
          }
      }

        data['xl'][n] =  xl;
        data['xr'][n] =  xr;
        data['x'][n] =  xm.toFixed(6);
        data['error'][n] = Math.abs(sum).toFixed(6);
        n++;  

    }while(Math.abs(sum)>0.000001);
    this.createTable(data['xl'], data['xr'], data['x'], data['error']);
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
  createTable(xl, xr, x, error) {
    dataTable = []
    for (var i=0 ; i<xl.length ; i++) {
        dataTable.push({
            iteration: i+1,
            xl: xl[i],
            xr: xr[i],
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
  axios.get("http://192.168.99.100:3001/api/getfalposition").then(res=>{
      console.log(res.data)
      console.log(res.data.data.Fx)
      this.setState({fx: res.data.data[0].fx});
      this.setState({xl: res.data.data[0].xl});
      this.setState({xr: res.data.data[0].xr});
      console.log(res.data.data[0].Fx)
      console.log(res.data.data[0].XL)
      console.log(res.data.data[0].XR)
  })
}
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <div
                            onChange={this.myChange}
                            style={{ marginLeft: 240, marginTop: 50, width: 280 }}

                        >
                          <h2>Falseposition</h2> 
                            <h2>Equation</h2><Input size="large" name= "fx" style={{ width: 400 ,}}></Input>
                            <h2>XL</h2>
                            <Input size="large" name="xl" style={{ width: 400 }}></Input>
                            <h2>XR</h2><Input size="large" name="xr" style={{ width: 400 }}></Input><br /><br />
                            <Button onClick={() => this.falseposition()
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
export default falseposition; 
