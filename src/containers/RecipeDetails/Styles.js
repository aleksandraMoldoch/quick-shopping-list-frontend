import styled from 'styled-components';

const Styles = styled.div`
    .link{
        font-family: 'Muli', sans-serif;
        text-decoration: none;
        font-style:italic;
        font-size: 20px;
        color: #ABC5F5;
        &:hover{
            color: #6295F5;
        }
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
    .name{
        font-family: 'Muli', sans-serif;
        color:#ABC5F5;
        font-size: 35px;
    }
`;

export default Styles;
