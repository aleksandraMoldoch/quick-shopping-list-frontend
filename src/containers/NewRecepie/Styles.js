import styled from 'styled-components';

const Styles = styled.div`
    .cont{
        padding: 20px;
        margin: auto;
    }
    .form{
        width:70%;
    }
    .label{
        font-family: 'Muli', sans-serif;
        margin-top: 1rem;
        color:#ABC5F5;
        font-size: 20px;
    }
    .button{
        position: sticky;
        float: right;
        top: 1rem;
        background-color: transparent;
        border:1.2px solid #B39974;
        color:white;
        &:hover{
            background-color: #395385;
        }
    }
    .div{
        padding-left: 15px;
    }
    .feedback{
        color: #F55D7E;
    }
`;

export default Styles;
