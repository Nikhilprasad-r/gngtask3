import { MdDeleteForever,MdEdit } from "react-icons/md";

import { Datas } from './Table';
const Tablerow = ({item,onEdit,onDelete}:{item:Datas,onEdit:Function,onDelete:Function}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {item.ProductName}
    </th>
    <td className="px-6 py-4">
       {item.Color}
    </td>
    <td className="px-6 py-4">
       {item.Category}
    </td>
    <td className="px-6 py-4">
       {item.Price}
    </td>
    <td className="px-6 py-4 text-center">
    <MdDeleteForever onClick={()=>onDelete(item.ProductName)} />
    </td>
    <td className="px-6 py-4 text-center">
   <button onClick={()=>onEdit(item)}><MdEdit /></button> 
    </td>
</tr>
  )
}

export default Tablerow