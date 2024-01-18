import axios from "axios";
import { toast } from "react-toastify";

export const saveOrderCake = async (order) => {
  try {
     const { status, data } = await axios.post('https://jsonplaceholder.typicode.com/posts', { order });

     if (status === 201) {
        toast.success('Pedido Enviado ✅');
        return data;
     }else{
        throw Error(data.message);
     }
  } catch (err) {
     toast.error(err.message);
     return false;
  }
};