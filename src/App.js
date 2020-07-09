import React, { Component } from 'react';
import styled from 'styled-components';

import sprite from './img/sprite.png';

const Container = styled.div`
	padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
	overflow: hidden;
`;

const Map = styled.div`
  position: relative;
  width: 700px;
  height: 700px;
  background-color: green;
`;

const Person = styled.div`
  position: absolute;
  top: ${props => props.position[1]}px;
  left: ${props => props.position[0]}px;
  width: 35px;
  height: 35px;

  background: url(${sprite});
  background-position: ${props => `0 ${props.moving}%`};
`;

class App extends Component {
  constructor(props) {
    super(props);
		this.myRef = React.createRef();
    this.state = {
			position: [0, 0],
			moving: 0,
    };
	}
	componentDidMount() {
		this.myRef.current.focus()
		console.log('didmount', this.myRef);
	}

	walk = (ev) => {
		const { position } = this.state;
		(ev.key  === 'ArrowRight' || ev.key  === 'd') && position[0] < 665 && this.setState({moving: 35, position: [position[0]+35,position[1]]});
		(ev.key  === 'ArrowLeft' || ev.key  === 'a') && position[0] > 0 && this.setState({moving: 100, position: [position[0]-35,position[1]]});
		(ev.key  === 'ArrowUp' || ev.key  === 'w') && position[1] > 0 && this.setState({moving: 65, position: [position[0],position[1]-35]});
		(ev.key  === 'ArrowDown' || ev.key  === 's') && position[1] < 665 && this.setState({moving: 0, position: [position[0],position[1]+35]})
	}
  render() {
		const { position, moving } = this.state;

    return (
      <Container ref={this.myRef} tabIndex="0" onKeyUp={this.walk}>
      <Map>
				<Person
					position={position}
					moving={moving}
				/>
      </Map>
      </Container>
    );
  }
}

export default App;
