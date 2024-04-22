import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Datas } from './Table';

type EditFormsPropsType={
  initialValues:Datas,
 handleUpdate:()=>void,
  onCancel:()=>void,
}
const EditForm = ({ initialValues,handleUpdate, onCancel }:EditFormsPropsType) => {


  const validationSchema = Yup.object().shape({
    ProductName: Yup.string().required('Product name is required'),
    Color: Yup.string().required('Color is required'),
    Category: Yup.string().required('Category is required'),
    Price: Yup.number().required('Price is required').positive('Price must be positive'),
  });

  return (
    <div className="fixed inset-0 z-[2] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, touched }) => (
            <Form className='max-w-sm mx-auto'>
             
               <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="ProductName">ProductName:</label>
              <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="ProductName" placeholder="Product Name" />
              {errors.ProductName && touched.ProductName ? (<div>{errors.ProductName}</div>) : null}
             </div>
               <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="Color">Color:</label>
              <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="Color" placeholder="Color" />
              {errors.Color && touched.Color ? (<div>{errors.Color}</div>) : null}
             </div>
               <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="Category">Category:</label>
              <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="Category" placeholder="Category" />
              {errors.Category && touched.Category ? (<div>{errors.Category}</div>) : null}
             </div>
               <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="Price">Price:</label>
              <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="Price" type="number" placeholder="Price" />
              {errors.Price && touched.Price ? (<div>{errors.Price}</div>) : null}
              </div>
<div className='flex justify-around'>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
