import styled from "styled-components" ;

//font-family : 'Netflix Sans','Helvetica Neue',Helvetica,Arial,sans-serif;

const Button = styled.button`
   outline: none ;
   border: none ;
   cursor: pointer ;
   font-weight: bold ;
   padding: 7px 12px;
   border-radius: 5px;
`

export const PlayButton = styled(Button)`
    background-color: var(--netflix-red) ;
    color: white ;
    display: flex ;
    align-items: center ;
    border-radius: 12px;
    transition: .3s ease-out ;
    margin-top: 30px ;
    padding: 7px 20px ;
    text-transform: uppercase ;
    &:hover {
        box-shadow: 1px 1px 4px var(--red), -1px -1px 4px var(--red) ;
    }
`