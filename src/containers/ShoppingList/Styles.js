import styled from 'styled-components';

const Styles = styled.div`
.name{
    font-family: 'Muli', sans-serif;
    color:#ABC5F5;
    font-size: 35px;
}
.btn-mystyle{
    background-color: transparent;
    border: 1.2px solid #B39974;
    padding: 3px 5px;
    color: #F2F2F2;
    &:hover{
        background-color: #395385;
    }
}
.btn-mysize{
    margin: 4px;
    font-size: 17px;
}
`;

export default Styles;
