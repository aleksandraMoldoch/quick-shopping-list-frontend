import styled from 'styled-components';

const Styles = styled.div`
.name{
    font-family: 'Muli', sans-serif;
    color:#ABC5F5;
    font-size: 35px;
}
.btn-mystyle{
    position: sticky;
    float: right;
    top: 1rem;
    background-color: transparent;
    border: 1.2px solid #B39974;
    color: #F2F2F2;
    &:hover{
        background-color: #395385;
    }
}
.btn-mysize{
    font-size: 13px;
}
`;

export default Styles;
