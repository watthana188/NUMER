import { Layout, Menu, Breadcrumb } from 'antd';
import React,{Component} from 'react';
import { Input, Table ,Button} from 'antd';
import {  compile,derivative } from 'mathjs'
import axios from 'axios';

var y, errors, exact;
var fx = " ";
class backwardh2 extends Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        x: 0,
        h: 0,
        d: 0,
        showOutput: false,
    }
    this.myChange = this.myChange.bind(this);
    this.backwardh2 = this.backwardh2.bind(this);
}
backwardh2(d,h,x) {
  fx = this.state.fx;
  var data = []
  data['x'] = []
  data['error'] = []
  data['iteration'] = []
  
  if (d == 1) {
    y = (3*this.func(x) - 4 * this.func(x - h) + this.func(x-(2*h))) / (2 * h)
  
} else if (d == 2) {
    y = (2* this.func(x)  -5 * this.func(x - h) + 4 * this.func(x -(2* h)) - this.func(x - (3 * h))) / Math.pow(h, 2)
  
} else if (d == 3) {
    y = (5 * this.func(x) - 18 * this.func(x -h) + 24 * this.func(x - (2 * h)) - 14 * this.func(x -(3* h)) +3 * this.func(x - (4 * h))) / (Math.pow(h, 3) * 2)
   
} else if (d == 4) {
    y = (3 * this.func(x) - 14 * this.func(x - h) + 26 * this.func(x - (2 * h)) - 24 * this.func(x -(3* h)) + 11* this.func(x - (4 * h)) - 2 * this.func(x - (5 * h))) / Math.pow(h, 4)
  
}
    console.log(y)
    console.log(d)
    exact = this.funcD(x,d)
    errors = this.error(exact,y).toFixed(6);   
  this.setState({
      showOutput: true,
  })
}
func(X) {
  var exp = compile(this.state.fx);
  let scope = {x:parseFloat(X)};
  return exp.eval(scope);        
}
funcD(X,d){
  var temp = this.state.fx, expr 
        for (var i=1 ; i<=d ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
            console.log(expr)
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
}
error(xnew, xold) {
  return Math.abs((xnew - xold) / xnew);
}


  myChange(event){
    this.setState({
    [event.target.name]: event.target.value
    });
    }
    componentDidMount(){
      axios.get("http://192.168.99.100:3001/api/getwardh").then(res=>{
          this.setState({fx: res.data.data[0].fx});
          this.setState({d: res.data.data[0].d});
          this.setState({x: res.data.data[0].x});
          this.setState({h: res.data.data[0].h});
          console.log(res.data.data[0].fx)
          console.log(res.data.data[0].d)
          console.log(res.data.data[0].x)
          console.log(res.data.data[0].h)
      })
    }
    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <div
                          onChange={this.myChange}
                          style={{ marginLeft: 240, marginTop: 50, width: 280 }}
                      >
                          <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                          <h2>D</h2><Input size="large" name="d" style={{ width: 300 }}></Input><br /><br />                        
                          <h2>X</h2><Input size="large" name="x" style={{ width: 300 }}></Input><br /><br /> 
                          <h2>h</h2><Input size="large" name="h" style={{ width: 300 }}></Input><br /><br />                          
                          <Button onClick={() => this.backwardh2(parseFloat(this.state.d),parseFloat(this.state.h),parseFloat(this.state.x))
                          }
                              style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                              <Button onClick={() => this.componentDidMount()
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>ADDData</Button>
                      </div>
                      {this.state.showOutput &&
                          <div
                              title={"Output12"}
                              bordered={true}
                              style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                              id="output12"
                          >
                              <br /><br /> <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                Approximate = {y}<br/>
                                Exact = {exact}<br/>
                                Error(ε) = {errors}<br/>
                            </p>
                          </div>
                      }

        </Layout>
      );
    }
  }
  export default backwardh2 ; 