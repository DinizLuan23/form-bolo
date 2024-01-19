import styled from 'styled-components';

const borderColor = '#9D7730';
const labelColor = '#244580';
const errorColor = '#FF0000';

export const ContainerInputForm = styled.div`
   .containerInput {
      width: 100%;
      display: flex;
      flex-direction: column;

      label {
         margin-bottom: 3px;
         font-size: 16px;
         font-weight: 500;
         color: ${labelColor}
      }

      input {
         border: 1px solid ${borderColor};
         border-radius: 4px;
         padding: 2px 10px 2px 10px;
         height: 50px;
         background: #FFF;
         margin-top: ${({ label }) => label == ' ' ? '1.5rem' : '0px'};

         @media (max-width: 640px){
            margin-top: 0px;
         }
      }
   }

   p {
      color: ${errorColor};
      margin-top: 2px;
      font-weight: 500;
      font-size: 12px;
   }
`