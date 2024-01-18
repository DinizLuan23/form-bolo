// Components
import { toast } from 'react-toastify';
import { InputForm } from './components/inputForm'

// Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

// Utils
import moment from 'moment';

const bolos = [
   { id: 'cake1', image:'cake1.jpg' },
   { id: 'cake2', image:'cake2.jpg' },
   { id: 'cake3', image:'cake3.jpg' },
   { id: 'cake4', image:'cake4.jpg' },
]

const schema = yup.object({
   first_name: yup.string().required('Campo Obrigatório'),
   last_name: yup.string().required('Campo Obrigatório'),
   delivery_date: yup.date().min(moment().startOf('day'), 'A data não pode ser menor que hoje').required('Campo Obrigatório'),
   delivery_time: yup.string().required('Campo Obrigatório'),
   phone: yup.string().required('Campo Obrigatório'),
   email: yup.string().email('Preencha o Email Corretamente').required('Campo Obrigatório'),
   street_address: yup.string().required('Campo Obrigatório'),
   street_address2: yup.string().required('Campo Obrigatório'),
   city: yup.string().required('Campo Obrigatório'),
   region: yup.string().required('Campo Obrigatório'),
   zip_code: yup.string().required('Campo Obrigatório'),
   country: yup.string().required('Campo Obrigatório')
});

function App() {
   const { reset, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

   const cakeSelected = watch('cake_selected');

   function handleChooseCake(cake){
      setValue('cake_selected', cake);
   }

   async function handleSave(data){
      if(!cakeSelected) {
         window.location.href = '#divbolos';
         return toast.info('Escolha um dos Bolos 😅');
      };
   }

   return (
      <div className='bg-[#EBF6FC] w-screen h-full min-h-screen'>
         <div className='m-auto bg-slate-200 max-w-[800px] py-14'>
            <div>
               <h1 className='text-[#244580] text-5xl'>
                  Cake Order Form
               </h1>
               <p className='text-[#244580] text-xl font-light mt-5'>
                  Order your freshly baked cakes made using only the finest quality natural ingredients.
               </p>
               <hr className='mt-6 bg-[#A4A5A6] h-[3px]'/>
            </div>
            <div id='divbolos' className='mt-14'>
               <p className='font-medium text-xl text-[#244580]'>
                  Please choose your favorite cake from among the following:
                  <span className='text-red-600'>*</span>
               </p>
               <div className='grid grid-cols-2 gap-10 mt-8'>
                  {
                     bolos.length > 0 ? bolos.map(bolo => (
                        <div className='flex'>
                           <input 
                              id={bolo.id} 
                              type='radio' 
                              className='mr-3' 
                              onClick={(e) => handleChooseCake(e.target.id)}
                              checked={cakeSelected == bolo.id}
                           />
                           <label for={bolo.id}>
                              <img src={bolo.image} className='h-full rounded-lg'/>
                           </label>
                        </div>
                     )) : <></>
                  }
               </div>
            </div>
            
            <div className='mt-14'>
               <h2 className='text-3xl underline text-[#244580] font-light'>Order Information</h2>

               <div className='grid grid-cols-2 mt-10 gap-x-6 gap-y-4'>
                  <InputForm
                     name="first_name"
                     label="Name"
                     control={control}
                     placeholder="First"
                     error={errors.first_name && errors.first_name.message}
                  />
                  <InputForm
                     name="last_name"
                     label=" "
                     control={control}
                     placeholder="Last"
                     error={errors.last_name && errors.last_name.message}
                  />
                  <InputForm
                     name="delivery_date"
                     label="Delivery date"
                     type="date"
                     control={control}
                     placeholder="MM/DD/YYYY"
                     max="9999-12-31"
                     min={moment().format('YYYY-MM-DD')}
                     inputmode="numeric"
                     error={errors.delivery_date && errors.delivery_date.message}
                  />
                  <InputForm
                     name="delivery_time"
                     label="Preferred delivery time"
                     type="time"
                     control={control}
                     placeholder="HH:MM AM"
                     inputmode="numeric"
                     error={errors.delivery_time && errors.delivery_time.message}
                  />
                  <InputForm
                     name="phone"
                     label="Phone"
                     type='number'
                     control={control}
                     placeholder="### ### ####"
                     inputmode="numeric"
                     error={errors.phone && errors.phone.message}
                  />
                  <InputForm
                     name="email"
                     label="Email"
                     control={control}
                     error={errors.email && errors.email.message}
                  />
               </div>

               <div className='mt-10'>
                  <div className='grid gap-y-4'>
                     <InputForm
                        name="street_address"
                        label="Address"
                        control={control}
                        placeholder="Street Address"
                        error={errors.street_address && errors.street_address.message}
                     />
                     <InputForm
                        name="street_address2"
                        control={control}
                        placeholder="Street Address Line 2"
                        error={errors.street_address2 && errors.street_address2.message}
                     />
                  </div>
                  <div className='grid grid-cols-2 gap-x-6 gap-y-4 mt-4'>
                     <InputForm
                        name="city"
                        control={control}
                        placeholder="City"
                        error={errors.city && errors.city.message}
                     />
                     <InputForm
                        name="region"
                        control={control}
                        placeholder="Region"
                        error={errors.region && errors.region.message}
                     />
                     <InputForm
                        name="zip_code"
                        control={control}
                        placeholder="Postal / Zip Code"
                        error={errors.zip_code && errors.zip_code.message}
                     />
                     <InputForm
                        name="country"
                        control={control}
                        placeholder="Country"
                        error={errors.country && errors.country.message}
                     />
                  </div>
               </div>

               <div className='flex justify-center items-center mt-10'>
                  <button
                     onClick={handleSubmit(handleSave)}
                     className='bg-[#24457B] text-white px-14 py-2 rounded-full duration-500 hover:brightness-75'
                  >
                     Order
                  </button>
               </div>
            </div>
         </div>
      </div>
  )
}

export default App
