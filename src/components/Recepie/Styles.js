import styled from 'styled-components';

const Styles = styled.div`
    .card{
        width: 20rem;
        height: 28rem;
        margin-bottom: 1.5rem;
        border-radius: 1px;
        background-color: #1C325C;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .image{
        width: 100%;
        height: 72%;
    }
    .btn-mystyle{
        background-color: transparent;
        border:1px solid #B39974;
        color:#ABC5F5;
        &:hover{
            background-color: #395385;
        }
    }
    .btn-mysize{
        margin: 0.5px;
        font-size: 15px;
    }
    .button-group{
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .name{
        font-family: 'Muli', sans-serif;
        color:#ABC5F5;
    }
`;

export default Styles;
