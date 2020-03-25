import { Layout, Menu } from 'antd';
import React,{useState,} from 'react';
import Bisection from './bisection';
import Falseposition from './falseposition';
import Newton from './newtonrapshon';
import Onepoint from './onepoint';
import Secant from './secant';
import Linear from './linear';
import MultipleLinear from './multipleLinear';
import Polynomial from './Polynomial';
import Backwardh from './backwardh';
import Forwardh from './forwardh';
import Central from './centralh';
import Backwardh2 from './backwardh2';
import Forwardh2 from './forwardh2';
import Centralh4 from './centralh4';
import Trap from './trap'
import Simson from './simson'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function App(){
const [collapsed, setCollapsed] = useState(false);
const onCollapse = () => setCollapsed (!collapsed);
const [page, setpage] = useState();
const bisectionpage = () => setpage(<Bisection />);
const falsepositionpage  = () => setpage(<Falseposition />); 
const newtonpage = () => setpage(<Newton/>); 
const onepointpage = () => setpage(<Onepoint/>)
const secantpage = () =>setpage(<Secant/>)
const linearpage = () =>setpage(<Linear/>)
const multipleLinearpage = () =>setpage(<MultipleLinear/>)
const polynomialpage = () =>setpage(<Polynomial/>)
const backwardhpage = () =>setpage(<Backwardh/>)
const backwardh2page = () =>setpage(<Backwardh2/>)
const centralhpage = () => setpage(<Central/>)
const centralh4page =() => setpage(<Centralh4/>)
const forwardhpage =() =>setpage(<Forwardh/>)
const forwardh2page =() =>setpage(<Forwardh2/>)
const tarppage =() =>setpage(<Trap/>)
const simsonpage =() =>setpage(<Simson/>)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                
                  <span>Root</span>
                </span>
              }
            >
              <Menu.Item key="3" onClick={bisectionpage}>Bisection</Menu.Item>
              <Menu.Item key="4" onClick={falsepositionpage}>Falseposition</Menu.Item>
              <Menu.Item key="5" onClick={newtonpage}>newtonrapshon</Menu.Item>
              <Menu.Item key="6" onClick={onepointpage}>onepoint</Menu.Item>
              <Menu.Item key="7" onClick={secantpage}>secant</Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="sub2"
              title={
                <span>
                
                  <span>Integration</span>
                </span>
              }
            >
              <Menu.Item key="8" onClick={tarppage}>CompositeTrapzoidal</Menu.Item>
              <Menu.Item key="9" onClick={simsonpage}>CompositeSimpson</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                
                  <span>Differentiation</span>
                </span>
              }
            >
              <Menu.Item key="11" onClick={backwardhpage}>BackwardH</Menu.Item>
              <Menu.Item key="12" onClick={centralhpage}>Central</Menu.Item>
              <Menu.Item key="13" onClick={forwardhpage}>ForwardH</Menu.Item>
              <Menu.Item key="14" onClick={backwardh2page}>BackwardH2</Menu.Item>
              <Menu.Item key="15" onClick={centralh4page}>CentralH4</Menu.Item>
              <Menu.Item key="16" onClick={forwardh2page}>ForwardH2</Menu.Item>
            </SubMenu>
            <Menu.Item key="20">
            
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {page}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  
}

export default App; 
