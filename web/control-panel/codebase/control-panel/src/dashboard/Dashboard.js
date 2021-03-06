import React, { Component } from 'react';
import {ProjectContainer} from './ProjectContainer/ProjectContainer.js';
import {ProjectNav} from './ProjectNav/ProjectNav.js';
import {AdminPanel} from './AdminPanel/AdminPanel.js'
import {Row, Col, Layout, Button} from 'antd'
import logo from '../images/logo.svg';
const { Header, Content, Footer, Sider } = Layout;


export class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.projectNavHandler = this.projectNavHandler.bind(this);
    this.deviceNavHandler = this.deviceNavHandler.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.changeMode = this.changeMode.bind(this);

    this.state = {
      activeProject: 0,
      activeDevice: 0,
      user: this.props.researcher,
      mode: 0,
      }
    }

  deleteProject(i){
    let myUser = this.state.user;
    myUser.projects.splice(i, 1);
    this.setState({user: myUser, activeProject: 0});
  }

  deleteDevice(){
    let myUser = this.state.user;
    myUser.projects[this.state.activeProject].devices.splice(this.state.activeDevice, 1);
    let newActive = 0;
    this.setState({user: myUser, activeDevice: newActive});
  }

  projectNavHandler(active, mode) {
    if(mode === 0){
      this.setState({ activeProject: active, activeDevice: 0, mode: 0})
    }
    else {
      this.setState({mode: mode})
    }
  }

  deviceNavHandler(active){
    this.setState({
      activeDevice: active
    })
  }

  changeMode(newMode){
    this.setState({mode: newMode})
  }

  getModeContent(){
    if(this.state.mode === 0 || this.state.mode === 1){
      return (
        <ProjectContainer open={this.state.mode}
             user={this.state.user} 
             handler={this.deviceNavHandler} 
             activeProject={this.state.activeProject} 
             activeDevice={this.state.activeDevice}
             deleteDevice={this.deleteDevice}
             changeMode={this.changeMode}/>
        )
    }
    else{
      return(
        <AdminPanel/>
      )
    }
  }

  render() {
  	const projectNav = <ProjectNav user={this.state.user} handler={this.projectNavHandler} deleteProj={this.deleteProject}/>;

    return (
    <Layout style={{height: 100}}>
      <Header>       
        <Row type="flex" justify="space-between" align="right">        
          <Col span={2}>
          <a href="#home"><img src={logo} className="App-logo" alt="logo" /></a>
          </Col>
          <Col span={10}>
          <h2 style={{margin:"auto", marginTop:15}} className="white bold ubuntu">Energy Hill Control Panel</h2>
          </Col>
          <Col span={12}>
            <Button type="primary" icon="google" style={{position:"absolute",right:0, top: 15}} onClick={this.props.logout}> Sign Out </Button>
          </Col>
        </Row>
      </Header>


      <Layout>
        <Sider  breakpoint="lg"
                collapsedWidth="0"
                width="245"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                style={{top:"-80"}}>            
              <div className="logo" />
              {projectNav}
        </Sider>
        <Content> 
            <div style={{ padding: "2%", background: '#fff', minHeight: 360 }}>
                {this.getModeContent()} 
            </div>
        </Content>
      </Layout>
    </Layout>

    );
  }

}
