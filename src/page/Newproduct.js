import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCloudUpload } from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Newproduct = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    tipus: '',
    image: '',
    quantitat: '',
    unitat: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    const { name, image, tipus, quantitat } = data;

    if (name && image && tipus && quantitat) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();

      //   console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: '',
          tipus: '',
          image: '',
          quantitat: '',
          description: '',
        };
      });
    } else {
      toast('Enter required Fields');
    }
  };
  return (
    <div className="p-4">
      <form className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          type={'text'}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Tipus</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="tipus"
          name="tipus"
          onChange={handleOnChange}
          value={data.tipus}>
          <option value={'other'}>select category</option>
          <option value={'fruits'}>Transport</option>
          <option value={'vegetable'}>Aigua</option>
          <option value={'icream'}>Electricitat</option>
          <option value={'dosa'}>Reciclar</option>
        </select>

        <label htmlFor="image">
          Imatge
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input type={'file'} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Quantitat
        </label>
        <input
          type={'text'}
          className="bg-slate-200 p-1 my-1"
          name="quantitat"
          onChange={handleOnChange}
          value={data.quantitat}
        />

        <label htmlFor="description">Descripció</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">Guardar</button>
      </form>
    </div>
  );
};

export default Newproduct;
