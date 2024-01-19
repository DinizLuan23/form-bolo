// Components
import { toast } from 'react-toastify';
import { InputForm } from './components/inputForm'

// Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

// Utils
import moment from 'moment';
import { SelectForm } from './components/selectForm';

// Data
import { cakes } from './data/cakes';
import { countrys } from './data/countrys';

// Services
import { saveOrderCake } from './services';
import { Loading } from './components/loading';
import { useState } from 'react';

const schema = yup.object({
   first_name: yup.string().required('Campo Obrigatório'),
   last_name: yup.string().required('Campo Obrigatório'),
   delivery_date: yup.date().min(moment().startOf('day'), 'A data não pode ser menor que hoje').required('Campo Obrigatório'),
   delivery_time: yup.string().required('Campo Obrigatório'),
   phone: yup.number().required('Campo Obrigatório'),
   email: yup.string().email('Preencha o Email Corretamente').required('Campo Obrigatório'),
   street_address: yup.string().required('Campo Obrigatório'),
   street_address2: yup.string().required('Campo Obrigatório'),
   city: yup.string().required('Campo Obrigatório'),
   region: yup.string().required('Campo Obrigatório'),
   zip_code: yup.number().required('Campo Obrigatório'),
   country: yup.string().required('Campo Obrigatório')
});

const defaultValues = {
   first_name: '',
   last_name: '',
   delivery_date: '',
   delivery_time: '',
   phone: '',
   email: '',
   street_address: '',
   street_address2: '',
   city: '',
   region: '',
   zip_code: '',
   country: ''
};

function App() {
   const { reset, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
   const cakeSelected = watch('cake_selected');
   const timeSelected = watch('delivery_time');

   const [load, setLoad] = useState(false);

   function handleChooseCake(cake){
      setValue('cake_selected', cake);
   }

   async function handleSave(data){
      if(!cakeSelected) {
         window.location.href = '#divbolos';
         return toast.info('Escolha um dos Bolos 😅');
      };

      const timeNow = moment().format('HH:mm');
      const timeNowMoment = moment(timeNow, 'HH:mm');
      const timeSelectedMoment = moment(timeSelected, 'HH:mm');

      if (timeNowMoment.isAfter(timeSelectedMoment)) return toast.info('Escolha um horário maior 😅');

      setLoad(true);

      const result = await saveOrderCake({...data, delivery_date: moment(data.delivery_date).format()});
      if(result) {
         window.location.href = '#divbolos';
         reset(defaultValues)
      };

      setLoad(false);
   }

   return (
      <div className='bg-[#EBF6FC] w-full h-full min-h-screen min-w-screen px-5'>
         { load && <Loading /> }
         <div className='m-auto max-w-[800px] py-14'>
            <div>
               <h1 className='text-[#244580] text-4xl sm:text-5xl'>
                  Cake Order Form
               </h1>
               <p className='text-[#244580] font-light mt-5 text-lg sm:text-xl'>
                  Order your freshly baked cakes made using only the finest quality natural ingredients.
               </p>
               <hr className='mt-6 bg-[#A4A5A6] h-[3px]'/>
            </div>
            <div id='divbolos' className='mt-8 sm:mt-14'>
               <p className='font-medium text-[#244580] text-lg sm:text-xl'>
                  Please choose your favorite cake from among the following:
                  <span className='text-red-600'>*</span>
               </p>
               <div className='grid gap-10 mt-8 grid-cols-1 sm:grid-cols-2'>
                  {
                     cakes.length > 0 ? cakes.map(cake => (
                        <div key={cake.id} className='flex'>
                           <input 
                              id={`${cake.id}-${cake.value}`} 
                              type='radio' 
                              className='mr-3'
                              value={cake.value}
                              onChange={(e) => handleChooseCake(e.target.value)}
                              checked={cakeSelected == cake.value}
                           />
                           <label htmlFor={`${cake.id}-${cake.value}`}>
                              <img src={cake.image} className='h-full rounded-lg'/>
                           </label>
                        </div>
                     )) : <></>
                  }
               </div>
            </div>
            
            <div className='mt-10 sm:mt-14'>
               <h2 className='underline text-[#244580] font-light text-2xl sm:text-3xl'>Order Information</h2>

               <div className='grid mt-10 gap-x-6 gap-y-4 grid-cols-1 sm:grid-cols-2'>
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
                     inputMode="numeric"
                     error={errors.delivery_date && errors.delivery_date.message}
                  />
                  <InputForm
                     name="delivery_time"
                     label="Preferred delivery time"
                     type="time"
                     control={control}
                     placeholder="HH:MM AM"
                     inputMode="numeric"
                     error={errors.delivery_time && errors.delivery_time.message}
                  />
                  <InputForm
                     name="phone"
                     label="Phone"
                     type='number'
                     control={control}
                     placeholder="### ### ####"
                     inputMode="numeric"
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
                  <div className='grid gap-x-6 gap-y-4 mt-4 grid-cols-1 sm:grid-cols-2'>
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
                        type='number'
                        control={control}
                        placeholder="Postal / Zip Code"
                        inputMode="numeric"
                        error={errors.zip_code && errors.zip_code.message}
                     />
                     <SelectForm
                        name="country"
                        control={control}
                        placeholder="Country"
                        options={countrys}
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

export default App;
