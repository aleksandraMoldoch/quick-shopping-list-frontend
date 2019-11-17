import styled from 'styled-components';

const Styles = styled.div`
.btn-mystyle{
  background-color: transparent;
  border:1.2px solid #B39974;
  color:white;
  &:hover{
      background-color: #395385;
  }
}
.btn-mysize{
  margin: 0.5px;
  font-size: 17px;
}
.label{
  font-family: 'Muli', sans-serif;
  margin-top: 1rem;
  margin-left: 6px;
  color:#ABC5F5;
  font-size: 20px;
}
.feedback{
  color: #F55D7E;
}
`;

export default Styles;