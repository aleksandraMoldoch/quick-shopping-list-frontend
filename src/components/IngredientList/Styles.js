import styled from 'styled-components';

const Styles = styled.div`
  .new-recipe-list {
    background-color: #F2F2F2;
    color: #373542;
    font-size: 14px;
    font-weight: normal;
    margin-top: 1rem;
    font-family:'Muli', sans-serif;
    border: 1px solid #dedede;
    border-radius: 3px;
    position: relative;
  }
  .row {
    border-bottom: 1px dotted #ccc;
    overflow: hidden
    margin: auto;
    width: 100%;
    text-overflow: ellipsis;
    padding: 10px 2px 10px 20px;
    text-transform: capitalize;
  &:hover {
    background-color: #eee;
  }}
  .new-recipe-row {
    color: #373542;
    overflow: hidden
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #dedede;
    height: 45px;
    text-overflow: ellipsis
    text-transform: capitalize;
  &:hover {
    background-color: #eee;
  }}
  .label{
    font-family: 'Muli', sans-serif;
    color:#ABC5F5;
    font-size: 20px;
}
.cont{
  padding: 20px;
  border: 1px solid #B39974;
}
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