// Form
import { Controller } from 'react-hook-form';

// Styles
import { ContainerInputForm } from './styles';

export const InputForm = ({ control, name, type, label, error, ...rest }) => {
   return(
      <ContainerInputForm label={label}>
         <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => {

               let maxLength;

               if(type){
                  switch(type){
                     case 'cep':
                        maxLength = 9;
                     break;
                     case 'date':
                        maxLength = 10;
                     break;
                     case 'phone':
                        maxLength = 15;
                     break;
                  }
               }

               return (
                  <div className="containerInput">
                     { label && <label htmlFor={name}> {label} </label> }
                     <input
                        id={name}
                        type={type || "text"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        maxLength={maxLength}
                        {...rest}
                     />
                  </div>
               )
            }}
            name={name}
         />
         {error && <p>{ error }</p>}
      </ContainerInputForm>
   )
}