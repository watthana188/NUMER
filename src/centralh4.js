import { Layout, Menu, Breadcrumb } from 'antd';
import React,{Component} from 'react';
import { Input, Table ,Button} from 'antd';
import {  compile,derivative } from 'mathjs'
import axios from 'axios';
var y, errors, exact;
var fx = " ";
class centralh4 extends Component {
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
    this.centralh4 = this.centralh4.bind(this);
}
centralh4(d,h,x) {
  fx = this.state.fx;
  var data = []
  data['x'] = []
  data['error'] = []
  data['iteration'] = []
  
  
  if (d == 1) {
   y = (-this.func(x+(2*h) ) +8 * this.func(x+h) -8 * this.func(x-h) +this.func(x-(2*h) )) / (12*h)
 
  } else if (d == 2) {
   y = (-this.func(x+(2*h) ) +16 * this.func(x+h) - 30 *this.func(x) +16 * this.func(x-h) -this.func(x-(2*h) )) / (Math.pow(h, 2)*12)
  
  } else if (d == 3) {
   y = (-this.func(x + (3 * h)) + 8 * this.func(x + (2 * h)) - 13 * this.func(x +h) + 13 * this.func(x -h) - 8 * this.func(x-(2*h)) +this.func(x-(3*h))) / (Math.pow(h, 3)*8)
 
  } else if (d == 4) {
   y = (-this.func(x + (3 * h)) + 12 * this.func(x + (2 * h)) - 39 * this.func(x +h) + 56 * this.func(x) - 39 * this.func(x -h) +12* this.func(x-(2*h)) -this.func(x-(3*h))) / (Math.pow(h, 4)*6)

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
                          <Button onClick={() => this.centralh4(parseFloat(this.state.d),parseFloat(this.state.h),parseFloat(this.state.x))
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
  export default centralh4 ; 