import { Controller } from 'react-hook-form';
import { ContainerSelectForm } from './styles';

export function SelectForm({control, name, options, label, error, ...rest}){
   return(
      <ContainerSelectForm>
         <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => {
               return (
                  <div className="containerSelect">
                     { label && <label htmlFor={name}> {label} </label> }
                     <select
                        id={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        {...rest}
                     >
                        <option value={null} >
                           {...rest.placeholder ?? 'Escolha uma opção'}
                        </option>
                        {
                           options.length > 0 && options.map(opt => (
                              <option key={opt.id} value={opt.id}>
                                 {opt.label}
                              </option>
                           ))
                        }
                     </select>
                  </div>
               )
            }}
            name={name}
         />
         {error && <p>{ error }</p>}
      </ContainerSelectForm>
   )
}